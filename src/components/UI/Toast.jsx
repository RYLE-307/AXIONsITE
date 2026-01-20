import React from 'react';

const iconFor = (type) => {
  switch(type) {
    case 'success': return <i className="fa-solid fa-circle-check" aria-hidden></i>;
    case 'error': return <i className="fa-solid fa-circle-exclamation" aria-hidden></i>;
    case 'warning': return <i className="fa-solid fa-triangle-exclamation" aria-hidden></i>;
    default: return <i className="fa-solid fa-info" aria-hidden></i>;
  }
}

const Toast = ({ type = 'info', message }) => {
  return (
    <div className={`toast toast--${type}`} role="status" aria-live="polite">
      <div className="toast-icon">{iconFor(type)}</div>
      <div className="toast-message">{message}</div>
    </div>
  );
};

export default Toast;
