import React, { useEffect, useState } from 'react';
import { Alert } from 'react-bootstrap';

interface IMessage {
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'danger'
    | 'warning'
    | 'info'
    | 'dark'
    | 'light';

  children: React.ReactNode;
  autoClose?: boolean;
  time?: number;
}
// use effect to clear a message when a register is done

const Message = ({
  variant = 'info',
  children,
  time = 3000,
  autoClose = false,
}: IMessage) => {
  const [open, setOpen] = useState(true);
  // use effect to clear the message when a update is done
  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setOpen(false);
      }, time);

      return () => clearTimeout(timer);
    }
  }, [autoClose, time]);

  return <>{open && <Alert variant={variant}>{children}</Alert>}</>;
};

export default Message;
