"use client";

import { useEffect, useState } from "react";
import StatCard from "./components/StatCard";

export default function AdminPage() {
  const [stats, setStats] = useState({
    aplikasi: 0,
    jcc: 0,
    tower: 0,
    spbe: 0,
    pengguna: 0,
  });

  useEffect(() => {
    async function fetchStats() {
      const [aplikasiRes, jccRes, towerRes, spbeRes, penggunaRes] =
        await Promise.all([
          fetch("/api/aplikasi"),
          fetch("/api/jcc"),
          fetch("/api/tower"),
          fetch("/api/spbe"),
          fetch("/api/pengguna"),
        ]);
      const [aplikasiData, jccData, towerData, spbeData, penggunaData] =
        await Promise.all([
          aplikasiRes.json(),
          jccRes.json(),
          towerRes.json(),
          spbeRes.json(),
          penggunaRes.json(),
        ]);
      setStats({
        aplikasi: aplikasiData.length,
        jcc: jccData.length,
        tower: towerData.length,
        spbe: spbeData.length,
        pengguna: penggunaData.length,
      });
    }
    fetchStats();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-5xl font-extrabold mb-12 text-center text-gray-900">
        Admin Dashboard
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        <StatCard title="Data Aplikasi Website" count={stats.aplikasi} />
        <StatCard title="Data JCC" count={stats.jcc} />
        <StatCard title="Data Tower" count={stats.tower} />
        <StatCard title="Data SPBE" count={stats.spbe} />
        <StatCard title="Data Pengguna" count={stats.pengguna} />
      </div>
    </div>
  );
}