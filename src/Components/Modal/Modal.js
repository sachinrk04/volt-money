import React from "react";
import "./Modal.scss";

export default function Modal({ modalTitle, children, closePopup }) {
  return (
    <div className="modal-overlat" onClick={closePopup}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{modalTitle}</h3>
          <button className="modal-close" onClick={closePopup}>
            X
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
