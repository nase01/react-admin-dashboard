import { Outlet } from "react-router-dom"

const ErrorLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen w-full">
			<Outlet />
    </div>
  )
}

export default ErrorLayout