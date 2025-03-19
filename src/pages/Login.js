
import * as yup from 'yup';
import React, { useEffect, useState } from 'react';
import '../styles/login.css';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { sendMailToServer, signInUserToServer } from '../Api/userService';
import { FilledInput, FormControl, IconButton, InputAdornment, InputLabel, Link, OutlinedInput, TextField, Typography } from '@mui/material';
import { useDispatch } from 'react-redux';
import { loginState } from '../features/userSlice';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import CustomTextField from '../components/CustomTextField';
import { useNavigate } from 'react-router-dom';
import LoginGoogle from '../components/LoginGoogle';
import Swal from 'sweetalert2';

const Login = () => {

  let dispatch = useDispatch();
  let navigate = useNavigate()
  let validationSchema = yup.object().shape({
    password: yup.string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'סיסמה חייבת להכיל לפחות אות וספרה אחת ולפחות באורך 6 תוים')
      .required('שדה חובה'),
    email: yup.string().email('יש להזין מייל חוקי').required('שדה חובה'),

  });


  const [showPassword, setShowPassword] = React.useState(false);
  // const [showAlert, setShowAlert] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };



  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });



  const onSubmit = async (data) => {
    try {
      let res = await signInUserToServer(data)
      dispatch(loginState(res.data))

      Swal.fire({
        icon: 'success', title: 'התחברת בהצלחה', showConfirmButton: false, timer: 1500
      })
      // setShowAlert(true);
      // setTimeout(() => {
      //   setShowAlert(false);
      // }, 2000);
    }
    catch (err) {

      console.log(errors);
      alert(err.response.data);

    }

  }
  return (
    <>
{/* 
      <Slide direction="left" in={showAlert} mountOnEnter unmountOnExit >
        <Alert severity="success" style={{ width: '20%', margin: '0 auto', textAlign: 'center', marginTop: "13vh" }}>
          <AlertTitle> התחברת בהצלחה</AlertTitle>
        </Alert>
      </Slide> */}
      <div className="login-form">
        <h2 className='form-h2' style={{ marginTop: "26vh" }}>כניסה</h2>
        <h4 className='form-h4'>הזן את כתובת הדוא"ל והסיסמה לכניסה</h4>

        <LoginGoogle flag='signIn' />

        <form onSubmit={handleSubmit(onSubmit)} style={{ marginBottom: "250px" }}>
          <div className="login-form">
            <CustomTextField label={'אימייל'} errors={errors} register={register} field={'email'} />
            <CustomTextField label={'סיסמה'} errors={errors} register={register} field={'password'} />
            <button type="submit" className="base-hover-button more-hover-button" >כניסה</button>
            <h4 className='form-h4'> אין לך חשבון ? <a className="signup-link" href='/signup/'  >הרשמה </a></h4>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;













