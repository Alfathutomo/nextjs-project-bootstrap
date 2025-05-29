"use client";

import { useEffect, useState } from "react";

interface Aplikasi {
  id: number;
  name: string;
  description?: string;
  url?: string;
}

export default function DataAplikasiPage() {
  const [aplikasiList, setAplikasiList] = useState<Aplikasi[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  async function fetchAplikasi() {
    const res = await fetch("/api/aplikasi");
    const data = await res.json();
    setAplikasiList(data);
  }

  useEffect(() => {
    fetchAplikasi();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { name, description, url };

    if (editingId === null) {
      // Create
      await fetch("/api/aplikasi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      // Update
      await fetch(`/api/aplikasi/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setName("");
    setDescription("");
    setUrl("");
    setEditingId(null);
    fetchAplikasi();
  }

  function handleEdit(aplikasi: Aplikasi) {
    setName(aplikasi.name);
    setDescription(aplikasi.description || "");
    setUrl(aplikasi.url || "");
    setEditingId(aplikasi.id);
  }

  async function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this item?")) {
      await fetch(`/api/aplikasi/${id}`, {
        method: "DELETE",
      });
      fetchAplikasi();
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Data Aplikasi Website</h1>
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
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            className="w-full border border-black rounded px-2 py-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">URL</label>
          <input
            type="url"
            className="w-full border border-black rounded px-2 py-1"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
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
              setDescription("");
              setUrl("");
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
            <th className="border border-black px-2 py-1">Description</th>
            <th className="border border-black px-2 py-1">URL</th>
            <th className="border border-black px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {aplikasiList.map((aplikasi) => (
            <tr key={aplikasi.id}>
              <td className="border border-black px-2 py-1">{aplikasi.name}</td>
              <td className="border border-black px-2 py-1">
                {aplikasi.description}
              </td>
              <td className="border border-black px-2 py-1">
                {aplikasi.url ? (
                  <a
                    href={aplikasi.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Link
                  </a>
                ) : (
                  "-"
                )}
              </td>
              <td className="border border-black px-2 py-1 space-x-2">
                <button
                  onClick={() => handleEdit(aplikasi)}
                  className="text-blue-600 underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(aplikasi.id)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {aplikasiList.length === 0 && (
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
