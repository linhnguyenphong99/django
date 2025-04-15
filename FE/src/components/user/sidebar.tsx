const Sidebar = ( params: any) => {
  const { selected, handleShowUserInfo, handleShowUserHistory, handleShowChangePassword } = params;

  return (
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
  );
}

export default Sidebar;