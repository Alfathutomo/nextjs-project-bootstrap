"use client";

import { useEffect, useState } from "react";

interface Tower {
  id: number;
  name: string;
  height?: number;
  location?: string;
  status?: string;
}

export default function DataTowerPage() {
  const [towerList, setTowerList] = useState<Tower[]>([]);
  const [name, setName] = useState("");
  const [height, setHeight] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  async function fetchTower() {
    const res = await fetch("/api/tower");
    const data = await res.json();
    setTowerList(data);
  }

  useEffect(() => {
    fetchTower();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = {
      name,
      height: height ? parseFloat(height) : undefined,
      location,
      status,
    };

    if (editingId === null) {
      // Create
      await fetch("/api/tower", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      // Update
      await fetch(`/api/tower/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setName("");
    setHeight("");
    setLocation("");
    setStatus("");
    setEditingId(null);
    fetchTower();
  }

  function handleEdit(tower: Tower) {
    setName(tower.name);
    setHeight(tower.height?.toString() || "");
    setLocation(tower.location || "");
    setStatus(tower.status || "");
    setEditingId(tower.id);
  }

  async function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this item?")) {
      await fetch(`/api/tower/${id}`, {
        method: "DELETE",
      });
      fetchTower();
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Data Tower</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-md">
        <div>
          <label className="block mb-1 font-semibold">Name</label>
          <input
            type="text"
            className="w-full border border-black rounded px-2 py-1"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Height (m)</label>
          <input
            type="number"
            step="0.01"
            className="w-full border border-black rounded px-2 py-1"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Location</label>
          <input
            type="text"
            className="w-full border border-black rounded px-2 py-1"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Status</label>
          <input
            type="text"
            className="w-full border border-black rounded px-2 py-1"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
        >
          {editingId === null ? "Add" : "Update"}
        </button>
        {editingId !== null && (
          <button
            type="button"
            onClick={() => {
              setName("");
              setHeight("");
              setLocation("");
              setStatus("");
              setEditingId(null);
            }}
            className="ml-4 px-4 py-2 border border-black rounded hover:bg-gray-200"
          >
            Cancel
          </button>
        )}
      </form>

      <table className="w-full border border-black">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-black px-2 py-1">Name</th>
            <th className="border border-black px-2 py-1">Height (m)</th>
            <th className="border border-black px-2 py-1">Location</th>
            <th className="border border-black px-2 py-1">Status</th>
            <th className="border border-black px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {towerList.map((tower) => (
            <tr key={tower.id}>
              <td className="border border-black px-2 py-1">{tower.name}</td>
              <td className="border border-black px-2 py-1">{tower.height}</td>
              <td className="border border-black px-2 py-1">{tower.location}</td>
              <td className="border border-black px-2 py-1">{tower.status}</td>
              <td className="border border-black px-2 py-1 space-x-2">
                <button
                  onClick={() => handleEdit(tower)}
                  className="text-blue-600 underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(tower.id)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {towerList.length === 0 && (
            <tr>
              <td
                colSpan={5}
                className="border border-black px-2 py-1 text-center text-gray-500"
              >
                No data found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
