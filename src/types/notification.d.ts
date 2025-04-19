export interface NotificationProps {
  title?: string;
  message?: string;
  showIcon?: boolean;
  iconName?: string;
  position?: "left" | "center" | "right";
  variant?: "info" | "success" | "warning" | "danger";
  dismissible?: boolean;
  autoDismissInterval?: number;
}