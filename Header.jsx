import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button, Form } from "react-bootstrap";
import "./Components.css/Header.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";

const Header = () => {
  // States for modals
  const [showAddSchedule, setShowAddSchedule] = useState(false);
  const [subject, setSubject] = useState("");
  const [schedule_type, setScheduleType] = useState([]);
  const [start_time, setStartTime] = useState("");
  const [end_time, setEndTime] = useState("");

  const [startDate, setStartDate] = useState(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleButtonClick = () => {
    setShowCalendar(!showCalendar);
  };

  // Handlers for opening and closing modal
  const handleShowAddSchedule = () => setShowAddSchedule(true);
  const handleCloseAddSchedule = () => setShowAddSchedule(false);

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar1-container">
      <div className="container-fluid d-flex ">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex " role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-secondary" type="submit">
              <i className="bi bi-search"></i>
            </button>
          </form>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <div style={{ position: "relative", display: "inline-block" }}>
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleButtonClick}
                >
                  {startDate ? (
                    startDate.toDateString()
                  ) : (
                    <i className="bi bi-calendar-check "></i>
                  )}
                </button>
                {showCalendar && (
                  <div
                    style={{
                      position: "absolute",
                      zIndex: 1,
                      marginTop: "8px",
                    }}
                  >
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        setShowCalendar(false); // Close dropdown on date selection
                      }}
                      inline
                    />
                  </div>
                )}
              </div>
            </li>
            {/* Dropdown Button for Reminders */}
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle secondary text-align-center"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-bell me-1"></i>
                My Schedule
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Set Reminder for 10 minutes
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Set Reminder for 30 minutes
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Schedule
                  </a>
                </li>
              </ul>
            </li>
            <li className="nav-item d-flex">
              {/* Button to Add Schedule */}
              <Button variant="primary" onClick={handleShowAddSchedule}>
                <i className="bi bi-plus-circle me-1"></i> Schedule
              </Button>
            </li>
          </ul>
          {/* Modal for Adding Schedule */}
          <Modal show={showAddSchedule} onHide={handleCloseAddSchedule}>
            <Modal.Header closeButton>
              <Modal.Title>Add Study Schedule</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formSubject">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formScheduleType">
                  <Form.Label>Schedule (Select Days)</Form.Label>
                  <div>
                    {[
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                    ].map((day) => (
                      <Form.Check
                        key={day}
                        type="checkbox"
                        label={day}
                        value={day}
                        checked={schedule_type.includes(day)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setScheduleType([...schedule_type, day]);
                          } else {
                            setScheduleType(
                              schedule_type.filter((d) => d !== day)
                            );
                          }
                        }}
                      />
                    ))}
                  </div>
                </Form.Group>

                <Form.Group controlId="formStartTime">
                  <Form.Label>Start Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={start_time}
                    onChange={(e) => setStartTime(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formEndTime">
                  <Form.Label>End Time</Form.Label>
                  <Form.Control
                    type="time"
                    value={end_time}
                    onChange={(e) => setEndTime(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>

            <Modal.Footer>
              <Button
                variant="primary"
                onClick={() => {
                  axios
                    .post("http://localhost:5000/add-schedule", {
                      subject,
                      schedule_type, // Updated to use schedule_type
                      start_time, // Updated to use start_time
                      end_time,
                    })
                    .then((response) => {
                      console.log("Schedule added:", response.data);

                      setScheduleType("");
                      setSubject("");
                      setStartTime("");
                      setEndTime("");

                      handleCloseAddSchedule();
                      window.location.reload();
                    })
                    .catch((error) =>
                      console.error("Error adding schedule:", error)
                    );
                }}
              >
                Save Schedule
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </nav>
  );
};

export default Header;
