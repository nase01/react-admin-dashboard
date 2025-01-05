import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GITHUB_CLIENT_REPO } from "@/lib/utils";
import { useGetLatestVersion } from "@/lib/react-query/queries";

const Version = () => {
	const [latestVersion, setLatestVersion] = useState("");

	const { data: tag } = useGetLatestVersion(GITHUB_CLIENT_REPO);

	useEffect(() => { 
		setLatestVersion(tag)
  }, [tag]);

  return (
		<Link to="/about/releases" className="shad-link font-bold">
			{latestVersion}
		</Link>
  )
}

export default Version