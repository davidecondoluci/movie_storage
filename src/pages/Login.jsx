import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { supabase } from "../utils/supabaseClient";

import Logo from "../components/Logo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    await login(data.user);

    if (error) {
      alert(error.message);
    } else {
      console.log("Logged in successfully");
    }
  };
  return (
    <div className="flex h-screen justify-center items-center bg-gray">
      <div className="flex flex-col w-1/3 h-2/3 justify-center items-center p-8 rounded space-y-8 bg-white">
        <div className="flex flex-col justify-center items-center space-y-8">
          <h1>
            <Logo />
          </h1>
          <h2 className="text-2xl">Login to your account</h2>
        </div>
        <form
          onSubmit={handleLogin}
          className="flex flex-col w-full justify-center space-y-4"
        >
          <div className="flex flex-col">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="text"
              className="block w-full rounded border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-purple"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              className="block w-full rounded border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray placeholder:text-gray focus:ring-2 focus:ring-inset focus:ring-purple"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="rounded py-2 text-white bg-purple">
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
