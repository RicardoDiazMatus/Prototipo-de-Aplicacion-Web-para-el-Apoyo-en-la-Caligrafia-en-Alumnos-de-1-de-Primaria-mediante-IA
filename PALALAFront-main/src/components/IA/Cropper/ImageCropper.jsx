import React, { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { StyledImageCropper } from "./ImageCropper.styled";
import { motion } from "framer-motion";
import ButtonSubmit from "../../Utils/ButtonSubmit/ButtonSubmit";
import CropperViewer from "./CropperViewer/CropperViewer";
import getCroppedImg from "./cropImage";
function ImageCropper({ imgURL, handleReturn, handleImageCropped }) {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const [croppedArea, setCroppedArea] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null)
  const CROP_AREA_ASPECT = 4 / 3;


  const onCropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const showCroppedImage = async () => {
    try {
      const croppedImage = await getCroppedImg(
        imgURL,
        croppedAreaPixels,
        rotation
      )
      setCroppedImage(croppedImage);
      handleImageCropped(croppedImage);
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <StyledImageCropper>
      <motion.div className="cropper">
        <Cropper
          image={imgURL}
          aspect={CROP_AREA_ASPECT}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          onCropChange={setCrop}
          onCropAreaChange={setCroppedArea}
          onCropComplete={onCropComplete}
          onRotationChange={setRotation}
          onZoomChange={setZoom}
        />
      </motion.div>
      <motion.div className="cropper-options">
        <motion.div className="cropper-preview">
          {croppedArea && (
            <CropperViewer
              croppedArea={croppedArea}
              imgURL={imgURL}
              CROP_AREA_ASPECT={CROP_AREA_ASPECT}
              rotation={rotation}
            />
          )}
        </motion.div>
        <motion.div className="cropper-controls">
          <motion.div className="cropper-titles">
            <h3>Controles</h3>
            <p>Ajusta los valores para ajustar la plantilla</p>
          </motion.div>
          <motion.div className="cropper-sliders">
            <motion.div>
              <h3>Zoom</h3>
              <input
                type="range"
                value={zoom}
                min={1}
                max={3}
                step={0.1}
                aria-aria-labelledby="Zoom"
                onChange={(e) => {
                  setZoom(e.target.value);
                }}
                className="zoom-range"
              />
            </motion.div>
            <motion.div>
              <h3>Rotar</h3>
              <input
                type="range"
                value={rotation}
                min={0}
                max={360}
                step={1}
                aria-aria-labelledby="Rotation"
                onChange={(e) => {
                  setRotation(e.target.value);
                }}
                className="zoom-range"
              />
            </motion.div>
          </motion.div>
          <motion.div className="cropper-buttons">
            <ButtonSubmit label={"Listo"} onClick={showCroppedImage} />
            <ButtonSubmit label={"Cancelar"} onClick={handleReturn} />
          </motion.div>
        </motion.div>
      </motion.div>
    </StyledImageCropper>
  );
}

export default ImageCropper;
