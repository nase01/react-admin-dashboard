import { useParams } from "react-router-dom";

const UserEdit = () => {
  const { id } = useParams();

  return (
    <div>Edit User: {id}</div>
  )
}

export default UserEdit