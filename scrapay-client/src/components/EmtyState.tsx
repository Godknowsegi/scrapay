import { Button } from "@chakra-ui/react";
import React, { MouseEventHandler } from "react";
import { IconType } from "react-icons";
import { TiUser } from "react-icons/ti";

function EmptyState({
  text,
  Icon,
  buttonText,
  button,
  onClick,
}: {
  text: string;
  Icon: IconType;
  buttonText?: string;
  button?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <div className="w-full space-y-3 h-[300px] flex rounded-md bg-slate-100 flex-col items-center justify-center">
      <span className="rounded-full bg-primary/10 flex items-center justify-center  w-10 h-10">
        <Icon className="text-lg text-textColor/40" />
      </span>
      <p className="text-blackBg text-center max-w-[200px] text-xs">{text}</p>
      {button && (
        <Button className="!font-normal !scale-90" onClick={onClick}>
          {buttonText}
        </Button>
      )}
    </div>
  );
}

export default EmptyState;
