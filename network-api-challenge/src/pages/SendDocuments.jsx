import { Button, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { sendDocument } from '../api/apiRequests';
import styles from './SendDocuments.module.css'

export const SendDocuments = () => {

  const [fileName, setFileName] = useState(null);
  const [base64, setBase64] = useState('');

  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0]
    setFileName(file.name)
    convertToBase64(file);
  }

  const convertToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = () => {
      setBase64(reader.result);
    };
  };

  const handleUpload = async () => {
    const response = await sendDocument({fileName: fileName, encodedFile: base64});
    console.log(response);
  }

  return (
    <Stack className={styles.mainContainer}>
      <Typography variant='h5'>To get started, upload a pdf!</Typography>
      <div>
        <input onChange={handleFileChange} type="file" accept="application/pdf"/>
      </div>
      <Button sx={{color: 'black'}} type='submit' onClick={handleUpload}>
        Submit
      </Button>
    </Stack>
  )
}
