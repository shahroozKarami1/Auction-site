import { AccountCircle } from "@mui/icons-material";
import React from "react";

const AccountAdminName = () => {
  return (
    <div>
      <div className="p-2 px-4 rounded-3xl h-10 bg-background flex items-center space-x-2">
        <AccountCircle style={{ marginLeft: "-6px" }} />
        <span>Ramin Eslami</span>
      </div>
    </div>
  );
};

export default AccountAdminName;
