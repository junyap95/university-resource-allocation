import Alert from "@mui/material/Alert";

export default function AcceptAllocAlert({ severity, message, onClose }) {
  return (
    <>
      <Alert
        severity={severity}
        onClose={() => {
          onClose();
        }}
      >
        {message}
      </Alert>
    </>
  );
}
