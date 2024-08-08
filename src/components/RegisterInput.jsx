// RegisterForm.jsx
import React, { useState } from "react";

function RegisterInput({ onRegister }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  function resetInput() {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  }

  function handleSubmit(event) {
    event.preventDefault();
    onRegister(email, password, firstName, lastName);
    resetInput();
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        id="firstName"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />
      <input
        type="text"
        id="lastName"
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
        required
      />
      <input
        type="email"
        id="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default RegisterInput;
