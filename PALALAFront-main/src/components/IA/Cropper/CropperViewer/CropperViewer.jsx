import React from "react";

function CropperViewer({ croppedArea, imgURL, CROP_AREA_ASPECT, rotation }) {
    
  const scale = 100 / croppedArea.width;
  const factor = (1600 - (1600 * (croppedArea.width)/100));
  const transform = {
    x: `${(-croppedArea.x )  * scale }%`,
    y: `${(-croppedArea.y ) * scale }%`,
    scale,
    width: "calc(100% + 0.5px)",
    height: "auto",
    rotate: `${rotation}`,
    
  };

  const imageStyle = {
    transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
    width: transform.width,
    height: transform.height,
  };

  return (
    <div style={{ paddingBottom: `${100 / CROP_AREA_ASPECT}%` }}>
      <img src={imgURL} style={imageStyle} alt="Cropped Image" />
    </div>
  );
}

export default CropperViewer;
