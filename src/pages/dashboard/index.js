import { useNavigate, NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SearchIcon from '../../assets/icons/searchIcon';
import Button from '../../components/button';
import Card from '../../components/card';
import CreatePostModal from '../../components/createPostModal';
import TextInput from '../../components/form/textInput';
import Posts from '../../components/posts';
import useModal from '../../hooks/useModal';
import StudentSearchResults from './search';
import useAuth from '../../hooks/useAuth';
import './style.css';
import { getCohorts } from '../../service/apiClient';

// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';

const Dashboard = () => {
  const [searchVal, setSearchVal] = useState('');
  const { role } = useAuth();
  const navigate = useNavigate(); // Added this line
  const [cohorts, setCohorts] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
    const fetchCohorts = async () => {
      const allCohorts = await getCohorts();
      const cohortToAdd = [];
      const { userId } = jwt_decode(token);
      // Map out the cohorts to check if the user is in the cohort
      allCohorts.forEach((cohort) => {
        if (cohort.users.some((user) => user.id === userId)) {
          cohortToAdd.push(cohort);
        }
      });
      // SET STARTING POINT OF THE COHORT TO THE FIRST COHORT IN THE ARRAY
      setCohorts(cohortToAdd);
    };
    fetchCohorts();
  }, []);

  const onChange = (e) => {
    const value = e.target.value;
    setSearchVal(value);
  };

  const onSearch = (e) => {
    e.preventDefault();
    navigate(`/dashboard/search/${searchVal}`);
  };

  const { openModal, setModal } = useModal();

  const showModal = () => {
    setModal('Create a post', <CreatePostModal />);
    openModal();
  };

  return (
    <>
      <main>
        <Card>
          <div className="create-post-input">
            <div className="profile-icon">
              <p>AJ</p>
            </div>
            <Button text="What's on your mind?" onClick={showModal} />
          </div>
        </Card>

        <Posts />
      </main>

      <aside>
        <Card>
          <form onSubmit={onSearch}>
            <TextInput
              icon={<SearchIcon />}
              value={searchVal}
              name="Search"
              onChange={onChange}
              placeholder="Search for people"
            />
          </form>
          {role === 'teacher' ? (
            <p className="teacher-view-message">Teacher-specific view goes here</p>
          ) : (
            <StudentSearchResults searchVal={searchVal} />
          )}
        </Card>
        <Card>
          <div className="cohort-title dashboard-cohort-title">
            <h4>Cohorts</h4>
          </div>
          <div className="dashboard-cohort">
            {cohorts.map((cohort) => {
              return (
                <NavLink
                  to="/cohort"
                  state={{ cohortId: cohort.id }}
                  key={cohort.id}
                  className={'cohort-nav-link'}
                >
                  <div className="post-details cohort-div">
                    <div className="profile-icon">
                      <p>&lt; &gt;</p>
                    </div>
                    <div className="post-user-name cohort-student-name">
                      <p>
                        {cohort.name} {cohort.id}
                      </p>
                    </div>
                  </div>
                </NavLink>
              );
            }, [])}
          </div>
        </Card>
      </aside>
    </>
  );
};

export default Dashboard;
