import { useEffect, useState } from "react";
import api from "../services/api";

export default function Teams() {
  const [teams, setTeams] = useState([]);

  async function load() {
    const res = await api.get("/teams");
    setTeams(res.data);
  }

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <h2>Teams</h2>
      <ul>
        {teams.map(t => (
          <li key={t.id}>{t.name}</li>
        ))}
      </ul>
    </>
  );
}
