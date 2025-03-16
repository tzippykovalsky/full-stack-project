import { useEffect, useState } from "react";
import { getTotalSum } from "../utils/calcOnArr";
import { Box, Slider, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const Delivery = () => {


    const [sliderValue, setSliderValue] = useState(0);
    let ordersArr = useSelector((state) => state.order.ordersArr);
    const [totalSum, setTotalSum] = useState(0)


    useEffect(() => {


        setTotalSum(getTotalSum(ordersArr));
        setSliderValue(Math.round(100 * totalSum / 300));

    }, [ordersArr])

    return (<>
        <Box>
            {/* <LocalShippingIcon/> */}
            <Typography sx={{marginLeft:17}}>עוד ₪ {300 - totalSum}  אתה מקבל משלוח חינם</Typography>
            <Slider sx={{ width: 310, color: "black", height: 9,marginLeft:8}}
                value={sliderValue} aria-label="Default" valueLabelDisplay="auto" />
        </Box>

    </>);
}

export default Delivery;