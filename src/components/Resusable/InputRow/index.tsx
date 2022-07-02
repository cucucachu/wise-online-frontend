import * as React from 'react';
type InputRowProps = {
  label: string;
  value: string;
  onChange(value: string): void;
}

export const InputRow: React.FC<InputRowProps> = ({ value, label, onChange }) => {
  return (
    <div className="input-wrapper">
      <span className="input-label" >{label}</span>
      <input
        className=""
        value={value}
        placeholder={label}
        onChange={(e) => onChange(e.target.value)}
        required={true}
      />
    </div>
  )
};  

