export interface AlertProps {
  variant?: "info" | "success" | "warning" | "danger";
  dismissible: boolean;
  autoDismiss: boolean;
  autoDismissInterval: number;
}