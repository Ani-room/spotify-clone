import React, { useState, useRef, useEffect } from 'react';

const VolumeKnob = ({ value, onChange }) => {
  const [isDragging, setIsDragging] = useState(false);
  const knobRef = useRef(null);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !knobRef.current) return;

    const rect = knobRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const angle = Math.atan2(e.clientY - centerY, e.clientX - centerX);
    const degrees = (angle * 180) / Math.PI;
    
    // Convert angle to volume (0-1)
    let normalizedAngle = degrees + 90;
    if (normalizedAngle < 0) normalizedAngle += 360;
    
    // Map 0-270 degrees to 0-1 volume
    const maxAngle = 270;
    const volume = Math.max(0, Math.min(1, normalizedAngle / maxAngle));
    
    onChange(volume);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const rotation = value * 270 - 135; // -135 to 135 degrees

  return (
    <div className="relative">
      <div
        ref={knobRef}
        className="w-8 h-8 bg-gray-700 rounded-full border-2 border-gray-600 cursor-pointer relative transition-colors hover:border-green-400"
        onMouseDown={handleMouseDown}
      >
        {/* Knob indicator */}
        <div
          className="absolute w-1 h-3 bg-white rounded-full top-0.5 left-1/2 transform -translate-x-1/2 origin-bottom transition-transform"
          style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
        />
        
        {/* Center dot */}
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-gray-400 rounded-full transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      
      {/* Volume arc */}
      <svg
        className="absolute -top-2 -left-2 w-12 h-12 pointer-events-none"
        viewBox="0 0 48 48"
      >
        <path
          d="M 8 24 A 16 16 0 0 1 40 24"
          fill="none"
          stroke="#374151"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M 8 24 A 16 16 0 0 1 40 24"
          fill="none"
          stroke="#10b981"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="50.26"
          strokeDashoffset={50.26 - (value * 50.26)}
          className="transition-all duration-150"
        />
      </svg>
    </div>
  );
};

export default VolumeKnob;