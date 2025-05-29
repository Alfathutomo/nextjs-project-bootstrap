"use client";

import { useEffect, useState } from "react";

interface StatCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
}

function StatCard({ title, count, icon }: StatCardProps) {
  return (
    <div className="stat-card p-4 bg-white rounded shadow flex items-center space-x-4">
      <div className="icon text-blue-500">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{count}</p>
      </div>
    </div>
  );
}

function NavigationMenu() {
  return (
    <nav className="bg-gray-100 p-4 space-x-4">
      <button className="btn">Dashboard</button>
      <button className="btn">Aplikasi</button>
      <button className="btn">JCC</button>
      <button className="btn">Tower</button>
      <button className="btn">SPBE</button>
      <button className="btn">Pengguna</button>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="text-center p-4 text-sm text-gray-600">
      © 2024 Your Company Name. All rights reserved.
    </footer>
  );
}

export default function AdminLayout() {
  const [stats, setStats] = useState({
    aplikasi: 0,
    jcc: 0,
    tower: 0,
    spbe: 0,
    pengguna: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [aplikasiRes, jccRes, towerRes, spbeRes, penggunaRes] =
          await Promise.all([
            fetch("/api/aplikasi"),
            fetch("/api/jcc"),
            fetch("/api/tower"),
            fetch("/api/spbe"),
            fetch("/api/pengguna"),
          ]);

        if (
          !aplikasiRes.ok ||
          !jccRes.ok ||
          !towerRes.ok ||
          !spbeRes.ok ||
          !penggunaRes.ok
        ) {
          throw new Error("Failed to fetch data from one or more endpoints");
        }

        const [aplikasiData, jccData, towerData, spbeData, penggunaData] =
          await Promise.all([
            aplikasiRes.json(),
            jccRes.json(),
            towerRes.json(),
            spbeRes.json(),
            penggunaRes.json(),
          ]);

        setStats({
          aplikasi: Array.isArray(aplikasiData) ? aplikasiData.length : 0,
          jcc: Array.isArray(jccData) ? jccData.length : 0,
          tower: Array.isArray(towerData) ? towerData.length : 0,
          spbe: Array.isArray(spbeData) ? spbeData.length : 0,
          pengguna: Array.isArray(penggunaData) ? penggunaData.length : 0,
        });
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  if (loading) {
    return (
      <>
        <style>{`
          .loader {
            border-top-color: #3b82f6;
            animation: spin 1.5s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        `}</style>
        <div className="flex justify-center items-center h-screen">
          <div className="loader border-4 border-gray-200 rounded-full w-12 h-12 border-t-4"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-600 mt-10">
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow p-4">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p>Welcome, Admin</p>
      </header>

      {/* Navigation Menu */}
      <NavigationMenu />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-8">
          <StatCard
            title="Data Aplikasi Website"
            count={stats.aplikasi}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7v4a1 1 0 001 1h3M16 7v10a2 2 0 002 2h1"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7 7v10a2 2 0 01-2 2H4M10 7h4m-4 0v10m4-10v10m-3-7h.01"
                />
              </svg>
            }
          />
          <StatCard
            title="Data JCC"
            count={stats.jcc}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 17v-6a4 4 0 118 0v6m1 4H8a2 2 0 01-2-2v-3a2 2 0 012-2h8a2 2 0 012 2v3a2 2 0 01-2 2z"
                />
              </svg>
            }
          />
          <StatCard
            title="Data Tower"
            count={stats.tower}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v3m0 4h.01M4 9h16M4 12h16m-7-6v1m0 10v1m-4-5h8"
                />
              </svg>
            }
          />
          <StatCard
            title="Data SPBE"
            count={stats.spbe}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 15a4 4 0 118 0 4 4 0 11-8 0zM7 15v6m10-6a4 4 0 10-8 0 4 4 0 008 0z"
                />
              </svg>
            }
          />
          <StatCard
            title="Data Pengguna"
            count={stats.pengguna}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A4 4 0 107.5 21h9a4 4 0 10-2.379-7.196M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            }
          />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
