import React from "react";
import { IconType } from "react-icons";

function InfoCards({
  Icon,
  counts,
  text,
  color,
  textColor,
  className,
  onClick,
}: {
  Icon: IconType;
  counts?: number | string;
  text: string;
  color: string;
  textColor: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`rounded-lg ${color} ${className} text-white w-full md:w-1/3 p-4 space-y-2`}
    >
      <div className="w-full flex items-center text-lg justify-end">
        <span className="rounded-full p-1 bg-white">
          <Icon className={`${textColor} text-2xl`} />
        </span>
      </div>
      <p className="text-sm">{text}</p>
      <p className="text-2xl font-bold">{counts}</p>
    </div>
  );
}

export default InfoCards;
