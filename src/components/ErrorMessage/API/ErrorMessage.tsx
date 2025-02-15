import s from './ErrorMessage.module.css';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }:ErrorMessageProps) => {
  return (
    <>
      <p className={s.errorMessage}>{message}</p>
    </>
  );
};

export default ErrorMessage;