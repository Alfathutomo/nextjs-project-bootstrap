"use client";

interface StatCardProps {
  title: string;
  count: number;
  className?: string;
}

export default function StatCard({ title, count, className = "" }: StatCardProps) {
  return (
    <div
      className={
        "p-6 border border-gray-300 rounded-xl shadow-md hover:shadow-xl transition duration-300 ease-in-out bg-gradient-to-r from-white to-gray-50 " +
        className
      }
    >
      <h2 className="text-2xl font-semibold mb-4 text-gray-900">{title}</h2>
      <p className="text-5xl font-extrabold text-black">{count}</p>
    </div>
  );
}
