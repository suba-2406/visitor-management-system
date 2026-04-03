import { Link, useLocation, useNavigate } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("admin");
    navigate("/");
  };

  return (
    <aside className="sidebar">
      <div>
        <h2 className="brand">VMS Pro</h2>
        <p className="brand-sub">Visitor Management</p>
      </div>

      <nav className="sidebar-nav">
        <Link
          to="/dashboard"
          className={location.pathname === "/dashboard" ? "active-link" : ""}
        >
          Dashboard
        </Link>

        <Link
          to="/visitors"
          className={location.pathname === "/visitors" ? "active-link" : ""}
        >
          Visitor Details
        </Link>
      </nav>

      <button className="logout-btn" onClick={handleLogout}>
        Logout
      </button>
    </aside>
  );
}