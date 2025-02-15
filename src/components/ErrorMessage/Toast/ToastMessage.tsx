
import toast from 'react-hot-toast';

interface toastProps {
  type: 'warn' | 'error' | 'success';
  message: string;
}

const customToast = ({type, message}: toastProps) => {
  const styles = {
    warn: { icon: '⚠️', border: '#FFA500', color: '#FFA500' },
    error: { icon: '❌', border: '#FF0000', color: '#FF0000' },
    success: { icon: '✅', border: '#00FF00', color: '#00FF00' },
  };

  const { icon, border, color } = styles[type];

  toast(message, {
    icon,
    position: 'top-right',
    style: {
      border: `1px solid ${border}`,
      padding: '16px',
      color,
    },
  });
};

export default customToast;
