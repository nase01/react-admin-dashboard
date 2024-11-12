import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react"
import { Button } from "./ui/button"
import { Card } from "./ui/card"
import Tooltip from "./shared/Tooltip"
import { useGetCurrentUser } from "@/lib/react-query/queries";
import { ucFirst } from "@/lib/utils";
import moment from "moment";

const UserInfo = () => {
	const navigate = useNavigate();
	const { data: currentUser, isLoading: isFetchingUserData } = useGetCurrentUser();
	
	const isFetching = isFetchingUserData;

	const defaultAvatar =  "/assets/avatars/default-avatar.png";

  return (
    <Card className="rounded-md flex justify-between align-middle p-5 bg-accent shadow-sm">
			{!isFetching && currentUser ? (
				<>
					<div className="dark:text-white flex justify-start items-top gap-5">
						<img
							src={isFetching ? "" : currentUser.imageURL?.trim() || defaultAvatar}
							className="h-14 w-auto"
							alt="avatar" />
						<div>
							<strong className=" text-xl">{currentUser.name}</strong>
							<p className="mt-2">Email: {currentUser.email}</p>
							<p>Position: {ucFirst(currentUser.role)}</p>
						</div>
					</div><div>
						<Tooltip message={"Account Settings"}>
							<Button variant="ghost" size="icon" className="rounded-full"
								onClick={() => navigate("/panel/settings/account")}
							>
								<Edit className="h-5 w-auto" />
							</Button>
						</Tooltip>
					</div>
				</>
			) : (
				<div className="animate-pulse flex justify-between gap-5">
          {/* Avatar Skeleton */}
          <div className="flex gap-5 w-auto">
            <div className="bg-gray-300 dark:bg-gray-700 rounded-full h-14 w-14"></div>
            <div className="space-y-2">
              <div className="bg-gray-300 dark:bg-gray-700 h-5 w-40 rounded"></div>
              <div className="bg-gray-300 dark:bg-gray-700 h-4 w-24 rounded mt-3"></div>
              <div className="bg-gray-300 dark:bg-gray-700 h-4 w-32 rounded"></div>
            </div>
          </div>
        </div>
			)}
    </Card>
  )
}

export default UserInfo