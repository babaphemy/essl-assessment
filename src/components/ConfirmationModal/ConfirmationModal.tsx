import React, { FC } from "react";
import Button from "../Button/Button";
import Modal from "../Modal/Modal";

type ConfirmationModalProps = {
  title: string;
  handleProceed: () => void;
  handleCancel: () => void;
};

const ConfirmationModal: FC<ConfirmationModalProps> = ({
  title,
  handleProceed,
  handleCancel,
}) => {
  return (
    <Modal>
      <div className="flex flex-col gap-3">
        <div className="flex w-full justify-end">
          <span
            className="py-2 px-4 rounded-full text-white bg-black cursor-pointer"
            onClick={handleCancel}
          >
            X
          </span>
        </div>
        <div>
          <p>{title}</p>
        </div>
        <div className="flex gap-4">
          <Button text="Cancel" variant="warning" onClick={handleCancel} />
          <Button text="Proceed" onClick={handleProceed} />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
