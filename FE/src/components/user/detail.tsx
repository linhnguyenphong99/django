"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function UserDetailContent() {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUpdate = async () => {
    setLoading(true);
    setError("");
    try {
      // Simulate an API call to update user information
      // await updateUser(userInfo);
      console.log("User updated:", userInfo);
    } catch (err) {
      setError("Failed to update user information.");
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async (newPassword: string) => {
    setLoading(true);
    setError("");
    try {
      // Simulate an API call to change password
      // await changeUserPassword(newPassword);
      console.log("Password changed:", newPassword);
    } catch (err) {
      setError("Failed to change password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex space-x-6">
      <div className="w-1/4 p-6 bg-gray-100 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-6">Sidebar</h2>
        <ul className="space-y-4">
          <li className="border-b border-gray-300 pb-2">
            <span className="cursor-pointer text-left text-gray-700 hover:text-toolify-purple transition-colors duration-200" onClick={() => {/* logic to show user info */}}>User Information</span>
          </li>
          <li className="border-b border-gray-300 pb-2">
            <span className="cursor-pointer text-left text-gray-700 hover:text-toolify-purple transition-colors duration-200" onClick={() => {/* logic to show history */}}>User History</span>
          </li>
          <li className="border-b border-gray-300 pb-2">
            <span className="cursor-pointer text-left text-gray-700 hover:text-toolify-purple transition-colors duration-200" onClick={() => {/* logic to show change password */}}>Change Password</span>
          </li>
        </ul>
      </div>
      <div className="w-3/4 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">User Information</h2>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="mb-6">
          <Input
            placeholder="Name"
            value={userInfo.name}
            onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <Input
            placeholder="Email"
            value={userInfo.email}
            onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
          />
        </div>
        <Button onClick={handleUpdate} disabled={loading} className="w-full">
          {loading ? "Updating..." : "Update Information"}
        </Button>
      </div>
    </div>
  );
}
