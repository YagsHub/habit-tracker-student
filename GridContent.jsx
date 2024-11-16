import "../Components/Components.css/GridContent.css";
import Header from "../Components/Header";
import TimeofDay from "./TimeofDay";
import RightSide from "./rightSide";
import { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";

const GridContent = () => {
  const [schedules, setSchedules] = useState([]);
  const [completedSchedules, setCompletedSchedules] = useState([]);
  const [failedSchedules, setFailedSchedules] = useState([]);

  useEffect(() => {
    // Fetch schedules from the API on component mount
    axios
      .get("http://localhost:5000/schedules")
      .then((response) => setSchedules(response.data))
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
    <div className="container">
      <div className="sideBar">
        <TimeofDay />
      </div>
      <div className="mainContent">
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
                  <td>{schedule.subject}</td>
                  <td>{schedule.schedule_type}</td>
                  <td>{schedule.start_time}</td>
                  <td>{schedule.end_time}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => handleComplete(schedule)}
                    >
                      <i className="bi bi-check"></i>
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => handleFailed(schedule)}
                    >
                      <i className="bi bi-x-square"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <div className="adsRightSide">
        <RightSide
          completedSchedules={completedSchedules}
          failedSchedules={failedSchedules}
        />
      </div>
    </div>
  );
};

export default GridContent;
