import React from 'react';

interface TickIconProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TickIcon: React.FC<TickIconProps> = ({ checked, onChange }) => {
  return (
    <input
      type="checkbox"
      className="tick"
      checked={checked}
      onChange={onChange}
    />
  );
};

export default TickIcon;
