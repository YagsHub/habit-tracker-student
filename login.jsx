import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", {
        identifier,
        password,
      });
      window.location.reload(
        navigate("/user-dashboard", { state: { identifier } })
      );
      alert(response.data);
    } catch (err) {
      alert("Invalid login", err);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-floating mb-3 ">
          <input
            className="form-control"
            type="text"
            placeholder="name@example.com"
            value={identifier}
            required
            onChange={(e) => setIdentifier(e.target.value)}
          />
          <label htmlFor="floatingInput">Email or Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <button type="submit" className="btn btn-primary login">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
