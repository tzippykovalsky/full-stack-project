import { border } from "@mui/system";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { Divider } from "@mui/material"

const Home = () => {
    const images = [
        {
            url: "https://casabella.co.il/cdn/shop/files/IMG_9214.jpg?v=1707119849&width=800",
            title: 'מטבח',
            width: '33%',
            link:'/kitchen/',
        },
        {
            url: 'https://casabella.co.il/cdn/shop/files/IMG_5899.jpg?v=1701245129&width=800',
            title: 'סלון ואוירה',
            width: '33%',
          link:'/livingRoom/',

        },
        {
            url: 'https://casabella.co.il/cdn/shop/products/D7_A0_D7_A8-_D7_A8_D7_95_D7_96-7.jpg?v=1682333513&width=800',
            title: 'שולחן ואירוח',
            width: '33%',
            link:'/table/',
        },
    ];

    const ImageButton = styled(ButtonBase)(({ theme }) => ({
        position: 'relative',
        height: 500,
        [theme.breakpoints.down('sm')]: {
            width: '100% !important', // Overrides inline-style
            height: 100,
        },
        '&:hover, &.Mui-focusVisible': {
            zIndex: 1,
            '& .MuiImageBackdrop-root': {
                opacity: 0.15,
            },
            '& .MuiImageMarked-root': {
                opacity: 0,
            },
            '& .MuiTypography-root': {
                border: '4px solid currentColor',
            },
        },
    }));

    const ImageSrc = styled('span')({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundSize: 'cover',
        backgroundPosition: 'center 40%',
    });

    const Image = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: theme.palette.common.white,
    }));

    const ImageBackdrop = styled('span')(({ theme }) => ({
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: theme.palette.common.black,
        opacity: 0.4,
        transition: theme.transitions.create('opacity'),
    }));


    const ImageMarked = styled('span')(({ theme }) => ({
        height: 3,
        width: 18,
        backgroundColor: theme.palette.common.white,
        position: 'absolute',
        bottom: -2,
        left: 'calc(50% - 9px)',
        transition: theme.transitions.create('opacity'),
    }));


    return (

        <>
            <div className="home">
                <div className="header-img">
                    <img style={{ width: "100%", marginTop: "10vh" }} src="https://casabella.co.il/cdn/shop/files/hello_spring_web.jpg?v=1709469730&width=2000" />
                </div>
              
                <Box sx={{direction:"rtl",margin:"3vw",marginRight:"22vw"}}>
                    <Typography sx={{ fontSize: '30px', margin: '1%',marginRight:"21vw"}}>האג'נדה שלנו</Typography> 
                    <br />
                    <Typography sx={{ fontSize: '17px', margin: '0%' }}>איכות – שמירה על סטנדרט גבוה של ייצור ועמידה בכל התקנים הדרושים . אנו בוחרים את המוצרים שלנו בקפידה ורק לאחר סקירה ובדיקה מקצועית. </Typography>
                    <br />

                    <Typography sx={{ fontSize: '17px', margin: '1%' }}>חדשנות לצד מסורת – איתור ובחירת מוצרים מיוחדים ומעוצבים על פי הטרנדים המשתנים לצד ריהוט קלאסי מסוגנן. ועל כל פנים, רהיטים שלא רואים בכל מקום.
                        <br />
                    </Typography>
                    <br />
                    <Typography sx={{ fontSize: '17px', margin: '0%' }}>
                        עיצוב והתאמה – עיצוב והתאמת הריהוט לבית הלקוח, לצרכיו ואופיו. אנחנו לא מוכרים לכם ריהוט, אנחנו מרהטים את הבית שלכם!
                    </Typography>
                    <br />
                    <Typography sx={{ fontSize: '17px', margin: '1%' }}>
                        חווית קניה  – צוות מומחה ומקצועי עומד לרשותכם, לתכנן, לעצב ולרהט לכם את הבית, בסבלנות ובנעימות, תוך העמדת הצרכים שלכם במקום הראשון.</Typography>
                </Box>






                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
                    {images.map((image) => (
                    
                        <ImageButton
                            focusRipple
                            key={image.title}
                            style={{
                                width: image.width,
                
                            }}
                        >
                            <ImageSrc style={{ backgroundImage: `url(${image.url})`,  borderLeft: "4px solid black" }} />
                            <ImageBackdrop className="MuiImageBackdrop-root" />
                            <Image>
                                <Link to={image.link} state={image.title} style={{ color: 'white', textDecoration: 'none' }}>
                                <Typography
                                    component="span"
                                    variant="subtitle1"
                                    color="inherit"
                                    sx={{
                                        position: 'relative',
                                        p: 4,
                                        pt: 2,
                                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                    }}
                                  
                                >
                                    {image.title}
                                    <ImageMarked className="MuiImageMarked-root" />
                                </Typography>
                                </Link>  
                            </Image>
                        </ImageButton>
                         
                    ))}
                </Box>

            </div>
        </>
    );
}

export default Home;