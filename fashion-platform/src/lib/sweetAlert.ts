import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Crear instancia de SweetAlert2 con React
const MySwal = withReactContent(Swal);

// Configuración base para mantener consistencia visual
const baseConfig = {
  customClass: {
    popup: 'rounded-xl shadow-2xl',
    title: 'text-xl font-semibold',
    content: 'text-gray-600',
    confirmButton: 'bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg',
    cancelButton: 'bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all duration-200 border border-gray-200',
  },
  buttonsStyling: false,
  showClass: {
    popup: 'animate-scale-in'
  },
  hideClass: {
    popup: 'animate-scale-out'
  }
};

// Confirmación estándar
export const showConfirmation = (options: {
  title: string;
  text: string;
  confirmText?: string;
  cancelText?: string;
  icon?: 'warning' | 'question' | 'info';
}) => {
  return MySwal.fire({
    ...baseConfig,
    title: options.title,
    text: options.text,
    icon: options.icon || 'question',
    showCancelButton: true,
    confirmButtonText: options.confirmText || 'Confirmar',
    cancelButtonText: options.cancelText || 'Cancelar',
    focusCancel: true,
  });
};

// Alerta de éxito
export const showSuccess = (options: {
  title: string;
  text?: string;
  timer?: number;
}) => {
  return MySwal.fire({
    ...baseConfig,
    title: options.title,
    text: options.text,
    icon: 'success',
    timer: options.timer || 3000,
    timerProgressBar: true,
    showConfirmButton: false,
  });
};

// Alerta de error
export const showError = (options: {
  title: string;
  text: string;
  confirmText?: string;
}) => {
  return MySwal.fire({
    ...baseConfig,
    title: options.title,
    text: options.text,
    icon: 'error',
    confirmButtonText: options.confirmText || 'Entendido',
  });
};

// Alerta de advertencia
export const showWarning = (options: {
  title: string;
  text: string;
  confirmText?: string;
  cancelText?: string;
}) => {
  return MySwal.fire({
    ...baseConfig,
    title: options.title,
    text: options.text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: options.confirmText || 'Continuar',
    cancelButtonText: options.cancelText || 'Cancelar',
  });
};

// Alerta informativa
export const showInfo = (options: {
  title: string;
  text: string;
  confirmText?: string;
}) => {
  return MySwal.fire({
    ...baseConfig,
    title: options.title,
    text: options.text,
    icon: 'info',
    confirmButtonText: options.confirmText || 'Entendido',
  });
};

// Confirmación de eliminación (especial)
export const showDeleteConfirmation = (itemName: string) => {
  return MySwal.fire({
    ...baseConfig,
    title: '¿Estás seguro?',
    text: `Esta acción eliminará "${itemName}" permanentemente.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar',
    customClass: {
      ...baseConfig.customClass,
      confirmButton: 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg',
    },
    focusCancel: true,
  });
};

// Toast para notificaciones rápidas con SweetAlert2 (alternativa a sonner si se desea)
export const showToast = (options: {
  title: string;
  icon: 'success' | 'error' | 'warning' | 'info';
  timer?: number;
}) => {
  return MySwal.fire({
    title: options.title,
    icon: options.icon,
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: options.timer || 3000,
    timerProgressBar: true,
    customClass: {
      popup: 'rounded-xl shadow-lg',
    },
  });
};

export default MySwal; 