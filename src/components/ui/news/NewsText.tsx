interface IProps {
  text: string
}

export default function NewsText({ text }: IProps) {
  return (
    text && (
      <div className="text-white whitespace-pre-line text-[17px]">{text}</div>
    )
  )
}
