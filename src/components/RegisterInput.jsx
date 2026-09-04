import React, { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

function RegisterInput({ onRegister, loading = false }) {
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
    if (loading) return;
    onRegister(email, password, firstName, lastName);
    resetInput();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-sm">
      <div className="flex gap-4">
        <Input
          type="text"
          id="firstName"
          label="Nama Depan"
          placeholder="Nama Depan"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={loading}
          required
        />
        <Input
          type="text"
          id="lastName"
          label="Nama Belakang"
          placeholder="Nama Belakang"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={loading}
          required
        />
      </div>
      <Input
        type="email"
        id="email"
        label="Alamat Email"
        placeholder="nama@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={loading}
        required
      />
      <Input
        type="password"
        id="password"
        label="Kata Sandi"
        placeholder="Minimal 6 karakter"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        disabled={loading}
        required
      />
      <Button type="submit" className="w-full mt-2" disabled={loading}>
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Membuat Akun...
          </span>
        ) : (
          "Buat Akun"
        )}
      </Button>
    </form>
  );
}

export default RegisterInput;

