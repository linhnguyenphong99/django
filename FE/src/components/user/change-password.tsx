import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ChangePassword = ( params: any) => {
  const { error, newPassword, setNewPassword, handleChangePassword, loading } = params;

  return (

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
  );
}

export default ChangePassword;