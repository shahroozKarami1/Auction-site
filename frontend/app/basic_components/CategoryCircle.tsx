import React from "react";
import { SvgIconComponent } from "@mui/icons-material";

interface CategoryCircleProps {
  name: string;
  Icon: SvgIconComponent; // Material UI Icon component
  rotation: number; // Rotation angle for positioning
  radius: number; // Distance from the center (dynamic radius)
  onClick?: () => void; // Optional click handler for navigation or other actions
}

const CategoryCircle: React.FC<CategoryCircleProps> = ({
  name,
  Icon,
  rotation,
  radius,
  onClick,
}) => {
  return (
    <div
      onClick={onClick} // Add click handler here
      className=" category-item items-center justify-center flex flex-col cursor-pointer hover:border-b-4 border-b-0 border-border duration-75 "
      style={{
        transform: `rotate(${rotation}deg) translate(${radius}px) rotate(-${rotation}deg)`,
      }}
    >
      <Icon className="text-2xl text-foreground drop-shadow-md" />
      <div
        className=" shadow-2xl drop-shadow shadow-black w-[4rem] h-[0.3rem] "
        style={{
          boxShadow: "0 3px 4px 5px rgba(0, 0, 0, 0.6)",
          borderRadius: "50%",
        }}
      ></div>
      <span className="text-foreground text-sm drop-shadow-md">{name}</span>
    </div>
  );
};

export default CategoryCircle;
