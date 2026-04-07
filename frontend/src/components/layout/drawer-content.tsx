import * as React from 'react';
import { ArrowDropDown, ArrowRight } from '@mui/icons-material';
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { getUserMenus } from '@/domains/auth/slice';

type DrawerContentProps = {
  handleNavigationClick: (name: string) => void;
  openNavMenu: string | null;
};

export const DrawerContent: React.FC<DrawerContentProps> = ({
  handleNavigationClick,
  openNavMenu
}) => {
  const menus = useSelector(getUserMenus);
  const API_URL = import.meta.env.VITE_API_URL;
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Logo */}
      <Toolbar
        sx={{
          textDecoration: 'none',
          px: 2.5,
          py: 2,
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          minHeight: '64px !important'
        }}
        component={Link}
        to='/app'
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #00d4c8 0%, #0099a8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 16px rgba(0,212,200,0.3)',
            flexShrink: 0,
            mr: 1.5
          }}
        >
          <Box
            component='span'
            sx={{ width: 14, height: 14, borderRadius: '50%', background: '#000', opacity: 0.85 }}
          />
        </Box>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: '1.0rem',
            letterSpacing: '-0.02em',
            background: 'linear-gradient(90deg, #e2e8f0 20%, #00d4c8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          School<span style={{ WebkitTextFillColor: '#00d4c8' }}>Admin</span>
        </Typography>
      </Toolbar>

      {/* Nav */}
      <Box sx={{ flex: 1, overflowY: 'auto', pt: 1.5, pb: 2, px: 1 }}>
        <List component='nav' disablePadding>
          {menus &&
            menus.map(({ name, path, subMenus, icon }) => {
              const isActive = location.pathname.startsWith(`/app/${path}`);

              if (Array.isArray(subMenus) && subMenus.length > 0) {
                const isGroupActive = subMenus.some((s) =>
                  location.pathname.startsWith(`/app/${s.path}`)
                );
                return (
                  <Box key={name} sx={{ mb: 0.25 }}>
                    <ListItemButton
                      onClick={() => handleNavigationClick(name)}
                      selected={isGroupActive}
                      sx={{
                        borderRadius: '8px',
                        mb: 0.25,
                        borderLeft: isGroupActive
                          ? '2px solid #00d4c8'
                          : '2px solid transparent'
                      }}
                    >
                      <ListItemIcon sx={{ minWidth: 36 }}>
                        <img width='18px' height='18px' src={`${API_URL}/${icon}`} />
                      </ListItemIcon>
                      <ListItemText
                        primary={name}
                        slotProps={{
                          primary: {
                            sx: { fontSize: '0.875rem', fontWeight: isGroupActive ? 600 : 400 }
                          }
                        }}
                      />
                      {openNavMenu === name ? (
                        <ArrowDropDown sx={{ color: '#8b9ab2', fontSize: 18 }} />
                      ) : (
                        <ArrowRight sx={{ color: '#8b9ab2', fontSize: 18 }} />
                      )}
                    </ListItemButton>
                    <Collapse in={openNavMenu === name} timeout='auto' unmountOnExit>
                      <List component='div' disablePadding sx={{ pl: 1.5 }}>
                        {subMenus.map(({ name: subName, path: subPath }) => {
                          const isSubActive = location.pathname.startsWith(`/app/${subPath}`);
                          return (
                            <ListItemButton
                              key={subName}
                              component={Link}
                              to={`/app/${subPath}`}
                              selected={isSubActive}
                              sx={{
                                borderRadius: '8px',
                                pl: '48px',
                                mb: 0.25,
                                borderLeft: isSubActive
                                  ? '2px solid #00d4c8'
                                  : '2px solid transparent'
                              }}
                            >
                              <ListItemText
                                primary={subName}
                                slotProps={{
                                  primary: {
                                    sx: {
                                      fontSize: '0.8375rem',
                                      fontWeight: isSubActive ? 600 : 400,
                                      color: isSubActive ? '#00d4c8' : 'inherit'
                                    }
                                  }
                                }}
                              />
                            </ListItemButton>
                          );
                        })}
                      </List>
                    </Collapse>
                  </Box>
                );
              } else {
                return (
                  <ListItemButton
                    key={name}
                    component={Link}
                    to={`/app/${path}`}
                    selected={isActive}
                    sx={{
                      borderRadius: '8px',
                      mb: 0.25,
                      borderLeft: isActive ? '2px solid #00d4c8' : '2px solid transparent'
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36 }}>
                      <img width='18px' height='18px' src={`${API_URL}/${icon}`} />
                    </ListItemIcon>
                    <ListItemText
                      primary={name}
                      slotProps={{
                        primary: {
                          sx: {
                            fontSize: '0.875rem',
                            fontWeight: isActive ? 600 : 400,
                            color: isActive ? '#00d4c8' : 'inherit'
                          }
                        }
                      }}
                    />
                  </ListItemButton>
                );
              }
            })}
        </List>
      </Box>
    </Box>
  );
};
