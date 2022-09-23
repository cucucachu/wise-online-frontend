import * as React from "react";
import "./InputRow.css";

type BaseInputRowProps = {
  label: string;
  value: string;
  placeholder?: string;
  onChange(value: string): void;
  unitLabel?: string;
};

type InputRowProps = BaseInputRowProps &
  Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    keyof BaseInputRowProps
  >;

export const InputRow: React.FC<InputRowProps> = ({
  unitLabel,
  placeholder,
  value,
  label,
  onChange,
  ...rest
}) => {
  return (
    <div className="input-row-wrapper">
      <div className="input-row">
        <span style={{ width: "auto" }} className="input-label">
          {label}
        </span>
        <input
          {...rest}
          className=""
          value={value}
          placeholder={placeholder ?? label}
          onChange={(e) => onChange(e.target.value)}
          required={true}
        />
        {unitLabel && <div className="input-row__unit">{unitLabel}</div>}
      </div>
    </div>
  );
};
