import UserForm from "../forms/UserForm"

const UsersCreate = () => {
  return (
    <div className="p-4">
      <h2 className="font-bold text-slate-900 text-2xl">Create User</h2>
      <div className="mt-3 max-w-[500px]">
        <UserForm />
      </div>
    </div>
  )
}

export default UsersCreate