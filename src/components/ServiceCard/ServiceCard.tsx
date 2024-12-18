import React, { FC } from "react";
import Button from "../Button/Button";
import dayjs from "dayjs";

type ServiceCardProps = {
  title: string;
  status: "pending" | "completed" | "canceled";
  time: string;
  handleCancel: () => void;
  handleComplete: () => void;
  handleDelete: () => void;
};

const statusVariant = {
  pending: "bg-yellow-200",
  completed: "bg-green-200",
  canceled: "bg-red-200",
};

const ServiceCard: FC<ServiceCardProps> = ({
  title,
  status,
  time,
  handleCancel,
  handleComplete,
  handleDelete,
}) => {
  return (
    <div className="border p-4 w-full">
      <h3 className="text-[18px] leading-5 capitalize">{title}</h3>
      <div className="flex items-center justify-between my-2">
        <p className={`flex rounded-lg py-1 px-3 ${statusVariant[status]}`}>
          {status}
        </p>
        <div>
          <p>{dayjs(time).format("D, MMM, YYYY")}</p>
          <p>{dayjs(time).format("h:m a")}</p>
        </div>
      </div>
      <div className="flex gap-4">
        {status === "pending" ? (
          <>
            <Button text="Complete" onClick={handleComplete} />
            <Button text="Cancel" variant="warning" onClick={handleCancel} />
          </>
        ) : (
          <Button text="Delete" variant="danger" onClick={handleDelete} />
        )}
      </div>
    </div>
  );
};

export default ServiceCard;
