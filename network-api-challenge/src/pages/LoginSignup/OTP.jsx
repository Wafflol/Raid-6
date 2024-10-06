import React, { useState, useRef } from 'react';
import { Typography, Stack } from '@mui/material';
import styles from './LoginSignup.module.css';

export const OTP = ({ length = 6 }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));
  const inputs = useRef([]);

  const handleChange = (e, index) => {
    const { value } = e.target;

    if (value.match(/^\d$/)) {
      const newOtp = [...otp];

      if (newOtp.every((digit) => digit !== '')) {
          handleSubmit(newOtp);
      }

      newOtp[index] = value;
      setOtp(newOtp);

      if (index < length - 1) {
        inputs.current[index + 1].focus();
      }
    }

    if (value === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
      if (e.key === 'Backspace') {
          const newOtp = [...otp];

          if (otp[index] !== '') {
            newOtp[index] = '';
            setOtp(newOtp);
          } else if (index > 0) {
            inputs.current[index - 1].focus();
            newOtp[index - 1] = '';
            setOtp(newOtp);
          }
      }
  };

  const handleSubmit = (otp) => {
      console.log("otp");
  };

  return (
    <Stack className = {styles.signup}>
        <Typography className={styles.textFont} variant='h1'>VerifI</Typography>
        <Typography className={styles.textFont} variant='h4'>Sign. Seal. Secure.</Typography>
        <Typography clasName={styles.textFont} variant = 'body1'>Enter the one-time password (OTP) sent to your phone.</Typography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
              {otp.map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={otp[index]}
                  onChange={(e) => handleChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={(el) => (inputs.current[index] = el)}
                  style={{
                    width: '40px',
                    height: '40px',
                    margin: '0 5px',
                    textAlign: 'center',
                    fontSize: '18px',
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                  }}
                />
              ))}
            </div>
    </Stack>
    )
}
