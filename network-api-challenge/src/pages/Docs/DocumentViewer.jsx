import { Button, Dialog, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { verifySignature } from "../../api/apiRequests";

export const Viewer = ({ pdfUrl }) => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOnClose = () => {
    setOpen(false);
  }

  const handleSign = async () => {
    const response = await verifySignature({phoneNumber: "1234567890"});
    if (response) {
      setError(false);
      handleClickOpen();
    } else {
      setError(true);
    }
  }

  return (
    <Stack>
      <Button variant="contained" sx={{borderRadius: '0 0 4px', position: 'fixed', top: '57px'}} onClick={handleSign}>Sign Document</Button>
      <Stack style={{ height: '100vh', width: '100vw', overflow: 'hidden'}}> {/* Overflow hidden on parent Stack */}
        <iframe
          src={pdfUrl}
          title="PDF Viewer"
          style={{ width: '100%', height: '100%', border: 'none', padding: '57px 0 60px 0'  }} // Set border to none to avoid extra spacing
        />
      </Stack>
      <Dialog
        open={open}
        onClose={handleOnClose}
        PaperProps={{ sx: {bgcolor: 'transparent'} }}
      >
        {error ? <Typography sx={{color: 'red', fontFamily: "Archivo Black"}}>Verification failed. Please go to the required location</Typography> : <Typography sx={{color: 'green', fontFamily: "Archivo Black"}}>Successfully Signed Document</Typography>}
      </Dialog>
    </Stack>
  );
};