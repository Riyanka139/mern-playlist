import { Alert, Snackbar } from "@mui/material";
import React from "react";

const Toast: React.FC<{
  toast: { open: boolean; message: string; type:  "error" | "warning" | "info" | "success" },
  handleCloseToast: () => void
}> = ({ toast, handleCloseToast }) => {
  return (
    <>
      {/* Snackbar for Toast Notifications */}
      <Snackbar
        open={toast.open}
        autoHideDuration={4000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseToast}
          severity={toast.type}
          className="w-full font-semibold"
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default Toast;
