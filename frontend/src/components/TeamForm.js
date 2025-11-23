import { useState, useEffect } from "react";
import api from "../services/api";

export default function TeamForm({ onSuccess, team }) {
  const [name, setName] = useState("");
  const [description, setDesc] = useState("");

  useEffect(() => {
    if (team) {
      setName(team.name);
      setDesc(team.description);
    }
  }, [team]);

  async function submit(e) {
    e.preventDefault();
    const body = { name, description };

    if (team) {
      await api.put(`/teams/${team.id}`, body);
    } else {
      await api.post("/teams", body);
    }

    onSuccess();
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 20 }}>
      <h3>{team ? "Edit Team" : "Add Team"}</h3>

      <input
        placeholder="Team name"
        value={name}
        onChange={e => setName(e.target.value)}
      /><br />

      <textarea
        placeholder="Description"
        value={description}
        onChange={e => setDesc(e.target.value)}
      /><br />

      <button>{team ? "Update" : "Create"}</button>
    </form>
  );
}
