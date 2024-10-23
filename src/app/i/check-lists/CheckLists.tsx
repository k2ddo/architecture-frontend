'use client'

import CheckListItem from '@/components/ui/check-lists/CheckListItem'

export default function CheckLists() {
  return (
    <div className="w-3/4">
      <CheckListItem name="Чек-листы" type="check_list" />
      <CheckListItem name="Сметы" type="estimate" />
    </div>
  )
}
