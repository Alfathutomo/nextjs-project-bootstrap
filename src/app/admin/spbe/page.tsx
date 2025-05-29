"use client";

import { useEffect, useState } from "react";

interface SPBE {
  id: number;
  name: string;
  description?: string;
  status?: string;
}

export default function DataSPBEPage() {
  const [spbeList, setSpbeList] = useState<SPBE[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);

  async function fetchSpbe() {
    const res = await fetch("/api/spbe");
    const data = await res.json();
    setSpbeList(data);
  }

  useEffect(() => {
    fetchSpbe();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { name, description, status };

    if (editingId === null) {
      // Create
      await fetch("/api/spbe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      // Update
      await fetch(`/api/spbe/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setName("");
    setDescription("");
    setStatus("");
    setEditingId(null);
    fetchSpbe();
  }

  function handleEdit(spbe: SPBE) {
    setName(spbe.name);
    setDescription(spbe.description || "");
    setStatus(spbe.status || "");
    setEditingId(spbe.id);
  }

  async function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this item?")) {
      await fetch(`/api/spbe/${id}`, {
        method: "DELETE",
      });
      fetchSpbe();
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Data SPBE</h1>
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
              setDescription("");
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
            <th className="border border-black px-2 py-1">Description</th>
            <th className="border border-black px-2 py-1">Status</th>
            <th className="border border-black px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {spbeList.map((spbe) => (
            <tr key={spbe.id}>
              <td className="border border-black px-2 py-1">{spbe.name}</td>
              <td className="border border-black px-2 py-1">{spbe.description}</td>
              <td className="border border-black px-2 py-1">{spbe.status}</td>
              <td className="border border-black px-2 py-1 space-x-2">
                <button
                  onClick={() => handleEdit(spbe)}
                  className="text-blue-600 underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(spbe.id)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {spbeList.length === 0 && (
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
