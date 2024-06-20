import React, { useState } from "react";
import rootcontext from "../contextapi/rootcontext";
import { useContext } from "react";
import client from "./gqlClient/graphClient.js";
import { GET_AUTHOR_BY_PASSWORD } from "../graphql/query8.js";
import { useNavigate, Link } from "react-router-dom";
import "./css/login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [loading, setLoading] = useState(false);

  let navigate = useNavigate();

  const context = useContext(rootcontext);
  const { flag } = context;

  const handleSubmit = async (e) => {
    setWarning("");
    setLoading(true);
    e.preventDefault();

    const combinedPassword = `${email}${password}`;

    try {
      const variables = { password: combinedPassword };
      const data = await client.request(GET_AUTHOR_BY_PASSWORD, variables);

      if (data.author) {
        localStorage.setItem("userId", data.author.id);
        setWarning("Logged in successfully!");
        setTimeout(() => {
          window.location.reload();
        }, 0);

        if (flag == 1) navigate("/createPost");
        else navigate("/");
      } else {
        setWarning("Wrong credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      setWarning("An error occurred");
    }

    setLoading(false);
  };
  return (
    <div className="logincont">
      <div className="container p-2 my-3 signupcontainer">
        <h2 className="mx-2">Login</h2>
        <div className="text-white bg-dark p-3 rounded-4 my-2 signupform">
          <form onSubmit={handleSubmit}>
            <div className="form-group my-3 text-uppercase">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control my-3"
                id="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group my-3 text-uppercase">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control my-3"
                id="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {warning && (
              <div
                className={`form-text text-capitalize text-danger bg-dark ${
                  warning ? "d-block" : "d-none"
                }`}
              >
                {warning}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-secondary my-1"
              disabled={loading}
            >
              {loading ? "Signing..." : "LOGIN"}
            </button>
          </form>
          <p className="my-2">
            Not Registered yet? ,{" "}
            <Link
              to="/createAuth"
              className="text-primary text-decoration-none"
            >
              Signup here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
