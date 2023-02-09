interface Props {
  title: React.ReactNode | string
  event?: () => void
  element?: React.ReactNode
}

const PopoverButton: React.FC<Props> = ({ title, event, element }) => {
  return (
    <button
      className="px-1 py-0.5 text-slate-200 border-t-slate-700 border-t text-left flex items-center last-of-type:border-b border-b-slate-700"
      onClick={event}
    >
      {title}
    </button>
  )
}

export default PopoverButton
