import { createSignal } from 'solid-js';
import { TextInput, type TextInputProps } from './TextInput.jsx';

export interface ConfirmInputProps extends Omit<TextInputProps, 'value' | 'onChange' | 'onSubmit'> {
  isChecked?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  onSubmit?: (confirmed: boolean) => void;
}

export function ConfirmInput(props: ConfirmInputProps) {
  const { isChecked = true, value: valueProp, onChange, onSubmit, ...textInputProps } = props;

  const [value, setValue] = createSignal(valueProp || '');

  const handleChange = (newValue: string) => {
    setValue(newValue);
    onChange?.(newValue);
  };

  const handleSubmit = (inputValue: string) => {
    // ASSUMPTION: Y/y/yes/Yes = true, N/n/no/No = false, empty = isChecked default
    const normalized = inputValue.trim().toLowerCase();

    let confirmed: boolean;

    if (normalized === '' || normalized === 'y' || normalized === 'yes') {
      confirmed = isChecked;
    } else if (normalized === 'n' || normalized === 'no') {
      confirmed = !isChecked;
    } else {
      // Invalid input, use default
      confirmed = isChecked;
    }

    onSubmit?.(confirmed);
  };

  return (
    <TextInput
      {...textInputProps}
      value={value()}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}
