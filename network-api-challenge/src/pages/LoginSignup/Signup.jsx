import { Typography, Stack, TextField, Button } from '@mui/material';
import { useContext, useMemo, useState } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import styles from './LoginSignup.module.css';
import { register } from '../../api/apiRequests';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/appContexts';
import Logo from './logo.png'

export const Signup = () => {

  const navigate = useNavigate();
  const [error, setError] = useState(false);
  const { setIsLoggedIn } = useContext(AppContext);

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
    onSubmit: async (values) => {
      const response = await register(values);
      if (response) {
        setIsLoggedIn(true);
        navigate('/home');
      } else {
        setError(true);
      }
    },
});

  return (
    <Stack className={styles.signup}>
      <img src={Logo} style={{width: '160px', height: '150px', position: 'fixed', top: '20px'}}/>
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
        <Button sx={{backgroundColor: 'black' }} type='submit' variant='contained'>
          Submit
        </Button>
      </form>
      {error && <Typography variant='p' sx={{color: 'red'}}>There was an error while trying to sign up</Typography>}
      <Typography variant='p'>Have an account <a href='/'>login</a></Typography>
    </Stack>
  )
}
