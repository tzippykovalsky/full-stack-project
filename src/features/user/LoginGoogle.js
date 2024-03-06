
import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { loginState } from './userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { sendMailToServer, signInUserToServer, signInWithGoogleToServer, signUpWithGoogleToServer } from './userApi';
import { AlertTitle, Alert, Slide } from '@mui/material';


function LoginGoogle({ flag }) {
    const [user, setUser] = useState([]);
    const [profile, setProfile] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    let currentUser = useSelector((state) => state.user.currentUser)
    let dispatch = useDispatch();




    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log('Login Failed:', error),
    });


    useEffect(
        () => {
            if (user) {
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                        headers: {
                            Authorization: `Bearer ${user.access_token}`,
                            Accept: 'application/json'
                        }
                    })
                    .then((res) => {
                        setProfile(res.data);//אותה בעיה כמו רשימת ההזמנות
                        onSubmit();
                    }).catch((err) => console.log(err));
            }
        }, [user]
    );

    // log out function to log the user out of google and set the profile array to null
    const logOut = () => {
        googleLogout();
        setProfile(null);
    };

    const onSubmit = async () => {
        try {
            let res

            if (flag == 'signUp') {
                res = await signUpWithGoogleToServer({
                    email: profile.email,
                    userName: profile.name
                })
            }
            else {
                res = await signInWithGoogleToServer({
                    email: profile.email
                })
            }

            console.log(res);
            res.data.profile = profile;
            dispatch(loginState(res.data))
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 2000);
            if (flag == 'signUp')
                await sendMailToServer({ to: `${profile.email}`, subject: "שמחים על הצטרפותך לאתר", text: `${profile.name} תודה שיצרת חשבון באתר שלנו` })

        }
        catch (err) {
            console.log(err);
            alert(err.response.data);
        }
    }



    return (
        <>
            {/* // {currentUser.profile ? ( */}
            {/* <div> */}
            {/* <img src={profile.picture} alt="user image" />  */}
            {/* <h3>User Logged in</h3>
        //         <p>Name: {profile.name}</p>
        //         <p>Email Address: {profile.email}</p>
        //         <br />
        //         <br /> */}
            {/* <button onClick={logOut} className='google-button'>Log out</button>     */}
            {/* </div> */}
            {/* // ) : ( */}

            <Slide direction="left" in={showAlert} mountOnEnter unmountOnExit >
                <Alert severity="success" style={{ width: '20%', margin: '0 auto', textAlign: 'center'}}>
                    <AlertTitle>החברת עם גוגל בהצלחה</AlertTitle>
                </Alert>
            </Slide>
            <div >
                <button onClick={login} className='google-button'>
                    <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSO0u4dr5oCgDbhigc4GH5o4PMEZGwVaHabRg&usqp=CAU' className='google-icon' />Sign in with Google
                </button>

            </div>
        </>
    );
}

export default LoginGoogle;