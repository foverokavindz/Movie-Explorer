import toast from 'react-hot-toast';

// This utility function provides a simple way to show toast notifications
export const showToast = {
  success: (message: string) => toast.success(message),
  error: (message: string) => toast.error(message),
  loading: (message: string) => toast.loading(message),
  custom: (message: string, options?: any) => toast(message, options),
  dismiss: (toastId?: string) => toast.dismiss(toastId),
};
