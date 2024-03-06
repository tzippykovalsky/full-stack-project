
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import Typography from '@mui/material/Typography';
import Tooltip from '@mui/material/Tooltip';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';


import { googleLogout, useGoogleLogin } from '@react-oauth/google';

import { Link, Outlet, useNavigate } from "react-router-dom";
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import React, { useEffect, useState } from 'react';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import SearchIcon from '@mui/icons-material/Search';
import './Navbar.css';
import Login from '../../features/user/Login';
import { useDispatch, useSelector } from 'react-redux';
import { logoutState } from '../../features/user/userSlice';
import NavBarAdmin from './NavBarAdmin';
import NavBarUser from './NavBarUser';
import LoginIcon from '@mui/icons-material/Login';
import { saveCurrentPageOnSiteToState } from '../../features/product/productSlice';
const Navbar = () => {


    const [scrolled, setScrolled] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);

    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    let currentUser = useSelector((state) => state.user.currentUser);
    let ordersArr = useSelector((state) => state.order.ordersArr);
    let navigate = useNavigate();
    let dispatch = useDispatch();
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);



    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            right: -3,
            top: 13,
            border: `2px solid ${theme.palette.background.paper}`,
            padding: '0 4px',
        },
    }));

    const handleLogout = () => {
        googleLogout()
        dispatch(logoutState())

        dispatch(saveCurrentPageOnSiteToState(1));
        localStorage.removeItem('myCart')


    }
    return (
        <>
            <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
                <div className="left-icons">
                    <StyledBadge badgeContent={ordersArr.length} >
                        <Link to={`/cart/`} >
                            <ShoppingCartOutlinedIcon sx={{ width: 30, height: 30, marginLeft: 3, color: 'white' }} />
                        </Link>
                    </StyledBadge>
                    {/* <Link to={`/login/`} > */}
                    {/* </Link> */}
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >   <PersonOutlinedIcon sx={{ width: 30, height: 30, marginLeft: 3, color: 'white' }} />
                    </IconButton>


                    <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}

                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                    >

                        <MenuItem onClick={() => { navigate('/signup/') }}>
                            <ListItemIcon>
                                <PersonAdd fontSize="small" />
                            </ListItemIcon>
                            הרשמה
                        </MenuItem>
                        <MenuItem onClick={() => { navigate('/login/') }}>
                            <ListItemIcon>
                                <LoginIcon fontSize="small" />
                            </ListItemIcon>
                            כניסה
                        </MenuItem>
                        {currentUser && <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            יציאה
                        </MenuItem>}
                    </Menu>

                    <SearchIcon sx={{ width: 30, height: 30, marginLeft: 3, color: 'white' }} />
                </div>

                {currentUser && currentUser.role == 2 ? <NavBarAdmin /> : <NavBarUser />}
                <div style={{ "display": 'flex' }}>
                    <Typography sx={{ color: "white", fontSize: "1vw", marginRight: "1vw" ,marginTop:"1vh"}}>  {currentUser && currentUser.userName ? currentUser.userName : ""}</Typography>
                    {currentUser && currentUser.profile && currentUser.profile.picture ? (
                        <Avatar src={currentUser.profile.picture} />
                    ) : (
                        currentUser &&<Avatar src="/broken-image.jpg" />
                    )}


                </div>
            </nav>
            <Outlet />
        </>
    );
};

export default Navbar;




