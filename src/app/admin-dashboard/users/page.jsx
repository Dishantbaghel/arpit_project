"use client";
import AddUserForm from "@/components/AddUserForm";
import UsersTable from "@/components/UsersTable";
import { Button } from "@mui/material";
import React, { useState } from "react";

export default function Users() {
  const [showModal, setShowModal] = useState(false);
  return (
    <div>
      <div className="mb-4">
        <Button
          onClick={() => setShowModal(!showModal)}
          variant="contained"
          sx={{
            backgroundColor: "#1E3A8A",
            "&:hover": {
              backgroundColor: "#162F63",
            },
          }}
        >
          Add User
        </Button>
      </div>
      <div>
        {showModal && (
          <AddUserForm showModal={showModal} setShowModal={setShowModal} />
        )}
      </div>
      <UsersTable />
    </div>
  );
}
