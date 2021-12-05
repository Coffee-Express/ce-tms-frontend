import React from 'react';
import {
  render, fireEvent, screen,
} from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './Login';

test('should update email value on email input change', () => {
  render(<Login />);
  fireEvent.change(screen.getByLabelText('email'), { target: { value: 'a' } });
  expect(screen.getByLabelText('email')).toHaveValue('a');
});

test('should update password value on password input change', () => {
  render(<Login />);
  fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'a' } });
  expect(screen.getByLabelText('Password')).toHaveValue('a');
});
