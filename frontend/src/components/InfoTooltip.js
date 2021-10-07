import React from "react";

function InfoTooltip({ isOpen, onClose, info }) {
  return (
    <div className={`popup popup_infotool ${isOpen ? "popup_is-opened" : ""}`}>
      <div className="popup__container">
        <button type="button" className="popup__close" onClick={onClose} />
        <img src={info.icon} alt="" className="popup__icon" />
        <p className="popup__title_tooltip">{info.text}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
