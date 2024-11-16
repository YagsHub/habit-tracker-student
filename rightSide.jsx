import "bootstrap/dist/css/bootstrap.min.css";
import PropTypes from "prop-types";

const RightSide = ({ completedSchedules = [], failedSchedules = [] }) => {
  return (
    <div>
      {/* Present Streak Card (example card; modify based on your logic) */}
      <div className="card border-light mb-3">
        <div className="card-header">
          <i className="bi bi-fire"></i>Present Streak
        </div>
        <div className="card-body">
          <h5 className="card-title">1 day</h5>
          <p className="card-text"></p>
        </div>
      </div>

      {/* Failed Card */}
      <div className="card border-light mb-3">
        <div className="card-header">
          <i className="bi bi-x"></i>Failed
        </div>
        <div className="card-body">
          {failedSchedules.length > 0 ? (
            failedSchedules &&
            failedSchedules.map((schedule, index) => (
              <p key={index} className="card-text">
                {schedule.subject} - {schedule.schedule_type} at{" "}
                {schedule.start_time} end {schedule.end_time}
              </p>
            ))
          ) : (
            <p className="card-text success">---</p>
          )}
        </div>
      </div>

      {/* Complete Card */}
      <div className="card border-light mb-3">
        <div className="card-header">
          <i className="bi bi-check"></i>Complete
        </div>
        <div className="card-body">
          {completedSchedules.length > 0 ? (
            completedSchedules &&
            completedSchedules.map((schedule, index) => (
              <p key={index} className="card-text success">
                {schedule.subject} - {schedule.schedule_type} at{" "}
                {schedule.start_time} end {schedule.end_time}
              </p>
            ))
          ) : (
            <p className="card-text success">---</p>
          )}
        </div>
      </div>
    </div>
  );
};

RightSide.propTypes = {
  completedSchedules: PropTypes.array.isRequired,
  failedSchedules: PropTypes.array.isRequired,
};

export default RightSide;
