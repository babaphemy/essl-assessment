"use client";
import React, { FC, ReactNode } from "react";
import ReactDOM from "react-dom";

type ModalProps = {
  children: ReactNode;
  close?: () => void;
};

const Modal: FC<ModalProps> = ({ children, close }) => {
  const modal = (
    <div className="fixed top-0 bottom-0 left-0 right-0 z-50 w-full h-full bg-off-transparent overflow-auto">
      <div className="h-screen flex items-center justify-center">
        <div
          onClick={close}
          className="flex flex-col relative min-w-[352px] ml-auto mr-auto rounded-2xl p-6 bg-white"
        >
          {children}
        </div>
      </div>
    </div>
  );

  return typeof window !== "undefined" ? (
    ReactDOM.createPortal(modal, document.body)
  ) : (
    <></>
  );
};

export default Modal;
