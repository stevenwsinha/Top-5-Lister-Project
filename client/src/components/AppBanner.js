import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
// import { GlobalStoreContext } from '../store'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Avatar from '@mui/material/Avatar';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    // const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser();
    }

    const menuId = 'primary-search-account-menu';
    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login    </Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account    </Link></MenuItem>
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}><Link to='/logout/'>Logout    </Link></MenuItem>
        </Menu>        

    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
    }
    
    function getAccountMenu(loggedIn) {
        if(loggedIn){
            let initials = "";
            initials += auth.user.firstName[0];
            initials += auth.user.lastName[0];
            return <Avatar sx={{ bgcolor: 'secondary.main' }}>{initials}</Avatar>
        }
        return <AccountCircle sx={{color: 'secondary.main'}}/>;
    }

    return (
        <Box>
            <AppBar position="static" elevation={2}>
                <Toolbar 
                    sx={{ 
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}                        
                    >
                        <Link style={{ textDecoration: 'none', color: 'white' }} to='/home'>T<sup>5</sup>L</Link>
                    </Typography>
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <IconButton 
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            { getAccountMenu(auth.loggedIn) }
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {
                menu
            }
        </Box>
    );
}