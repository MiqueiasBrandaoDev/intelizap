
import React from "react";

interface NavbarProgressBarProps {
  progress: number;
}

const NavbarProgressBar = ({ progress }: NavbarProgressBarProps) => {
  return (
    <div 
      className="scroll-progress bg-exertion-500" 
      style={{ width: `${progress}%`, height: "2px" }} 
    />
  );
};

export default NavbarProgressBar;
