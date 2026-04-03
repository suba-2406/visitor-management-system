import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import VisitorForm from "../components/VisitorForm";
import VisitorTable from "../components/VisitorTable";
import VisitorDetailCard from "../components/VisitorDetailCard";

export default function Visitors() {
  const [visitors, setVisitors] = useState([]);
  const [selectedVisitor, setSelectedVisitor] = useState(null);

  const fetchVisitors = async () => {
    try {
      const res = await API.get("/visitors");
      setVisitors(res.data);
      if (res.data.length > 0) {
        setSelectedVisitor(res.data[0]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVisitors();
  }, []);

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <Header
          title="Visitor Details"
          subtitle="Manage visitor entries, signatures, photos and checkout records"
        />

        {selectedVisitor && <VisitorDetailCard visitor={selectedVisitor} />}

        <VisitorForm refreshVisitors={fetchVisitors} />
        <VisitorTable
          visitors={visitors}
          refreshVisitors={fetchVisitors}
          onSelectVisitor={setSelectedVisitor}
        />
      </main>
    </div>
  );
}