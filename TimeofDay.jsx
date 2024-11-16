import "../Components/Components.css/TimeofDay.css";
import { Link } from "react-router-dom";

function TimeofDay() {
  // Get current hours
  const hours = new Date().getHours();
  let timeOfDay;

  // Determine if it is morning, afternoon, or evening
  if (hours < 12) {
    timeOfDay = "Morning";
  } else if (hours >= 12 && hours < 18) {
    timeOfDay = "Afternoon";
  } else {
    timeOfDay = "Evening";
  }

  return (
    <div className="sidebar">
      <div className="sidebar-item">
        <p>
          <i className="bi bi-person-circle me-2"></i>Profile
        </p>
      </div>
      <div className="m-4 text-dark">
        <h4>Welcome Guest!</h4>
      </div>
      <div className="sidebar-item">
        <p>
          <i className="bi bi-calendar-check me-2"></i>Schedule
        </p>
      </div>
      <div className="sidebar-item">
        <p>
          <i className="bi bi-clock me-2"></i>Good {timeOfDay}!
        </p>
      </div>
      <div className="sidebar-item">
        <p>
          <Link className="none" to="/home">
            Log out
          </Link>
        </p>
      </div>
    </div>
  );
}

export default TimeofDay;
