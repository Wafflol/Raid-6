import { Button, Stack, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, Select, MenuItem, TextField  } from '@mui/material'
import React, { useState, useMemo } from 'react'
import { sendDocument } from '../api/apiRequests';
import styles from './SendDocuments.module.css'
import * as yup from 'yup';
import { useFormik } from 'formik';

export const SendDocuments = () => {

  const [fileName, setFileName] = useState(null);
  const [base64, setBase64] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(false);
  const [fileNotThere, setFileNotThere] = useState(false);

    const handleClickOpen = () => {
      if (fileName) {
        setOpenDialog(true);
        setFileNotThere(false);
      } else {
        setFileNotThere(true);
      }
    };

    const handleClose = () => {
      setOpenDialog(false);
    };

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

    const schema = useMemo(
      () =>
        yup.object({
          phoneNumber: yup
              .string()
              .required("field required"),
          date: yup
              .string()
              .required("field required"),
          location: yup
              .string()
              .required("field required"),
        }),
      []
    );

    const form = useFormik({
      initialValues: {
          phoneNumber: '',
          date: '',
          location: '',
      },
      validationSchema: schema,
      onSubmit: async (values) => {
        const response = await sendDocument({fileName: fileName, encodedFile: base64, phoneNumber: phoneNumber, expiryDate: date, location: location});
        if (response) {
          console.log(response);
          handleClose();
        }
      },
  });

  return (
    <Stack className={styles.mainContainer}>
      <Typography variant='h5'>To get started, upload a pdf!</Typography>
      <div>
        <input onChange={handleFileChange} type="file" accept="application/pdf"/>
      </div>
      <Button sx={{color: 'black'}} type='submit' onClick={handleClickOpen}>
        Submit
      </Button>
      {fileNotThere && <Typography sx={{color: 'red'}}>Please input a file before submitting</Typography>}
      <Dialog open={openDialog} onClose={handleClose}>
         <DialogTitle id="alert-dialog-title">{"Select Secure Form Options"}</DialogTitle>
            <DialogContent>
              <form className={styles.inputForm}>
                {/* Input Phone Number*/}
                <FormControl fullWidth>
                    <TextField
                      name="phoneNumber"
                      placeholder='Phone Number'
                      size='medium'
                      variant='outlined'
                      value={form.values.phoneNumber}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      error={Boolean(form.touched.phoneNumber) && Boolean(form.errors.phoneNumber)}
                      helperText={form.touched.phoneNumber && form.errors.phoneNumber}
                      fullWidth
                    />
                </FormControl>

                {/* Input Date*/}
                <FormControl fullWidth>
                  <TextField
                    name="date"
                    placeholder='Date'
                    size='medium'
                    variant='outlined'
                    value={form.values.date}
                    onChange={form.handleChange}
                    onBlur={form.handleBlur}
                    error={Boolean(form.touched.date) && Boolean(form.errors.date)}
                    helperText={form.touched.date && form.errors.date}
                    fullWidth
                  />
                </FormControl>

                {/* Input Location */}
                <FormControl fullWidth>
                  <TextField
                      name="location"
                      placeholder='Location'
                      size='medium'
                      variant='outlined'
                      value={form.values.location}
                      onChange={form.handleChange}
                      onBlur={form.handleBlur}
                      error={Boolean(form.touched.location) && Boolean(form.errors.location)}
                      helperText={form.touched.location && form.errors.location}
                      fullWidth
                  />
                </FormControl>
                </form>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Cancel
                </Button>
                <Button onClick={form.handleSubmit} color="primary" type='submit'>
                  Confirm
                </Button>
              </DialogActions>
      </Dialog>
    </Stack>
  )
}
