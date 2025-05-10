import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
  Container,
  Menu,
  MenuItem,
  Tooltip,
  Avatar,
} from '@mui/material';
import { Menu as MenuIcon, VideoStable as AdbIcon } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../redux/store';
import { logoutUser } from '../redux/slices/userSlice';

const pageRoutes = {
  Home: '/home',
  Trending: '/trending',
  'Browse Movies': '/browse-movies',
  Watchlist: '/watchlists', // Assuming 'Watchlist' maps to the 'bookmarks' route
};

const pages = [
  {
    name: 'Home',
    route: pageRoutes.Home,
  },
  {
    name: 'Trending',
    route: pageRoutes.Trending,
  },
  {
    name: 'Browse Movies',
    route: pageRoutes['Browse Movies'],
  },
  {
    name: 'Watchlist',
    route: pageRoutes.Watchlist,
  },
];
const settings = ['Logout'];

const NavBar = () => {
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const dispatch = useDispatch<AppDispatch>();

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleUserLogOut = () => {
    dispatch(logoutUser());
    handleCloseUserMenu();
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* desktop view */}

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <AdbIcon sx={{ mr: 1, height: '100%', alignSelf: 'center' }} />
            <Typography
              variant="h6"
              noWrap
              component={RouterLink}
              to={'/home'}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.1rem',
                color: 'inherit',
                textDecoration: 'none',
                lineHeight: 1,
              }}
            >
              Movie Explorer
            </Typography>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page.name}
                  onClick={handleCloseNavMenu}
                  component={RouterLink}
                  to={page.route}
                >
                  <Typography sx={{ textAlign: 'center' }}>
                    {page.name}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* mobile view */}
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to={'/home'}
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.1rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Movie Explorer
          </Typography>

          {/* Desktop Menu */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
              alignItems: 'center',
              flexDirection: 'row',
              pr: 2,
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.name}
                onClick={handleCloseNavMenu}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                  textTransform: 'none',
                }}
                to={page.route}
                component={RouterLink}
              >
                {page.name}
              </Button>
            ))}
          </Box>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleUserLogOut}>
                  <Typography sx={{ textAlign: 'center' }}>
                    {setting}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;

// <AppBar position="static">
//   <Toolbar>
//     {/* Logo */}
//     <Typography
//       variant="h6"
//       noWrap
//       component="div"
//       sx={{ display: { xs: 'none', sm: 'block' } }}
//     >
//       MovieExplorer
//     </Typography>

//     {/* Search Bar */}
//     <Search>
//       <SearchIconWrapper>
//         <SearchIcon />
//       </SearchIconWrapper>
//       <StyledInputBase
//         placeholder="Search movies..."
//         inputProps={{ 'aria-label': 'search' }}
//       />
//     </Search>

//     <Box sx={{ flexGrow: 1 }} />

//     {/* Theme Toggle */}
//     <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
//       <IconButton color="inherit" sx={{ mr: 1 }}>
//         {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
//       </IconButton>
//       <Switch
//         checked={darkMode}
//         onChange={handleThemeToggle}
//         color="default"
//       />
//     </Box>

//     {/* Logout Button */}
//     <Button
//       color="inherit"
//       onClick={handleLogout}
//       startIcon={<LogoutIcon />}
//     >
//       Logout
//     </Button>
//   </Toolbar>
// </AppBar>
