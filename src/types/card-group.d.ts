export type CardClickMode = 'none' | 'card' | 'button';

export interface CardGroupProps {
  columns?: number;
  clampLines?: number;
  clickMode?: CardClickMode;
  gap?: string;
  buttonText?: string;
  buttonProps?: Partial<import('./button').ButtonProps>;
}