import React, { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

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
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-sm">
      <div className="flex gap-4">
        <Input
          type="text"
          id="firstName"
          label="Nama Depan"
          placeholder="Nama Depan"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />
        <Input
          type="text"
          id="lastName"
          label="Nama Belakang"
          placeholder="Nama Belakang"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
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
        required
      />
      <Input
        type="password"
        id="password"
        label="Kata Sandi"
        placeholder="Minimal 6 karakter"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Button type="submit" className="w-full mt-2">
        Buat Akun
      </Button>
    </form>
  );
}

export default RegisterInput;
