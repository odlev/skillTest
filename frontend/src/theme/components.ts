export const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarWidth: 'thin',
        scrollbarColor: '#2d3748 transparent',
        '&::-webkit-scrollbar': { width: '6px' },
        '&::-webkit-scrollbar-track': { background: 'transparent' },
        '&::-webkit-scrollbar-thumb': { background: '#2d3748', borderRadius: '3px' }
      }
    }
  },
  MuiButtonBase: {
    styleOverrides: {
      root: {
        '&.Mui-disabled': {
          cursor: 'not-allowed !important',
          pointerEvents: 'all !important'
        },
        '&.Mui-disabled:hover': {
          cursor: 'not-allowed !important',
          pointerEvents: 'all !important'
        }
      }
    }
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'none' as const,
        fontWeight: 500,
        borderRadius: 8,
        paddingTop: 8,
        paddingBottom: 8
      },
      containedPrimary: {
        background: 'linear-gradient(135deg, #00d4c8 0%, #0099a8 100%)',
        color: '#000000',
        '&:hover': {
          background: 'linear-gradient(135deg, #00ece0 0%, #00b8c8 100%)'
        }
      }
    }
  },
  MuiPaper: {
    styleOverrides: {
      root: { backgroundImage: 'none' }
    }
  },
  MuiCard: {
    styleOverrides: {
      root: {
        backgroundImage: 'none',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 12,
        transition: 'border-color 0.2s ease',
        '&:hover': { borderColor: 'rgba(0,212,200,0.2)' }
      }
    }
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor: '#0d1017',
        borderRight: '1px solid rgba(255,255,255,0.06)'
      }
    }
  },
  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: 'rgba(10,12,16,0.88)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        boxShadow: 'none',
        color: '#e2e8f0'
      }
    }
  },
  MuiListItemButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        margin: '2px 8px',
        width: 'calc(100% - 16px)',
        '&.Mui-selected': {
          backgroundColor: 'rgba(0,212,200,0.1)',
          color: '#00d4c8',
          '&:hover': { backgroundColor: 'rgba(0,212,200,0.15)' }
        },
        '&:hover': { backgroundColor: 'rgba(255,255,255,0.05)' }
      }
    }
  },
  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255,255,255,0.12)' },
        '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(0,212,200,0.4)' },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#00d4c8' }
      }
    }
  },
  MuiDivider: {
    styleOverrides: {
      root: { borderColor: 'rgba(255,255,255,0.06)' }
    }
  },
  MuiTableHead: {
    styleOverrides: {
      root: {
        '& .MuiTableCell-head': {
          backgroundColor: '#161b24',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          fontWeight: 600,
          color: '#8b9ab2',
          textTransform: 'uppercase' as const,
          fontSize: '0.7rem',
          letterSpacing: '0.08em'
        }
      }
    }
  },
  MuiTableBody: {
    styleOverrides: {
      root: {
        '& .MuiTableRow-root:hover .MuiTableCell-root': {
          backgroundColor: 'rgba(255,255,255,0.02)'
        },
        '& .MuiTableCell-root': {
          borderBottom: '1px solid rgba(255,255,255,0.05)'
        }
      }
    }
  },
  MuiChip: {
    styleOverrides: {
      root: { borderRadius: 6 }
    }
  },
  MuiTooltip: {
    styleOverrides: {
      tooltip: {
        backgroundColor: '#1e2432',
        border: '1px solid rgba(255,255,255,0.1)',
        color: '#e2e8f0'
      }
    }
  },
  MuiMenu: {
    styleOverrides: {
      paper: {
        backgroundColor: '#161b24',
        border: '1px solid rgba(255,255,255,0.08)'
      }
    }
  },
  MuiMenuItem: {
    styleOverrides: {
      root: {
        '&:hover': { backgroundColor: 'rgba(0,212,200,0.08)' },
        '&.Mui-selected': { backgroundColor: 'rgba(0,212,200,0.12)' }
      }
    }
  }
};
