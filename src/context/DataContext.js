import { useContext, useEffect, useState } from "react";
import { createContext } from "react";

const DataContext = createContext();

function DataProvider({ children }) {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);

  const [grouping, setGrouping] = useState(
    localStorage.getItem("grouping") || "Priority"
  );
  const [sorting, setSorting] = useState(
    localStorage.getItem("sorting") || "Priority"
  );

  const [priorityWiseTickets, setPriorityWiseTickets] = useState({
    "No Priority": [],
    "Low Priority": [],
    "Medium Priority": [],
    "High Priority": [],
    "Urgent Priority": [],
  });

  const [userWiseTickets, setUserWiseTickets] = useState({});
  const [statusWiseTickets, setStatusWiseTickets] = useState({});

  const priorityList = [
    "No Priority",
    "Low Priority",
    "Medium Priority",
    "High Priority",
    "Urgent Priority",
  ];

  const statusList = ["Backlog", "Todo", "In progress", "Done", "Cancelled"];

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await fetch(
          "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        const data = await response.json();
        setTickets(data.tickets);
        setUsers(data.users);

        // Initialize new objects to update state with grouped data
        const newPriorityWiseTickets = {
          "No Priority": [],
          "Low Priority": [],
          "Medium Priority": [],
          "High Priority": [],
          "Urgent Priority": [],
        };
        const newUserWiseTickets = {};
        const newStatusWiseTickets = {};

        // Group tickets by priority
        data.tickets.forEach((ticket) => {
          const priorityName = priorityList[ticket.priority];
          newPriorityWiseTickets[priorityName].push(ticket);
        });

        // Group tickets by status and userId
        statusList.forEach((status) => {
          newStatusWiseTickets[status] = [];
        });

        data.tickets.forEach((ticket) => {
          // Group by status
          if (!newStatusWiseTickets[ticket.status]) {
            newStatusWiseTickets[ticket.status] = [];
          }
          newStatusWiseTickets[ticket.status].push(ticket);

          // Group by user
          if (!newUserWiseTickets[ticket.userId]) {
            newUserWiseTickets[ticket.userId] = [];
          }
          newUserWiseTickets[ticket.userId].push(ticket);
        });

        // Replace userId with actual user names in userWiseTickets
        const userWiseTicketsWithNames = {};
        data.users.forEach((user) => {
          if (newUserWiseTickets[user.id]) {
            userWiseTicketsWithNames[user.name] = newUserWiseTickets[user.id];
          }
        });

        // Update the state with the grouped data
        setPriorityWiseTickets(newPriorityWiseTickets);
        setUserWiseTickets(userWiseTicketsWithNames);
        setStatusWiseTickets(newStatusWiseTickets);
      } catch (error) {
        console.error("Error fetching tickets:", error);
      }
    };

    fetchTickets();
  }, []);

  useEffect(() => {
    localStorage.setItem("grouping", grouping);
    localStorage.setItem("sorting", sorting);
  }, [grouping, sorting]);

  return (
    <DataContext.Provider
      value={{
        tickets,
        users,
        grouping,
        sorting,
        setGrouping,
        setSorting,
        priorityWiseTickets,
        userWiseTickets,
        statusWiseTickets,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

function useData() {
  const context = useContext(DataContext);
  if (context === undefined)
    throw new Error("useDataContext must be used within a DataProvider");
  return context;
}

export { DataProvider, useData };
