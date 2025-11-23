import { useState, useEffect } from "react";
import api from "../services/api";

export default function EmployeeForm({ onSuccess, employee }) {
  const [first_name, setFirst] = useState("");
  const [last_name, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    if (employee) {
      setFirst(employee.first_name);
      setLast(employee.last_name);
      setEmail(employee.email);
      setPhone(employee.phone);
    }
  }, [employee]);

  async function submit(e) {
    e.preventDefault();
    const body = { first_name, last_name, email, phone };

    if (employee) {
      await api.put(`/employees/${employee.id}`, body);
    } else {
      await api.post("/employees", body);
    }

    onSuccess();
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 20 }}>
      <h3>{employee ? "Edit Employee" : "Add Employee"}</h3>

      <input
        placeholder="First name"
        value={first_name}
        onChange={e => setFirst(e.target.value)}
      /><br />

      <input
        placeholder="Last name"
        value={last_name}
        onChange={e => setLast(e.target.value)}
      /><br />

      <input
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      /><br />

      <input
        placeholder="Phone"
        value={phone}
        onChange={e => setPhone(e.target.value)}
      /><br />

      <button>{employee ? "Update" : "Create"}</button>
    </form>
  );
}
