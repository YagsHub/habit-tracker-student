import logoTracker from "../assets/logo-tracker2.png";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <div className="navbar-container">
      <div className="logo-container">
        <Link className="navbar-brand" to="/home">
          <img
            className="logo-Tracker"
            src={logoTracker}
            alt="Logo"
            width="40"
            height="40"
          />
          <h2>Habit Tracker | Student</h2>
        </Link>
      </div>
      <div>
        <ul className="nav nav-underline">
          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/guestdashboard"
            >
              Free Trial
            </Link>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">
              Contact us
            </a>
          </li>
          <li className="nav-item">
            <a
              className="nav-link"
              href="#"
              data-bs-target="#exampleModalToggle"
              data-bs-toggle="modal"
            >
              Log in
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link disabled" aria-disabled="true">
              Yagshub
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
