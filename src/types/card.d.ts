export interface CardProps {
  imageSrc?: string;
  imageAlt?: string;
  title?: string;
  description?: string;
  disabled?: boolean;
  buttonText?: string;
  buttonProps?: Partial<import('./button').ButtonProps>;
  onClick?: () => void;
  onButtonClick?: () => void;
}