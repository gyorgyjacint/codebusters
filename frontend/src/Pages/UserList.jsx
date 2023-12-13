import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import UserTable from "../Components/UserTable";
import useFetch from "../Hooks/useFetch";
import { useParams } from 'react-router-dom';

const UserList = () => {
  
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState(null);
  const { page } = useParams();
  const email = localStorage.getItem("email");
  const isAdmin = localStorage.getItem("role")?.toLowerCase() === "admin";
  const url = isAdmin ? "/getUsers" : `/getOwnUsers/${email}`;
  const usersData = useFetch(url);

  useEffect(() => {
    if (usersData != null && users == null){
      const setFilteredData = () => {
        setUsers(usersData);
        setLoading(false);
      };
      const timeout = setTimeout(setFilteredData, 1000);
      return () => clearTimeout(timeout);
    }
  }, [users, usersData]);

  return (
    <div>
      {loading ? (
        <Loading/>
      ) : (
        <UserTable
          users = { users }
          page = { page }/>
      )}
    </div>
  );
};

export default UserList;
