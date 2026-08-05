import React, { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

function LoginInput({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    onLogin(email, password);
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5 w-full max-w-sm">
      <Input
        type="email"
        label="Alamat Email"
        value={email}
        placeholder="nama@email.com"
        onChange={(event) => setEmail(event.target.value)}
        required
      />
      <Input
        type="password"
        label="Kata Sandi"
        value={password}
        placeholder="••••••••"
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <Button type="submit" className="w-full mt-2">
        Masuk
      </Button>
    </form>
  );
}

export default LoginInput;
