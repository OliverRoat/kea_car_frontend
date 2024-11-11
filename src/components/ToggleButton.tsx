import React from "react";
import "../styles/ToggleButton.css";

interface ToggleButtonProps {
  isToggled: boolean;
  onToggle: () => void;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ isToggled, onToggle }) => {
  return (
    <div
      className={`toggle-container ${isToggled ? "toggled" : ""}`}
      onClick={onToggle}
    >
      <div className="toggle-slider"></div>
      <span className="toggle-label">{isToggled ? "YES" : "NO"}</span>
    </div>
  );
};

export default ToggleButton;
