export interface NotificationProps {
  title?: string;
  message?: string;
  showIcon?: boolean;
  iconName?: string;
  position?: 'left' | 'right';
  variant?: 'info' | 'success' | 'warning' | 'danger';
  dismissible?: boolean;
  autoDismissInterval?: number;
  gap?: string;
}