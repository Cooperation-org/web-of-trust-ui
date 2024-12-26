import * as React from 'react';
import Button from '@mui/material/Button';

interface MyButtonProps {
  label: string;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary';
  onClick?: () => void;
}

const MyButton: React.FC<MyButtonProps> = ({ label, variant = 'contained', color = 'primary', onClick }) => {
  return (
    <Button variant={variant} color={color} onClick={onClick}>
      {label}
    </Button>
  );
};

export default MyButton;
