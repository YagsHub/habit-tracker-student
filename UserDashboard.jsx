import { Link } from "react-router-dom";
import Header from "../Components/Header";
import RightSide from "../GuestDashboard/rightSide";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import "./UserDashboard.css";

const UserDashboard = () => {
  const location = useLocation();
  const identifier = location.state?.identifier || "User"; // Fallback to 'User' if not available

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

  // Existing state variables
  const [schedules, setSchedules] = useState([]);

  const [completedSchedules, setCompletedSchedules] = useState([]);
  const [failedSchedules, setFailedSchedules] = useState([]);

  const [editingSchedule, setEditingSchedule] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  // New state for form inputs during edit
  const [editFormData, setEditFormData] = useState({
    subject: "",
    schedule_type: "",
    start_time: "",
    end_time: "",
  });

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
    setEditFormData({
      subject: schedule.subject,
      schedule_type: schedule.schedule_type,
      start_time: schedule.start_time,
      end_time: schedule.end_time,
    });
    setShowEditModal(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:5000/schedules/${editingSchedule.id}`,
        editFormData
      );

      // Update local state with edited schedule data
      setSchedules((prevSchedules) =>
        prevSchedules.map((schedule) =>
          schedule.id === editingSchedule.id
            ? { ...schedule, ...editFormData }
            : schedule
        )
      );

      setShowEditModal(false);
      setEditingSchedule(null);
    } catch (error) {
      console.error("Error updating schedule:", error);
    }
  };

  useEffect(() => {
    // Fetch schedules from the API on component mount
    axios
      .get("http://localhost:5000/schedules")
      .then((response) => {
        const userSchedules = response.data;
        if (userSchedules.length === 0) {
          console.log("No data available for this user.");
        }
        setSchedules(userSchedules);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Mark schedule as completed
  const handleComplete = (schedule) => {
    // Remove the completed item from schedules
    setSchedules(schedules.filter((item) => item.id !== schedule.id));
    // Add the completed item to completedSchedules
    setCompletedSchedules([...completedSchedules, schedule]);
  };

  const handleFailed = async (schedule) => {
    try {
      // Remove the item from the local state first
      setSchedules(schedules.filter((item) => item.id !== schedule.id));

      // Add the failed item to failedSchedules (optional based on your logic)
      setFailedSchedules([...failedSchedules, schedule]);

      // Send DELETE request to your API
      await axios.delete(`http://localhost:5000/schedules/${schedule.id}`);
      console.log("Schedule deleted successfully.");
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="sidebar1">
          <div className="sidebar-item">
            <p>
              <i className="bi bi-person-circle me-2"></i>Profile
            </p>
          </div>
          <div className="m-4 text-dark">
            <h4>
              Welcome <i>{identifier}</i>
            </h4>
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

        <div className="main-content">
          <Header />
          <div className="m-4">
            <h3>Schedules</h3>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Schedule Date</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                </tr>
              </thead>
              <tbody>
                {schedules.map((schedule) => (
                  <tr key={schedule.id}>
                    <td>{schedule.subject.toUpperCase()}</td>
                    <td>{schedule.schedule_type}</td>
                    <td>{schedule.start_time}</td>
                    <td>{schedule.end_time}</td>
                    <td>
                      <div className="d-flex justify-content-evenly align-items-center">
                        <div>
                          <Button
                            className="btn btn-secondary opacity-75"
                            onClick={() => handleComplete(schedule)}
                          >
                            <i className="bi bi-check-square"></i>
                          </Button>
                        </div>
                        <div>
                          <Button
                            className="btn btn-secondary opacity-75"
                            onClick={() => handleEdit(schedule)}
                          >
                            <i className="bi bi-pencil-square"></i>
                          </Button>
                        </div>
                        <div>
                          <Button
                            className="btn btn-secondary opacity-75"
                            onClick={() => handleFailed(schedule)}
                          >
                            <i className="bi bi-x-square"></i>
                          </Button>
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Schedule</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Group controlId="formSubject">
                    <Form.Label>Subject</Form.Label>
                    <Form.Control
                      type="text"
                      name="subject"
                      value={editFormData.subject}
                      onChange={handleEditChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formScheduleType" className="mt-3">
                    <Form.Label>Schedule Type</Form.Label>
                    <Form.Control
                      type="text"
                      name="schedule_type"
                      value={editFormData.schedule_type}
                      onChange={handleEditChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formStartTime" className="mt-3">
                    <Form.Label>Start Time</Form.Label>
                    <Form.Control
                      type="text"
                      name="start_time"
                      value={editFormData.start_time}
                      onChange={handleEditChange}
                    />
                  </Form.Group>
                  <Form.Group controlId="formEndTime" className="mt-3">
                    <Form.Label>End Time</Form.Label>
                    <Form.Control
                      type="text"
                      name="end_time"
                      value={editFormData.end_time}
                      onChange={handleEditChange}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  variant="secondary"
                  onClick={() => setShowEditModal(false)}
                >
                  Close
                </Button>
                <Button variant="primary" onClick={handleEditSubmit}>
                  Save Changes
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <div className="right-side">
          <RightSide
            completedSchedules={completedSchedules}
            failedSchedules={failedSchedules}
          />
        </div>
      </div>
    </>
  );
};

export default UserDashboard;
