export interface ListItemprops {
  title?: string;
  body?: string;
  layout?: 'default' | 'compressed';
  isClickable: boolean;
  onClick?: (...args: any[]) => void;
  showIcon?: boolean;
  iconName?: string;
}