import React from "react";

function TotalHoursCount({ timecard }) {
  return (
    <div>
      {timecard.monday &&
      timecard.tuesday &&
      timecard.wendsday &&
      timecard.thursday &&
      timecard.friday &&
      timecard.satarday &&
      timecard.sunday
        ? timecard.monday.reduce((a, v) => (a = a + v.hours), 0) +
          timecard.tuesday.reduce((a, v) => (a = a + v.hours), 0) +
          timecard.wendsday.reduce((a, v) => (a = a + v.hours), 0) +
          timecard.thursday.reduce((a, v) => (a = a + v.hours), 0) +
          timecard.friday.reduce((a, v) => (a = a + v.hours), 0) +
          timecard.satarday.reduce((a, v) => (a = a + v.hours), 0) +
          timecard.sunday.reduce((a, v) => (a = a + v.hours), 0)
        : ""}
    </div>
  );
}

export default TotalHoursCount;
