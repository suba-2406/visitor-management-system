import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import StatCard from "../components/StatCard";
import ChartsPanel from "../components/ChartsPanel";

export default function Dashboard() {
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await API.get("/visitors/dashboard/stats");
      setStats(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <div className="app-shell">
      <Sidebar />

      <main className="main-content">
        <Header
          title="Visitor Dashboard"
          subtitle="Monitor entries, exits, analytics and overall visitor flow"
        />

        {stats && (
          <>
            <div className="stats-grid">
              <StatCard title="Total Visitors" value={stats.cards.totalVisitors} />
              <StatCard title="Checked In" value={stats.cards.checkedIn} />
              <StatCard title="Checked Out" value={stats.cards.checkedOut} />
              <StatCard title="Today Visitors" value={stats.cards.todayVisitors} />
            </div>

            <ChartsPanel stats={stats} />
          </>
        )}
      </main>
    </div>
  );
}