export default function VisitorDetailCard({ visitor }) {
  if (!visitor) return null;

  return (
    <div className="visitor-detail-card">
      <div className="visitor-detail-left">
        <img src={visitor.photo} alt={visitor.name} className="detail-photo" />
      </div>

      <div className="visitor-detail-content">
        <h3>{visitor.name}</h3>
        <p><strong>Visitor ID:</strong> {visitor.visitorIdLabel}</p>
        <p><strong>Phone:</strong> {visitor.phone}</p>
        <p><strong>Purpose:</strong> {visitor.purpose}</p>
        <p><strong>Person To Meet:</strong> {visitor.personToMeet}</p>
        <p><strong>Department:</strong> {visitor.department}</p>
        <p><strong>Check In:</strong> {new Date(visitor.checkInTime).toLocaleString("en-IN")}</p>
        <p>
          <strong>Check Out:</strong>{" "}
          {visitor.checkOutTime
            ? new Date(visitor.checkOutTime).toLocaleString("en-IN")
            : "-"}
        </p>
        <p><strong>Status:</strong> {visitor.status}</p>
      </div>

      <div className="visitor-detail-right">
        <img src={visitor.signature} alt="signature" className="detail-signature" />
      </div>
    </div>
  );
}