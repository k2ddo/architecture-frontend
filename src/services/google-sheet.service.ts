import { google, sheets_v4 } from 'googleapis'
import path from 'path'

interface Header {
  text: string
  color: { red: number; green: number; blue: number }
}

async function createSpreadsheet(
  title: string,
  questions: string[],
  answers: boolean[]
) {
  'use server'

  const SCOPES = [
    'https://www.googleapis.com/auth/spreadsheets',
    'https://www.googleapis.com/auth/drive',
  ]
  const KEY_FILE_PATH = path.join(process.cwd(), 'demer_key.json')

  const auth = new google.auth.GoogleAuth({
    keyFile: KEY_FILE_PATH,
    scopes: SCOPES,
  })

  const sheets = google.sheets({ version: 'v4', auth })
  const drive = google.drive({ version: 'v3', auth })

  const spreadsheet = {
    properties: { title },
  }

  try {
    const createdSpreadsheet = await sheets.spreadsheets.create({
      requestBody: spreadsheet,
      fields: 'spreadsheetId',
    })
    const fileId = createdSpreadsheet.data.spreadsheetId

    if (!fileId) throw new Error('Failed to create spreadsheet')

    await drive.files.update({
      fileId,
      addParents: '1EEolv3Vi_eClm5KUUaFlARhp5y2aFf__',
      removeParents: 'root',
      fields: 'id, parents',
    })

    const requests = buildRequests(title, questions, answers)

    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: fileId,
      requestBody: { requests },
    })

    const file = await drive.files.get({
      fileId,
      fields: 'webViewLink',
    })

    return file.data.webViewLink || ''
  } catch (error) {
    console.error('Error creating spreadsheet:', error)
    throw error
  }
}

function buildRequests(
  title: string,
  questions: string[],
  answers: boolean[]
): sheets_v4.Schema$Request[] {
  const requests: sheets_v4.Schema$Request[] = []

  requests.push({
    mergeCells: {
      range: {
        sheetId: 0,
        startRowIndex: 0,
        endRowIndex: 1,
        startColumnIndex: 1,
        endColumnIndex: 4,
      },
      mergeType: 'MERGE_ALL',
    },
  })

  requests.push({
    repeatCell: {
      range: {
        sheetId: 0,
        startRowIndex: 0,
        endRowIndex: 1,
        startColumnIndex: 1,
        endColumnIndex: 4,
      },
      cell: {
        userEnteredValue: { stringValue: title },
        userEnteredFormat: {
          backgroundColor: { red: 0.5, green: 0.5, blue: 1 },
          horizontalAlignment: 'CENTER',
          textFormat: { bold: true, fontSize: 12 },
        },
      },
      fields:
        'userEnteredValue,userEnteredFormat(backgroundColor,horizontalAlignment,textFormat)',
    },
  })

  const headers: Header[] = [
    { text: '№', color: { red: 1, green: 1, blue: 1 } },
    {
      text: 'Наименование параметра',
      color: { red: 0.95, green: 0.95, blue: 0.95 },
    },
    { text: 'Без отклонений', color: { red: 0.1, green: 1, blue: 0.1 } },
    {
      text: 'Отклонение зафиксировано',
      color: { red: 1, green: 0.1, blue: 0.1 },
    },
  ]

  headers.forEach((header, index) => {
    requests.push({
      repeatCell: {
        range: {
          sheetId: 0,
          startRowIndex: 1,
          endRowIndex: 2,
          startColumnIndex: index,
          endColumnIndex: index + 1,
        },
        cell: {
          userEnteredFormat: {
            horizontalAlignment: 'CENTER',
            textFormat: { bold: true },
          },
          userEnteredValue: { stringValue: header.text },
        },
        fields:
          'userEnteredFormat(horizontalAlignment,textFormat),userEnteredValue',
      },
    })

    requests.push({
      updateCells: {
        range: {
          sheetId: 0,
          startRowIndex: 1,
          endRowIndex: 2,
          startColumnIndex: index,
          endColumnIndex: index + 1,
        },
        fields: 'userEnteredFormat.backgroundColor',
        rows: [
          {
            values: [
              {
                userEnteredFormat: { backgroundColor: header.color },
              },
            ],
          },
        ],
      },
    })
  })

  const values = questions.map((question, index) => {
    const isGreen = answers[index]
    const answer = isGreen ? 'Исправно' : 'Неисправно'

    return [
      { userEnteredValue: { numberValue: index + 1 } },
      { userEnteredValue: { stringValue: question } },
      { userEnteredValue: { stringValue: isGreen ? answer : null } },
      { userEnteredValue: { stringValue: isGreen ? null : answer } },
    ]
  })

  requests.push({
    updateCells: {
      range: {
        sheetId: 0,
        startRowIndex: 2,
        endRowIndex: 2 + questions.length,
        startColumnIndex: 0,
        endColumnIndex: 4,
      },
      fields: '*',
      rows: values.map((row) => ({ values: row })),
    },
  })

  values.forEach((row, index) => {
    const isGreen = row[2].userEnteredValue?.stringValue !== null
    const columnIndex = isGreen ? 2 : 3

    requests.push({
      repeatCell: {
        range: {
          sheetId: 0,
          startRowIndex: 2 + index,
          endRowIndex: 3 + index,
          startColumnIndex: columnIndex,
          endColumnIndex: columnIndex + 1,
        },
        cell: {
          userEnteredFormat: {
            backgroundColor: {
              red: isGreen ? 0.1 : 1,
              green: isGreen ? 1 : 0.1,
              blue: 0.1,
            },
          },
        },
        fields: 'userEnteredFormat.backgroundColor',
      },
    })
  })

  return requests
}

export default createSpreadsheet
