import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom";
//
type ModalProps = {
  zIndex?: string;
  withShade?: boolean;
  ghostClose?: boolean;
  onBackdropClick?: () => void;
  allCentered?: boolean;
  modalRoot?: string;
  containerClass?: string;
};
//
// Modal component to render any necessary component in a popup view using React portal.
export const Modal = (props: PropsWithChildren<ModalProps>) => {
  return ReactDOM.createPortal(
    <div
      className={`pageFadeIn fixed inset-0 overflow-y-auto ${
        props.zIndex ? props.zIndex : "z-50"
      }`}
    >
      {props.ghostClose && (
        <div
          onClick={props.onBackdropClick}
          className="inline fixed z-20 text-white right-5 sm:right-10 top-5 text-xl font-bold cursor-pointer"
        >
          X
        </div>
      )}
      {props.allCentered ? (
        <div className=" flex justify-center items-center h-screen">
          <div
            onClick={props.onBackdropClick}
            className={`fixed inset-0 z-0 ${
              props.withShade && "bg-black opacity-75"
            }`}
          />
          <div className="relative z-10">{props.children}</div>
        </div>
      ) : (
        <div className="relative z-10">{props.children}</div>
      )}
    </div>,
    document.getElementById(props.modalRoot ?? "modal") as any
  );
};
