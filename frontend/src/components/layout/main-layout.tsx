import * as React from 'react';
import { Box, Drawer, Toolbar, Typography } from '@mui/material';
import { PictureAsPdfRounded } from '@mui/icons-material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { AppBarLayout } from './app-bar-layout';
import { DrawerContent } from './drawer-content';

const drawerWidth = 280;
const GO_SERVICE_URL = (import.meta as { env: Record<string, string> }).env.VITE_GO_SERVICE_URL ?? 'http://localhost:8080';

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [openNavMenu, setOpenNavMenu] = React.useState<null | string>(null);
  const [mobileOpen, setMobileOpen] = React.useState<boolean>(false);
  const [isClosing, setIsClosing] = React.useState<boolean>(false);

  const handleDrawerClose = () => {
    setMobileOpen(false);
  };
  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };
  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleNavigationClick = (name: string) => {
    setOpenNavMenu(name === openNavMenu ? null : name);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarLayout
        handleDrawerToggle={handleDrawerToggle}
        handleMenu={handleMenu}
        anchorEl={anchorEl}
        handleMenuClose={handleMenuClose}
        drawerWidth={drawerWidth}
      />
      <Box component='nav' sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
        >
          <DrawerContent handleNavigationClick={handleNavigationClick} openNavMenu={openNavMenu} />
        </Drawer>
        <Drawer
          variant='permanent'
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open
        >
          <DrawerContent handleNavigationClick={handleNavigationClick} openNavMenu={openNavMenu} />
        </Drawer>
      </Box>

      <Box
        component='main'
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}
      >
        <Toolbar />

        {/* Test go-service banner */}
        <Box
          onClick={() => window.open(`${GO_SERVICE_URL}/api/v1/students/1/report`, '_blank')}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
            mb: 3,
            px: 3,
            py: 2,
            borderRadius: '12px',
            border: '1px solid rgba(0,212,200,0.18)',
            background: 'rgba(0,212,200,0.04)',
            cursor: 'pointer',
            transition: 'all 0.2s',
            '&:hover': {
              background: 'rgba(0,212,200,0.1)',
              borderColor: 'rgba(0,212,200,0.4)',
              boxShadow: '0 0 20px rgba(0,212,200,0.1)'
            }
          }}
        >
          <PictureAsPdfRounded sx={{ color: '#00d4c8', fontSize: 24, flexShrink: 0 }} />
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: '1.05rem', sm: '1.25rem' },
              letterSpacing: '-0.015em',
              background: 'linear-gradient(90deg, #00d4c8 0%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Test go-service
          </Typography>
          <Typography variant='caption' sx={{ color: '#8b9ab2', display: { xs: 'none', sm: 'block' } }}>
            → generate student PDF report
          </Typography>
        </Box>

        <LocalizationProvider dateAdapter={AdapterDateFns}>{children}</LocalizationProvider>
      </Box>
    </Box>
  );
};
