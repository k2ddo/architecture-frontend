interface IProps {
  title: string
}

export default function NewsTitle({ title }: IProps) {
  return (
    <div className="bg-orange rounded-[20px] w-fit mb-2">
      <div className="p-4">
        <h2 className="font-semibold text-[20px] text-white">{title}</h2>
      </div>
    </div>
  )
}
