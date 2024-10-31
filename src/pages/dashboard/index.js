import { useEffect, useState } from 'react';
import SearchIcon from '../../assets/icons/searchIcon';
import Button from '../../components/button';
import Card from '../../components/card';
import CreatePostModal from '../../components/createPostModal';
import TextInput from '../../components/form/textInput';
import Posts from '../../components/posts';
import useModal from '../../hooks/useModal';
import './style.css';
import { getCohorts } from '../../service/apiClient';
import useAuth from '../../hooks/useAuth';

// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { NavLink } from 'react-router-dom';

const Dashboard = () => {
  const [searchVal, setSearchVal] = useState('');
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
    setSearchVal(e.target.value);
  };

  // Use the useModal hook to get the openModal and setModal functions
  const { openModal, setModal } = useModal();

  // Create a function to run on user interaction
  const showModal = () => {
    // Use setModal to set the header of the modal and the component the modal should render
    setModal('Create a post', <CreatePostModal />); // CreatePostModal is just a standard React component, nothing special

    // Open the modal!
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
          <form onSubmit={(e) => e.preventDefault()}>
            <TextInput icon={<SearchIcon />} value={searchVal} name="Search" onChange={onChange} />
          </form>
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
