"use client";

import { useEffect, useState } from "react";

interface Pengguna {
  id: number;
  username: string;
  role: string;
}

export default function DataPenggunaPage() {
  const [penggunaList, setPenggunaList] = useState<Pengguna[]>([]);
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("admin");
  const [editingId, setEditingId] = useState<number | null>(null);

  async function fetchPengguna() {
    const res = await fetch("/api/pengguna");
    const data = await res.json();
    setPenggunaList(data);
  }

  useEffect(() => {
    fetchPengguna();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const payload = { username, role };

    if (editingId === null) {
      // Create
      await fetch("/api/pengguna", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      // Update
      await fetch(`/api/pengguna/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setUsername("");
    setRole("admin");
    setEditingId(null);
    fetchPengguna();
  }

  function handleEdit(pengguna: Pengguna) {
    setUsername(pengguna.username);
    setRole(pengguna.role);
    setEditingId(pengguna.id);
  }

  async function handleDelete(id: number) {
    if (confirm("Are you sure you want to delete this user?")) {
      await fetch(`/api/pengguna/${id}`, {
        method: "DELETE",
      });
      fetchPengguna();
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Data Pengguna</h1>
      <form onSubmit={handleSubmit} className="mb-6 space-y-4 max-w-md">
        <div>
          <label className="block mb-1 font-semibold">Username</label>
          <input
            type="text"
            className="w-full border border-black rounded px-2 py-1"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block mb-1 font-semibold">Role</label>
          <select
            className="w-full border border-black rounded px-2 py-1"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
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
              setUsername("");
              setRole("admin");
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
            <th className="border border-black px-2 py-1">Username</th>
            <th className="border border-black px-2 py-1">Role</th>
            <th className="border border-black px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {penggunaList.map((pengguna) => (
            <tr key={pengguna.id}>
              <td className="border border-black px-2 py-1">{pengguna.username}</td>
              <td className="border border-black px-2 py-1">{pengguna.role}</td>
              <td className="border border-black px-2 py-1 space-x-2">
                <button
                  onClick={() => handleEdit(pengguna)}
                  className="text-blue-600 underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(pengguna.id)}
                  className="text-red-600 underline"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {penggunaList.length === 0 && (
            <tr>
              <td
                colSpan={3}
                className="border border-black px-2 py-1 text-center text-gray-500"
              >
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
