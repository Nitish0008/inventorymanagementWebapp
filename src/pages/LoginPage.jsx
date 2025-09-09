import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Simulate backend authentication
  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === "test@example.com" && password === "123456") {
      navigate("/dashboard");
    } else {
      alert("Invalid email or password");
    }
  };

  // Disable scroll
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return (
    <div className="flex justify-center items-center mix-blend-screen h-screen">
      <div className="card lg:card-side bg-base-100 shadow-sm shadow-amber-100 w-full max-w-3xl">
        <figure className="w-1/2">
          <img
            src="https://thumbs.dreamstime.com/b/shopping-cart-placed-laptop-computer-store-under-lies-surrounded-items-like-water-flooring-wood-pet-supplies-322820707.jpg"
            alt="Album"
            className="object-cover h-full w-full"
          />
        </figure>
        <form onSubmit={handleSubmit} className="card-body w-1/2">
          <h2 className="card-title">LogIn</h2>
          <input
            type="text"
            placeholder="Enter your email"
            className="input input-success mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-success"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="card-actions mt-4">
            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </div>
          <p>
            Don't have an account?{" "}
            <a href="/register" className="text-blue-500">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
