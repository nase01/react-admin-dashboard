import { Button } from "@/components/ui/button"
import { ArrowLeftCircle } from "lucide-react"

const releases = () => {
  return (
    <>
			<h1 className="text-lg font-bold">Version Releases</h1>
			<p className="mt-3">Page are still on development, Please comeback later.</p>
			<div className="mt-10">
				<Button size="sm" onClick={() => window.history.back()}>
						<ArrowLeftCircle className="mr-2" size={16} /> Back
				</Button>
			</div>
    </>
  )
}

export default releases