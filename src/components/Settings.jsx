import  { useState, useEffect } from "react";
import Navbar from "../components/Navbar"; // Import Navbar

const Settings = () => {
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);

  // Load current settings from local storage (or API)
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const savedNotifications = localStorage.getItem("notifications");
    
    if (savedTheme) setTheme(savedTheme);
    if (savedNotifications !== null) setNotifications(JSON.parse(savedNotifications));
  }, []);

  // Handle theme change
  const handleThemeChange = (event) => {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  };

  // Handle notifications toggle
  const handleNotificationsToggle = () => {
    const newNotifications = !notifications;
    setNotifications(newNotifications);
    localStorage.setItem("notifications", newNotifications);
  };

  return (
    <div className={`settings-container ${theme}`}>
      <Navbar /> {/* Include Navbar here */}
      <h1>Settings</h1>
      <p>Customize your app settings here.</p>

      <div className="setting-option">
        <h3>Theme</h3>
        <select value={theme} onChange={handleThemeChange}>
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>

      <div className="setting-option">
        <h3>Notifications</h3>
        <label>
          <input
            type="checkbox"
            checked={notifications}
            onChange={handleNotificationsToggle}
          />
          Enable notifications
        </label>
      </div>
    </div>
  );
};

export default Settings;
