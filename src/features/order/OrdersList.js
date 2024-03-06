import { useEffect, useState } from "react";
import { getAllOrdersFromServer, updateOrderInServer } from "./orderApi";
import { useDispatch, useSelector } from "react-redux";
import * as React from 'react';
import Switch from '@mui/material/Switch';
import { Box, CircularProgress, FormControlLabel, Paper, Slide, Grid, Typography, AlertTitle, FormGroup, Alert, Divider, LinearProgress } from "@mui/material";




const OrdersList = () => {


    const [ordersArr, setOrdersArr] = useState([]);

    let currentUser = useSelector(state => state.user.currentUser);

    let u = localStorage.getItem('myUser');
    let user = JSON.parse(u);

    useEffect(() => {
        const getOrdersFromServerToArr = async () => {
            try {
                let res = await getAllOrdersFromServer(user.token);
                setOrdersArr(res.data);
            } catch (err) {
                console.log(err);
                alert(err.response.data);
            }
        };
        getOrdersFromServerToArr();
    }, []);










    const [showAlert, setShowAlert] = useState(false);


    const sendOrder = async (e, id) => {//אמורה לשלוח הזמנה לזמן כאן פונקציה מהשרת
        setShowAlert(true);

        setTimeout(() => {
            setShowAlert(false);

        }, 2000);
        try {
            let res = await updateOrderInServer(id, currentUser?.token)
            console.log(res);
        }
        catch (err) {
            console.log(err);
            // alert(err.response.data)

        }
    }




    return (
        <> 

            {!ordersArr.length ? (
                <Box sx={{ width: '100%' ,marginTop:"15vh"}}>
                    <LinearProgress  sx={{marginBottom:"40vh"}} color="inherit" />
                </Box>

            ) : (
                <>
                    <Slide direction="down" in={showAlert} mountOnEnter unmountOnExit >
                        <Alert severity="success" style={{ width: '20%', margin: '0 auto', textAlign: 'center', marginTop: "13vh" }}>
                            <AlertTitle>ההזמנה יצאה לדרך</AlertTitle>
                        </Alert>
                    </Slide>

                    <Paper sx={{ width: "110ch", margin: "auto", mt: 7, padding: "20px", marginTop: "20vh" ,marginBottom:"20vh"}}>
                        <Box sx={{ textAlign: "center" }}>

                            <Typography variant="h5" sx={{ marginBottom: "3vh" }}>הזמנות</Typography>

                            <>
                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
                                    <Typography variant="body1" sx={{ width: '220px' }}>שליחת הזמנה</Typography>
                                    <Typography variant="body1" sx={{ width: '220px' }}>רחוב</Typography>
                                    <Typography variant="body1" sx={{ width: '220px' }}>עיר</Typography>
                                    <Typography variant="body1" sx={{ width: '220px' }}>קוד מזמין</Typography>
                                </Box>
                                <Divider sx={{ marginBottom: "4vh" }} />
                                {ordersArr.map(item => (
                                    <FormGroup key={item._id}>
                                        <Grid container spacing={2}>
                                            <Grid item xs={3}>
                                                <FormControlLabel
                                                    control={<Switch onChange={(e) => sendOrder(e.target.checked, item._id)} />}//checked={item.isOrderSent}
                                                    label={
                                                        <>

                                                        </>
                                                    }
                                                />
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="body1">{item.address.street}</Typography>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Typography variant="body1">{item.address.city}</Typography>
                                            </Grid>

                                            <Grid item xs={3}>
                                                <Typography variant="body1">{item._id}</Typography>
                                            </Grid>


                                        </Grid>
                                    </FormGroup>
                                ))}
                            </>

                        </Box>
                    </Paper>
                </>
            )}

        </>
    );
}

export default OrdersList;


