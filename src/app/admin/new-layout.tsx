"use client";

import { ReactNode, useEffect, useState } from "react";

interface StatCardProps {
  title: string;
  count: number;
  icon: React.ReactNode;
}

function StatCard({ title, count, icon }: StatCardProps) {
  return (
    <div className="bg-white shadow-xl rounded-xl p-6 flex flex-col items-center justify-center transition-transform transform hover:scale-105 duration-300 cursor-default border border-gray-200 hover:border-blue-500">
      <div className="text-blue-600 mb-4 text-3xl">{icon}</div>
      <h2 className="text-lg font-semibold text-gray-800 mb-1 text-center">{title}</h2>
      <p className="text-4xl font-extrabold text-blue-600">{count}</p>
    </div>
  );
}

function NavigationMenu() {
  return (
    <nav className="bg-white shadow-md rounded-lg max-w-7xl mx-auto p-4 mb-10 flex justify-center gap-6">
      <button className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition">
        Dashboard
      </button>
      <button className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition">
        Aplikasi
      </button>
      <button className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition">
        JCC
      </button>
      <button className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition">
        Tower
      </button>
      <button className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition">
        SPBE
      </button>
      <button className="px-4 py-2 rounded-md bg-gray-100 text-gray-800 font-medium hover:bg-gray-200 transition">
        Pengguna
      </button>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 text-center py-6 mt-20">
      <p>© 2024 Your Company Name. All rights reserved.</p>
    </footer>
  );
}

export default function AdminNewLayout() {
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
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-blue-50 to-blue-100">
          <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-20 w-20"></div>
        </div>
        <style>{\`
          .loader {
            border-top-color: #3b82f6;
            animation: spin 1.5s linear infinite;
          }
          @keyframes spin {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
        \`}</style>
      </>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-r from-red-50 to-red-100">
        <p className="text-red-600 text-xl font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 shadow-lg py-8">
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <h1 className="text-white text-4xl font-extrabold select-none tracking-wide">
            Admin Dashboard
          </h1>
          <div className="text-white font-medium select-none cursor-default">
            Welcome, Admin
          </div>
        </div>
      </header>

      {/* Navigation Menu */}
      <NavigationMenu />

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
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
</create_file>
