import * as yup from 'yup';
import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

import { addUserToServer } from '../Api/userService';
import { useDispatch } from 'react-redux';
import { loginState } from '../features/userSlice';
import CustomTextField from '../components/CustomTextField';
import LoginGoogle from '../components/LoginGoogle';
import Swal from 'sweetalert2';
import { sendMailToServer } from '../Api/emailService';
import { getSignUpEmail } from '../utils/email/emailMessages';

const SignUp = () => {

  let dispatch = useDispatch();


  let validationSchema = yup.object().shape({
    userName: yup.string().min(3, "שם משתמש חייב להכיל לפחות 3 תוים").required('שדה חובה'),
    password: yup.string()
      .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'סיסמה חייבת להכיל לפחות אות וספרה אחת ולפחות באורך 6 תוים')
      .required('שדה חובה'),
    email: yup.string().email('יש להזין מייל חוקי').required('שדה חובה'),
    address: yup.object().shape({
      street: yup.string().required('שדה חובה'),
      city: yup.string().required('שדה חובה'),
    }).required('שדה חובה'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      let res = await addUserToServer(data);
      console.log(data);
      dispatch(loginState(res.data))
      await sendMailToServer(getSignUpEmail(data.email, data.userName));

      Swal.fire({
        icon: 'success', title: 'נרשמת בהצלחה', showConfirmButton: false, timer: 1500
      })
    } catch (err) {
      console.log(errors);
      alert(err.response.data);
    }
  };

  return (
    <>
      <div className="login-form">
        <h2 className='form-h2' style={{ marginTop: "20vh" }}>הרשמה</h2>

        <h4 className='form-h4'>נא למלא את הפרטים שלהלן</h4>
        <LoginGoogle flag='signUp' />
        <form onSubmit={handleSubmit(onSubmit)} >
          <div className="login-form">

            <CustomTextField label={'אימייל'} errors={errors} register={register} field={'email'} />
            <CustomTextField label={'שם משתמש'} errors={errors} register={register} field={'userName'} />
            <CustomTextField label={'סיסמה'} errors={errors} register={register} field={'password'} />
            <CustomTextField label={'עיר'} errors={errors} register={register} field={'address.city'} defaultValue={''} />
            <CustomTextField label={'רחוב'} errors={errors} register={register} field={'address.street'} defaultValue={''} />

            <button type="submit" className="base-hover-button more-hover-button" >צור חשבון</button>
            <h4 className='form-h4'> יש לך חשבון ? <a className="signup-link" href='/login/'  >כניסה </a></h4>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUp;
