import React from "react";

const SvgRollerLoader = ({
  size = 80,
  strokeWidth = 5,
  color = "#facc15",
  className = "",
}) => {
  const radius = (size - strokeWidth) / 2;
  const dashArray = 2 * Math.PI * radius;
  const dashLength = dashArray * 0.3;

  return (
    <div className={`relative`} style={{ width: size, height: size }}>
      {/* Spinning SVG arc */}
      <svg
        className={`absolute inset-0 spin-fast ${className}`}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        {/* Static clock circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Rotating arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${dashLength} ${dashArray}`}
          strokeDashoffset="0"
          fill="none"
        />
      </svg>

      {/* Clock icon in center */}
      <svg
        className="absolute inset-0 m-auto text-[#004368]"
        width={size * 0.2}
        height={size * 0.2}
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M12 1.75A10.25 10.25 0 1 0 22.25 12 10.262 10.262 0 0 0 12 1.75Zm0 18.5a8.25 8.25 0 1 1 8.25-8.25 8.259 8.259 0 0 1-8.25 8.25Zm.625-8.875V7.5a.625.625 0 1 0-1.25 0v4a.625.625 0 0 0 .183.442l2.5 2.5a.625.625 0 1 0 .884-.884Z" />
      </svg>
    </div>
  );
};

export default SvgRollerLoader;
