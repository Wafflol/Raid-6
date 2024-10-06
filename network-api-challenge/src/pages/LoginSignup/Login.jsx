import { Typography, Stack, TextField, Button } from '@mui/material';
import { useMemo, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import styles from './LoginSignup.module.css';
import { login } from '../../api/apiRequests';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const navigate = useNavigate();
    const [loginFailed, setLoginFailed] = useState(false);

  const schema = useMemo(
    () =>
      yup.object({
        phoneNumber: yup
            .string()
            .required(),
      }),
    []
  );

  const form = useFormik({
    initialValues: {
        phoneNumber: '',
    },
    validationSchema: schema,
    onSubmit: async (values) => {
      const isAuthenticated = await login(values);
      console.log(isAuthenticated);
      if (isAuthenticated === true) {
        navigate('/home');
      } else {
          setLoginFailed(true);
      }
    },
});

  return (
    <Stack className={styles.signup}>
      <Typography className={styles.textFont} variant='h1'>VerifI</Typography>
      <Typography className={styles.textFont} variant='h4'>Sign. Seal. Secure.</Typography>
      <form className={styles.inputForm} onSubmit={form.handleSubmit}>
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
        <Button sx={{backgroundColor: 'black' }} type='submit' variant='contained'>
          Submit
        </Button>
      </form>
      {loginFailed && <Typography className={styles.errorText} variant='p' >Phone number does not match device phone number!</Typography>}
      <Typography variant='p'>Don't have an account <a href='/signup'>sign up</a></Typography>
    </Stack>
  )
}
