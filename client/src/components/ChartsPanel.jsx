import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  CartesianGrid
} from "recharts";

export default function ChartsPanel({ stats }) {
  if (!stats) return null;

  const pieColors = ["#7c3aed", "#06b6d4", "#22c55e", "#f97316", "#ef4444"];

  return (
    <div className="charts-grid">
      <div className="chart-card">
        <h3>Visitors by Purpose</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={stats.charts.purposeChart}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#7c3aed" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Visitors by Department</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={stats.charts.departmentChart}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#06b6d4" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Status Chart</h3>
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={stats.charts.statusChart}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
              label
            >
              {stats.charts.statusChart.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={pieColors[index % pieColors.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card">
        <h3>Daily Entries</h3>
        <ResponsiveContainer width="100%" height={280}>
          <LineChart data={stats.charts.dailyChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="count" stroke="#22c55e" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-card full-width">
        <h3>Hourly Visitor Entries</h3>
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={stats.charts.hourlyChart}>
            <XAxis dataKey="hour" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#f97316" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}