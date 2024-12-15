import { useState } from "react";
import PropTypes from "prop-types";


const Search = ({ tasks }) => {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [sortOption, setSortOption] = useState("");

  const handleSearch = () => {
    let filteredTasks = tasks;

    // Filter by category
    if (categoryFilter) {
      filteredTasks = filteredTasks.filter((task) => task.category === categoryFilter);
    }

    // Filter by priority
    if (priorityFilter) {
      filteredTasks = filteredTasks.filter((task) => task.priority === priorityFilter);
    }

    // Sort tasks
    if (sortOption === "dueDate") {
      filteredTasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    } else if (sortOption === "priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      filteredTasks.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority]);
    }

    // Search by query
    return filteredTasks.filter((task) =>
      task.title.toLowerCase().includes(query.toLowerCase())
    );
  };

  const displayedTasks = handleSearch();

  return (
    <div className="search">
      <h2>Search Tasks</h2>
      <input
        type="text"
        placeholder="Search by title"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select onChange={(e) => setCategoryFilter(e.target.value)} value={categoryFilter}>
        <option value="">Filter by Category</option>
        <option value="Work">Work</option>
        <option value="Personal">Personal</option>
      </select>
      <select onChange={(e) => setPriorityFilter(e.target.value)} value={priorityFilter}>
        <option value="">Filter by Priority</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <select onChange={(e) => setSortOption(e.target.value)} value={sortOption}>
        <option value="">Sort By</option>
        <option value="dueDate">Due Date</option>
        <option value="priority">Priority</option>
      </select>
      <ul>
        {displayedTasks.map((task, index) => (
          <li key={index}>
            {task.title} - {task.priority} - Due: {task.dueDate}
          </li>
        ))}
      </ul>
    </div>
  );
};

Search.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      priority: PropTypes.string.isRequired,
      dueDate: PropTypes.string.isRequired,
      category: PropTypes.string,
    })
  ).isRequired,
};

export default Search;
