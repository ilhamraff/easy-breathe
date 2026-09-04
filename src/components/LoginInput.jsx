import React, { useState } from "react";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";

function LoginInput({ onLogin, loading = false }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;
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
        disabled={loading}
        required
      />
      <Input
        type="password"
        label="Kata Sandi"
        value={password}
        placeholder="••••••••"
        onChange={(event) => setPassword(event.target.value)}
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
            Memproses...
          </span>
        ) : (
          "Masuk"
        )}
      </Button>
    </form>
  );
}

export default LoginInput;

