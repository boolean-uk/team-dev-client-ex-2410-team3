import { useEffect, useState } from 'react';
// import Card from '../../components/card';
import './style.css';
import { getCohorts } from '../../service/apiClient';
import useAuth from '../../hooks/useAuth';
// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import { useLocation } from 'react-router-dom';
import TeacherView from './teacher';
import StudentView from './student';

const Cohort = () => {
  const { token, role } = useAuth();
  const [cohort, setCohort] = useState([]);
  const [students, setStudents] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [selectedCohort, setSelectedCohort] = useState({});
  const location = useLocation();
  const { userId } = jwt_decode(token);

  const fetchCohorts = async (cohortId) => {
    const allCohorts = await getCohorts();
    const userCohorts = [];

    // Filter cohorts to include only those the user belongs to
    allCohorts.forEach((cohort) => {
      if (cohort.users.some((user) => user.id === userId)) {
        userCohorts.push(cohort);
      }
    });

    setCohort(userCohorts);

    // Find the cohort by ID if specified; otherwise, default to the first cohort
    const initialCohort = userCohorts.find((cohort) => cohort.id === cohortId) || userCohorts[0];

    if (initialCohort) {
      setSelectedCohort(initialCohort);
      setStudents(initialCohort.users.filter((user) => user.role === 'STUDENT'));
      setTeachers(initialCohort.users.filter((user) => user.role === 'TEACHER'));
    }
  };

  useEffect(() => {
    const cohortId = location.state?.cohortId;
    console.log(cohortId);
    fetchCohorts(cohortId);
  }, [location.state]);

  const handleCohortChange = (event) => {
    const selectedCohortId = event.target.value;
    const selectedCohort = cohort.find((c) => c.id === parseInt(selectedCohortId));
    setSelectedCohort(selectedCohort);
    setStudents(selectedCohort.users.filter((user) => user.role === 'STUDENT'));
    setTeachers(selectedCohort.users.filter((user) => user.role === 'TEACHER'));
  };

  return (
    <>
      {role === 'TEACHER' ? (
        <TeacherView
          cohort={cohort}
          handleCohortChange={handleCohortChange}
          selectedCohort={selectedCohort}
          students={students}
          teachers={teachers}
        />
      ) : (
        <StudentView
          cohort={cohort}
          handleCohortChange={handleCohortChange}
          selectedCohort={selectedCohort}
          students={students}
          teachers={teachers}
        />
      )}
    </>
  );
};

export default Cohort;
