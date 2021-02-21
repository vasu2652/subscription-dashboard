import { Snackbar } from '@material-ui/core';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
function Alert(props: JSX.IntrinsicAttributes & AlertProps) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
export const TopSnackBar = (props: { open: any; duration?: 5000 | undefined; severity: any; message: any; handleClose: any; vertical?: "top" | undefined; horizontal?: "center" | undefined; })=>{
  const {open, duration=5000, severity, message, handleClose, vertical="top", horizontal="center"} = props
  return (
      <Snackbar open={open} autoHideDuration={duration} onClose={handleClose} anchorOrigin={{ vertical, horizontal }} key={vertical + horizontal}>
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  )
}