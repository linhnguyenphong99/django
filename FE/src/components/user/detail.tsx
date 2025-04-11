"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRightIcon, ArrowLeftIcon } from "@radix-ui/react-icons";

export default function UserDetailContent() {
  const [userInfo, setUserInfo] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    password: "********",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [userHistory, setUserHistory] = useState([
    { id: 1, action: "Updated profile information", date: "2023-10-01" },
    { id: 2, action: "Changed password", date: "2023-09-15" },
    { id: 3, action: "Logged in", date: "2023-10-05" },
    { id: 4, action: "Logged out", date: "2023-10-06" },
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selected, setSelected] = useState("userInfo");

  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    try {
      console.log("User updated:", userInfo);
    } catch (err) {
      setError("Failed to update user information.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    setLoading(true);
    setError("");
    try {
      console.log("Password changed:", newPassword);
    } catch (err) {
      setError("Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowUserInfo = () => {
    setSelected("userInfo");
  };

  const handleShowUserHistory = () => {
    setSelected("userHistory");
  };

  const handleShowChangePassword = () => {
    setNewPassword("newPassword");
    setSelected("changePassword");
  };

  const IconClose = () => <ArrowLeftIcon className="w-4 h-4" />;
  const IconOpen = () => <ArrowRightIcon className="w-4 h-4" />;

  return (
    <div className="flex space-x-6">
      <div className={`relative ${sidebarOpen ? 'w-1/4 p-6 bg-white from-blue-200 to-purple-200 rounded-lg shadow-lg transition-transform transform' : ''}`}>
        <div
          className="mb-4 p-2 bg-toolify-purple text-white rounded cursor-pointer max-w-[35px]"
          onClick={() => setSidebarOpen(prev => !prev)}
        >
          {sidebarOpen ? <IconClose /> : <IconOpen />}
        </div>
        {sidebarOpen && (
          <ul className="space-y-4">
            <li className="border-b border-gray-400 pb-2">
              <span
                className={`cursor-pointer text-left text-gray-700 hover:text-toolify-purple transition-colors duration-200 font-semibold p-2 rounded ${selected === 'userInfo' ? 'text-toolify-purple' : ''}`}
                onClick={handleShowUserInfo}
                onMouseDown={(e) => e.preventDefault()} // Prevent text selection
              >
                User Information
              </span>
            </li>
            <li className="border-b border-gray-400 pb-2">
              <span
                className={`cursor-pointer text-left text-gray-700 hover:text-toolify-purple transition-colors duration-200 font-semibold p-2 rounded ${selected === 'userHistory' ? 'text-toolify-purple' : ''}`}
                onClick={handleShowUserHistory}
                onMouseDown={(e) => e.preventDefault()} // Prevent text selection
              >
                User History
              </span>
            </li>
            <li className="border-b border-gray-400 pb-2">
              <span
                className={`cursor-pointer text-left text-gray-700 hover:text-toolify-purple transition-colors duration-200 font-semibold p-2 rounded ${selected === 'changePassword' ? 'text-toolify-purple' : ''}`}
                onClick={handleShowChangePassword}
                onMouseDown={(e) => e.preventDefault()} // Prevent text selection
              >
                Change Password
              </span>
            </li>
          </ul>
        )}
      </div>
      <div className={`p-6 bg-white rounded-lg shadow-md ${sidebarOpen ? 'w-3/4' : 'w-full'}`}>
        {selected === "userInfo" && (
          <div>
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold mb-6">User Information</h2>
              <Button onClick={handleShowUserInfo} className="ml-4">
              Edit
            </Button>
          </div>
          <div className="mb-6">
            <p className="text-gray-700">Name: {userInfo.name}</p>
            <p className="text-gray-700">Email: {userInfo.email}</p>
          </div>
          </div>
        )}
        {selected === "changePassword" && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            {error && <div className="text-red-500 mb-4">{error}</div>}
            <Input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <Button onClick={handleChangePassword} disabled={loading} className="w-full mt-4">
              {loading ? "Changing..." : "Change Password"}
            </Button>
          </div>
        )}
        {selected === "userHistory" && (
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">User History</h2>
            <ul className="space-y-2">
              {userHistory.map((item) => (
                <li key={item.id} className="border-b border-gray-300 pb-2 flex justify-between items-center">
                  <span className="text-gray-500 text-sm flex-2">{item.date}</span>
                  <span className="text-gray-700 text-left flex-4">{item.action}</span>
                  <a href={`/user/history/${item.id}`} className="text-toolify-purple hover:underline flex-2">Details</a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
