export interface ICheckListQuestions {
  name: string
  questions: string[]
}

export interface ICheckList {
  title: string
  answers: boolean[]
}

export interface createSpreadsheetResponse {
  url: string
}

export interface createSpreadsheetArgs {
  title: string
  questions: string[]
  answers: boolean[]
}
