import React from "react";
import styles from "./phone-input.module.scss";

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

function PhoneInput({ value, onChange }: PhoneInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.replace(/\D/g, "");
    onChange(input);
  };
  return (
    <div className={styles.phoneInput}>
      <label className={styles.phoneInput__label}>Phone</label>

      <input
        type="tel"
        className={styles.phoneInput__numberInput}
        value={value}
        onChange={handleChange}
        placeholder="1234567890"
      />
    </div>
  );
}

export default PhoneInput;
