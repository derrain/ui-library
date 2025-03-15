export interface InputProps {
  fieldType: 'text' | 'email' | 'number' | 'password' | 'tel' | 'date' | 'time';
  labelText: string;
  inputId: string;
  fieldValue?: string | number | date;
  fieldSize: 'small' | 'medium' | 'large';
  isInline?: boolean;
  showLabel?: boolean;
  isRequired?: boolean;
  requiredType: 'warning' | 'danger';
  requiredText: string;
  disabled?: boolean;
}