import { useRef } from "react";
import SignatureCanvas from "react-signature-canvas";

export default function SignaturePadBox({ onSave }) {
  const sigRef = useRef(null);

  const clearSignature = () => {
    sigRef.current.clear();
    onSave("");
  };

  const saveSignature = () => {
    if (!sigRef.current.isEmpty()) {
      const signatureData = sigRef.current.toDataURL("image/png");
      onSave(signatureData);
      alert("Signature saved");
    } else {
      alert("Please sign first");
    }
  };

  return (
    <div className="capture-box">
      <h3>E-Signature</h3>

      <SignatureCanvas
        ref={sigRef}
        penColor="black"
        canvasProps={{
          width: 350,
          height: 180,
          className: "signature-canvas"
        }}
      />

      <div className="btn-row">
        <button type="button" onClick={saveSignature}>
          Save Signature
        </button>
        <button type="button" onClick={clearSignature}>
          Clear
        </button>
      </div>
    </div>
  );
}