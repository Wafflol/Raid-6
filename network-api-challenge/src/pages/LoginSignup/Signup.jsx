import { Typography, Stack, TextField, Button } from '@mui/material';
import { useMemo } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import styles from './LoginSignup.module.css';

export const Signup = () => {

  const schema = useMemo(
    () =>
      yup.object({
        firstName: yup
            .string()
            .required(),
        lastName: yup
            .string()
            .required(),
        phoneNumber: yup
            .string()
            .required(),
        image: yup.mixed(),
      }),
    []
  );

  const form = useFormik({
    initialValues: {
        firstName: '',
        lastName: '',
        phoneNumber: '',
        image: null
    },
    validationSchema: schema,
    onSubmit: async () => {
      console.log("sent");
    },
});

  return (
    <Stack className={styles.signup}>
      <Typography className={styles.textFont} variant='h1'>VerifI</Typography>
      <Typography className={styles.textFont} variant='h4'>Sign. Seal. Secure.</Typography>
      <form className={styles.inputForm} onSubmit={form.handleSubmit}>
        <TextField
          name="firstName"
          placeholder='First Name'
          size='medium'
          variant='outlined'
          value={form.values.firstName}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.touched.firstName) && Boolean(form.errors.firstName)}
          fullWidth
        />
        <TextField
          name="lastName"
          placeholder='Last Name'
          size='medium'
          variant='outlined'
          value={form.values.lastName}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.touched.lastName) && Boolean(form.errors.lastName)}
          fullWidth
        />
        <TextField
          name="phoneNumber"
          placeholder='Phone #'
          size='medium'
          variant='outlined'
          value={form.values.phoneNumber}
          onChange={form.handleChange}
          onBlur={form.handleBlur}
          error={Boolean(form.touched.phoneNumber) && Boolean(form.errors.phoneNumber)}
          fullWidth
        />
        <div>
          <input onChange={(e) => form.setFieldValue('image', e.currentTarget.files[0])} type="file" accept="image/*"></input>
        </div>
        <Button type='submit' variant='contained'>
          Submit
        </Button>
      </form>
      <Typography variant='p'>Have an account <a href='/login'>login</a></Typography>
    </Stack>
  )
}
