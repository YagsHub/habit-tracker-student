import picture from "../assets/Screenshot 2024-11-16 040108.png";
import Login from "./login";
import "./MainContent.css";
import { useState } from "react";
import axios from "axios";

function MainContent() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/register", {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        password,
      });

      console.log(response);
    } catch (err) {
      console.log(err);
      alert("Error registering user");
    }
  };

  return (
    <>
      <div className="content-Container">
        <div className="title">
          <h1>Habit Tracker: Study Load</h1>
          <p>
            Set <i>Specific,</i> <i>Measurable,</i> <i>Achievable,</i>{" "}
            <i>Relevant,</i> and Time-bound goals for your study load.
          </p>
        </div>
        <div className="sub-content-container">
          <div>
            <img src={picture} className="img-fluid" alt="Gantt Chart" />
          </div>
        </div>
      </div>
      {/* Modal Zone */}
      <div
        className="modal fade"
        id="exampleModalToggle"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel">
                Log in
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <Login />
            </div>
            <div className="modal-footer">
              <p>You dont have an account? </p>
              <button
                className="btn btn-success"
                data-bs-target="#exampleModalToggle2"
                data-bs-toggle="modal"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="exampleModalToggle2"
        aria-hidden="true"
        aria-labelledby="exampleModalToggleLabel2"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalToggleLabel2">
                Register
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div>
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label htmlFor="floatingFirstName">First Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      required
                      onChange={(e) => setLastName(e.target.value)}
                    />
                    <label htmlFor="floatingLastName">Last Name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Username"
                      value={username}
                      required
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="floatingUsername">Username</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      type="email"
                      placeholder="Email"
                      value={email}
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="floatingEmail">Email</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      className="form-control"
                      type="password"
                      placeholder="Password"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingPassword">Password</label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success"
                    data-bs-target="#exampleModalToggle"
                    data-bs-toggle="modal"
                  >
                    Register
                  </button>
                </form>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-primary"
                data-bs-target="#exampleModalToggle"
                data-bs-toggle="modal"
              >
                Log in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainContent;
