import React from 'react';
import { Button as NextUIButton } from '@nextui-org/react';

export interface ButtonProps {
  text: string;
  variant?: 'default' | 'primary' | 'secondary';
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, variant = 'default', onClick }) => {
  const variantClass = {
    default: 'bg-gray-200 text-black hover:bg-gray-300',
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-green-500 text-white hover:bg-green-600',
  }[variant];

  return (
    <NextUIButton
      className={`px-4 py-2 rounded-md font-medium transition-all duration-200 ${variantClass}`}
      onPress={onClick}
    >
      {text}
    </NextUIButton>
  );
};

export default Button;