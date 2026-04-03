import API from "../services/api";

export default function VisitorTable({
  visitors,
  refreshVisitors,
  onSelectVisitor
}) {
  const handleCheckOut = async (id) => {
    try {
      await API.put(`/visitors/checkout/${id}`);
      alert("Visitor checked out successfully");
      refreshVisitors();
    } catch (error) {
      alert(error.response?.data?.message || "Checkout failed");
    }
  };

  return (
    <div className="table-section premium-card">
      <div className="section-head">
        <h2>Visitor Records</h2>
        <p>Click any row to see full visitor details</p>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Visitor ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Purpose</th>
              <th>Meet</th>
              <th>Department</th>
              <th>Check In</th>
              <th>Check Out</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {visitors.length > 0 ? (
              visitors.map((visitor) => (
                <tr
                  key={visitor._id}
                  onClick={() => onSelectVisitor(visitor)}
                  className="clickable-row"
                >
                  <td>{visitor.visitorIdLabel}</td>
                  <td>{visitor.name}</td>
                  <td>{visitor.phone}</td>
                  <td>{visitor.purpose}</td>
                  <td>{visitor.personToMeet}</td>
                  <td>{visitor.department}</td>
                  <td>{new Date(visitor.checkInTime).toLocaleString("en-IN")}</td>
                  <td>
                    {visitor.checkOutTime
                      ? new Date(visitor.checkOutTime).toLocaleString("en-IN")
                      : "-"}
                  </td>
                  <td>
                    <span
                      className={
                        visitor.status === "IN" ? "status-badge in" : "status-badge out"
                      }
                    >
                      {visitor.status}
                    </span>
                  </td>
                  <td>
                    {visitor.status === "IN" ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCheckOut(visitor._id);
                        }}
                      >
                        Check Out
                      </button>
                    ) : (
                      "Done"
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10">No visitor records found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}