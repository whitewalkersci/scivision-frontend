import { Blur } from "konva/lib/filters/Blur";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom"; // Import ReactDOM for portal
import close_icon from "../assets/images/close_icon.svg";
// Modal Component
const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  OuterParentClass,
  closeBtnClass,
  WindowSize,
  HideClose
}) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  if (!isOpen || !isBrowser) {
    return null;
  }
  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) {
    console.error("Modal root not found");
    return null;
  }

  const modalContent = (
    <div className="fixed top-0 left-0 w-full h-full  backdrop-blur-sm   bg-opacity-50 flex justify-center items-center z-50 bg-[#061423A6]">
      <div className={`bg-white rounded-lg shadow-lg p-4  ${WindowSize} max-w-[90%] md:max-w-[80%] lg:max-w-[70%] md:w-auto`}>
        <div className="flex justify-end items-center mb-4 relative">
          <button
            className={
              `text-gray-600 hover:text-gray-800 focus:outline-none cursor-pointer absolute top-4 z-50 ${HideClose} ` +
              closeBtnClass
            }
            onClick={onClose}
          >
            <img src={close_icon} alt="icon" />
          </button>
        </div>
        <div className={OuterParentClass} onClick={(e) => e.stopPropagation()}>
          {children}
        </div>
      </div>
    </div>
  );
  // here ReactDOM.createPortal set the modal different from DOM tree here and avoid overlapping issue
  return ReactDOM.createPortal(
    modalContent,
    document.getElementById("modal-root") // Ensure you have a div with this id in your index.html
  );
};

export default Modal;

