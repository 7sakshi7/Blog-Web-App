import React from "react";

const Modal = (props) => {
  return (
    <div className="modal">
      <header className="modal__header">
        <h1>{props.title}</h1>
      </header>
      <div className="modal__content">{props.message}</div>
      <div className="modal__actions">
        <button>Ok!</button>
      </div>
    </div>
  );
};
export default Modal;
