import * as React from 'react';
import { Box, Typography } from '@mui/material';
import { AdminPanelSettingsRounded, PictureAsPdfRounded } from '@mui/icons-material';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { zodResolver } from '@hookform/resolvers/zod';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { SerializedError } from '@reduxjs/toolkit';

import { LoginRequest, LoginSchema } from '../../types';
import { LoginForm } from './login-form';
import { useLoginMutation } from '../../api/auth-api';
import { setUser } from '../../slice/auth-slice';
import { formatApiError } from '@/utils/helpers/format-api-error';
import { ApiError } from '@/components/errors';

const GO_SERVICE_URL = (import.meta as { env: Record<string, string> }).env.VITE_GO_SERVICE_URL ?? 'http://localhost:8080';

export const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const methods = useForm<LoginRequest>({ resolver: zodResolver(LoginSchema) });
  const [apiErrors, setApiErrors] = React.useState<string[]>([]);
  const [login, { isLoading }] = useLoginMutation();

  const onSubmit = async (data: LoginRequest) => {
    try {
      const user = await login(data).unwrap();
      if (user) {
        dispatch(setUser({ user }));
        navigate('/app');
      }
    } catch (error) {
      const apiErrors = formatApiError(error as FetchBaseQueryError | SerializedError);
      setApiErrors(apiErrors);
    }
  };

  const handleTestGoService = () => {
    window.open(`${GO_SERVICE_URL}/api/v1/students/1/report`, '_blank');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background:
          'radial-gradient(ellipse 90% 60% at 50% -5%, rgba(0,212,200,0.12) 0%, transparent 65%), #0a0c10',
        overflowY: 'auto'
      }}
    >
      {/* grid overlay */}
      <Box
        sx={{
          position: 'fixed',
          inset: 0,
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Test go-service banner */}
      <Box
        onClick={handleTestGoService}
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1.5,
          py: 2.5,
          cursor: 'pointer',
          borderBottom: '1px solid rgba(0,212,200,0.15)',
          background: 'rgba(0,212,200,0.04)',
          transition: 'background 0.2s',
          '&:hover': { background: 'rgba(0,212,200,0.09)' }
        }}
      >
        <PictureAsPdfRounded sx={{ color: '#00d4c8', fontSize: 22 }} />
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: '1.05rem', sm: '1.3rem' },
            letterSpacing: '-0.015em',
            background: 'linear-gradient(90deg, #00d4c8 0%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          Test go-service
        </Typography>
        <Typography
          variant='caption'
          sx={{
            color: '#8b9ab2',
            display: { xs: 'none', sm: 'block' },
            fontSize: '0.78rem'
          }}
        >
          → generate student PDF report
        </Typography>
      </Box>

      {/* brand */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 1.5,
          mt: { xs: 5, sm: 8 },
          mb: { xs: 3, sm: 4 }
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: '12px',
            background: 'linear-gradient(135deg, #00d4c8 0%, #0099a8 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 24px rgba(0,212,200,0.35)'
          }}
        >
          <AdminPanelSettingsRounded sx={{ color: '#000', fontSize: 24 }} />
        </Box>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: '1.3rem', sm: '1.55rem' },
            letterSpacing: '-0.025em',
            background: 'linear-gradient(90deg, #e2e8f0 30%, #00d4c8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}
        >
          School<Box component='span' sx={{ WebkitTextFillColor: '#00d4c8' }}>Admin</Box>
        </Typography>
      </Box>

      {/* card */}
      <Box
        sx={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          maxWidth: 440,
          mx: 'auto',
          mb: 6,
          px: { xs: 2, sm: 0 }
        }}
      >
        <Box
          sx={{
            background: 'linear-gradient(145deg, #13171f 0%, #0f1319 100%)',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '16px',
            padding: { xs: '28px 24px 32px', sm: '36px 40px 44px' },
            boxShadow:
              '0 0 0 1px rgba(0,212,200,0.07), 0 32px 80px rgba(0,0,0,0.75), 0 0 120px rgba(0,212,200,0.05)'
          }}
        >
          <Typography
            variant='h4'
            sx={{
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#e2e8f0',
              mb: 0.75,
              fontSize: { xs: '1.6rem', sm: '1.9rem' }
            }}
          >
            Sign in
          </Typography>
          <Typography variant='body2' sx={{ color: '#8b9ab2', mb: 4, fontSize: '0.875rem' }}>
            Enter your credentials to access the dashboard
          </Typography>

          <LoginForm
            methods={methods}
            onSubmit={methods.handleSubmit(onSubmit)}
            isFetching={isLoading}
          />
          <ApiError messages={apiErrors} />
        </Box>
      </Box>
    </Box>
  );
};
