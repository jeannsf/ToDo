import React from "react";

interface ProgressBarProps {
  progress: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  const colors: string[] = [
    "rgb(255, 214, 161)",
    "rgb(255, 175, 163)",
    "rgb(108, 115, 148)",
    "rgb(141, 181, 145)",
  ];

  const randomColor: string = colors[Math.floor(Math.random() * colors.length)];

  return (
    <div className="outer-bar">
      <div
        className="inner-bar"
        style={{ width: `${progress}%`, backgroundColor: randomColor }}
      ></div>
    </div>
  );
};

export default ProgressBar;
