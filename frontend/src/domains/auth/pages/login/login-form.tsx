import * as React from 'react';
import { Stack, TextField } from '@mui/material';
import { UseFormReturn } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { LoginRequest } from '../../types';

type LoginFormProps = {
  onSubmit: () => void;
  methods: UseFormReturn<LoginRequest>;
  isFetching: boolean;
};

export const LoginForm: React.FC<LoginFormProps> = ({ onSubmit, methods, isFetching }) => {
  const {
    register,
    formState: { errors }
  } = methods;

  return (
    <form onSubmit={onSubmit}>
      <TextField
        type='text'
        label='Username'
        sx={{ mb: 2.5 }}
        fullWidth
        {...register('username')}
        error={!!errors.username}
        helperText={errors.username?.message}
      />
      <TextField
        type='password'
        label='Password'
        sx={{ mb: 3.5 }}
        fullWidth
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Stack>
        <LoadingButton
          loading={isFetching}
          type='submit'
          size='large'
          variant='contained'
          sx={{ py: 1.5, fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.01em' }}
        >
          <span>Sign In</span>
        </LoadingButton>
      </Stack>
    </form>
  );
};

