"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface PopupProps {
  trigger: boolean;
  setTrigger: (value: boolean) => void;
  setLockScreen?: (value: boolean) => void; // Optional prop
  children?: React.ReactNode;
}

const Popup: React.FC<PopupProps> = (props) => {
  const router = useRouter();

  const handleClose = () => {
    props.setTrigger(false);
    if (props.setLockScreen) {
      props.setLockScreen(false);
    }
    if (typeof window !== "undefined") {
      router.push("/");
    }
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <button className="close-btn" onClick={handleClose}>
          close
        </button>
        {props.children}
      </div>
    </div>
  ) : null; // Return `null` instead of an empty string for no output
};

export default Popup;
