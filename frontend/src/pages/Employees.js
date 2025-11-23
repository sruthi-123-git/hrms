import { useEffect, useState } from "react";
import api from "../services/api";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api.get("/employees").then(res => setEmployees(res.data));
  }, []);

  return (
    <div>
      <h2>Employees</h2>
      <ul>
        {employees.map(e => (
          <li key={e.id}>{e.first_name} {e.last_name}</li>
        ))}
      </ul>
    </div>
  );
}
