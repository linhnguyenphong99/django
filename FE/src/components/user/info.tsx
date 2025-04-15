import { Button } from "../ui/button";

const UserInfo = ( params: any) => {
  const { userInfo, handleShowUserInfo } = params;

  return (
    <div>
        <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-6">User Information</h2>
            <Button onClick={() => handleShowUserInfo()} className="ml-4">
                Edit
            </Button>
        </div>
        <div className="mb-6">

        <p className="text-gray-700">Name: {userInfo.name}</p>
        <p className="text-gray-700">Email: {userInfo.email}</p>
        </div>
    </div>
  );
}

export default UserInfo;