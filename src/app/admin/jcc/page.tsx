"use client";

import { useEffect, useState } from "react";

interface JCC {
  id: number;
  name: string;
  location?: string;
  status?: string;
}

export default function DataJCCPage() {
  const [jccList, setJccList] = useState<JCC[]>([]);
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  async function fetchJcc() {
    const res = await fetch("/api/jcc");
    const data = await res.json();
    setJccList(data);
  }

  useEffect(() => {
    fetchJcc();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { name, location, status };

    if (editingId === null) {
      // Create
      await fetch("/api/jcc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      // Update
      await fetch(`/api/jcc/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setName("");
    setLocation("");
    setStatus("");
    setEditingId(null);
    fetchJcc();
  }

  function handleEdit(jcc: JCC) {
    setName(jcc.name);
    setLocation(jcc.location || "");
    setStatus(jcc.status || "");
    setEditingId(jcc.id);
  }

  async function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this item?")) {
      await fetch(`/api/jcc/${id}`, {
        method: "DELETE",
      });
      fetchJcc();
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Data JCC</h1>
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
            <th className="border border-black px-2 py-1">Location</th>
            <th className="border border-black px-2 py-1">Status</th>
            <th className="border border-black px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jccList.map((jcc) => (
            <tr key={jcc.id}>
              <td className="border border-black px-2 py-1">{jcc.name}</td>
              <td className="border border-black px-2 py-1">{jcc.location}</td>
              <td className="border border-black px-2 py-1">{jcc.status}</td>
              <td className="border border-black px-2 py-1 space-x-2">
                <button
                  onClick={() => handleEdit(jcc)}
                  className="text-blue-600 underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(jcc.id)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {jccList.length === 0 && (
            <tr>
              <td
                colSpan={4}
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
