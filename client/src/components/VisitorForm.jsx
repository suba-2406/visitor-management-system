import { useState } from "react";
import API from "../services/api";
import PhotoCapture from "./PhotoCapture";
import SignaturePadBox from "./SignaturePadBox";

export default function VisitorForm({ refreshVisitors }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    purpose: "",
    personToMeet: "",
    department: "",
    photo: "",
    signature: ""
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.photo) {
      alert("Please capture visitor photo");
      return;
    }

    if (!formData.signature) {
      alert("Please save signature");
      return;
    }

    try {
      await API.post("/visitors", formData);

      alert("Visitor added successfully");

      setFormData({
        name: "",
        phone: "",
        purpose: "",
        personToMeet: "",
        department: "",
        photo: "",
        signature: ""
      });

      refreshVisitors();
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add visitor");
    }
  };

  return (
    <form className="visitor-form" onSubmit={handleSubmit}>
      <h2>Add New Visitor</h2>

      <div className="form-grid">
        <input
          type="text"
          name="name"
          placeholder="Visitor Name"
          value={formData.name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
        />

        <input
          type="text"
          name="purpose"
          placeholder="Purpose of Visit"
          value={formData.purpose}
          onChange={handleChange}
        />

        <input
          type="text"
          name="personToMeet"
          placeholder="Person To Meet"
          value={formData.personToMeet}
          onChange={handleChange}
        />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
        />
      </div>

      <div className="capture-grid">
        <PhotoCapture
          onCapture={(image) =>
            setFormData((prev) => ({ ...prev, photo: image }))
          }
        />

        <SignaturePadBox
          onSave={(signature) =>
            setFormData((prev) => ({ ...prev, signature }))
          }
        />
      </div>

      <button type="submit" className="submit-btn">
        Save Visitor Entry
      </button>
    </form>
  );
}