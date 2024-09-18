export default function Tooltip({ message, children }) {
  return (
    <div className="group relative flex">
			{children}
			<span className="absolute top-11 -right-11 scale-0 transition-all  -translate-x-3 rounded-md p-2  bg-indigo-50 dark:bg-slate-900 text-indigo-800 dark:text-white z-50 text-sm group-hover:scale-100 whitespace-nowrap">{message}</span>
    </div>
  )
}