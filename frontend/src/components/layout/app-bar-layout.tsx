import * as React from 'react';
import { ArrowDropDown, Logout, MenuBook, Person } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Toolbar,
  Typography
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';

import { getErrorMsg } from '@/utils/helpers/get-error-message';
import { useLogoutMutation } from '@/domains/auth/api';
import { getUserEmail, getUserName, getUserRole, resetUser } from '@/domains/auth/slice';

type AppBarLayoutProps = {
  handleDrawerToggle: () => void;
  handleMenu: (event: React.MouseEvent<HTMLElement>) => void;
  anchorEl: HTMLElement | null;
  handleMenuClose: () => void;
  drawerWidth: number;
};

export const AppBarLayout: React.FC<AppBarLayoutProps> = ({
  handleDrawerToggle,
  handleMenu,
  anchorEl,
  handleMenuClose,
  drawerWidth
}) => {
  const currentUserEmail = useSelector(getUserEmail);
  const currentUserName = useSelector(getUserName);
  const currentUserRole = useSelector(getUserRole);
  const [logout] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async (event: React.MouseEvent<HTMLElement>) => {
    handleMenuClose();
    event.preventDefault();
    try {
      await logout().unwrap();
      dispatch(resetUser());
      navigate('/auth/login');
    } catch (error) {
      toast.error(getErrorMsg(error as FetchBaseQueryError | SerializedError).message);
    }
  };

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` }
      }}
    >
      <Toolbar>
        <IconButton
          edge='start'
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: 'none' } }}
        >
          <MenuBook />
        </IconButton>
        <Box sx={{ flexGrow: 1 }}></Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            px: 1.5,
            py: 0.75,
            borderRadius: '10px',
            border: '1px solid rgba(255,255,255,0.08)',
            background: 'rgba(255,255,255,0.04)',
            cursor: 'pointer',
            '&:hover': { background: 'rgba(255,255,255,0.08)' }
          }}
          onClick={handleMenu}
        >
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #00d4c8 0%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            <Typography sx={{ fontSize: '0.7rem', fontWeight: 700, color: '#fff' }}>
              {currentUserName?.charAt(0)?.toUpperCase() ?? 'A'}
            </Typography>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, lineHeight: 1.2, color: '#e2e8f0' }}>
              {currentUserName}
            </Typography>
            <Typography sx={{ fontSize: '0.7rem', color: '#8b9ab2', lineHeight: 1.2 }}>
              {currentUserRole}
            </Typography>
          </Box>
          <ArrowDropDown sx={{ color: '#8b9ab2', fontSize: 18 }} />
        </Box>
        <Menu
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          id='menu-appbar'
          anchorEl={anchorEl}
          keepMounted
        >
          <MenuItem>
            <div>
              <Typography variant='body1'>{currentUserEmail}</Typography>
              <Typography variant='body2' sx={{ fontWeight: 'bold' }}>
                {currentUserRole}
              </Typography>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem component={Link} to='/app/account' onClick={handleMenuClose}>
            <ListItemIcon>
              <Person fontSize='small' />
            </ListItemIcon>
            <ListItemText>My Account</ListItemText>
          </MenuItem>
          <MenuItem component={Link} to='/#' onClick={handleLogout}>
            <ListItemIcon>
              <Logout fontSize='small' />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};
