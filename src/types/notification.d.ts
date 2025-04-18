export interface NotificationProps {
  title?: string;
  message?: string;
  position?: "left" | "center" | "right";
  variant?: "info" | "success" | "warning" | "danger";
  dismissible?: boolean;
  autoDismissInterval?: number;
}