// PasswordToggle.tsx
import React from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordToggleProps {
  onToggle: () => void;
  isVisible: boolean;
}

const PasswordToggle: React.FC<PasswordToggleProps> = ({
  onToggle,
  isVisible,
}) => {
  return (
    <button type="button" onClick={onToggle} className="cursor-pointer">
      {isVisible ? <Eye /> : <EyeOff />}
    </button>
  );
};

export default PasswordToggle;
