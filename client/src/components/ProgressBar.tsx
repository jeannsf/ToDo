import React from "react";

interface ProgressBarProps {
  progress: number;
  status: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, status }) => {

  const statusColors: { [key: string]: string } = {
    pendente: "rgb(255, 175, 163)",
    "em progresso": "rgb(255, 214, 161)", 
    concluída: "rgb(141, 181, 145)", 
  };

  const color: string = statusColors[status] || "rgb(54, 82, 229)"; 

  return (
    <div className="outer-bar">
      <div
        className="inner-bar"
        style={{ width: `${progress}%`, backgroundColor: color }}
      ></div>
    </div>
  );
};

export default ProgressBar;