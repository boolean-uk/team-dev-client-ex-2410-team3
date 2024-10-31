import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import ProfileCircle from '../../components/profileCircle';
import SearchIcon from '../../assets/icons/searchIcon';
import TextInput from '../../components/form/textInput';
import Card from '../../components/card';
import ArrowLeftIcon from '../../assets/icons/arrowLeftIcon';
import { getUsers } from '../../service/apiClient';
import './style.css';

const Search = () => {
  const { searchQuery } = useParams();
  const [searchVal, setSearchVal] = useState(searchQuery);
  const [searchUsers, setSearchUsers] = useState([]);
  const navigate = useNavigate();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    if (searchQuery.length > 0) {
      const filteredUsers = profiles.filter((user) =>
        `${user.firstName} ${user.lastName}`.toLowerCase().includes(searchVal.toLowerCase())
      );
      setSearchUsers(filteredUsers);
    } else {
      setSearchUsers([]); // Clear search results if input is empty
    }
  }, [profiles]);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = await getUsers();
      setProfiles(allUsers);
    };
    fetchUsers();
  }, []); // Add an empty dependency array to run only once

  console.log(profiles);

  const onSearch = (e) => {
    e.preventDefault();
    navigate(`/dashboard/search/${searchVal}`);
  };

  const onChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    setSearchVal(value);
  };

  const handleBackToDashboard = () => {
    navigate('/');
  };

  return (
    <main>
      <div className="search-results-page">
        <div className="search-results-header-container">
          <button className="back-button" onClick={handleBackToDashboard}>
            <ArrowLeftIcon />
          </button>
          <h2 className="search-results-header">Search Results</h2>
        </div>

        <Card>
          <form onSubmit={onSearch}>
            <TextInput
              icon={<SearchIcon />}
              value={searchVal}
              onChange={onChange}
              name="Search"
              placeholder="Search for people"
            />
          </form>
        </Card>
        <Card>
          <p>People</p>
          <hr className="search-results-line" />
          {searchUsers.length > 0 && searchQuery !== undefined ? (
            <div className="search-results-list">
              {searchUsers.map((user) => (
                <div key={user.id} className="search-user">
                  <div className="profile-circle-container">
                    <ProfileCircle initials={`${user.firstName[0]}${user.lastName[0]}`} />
                  </div>
                  <div className="user-details">
                    <p className="user-name">
                      {user.firstName} {user.lastName}
                    </p>
                    <p className="user-specialism">{user.specialism}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-results-message">
              Sorry, no results found
              <br />
              Try changing your search term
            </p>
          )}
        </Card>
      </div>
    </main>
  );
};

export default Search;
