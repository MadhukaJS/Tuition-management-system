import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AttendanceView = () => {
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/attendances'); // Replace '/api/attendances' with your actual API endpoint for fetching attendance data
      setAttendanceData(response.data);
    } catch (error) {
      console.error('Error fetching attendance data:', error);
    }
  };

  return (
    <div>
      <h2>Attendance Records</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>User ID</th>
            <th>Course ID</th>
            <th>Day</th>
            <th>Time</th>
            <th>Status</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map(attendance => (
            <tr key={attendance.id}>
              <td>{attendance.id}</td>
              <td>{attendance.auserid}</td>
              <td>{attendance.acourseid}</td>
              <td>{attendance.aday}</td>
              <td>{attendance.atime}</td>
              <td>{attendance.astatus}</td>
              <td>{attendance.createdAt}</td>
              <td>{attendance.updatedAt}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceView;