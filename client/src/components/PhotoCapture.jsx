import { useRef, useState } from "react";
import Webcam from "react-webcam";

export default function PhotoCapture({ onCapture }) {
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState("");

  const capturePhoto = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    onCapture(imageSrc);
  };

  const retakePhoto = () => {
    setCapturedImage("");
    onCapture("");
  };

  return (
    <div className="capture-box">
      <h3>Visitor Photo</h3>

      {!capturedImage ? (
        <>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="webcam-box"
          />
          <button type="button" onClick={capturePhoto}>
            Capture Photo
          </button>
        </>
      ) : (
        <>
          <img src={capturedImage} alt="Captured Visitor" className="preview-img" />
          <button type="button" onClick={retakePhoto}>
            Retake Photo
          </button>
        </>
      )}
    </div>
  );
}