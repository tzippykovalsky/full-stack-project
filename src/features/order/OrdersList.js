import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import * as React from 'react';
import { Box, Paper, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, CircularProgress } from "@mui/material";
import Swal from "sweetalert2";
import CheckCircleIcon from '@mui/icons-material/CheckCircle'; 
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty'; 
import { updateOrderInServer ,getAllOrdersFromServer} from "../../services/orderApi";

const OrdersList = () => {
    const [ordersArr, setOrdersArr] = useState([]);
    const [loading, setLoading] = useState(true);

    let currentUser = useSelector(state => state.user.currentUser);
    let user = JSON.parse(localStorage.getItem('myUser'));

    useEffect(() => {
        getOrdersFromServerToArr();
    }, []);

    const getOrdersFromServerToArr = async () => {
        try {
            let res = await getAllOrdersFromServer(user.token);
            setOrdersArr(res.data);
        } catch (err) {
            console.log(err);
            alert(err.response?.data || "שגיאה בטעינת ההזמנות");
        } finally {
            setLoading(false);
        }
    };

    const sendOrder = async (id) => {
        try {
            await updateOrderInServer(id, currentUser?.token);
            Swal.fire({
                icon: 'success', title: 'ההזמנה נשלחה בהצלחה!', showConfirmButton: false, timer: 1500
            });

            // עדכון רשימת ההזמנות לאחר שליחה
            setOrdersArr(prevOrders =>
                prevOrders.map(order =>
                    order._id === id ? { ...order, isOrderSent: true } : order
                )
            );
        } catch (err) {
            console.log(err);
            Swal.fire({
                icon: 'error', title: 'שגיאה בשליחת הזמנה', showConfirmButton: false, timer: 1500
            });
        }
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
            <Paper sx={{ width: "90%", maxWidth: "1200px", padding: "20px", textAlign: "center" }}>
                <Typography variant="h5" sx={{ marginBottom: "20px" }}>רשימת הזמנות</Typography>

                {loading ? (
                    <CircularProgress />
                ) : (
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center"><b>סטטוס</b></TableCell>
                                    <TableCell align="center"><b>כתובת</b></TableCell>
                                    <TableCell align="center"><b>עיר</b></TableCell>
                                    <TableCell align="center"><b>קוד הזמנה</b></TableCell>
                                    <TableCell align="center"><b>פעולה</b></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ordersArr.map(order => (
                                    <TableRow key={order._id}>
                                        <TableCell align="center">
                                            {order.isOrderSent ? 
                                                <CheckCircleIcon sx={{ color: "green" }} /> : 
                                                <HourglassEmptyIcon sx={{ color: "orange" }} />}
                                        </TableCell>
                                        <TableCell align="center">{order.address.street}</TableCell>
                                        <TableCell align="center">{order.address.city}</TableCell>
                                        <TableCell align="center">{order._id}</TableCell>
                                        <TableCell align="center">
                                            <Button 
                                                variant="contained" 
                                                color="primary" 
                                                onClick={() => sendOrder(order._id)}
                                                disabled={order.isOrderSent} // אם ההזמנה כבר נשלחה, הכפתור ייחסם
                                            >
                                                {order.isOrderSent ? "נשלח" : "שלח הזמנה"}
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Paper>
        </Box>
    );
};

export default OrdersList;










// import { useEffect, useState } from "react";
// import { getAllOrdersFromServer, updateOrderInServer } from "./orderApi";
// import { useDispatch, useSelector } from "react-redux";
// import * as React from 'react';
// import Switch from '@mui/material/Switch';
// import { Box, CircularProgress, FormControlLabel, Paper, Slide, Grid, Typography, AlertTitle, FormGroup, Alert, Divider, LinearProgress } from "@mui/material";
// import Swal from "sweetalert2";




// const OrdersList = () => {


//     const [ordersArr, setOrdersArr] = useState([]);

//     let currentUser = useSelector(state => state.user.currentUser);

//     let u = localStorage.getItem('myUser');
//     let user = JSON.parse(u);

//     useEffect(() => {
//         getOrdersFromServerToArr();
//     }, []);


//      const getOrdersFromServerToArr = async () => {
//             try {
//                 let res = await getAllOrdersFromServer(user.token);
//                 setOrdersArr(res.data);
//             } catch (err) {
//                 console.log(err);
//                 alert(err.response.data);
//             }
//         };


//     const sendOrder = async (e, id) => {//אמורה לשלוח הזמנה לזמן כאן פונקציה מהשרת

    
//         try {
//             let res = await updateOrderInServer(id, currentUser?.token)
//             console.log(res);
//             Swal.fire({
//                 icon: 'success', title: 'ההזמנה יצאה לדרך', showConfirmButton: false, timer: 1500
//               })
//         }
//         catch (err) {
//             console.log(err);
//             // alert(err.response.data)
//             Swal.fire({
//                 icon: 'error', title: 'תקלה בשליחת הזמנה', showConfirmButton: false, timer: 1500
//               })

//         }
//     }




//     return (
//         <> 

//             {!ordersArr.length ? (
//                 <Box sx={{ width: '100%' ,marginTop:"15vh"}}>
//                     <LinearProgress  sx={{marginBottom:"40vh"}} color="inherit" />
//                 </Box>

//             ) : (
//                 <>

//                     <Paper sx={{ width: "110ch", margin: "auto", mt: 7, padding: "20px", marginTop: "20vh" ,marginBottom:"20vh"}}>
//                         <Box sx={{ textAlign: "center" }}>

//                             <Typography variant="h5" sx={{ marginBottom: "3vh" }}>הזמנות</Typography>

//                             <>
//                                 <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '10px' }}>
//                                     <Typography variant="body1" sx={{ width: '220px' }}>שליחת הזמנה</Typography>
//                                     <Typography variant="body1" sx={{ width: '220px' }}>רחוב</Typography>
//                                     <Typography variant="body1" sx={{ width: '220px' }}>עיר</Typography>
//                                     <Typography variant="body1" sx={{ width: '220px' }}>קוד מזמין</Typography>
//                                 </Box>
//                                 <Divider sx={{ marginBottom: "4vh" }} />
//                                 {ordersArr.map(item => (
//                                     <FormGroup key={item._id}>
//                                         <Grid container spacing={2}>
//                                             <Grid item xs={3}>
//                                                 <FormControlLabel
//                                                     control={<Switch onChange={(e) => sendOrder(e.target.checked, item._id)} />}//checked={item.isOrderSent}
//                                                 />
//                                             </Grid>
//                                             <Grid item xs={3}>
//                                                 <Typography variant="body1">{item.address.street}</Typography>
//                                             </Grid>
//                                             <Grid item xs={3}>
//                                                 <Typography variant="body1">{item.address.city}</Typography>
//                                             </Grid>

//                                             <Grid item xs={3}>
//                                                 <Typography variant="body1">{item._id}</Typography>
//                                             </Grid>


//                                         </Grid>
//                                     </FormGroup>
//                                 ))}
//                             </>

//                         </Box>
//                     </Paper>
//                 </>
//             )}

//         </>
//     );
// }

// export default OrdersList;
