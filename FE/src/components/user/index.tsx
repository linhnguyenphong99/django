"use client";

import { useState } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@radix-ui/react-icons";
import UserInfo from "./info";
import ChangePassword from "./change-password";
import History from "./history";
import Sidebar from "./sidebar";

export default function UserContent() {
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
    console.log("handleShowUserInfo");
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
          <Sidebar selected={selected} handleShowUserInfo={handleShowUserInfo} handleShowUserHistory={handleShowUserHistory} handleShowChangePassword={handleShowChangePassword} />
        )}
      </div>
      <div className={`p-6 bg-white rounded-lg shadow-md ${sidebarOpen ? 'w-3/4' : 'w-full'}`}>
        {selected === "userInfo" && (
          <UserInfo userInfo={userInfo} handleShowUserInfo={handleShowUserInfo} />
        )}
        {selected === "changePassword" && (
          <ChangePassword error={error} newPassword={newPassword} setNewPassword={setNewPassword} handleChangePassword={handleChangePassword} loading={loading} />
        )}
        {selected === "userHistory" && (
          <History userHistory={userHistory} />
        )}
      </div>
    </div>
  );
}
