import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { loginState } from '../features/userSlice';
import CustomTextField from '../components/CustomTextField';
import { addOrderToServer } from "../api/orderService";
import { sendMailToServer } from '../api/emailService';
import { getCheckOutEmail } from '../utils/email/emailMessages';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { addArrProductToState } from '../features/orderSlice';


const Checkout = () => {

    let currentUser = useSelector((state) => state.user.currentUser);
    let cart = useSelector((state) => state.order.ordersArr, shallowEqual);//אין צורך לרנדר את הקומפוננטה בעת שינוי המערך
    let dispatch = useDispatch()
    const navigate=useNavigate();

    let validationSchema = yup.object().shape({

        userName: yup.string().min(3, "שם משתמש חייב להכיל לפחות 3 תוים").required('שדה חובה'),
        // deliveryDate: yup.date().required('יש לבחור תאריך להזמנה'),
        address: yup.object().shape({
            street: yup.string().required('שדה חובה'),
            city: yup.string().required('שדה חובה'),
        }).required('שדה חובה'),
    });

    const { register, handleSubmit, reset,formState: { errors } } = useForm({
        
        resolver: yupResolver(validationSchema),
    });


    React.useEffect(()=>{reset({email:currentUser?.email,userName:currentUser?.userName})},[currentUser])


    const onSubmit = async (data) => {
        data.deliveryDate=new Date()
        data.products = cart;
        const currentDate = new Date();
        const convenientDate = currentDate.toISOString().split('T')[0];
        try {
            let res = await addOrderToServer(data, currentUser?.token);
            console.log(res);
             await sendMailToServer(getCheckOutEmail(data.email,data.userName,convenientDate));

                Swal.fire({
                     icon: 'success', title: 'הרכישה בוצעה בהצלחה', showConfirmButton: false, timer: 1500
                   })
                   dispatch(addArrProductToState([]));
                   navigate('/')
                   
        }
        catch (err) {
            console.log(err);
            alert("נכשל");
        }
        reset();
        localStorage.removeItem("myCart");
    }



    return (<>


        <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: "250px" }}>
            <div className="login-form">
                <h2 className='form-h2'>סיום הזמנה</h2>
                <h4 className='form-h4'>נא למלא את הפרטים שלהלן</h4>
                <CustomTextField label={'אימייל'} errors={errors} register={register} field={'email'} defaultValue={currentUser?.email} />
                <CustomTextField label={'שם'} errors={errors} register={register} field={'userName'} defaultValue={currentUser?.userName} />

                <TextField label="עיר" variant="filled"
                    sx={{
                        width: "25vw", marginBottom: "15px", "& input": {
                            backgroundColor: "white",
                            border: "1px solid", color: "black", height: "1.8vh"
                        }, "& p": { color: "red" }
                    }}
                    InputProps={{ disableUnderline: true }}
                    InputLabelProps={{ style: { color: "black" } }}
                    helperText={errors.address?.city?.message}
                    {...register("address.city")} />

                <TextField  
                    label="רחוב"
                    variant="filled"
                    sx={{
                        width: "25vw",
                        marginBottom: "15px",
                        "& input": {
                            backgroundColor: "white",
                            border: "1px solid",
                            color: "black"
                            , height: "1.8vh"
                        },
                        "& p": {
                            color: "red"
                        }
                    }}
                    InputProps={{ disableUnderline: true }}
                    InputLabelProps={{ style: { color: "black" } }}
                    helperText={errors.address?.street?.message}
                    {...register("address.street")}
                />

                {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        sx={{
                            width: "25vw",
                            marginBottom: "15px",
                            '& input': {
                                backgroundColor: 'white',
                                border: '1px solid',
                                color: 'black',
                                height: '1.8vh',

                            },
                            '& p': {
                                color: 'red'
                            }
                        }}
                        renderInput={(params) => (
                            <TextField
                                {...params.inputProps}
                                helperText={errors.address?.city?.message}
                                InputProps={{ disableUnderline: true }}
                                InputLabelProps={{ style: { color: "black" } }}
                                variant="filled"
                            />
                        )}
                    />
                </LocalizationProvider> */}
                <button type="submit" className="base-hover-button more-hover-button" >לסיום ותשלום</button>
            </div>
        </form>
    </>);
}

export default Checkout;