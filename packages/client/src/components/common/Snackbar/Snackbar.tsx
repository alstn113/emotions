export interface SnackbarProps {
  message: string;
}

const Snackbar = ({ message }: SnackbarProps) => {
  return <div>{message}</div>;
};

export default Snackbar;
