import { Button, Dialog, Stack, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { verifySignature } from "../../api/apiRequests";
import { AppContext } from "../../context/appContexts";

export const Viewer = () => {

  const {addSignButton, doc} = useContext(AppContext);

  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOnClose = () => {
    setOpen(false);
  }

  const handleSign = async () => {
    const response = await verifySignature({phoneNumber: "14372325393"});
    if (response) {
      setError(false);
      handleClickOpen();
    } else {
      setError(true);
    }
  }

  return (
    <Stack>
      {addSignButton && <Button variant="contained" sx={{borderRadius: '0 0 4px', position: 'fixed', top: '57px'}} onClick={handleSign}>Sign Document</Button>}
      <Stack style={{ height: '100vh', width: '100vw', overflow: 'hidden', }}> {/* Overflow hidden on parent Stack */}
        <iframe
          src={doc}
          title="PDF Viewer"
          style={{ width: '100%', height: '100%', border: 'none', padding: doc === "https://drive.google.com/file/d/1ORUFcb1RF4RW-s1wBrBQI8S-OYx7fqlD/preview" ? '57px 0 60px 0' : '100px 0 60px 0' }} // Set border to none to avoid extra spacing
        />
      </Stack>
      <Dialog
        open={open}
        onClose={handleOnClose}
        PaperProps={{ sx: {bgcolor: 'transparent', boxShadow: 'none'} }}
      >
        {error ? <Typography sx={{color: 'red', fontFamily: "Archivo Black", filter: 'brightness(1.75)'}}>Verification failed. Please go to the required location</Typography> : <Typography sx={{color: 'green', fontFamily: "Archivo Black", filter: 'brightness(1.75)'}}>Successfully Signed Document</Typography>}
      </Dialog>
    </Stack>
  );
};