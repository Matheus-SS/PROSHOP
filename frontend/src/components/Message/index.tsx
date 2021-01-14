import React from 'react';
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
}
// use effect to clear a message when a register is done

const Message = ({ variant = 'info', children }: IMessage) => {
  return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
