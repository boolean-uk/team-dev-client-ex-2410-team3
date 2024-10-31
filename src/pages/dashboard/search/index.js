import ProfileCircle from '../../../components/profileCircle';
import { useState, useEffect } from 'react';
import './style.css';
import { getUsers } from '../../../service/apiClient';

const StudentSearchResults = ({ searchVal }) => {
  const [profiles, setProfiles] = useState([]);
  const [searchUsers, setSearchUsers] = useState([]);
  const hasResults = searchUsers.length > 0;
  const displayUsers = searchUsers.slice(0, 10); // Show up to 10 users

  useEffect(() => {
    if (searchVal.length > 0) {
      const filteredUsers = profiles.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchVal.toLowerCase())
      );
      setSearchUsers(filteredUsers);
    } else {
      setSearchUsers([]); // Clear search results if input is empty
    }
  }, [searchVal]); // Only runs when searchVal changes

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getUsers();
      setProfiles(allUsers);
    };
    fetchUsers();
  }, []); // Add an empty dependency array to run only once

  // Don't render anything if searchVal is empty
  if (!searchVal.trim()) {
    return null;
  }

  return (
    <div className="search-results">
      <p>People</p>
      <hr className="search-results-line" />

      {hasResults ? (
        <>
          {displayUsers.map((user) => (
            <div key={user.id} className="search-user">
              <div className="profile-circle-container">
                <ProfileCircle initials={`${user.firstName[0]}${user.lastName[0]}`} />
              </div>
              <div className="user-details">
                <p>
                  {user.firstName} {user.lastName}
                </p>
                <p>{user.specialism}</p>
              </div>
            </div>
          ))}
          {searchUsers.length > 10 && <button className="show-all-button">All results</button>}
        </>
      ) : (
        <p className="no-results-message">
          Sorry, no results found
          <br />
          Try changing your search term
        </p>
      )}
    </div>
  );
};

export default StudentSearchResults;
