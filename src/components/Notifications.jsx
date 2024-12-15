import { useState, useEffect } from 'react';
import './Notifications.css';


const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New task assigned: Complete your project report.', time: '2 mins ago' },
    { id: 2, message: 'Reminder: Meeting at 3 PM today.', time: '5 mins ago' },
    { id: 3, message: 'Task Completed: "Design Mockups" was finished.', time: '10 mins ago' },
  ]);

  const handleDismiss = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  useEffect(() => {
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification("You have new notifications!");
        }
      });
    }
  }, []);

  return (
    <div className="notifications">
      <h2>Notifications</h2>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <div key={notification.id} className="notification-item">
            <p>{notification.message}</p>
            <span>{notification.time}</span>
            <button onClick={() => handleDismiss(notification.id)}>Dismiss</button>
          </div>
        ))
      ) : (
        <p>No notifications.</p>
      )}
    </div>
  );
};

export default Notifications;
