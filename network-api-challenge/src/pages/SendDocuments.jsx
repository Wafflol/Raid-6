import { Button, Stack, Typography, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, Select, MenuItem, TextField  } from '@mui/material'
import React, { useState, useMemo, useContext } from 'react'
import { sendDocument } from '../api/apiRequests';
import styles from './SendDocuments.module.css'
import * as yup from 'yup';
import { useFormik } from 'formik';
import ArticleIcon from '@mui/icons-material/Article';
import { AppContext } from '../context/appContexts';
import CreateIcon from '@mui/icons-material/Create';

export const SendDocuments = (props) => {

  const {setAddSignButton} = useContext(AppContext);

  const [fileName, setFileName] = useState(null);
  const [base64, setBase64] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState(false);
  const [fileNotThere, setFileNotThere] = useState(false);

  const dummyArray = [];
  for (let i = 0; i < 16; i++) {
    if (i == 0) {
      dummyArray.push(["Document " + (i + 1), true]);
    } else {
      dummyArray.push(["Document " + (i + 1), false]);
    }
  }

    const handleClickOpen = () => {
      setOpenDialog(true);
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

  const handleNavigate = () => {
    setAddSignButton(false);
    props.switchPage("/home/viewer");
  }

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
        console.log(fileName);
        if (!fileName) {
          setError("A document to sign is required");
          return;
        }
        const response = await sendDocument({fileName: fileName, encodedFile: base64, phoneNumber: phoneNumber, expiryDate: date, location: location});
        if (response) {
          form.resetForm();
          setFileName(null);
          setBase64(null);
          handleClose();
        } else {
          setError("an error occurred");
        }
      },
  });

  return (
    <Stack className={styles.mainContainer}>
      <Stack sx={{height: '100px'}}>
        <Button variant='contained' sx={{bgcolor: 'black', position: 'fixed', top: '70px', right: '31%'}} type='submit' onClick={handleClickOpen}>
          New Document
        </Button>
      </Stack>
      <Stack spacing={4} className={styles.gridContainer}>
        <div className={styles.grid}>
          {dummyArray.map((doc, i) => {return (
            <Stack className={styles.gridItem}>
              <Stack direction='row' spacing={2}>
                <Typography>{doc[0]}</Typography>
                {doc[1] && <CreateIcon sx={{ color: 'rgb(24, 119, 242)'}}/>}
              </Stack>
              <ArticleIcon style={{width: '70%', height: '100%'}} onClick={handleNavigate}/>
            </Stack>
          )})}
        </div>
    </Stack>
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
                <div>
                  <input onChange={handleFileChange} type="file" accept="application/pdf"/>
                </div>
                </form>
                <Typography sx={{color: 'red'}}>{error}</Typography>
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
