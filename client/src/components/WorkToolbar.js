import * as React from 'react';
import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store/index.js'
import AuthContext from '../auth'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import PeopleIcon from '@mui/icons-material/People';
import HomeIcon from '@mui/icons-material/Home';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import FunctionsIcon from '@mui/icons-material/Functions';
import SortIcon from '@mui/icons-material/Sort';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));
  
export default function WorkToolbar(){
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [text, setText] = useState("");

    const isMenuOpen = Boolean(anchorEl);

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleSortMenuClose = () => {
        setAnchorEl(null);
    };

    function handleUpdateText(event) {
      setText(event.target.value);
      if(store.loadType !== "home") {
          return
      }
      store.updateSearchFilter(event.target.value);
    }

    function handleKeyPress(event) {
      if(event.code === "Enter") {
          if(store.loadType === "username") {
            store.getUserLists(text)
          }
          else{
            store.updateSearchFilter(text);
          }
      }
    } 

    function handleHome() {
      store.loadHome();
    }

    function handleAll() {
      store.loadAll();
    }

    function handleUser() {
      store.loadUser();
    }

    function handleCommunity() {
      store.loadCommunity();
    }

    function handleSortNewest() {
      store.setSortType("newest");
      handleSortMenuClose();
    }

    function handleSortOldest() {
      store.setSortType("oldest");
      handleSortMenuClose();
    }

    function handleSortLikes() {
      store.setSortType("likes");
      handleSortMenuClose();
    }

    function handleSortDislikes() {
      store.setSortType("dislikes");
      handleSortMenuClose();
    }

    function handleSortViews(){
      store.setSortType("views");
      handleSortMenuClose();
    }

    const menuId = 'primary-sort-menu';
    const sortMenu = (
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
          onClose={handleSortMenuClose}
        >
          <MenuItem style={{color: 'black'}} onClick={handleSortNewest}>Publish Date (Newest)</MenuItem>
          <MenuItem style={{color: 'black'}} onClick={handleSortOldest}>Publish Date (Oldest)</MenuItem>
          <MenuItem style={{color: 'black'}} onClick={handleSortViews}>Views</MenuItem>
          <MenuItem style={{color: 'black'}} onClick={handleSortLikes}>Likes</MenuItem>
          <MenuItem style={{color: 'black'}} onClick={handleSortDislikes}>Dislikes</MenuItem>
        </Menu>
        );
    
        return (
            <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static" elevation={0} style={{ background: '#5a5a5a' }}>
                <Toolbar>
                  <IconButton
                    disabled={(store.listBeingEdited || !auth.loggedIn) ? true: false}
                    size="large"
                    edge="start"
                    color={store.loadType === "home" ? "secondary" : "inherit"}
                    aria-label="open drawer"
                    onClick={handleHome}
                    sx={{ mr: 2 }}
                  >
                    <HomeIcon />
                  </IconButton>
                  <IconButton
                    disabled={store.listBeingEdited ? true: false}
                    size="large"
                    edge="start"
                    color={store.loadType === "all" ? "secondary" : "inherit"}
                    aria-label="open drawer"
                    onClick={handleAll}
                    sx={{ mr: 2 }}
                  >
                    <PeopleIcon />
                  </IconButton>
                  <IconButton
                    disabled={store.listBeingEdited ? true: false}
                    size="large"
                    edge="start"
                    color={store.loadType === "username" ? "secondary" : "inherit"}
                    aria-label="open drawer"
                    onClick={handleUser}
                    sx={{ mr: 2 }}
                  >
                    <PersonSearchIcon />
                  </IconButton>
                  <IconButton
                    disabled={store.listBeingEdited ? true: false}
                    size="large"
                    edge="start"
                    color={store.loadType === "community" ? "secondary" : "inherit"}
                    aria-label="open drawer"
                    onClick={handleCommunity}
                    sx={{ mr: 2 }}
                  >
                    <FunctionsIcon />
                  </IconButton>
                             
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      disabled={store.listBeingEdited ? true: false}
                      placeholder="Search???"
                      value={text}
                      inputProps={{ 'aria-label': 'search' }}
                      onChange={handleUpdateText}
                      onKeyPress={handleKeyPress}
                    />
                  </Search>
                  <Box sx={{ flexGrow: 1 }} />
                  <Typography
                        variant="h6"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}
                    >
                        SORT BY
                  </Typography>
                  <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                    <IconButton
                      disabled={store.listBeingEdited ? true: false}
                      size="large"
                      aria-label="show more"
                      aria-controls={menuId}
                      aria-haspopup="true"
                      onClick={handleSortMenuOpen}
                      color="inherit"
                    >
                      <SortIcon />
                    </IconButton>
                  </Box>
                </Toolbar>
              </AppBar>
              {sortMenu}
            </Box>
          );
}