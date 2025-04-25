import { toast } from 'sonner';

export const showToast = {
  success: (message: string) => {
    toast.success(message);
  },
  error: (message: string) => {
    toast.error(message);
  },
  info: (message: string) => {
    toast.info(message);
  },
  warning: (message: string) => {
    toast.warning(message);
  },
  loading: (message: string) => {
    return toast.loading(message);
  },
  custom: (
    title: string, 
    description?: string, 
    options?: { duration?: number; action?: { label: string; onClick: () => void } }
  ) => {
    return toast(title, {
      description,
      duration: options?.duration || 5000,
      action: options?.action ? {
        label: options.action.label,
        onClick: options.action.onClick,
      } : undefined,
    });
  },
  dismiss: (toastId: string) => {
    toast.dismiss(toastId);
  }
}; 