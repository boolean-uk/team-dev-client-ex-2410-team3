import { useEffect, useState } from 'react';
import Stepper from '../../components/stepper';
import useAuth from '../../hooks/useAuth';
import StepOne from './stepOne';
import StepFour from './stepFour';
import './style.css';
import StepTwo from './stepTwo';
import StepThree from './stepThree';

const Welcome = () => {
  const { onUpdateProfile, onGetUser, userCredentials } = useAuth();

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    username: '',
    githubUsername: '',
    bio: '',
    profilePicture: '',
    email: userCredentials.email,
    mobile: '',
    password: userCredentials.password,
    role: 'Student',
    specialism: 'Software Developer',
    cohort: 'Cohort 4',
    startDate: 'January 2023',
    endDate: 'June 2023'
  });

  useEffect(() => {
    const setData = (data) => {
      if (data !== '') {
        return data;
      }
      return '';
    };
    const fetchUserData = async () => {
      try {
        const userData = await onGetUser();
        console.log(userData);
        // Set the profile to the user data given.
        setProfile((prevProfile) => ({
          ...prevProfile,
          firstName: setData(userData.firstName),
          lastName: setData(userData.lastName),
          username: setData(userData.username),
          githubUsername: setData(userData.githubUsername),
          bio: setData(userData.biography),
          profilePicture: setData(userData.profilePicture),
          mobile: setData(userData.mobile),
          role: setData(userData.role),
          specialism: setData(userData.specialism)
        }));
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const onChange = (event) => {
    const { name, value } = event.target;

    setProfile({
      ...profile,
      [name]: value
    });
  };

  const validate = (step) => {
    switch (step) {
      case 0:
        if (
          !profile.firstName ||
          !profile.lastName ||
          !profile.username ||
          !profile.githubUsername ||
          !profile.mobile ||
          !profile.role ||
          !profile.specialism ||
          !profile.cohort ||
          !profile.startDate ||
          !profile.endDate
        ) {
          return false;
        }
        break;
      case 1:
        if (
          !profile.firstName ||
          !profile.lastName ||
          !profile.username ||
          !profile.githubUsername
        ) {
          return false;
        }
        break;
      case 2:
        if (!profile.mobile) {
          return false;
        }
        break;
      case 3:
        if (
          !profile.role ||
          !profile.specialism ||
          !profile.cohort ||
          !profile.startDate ||
          !profile.endDate
        ) {
          return false;
        }
        break;
    }
    return true;
  };

  const onComplete = () => {
    if (validate(0)) {
      onUpdateProfile(
        profile.firstName,
        profile.lastName,
        profile.bio,
        profile.username,
        profile.githubUsername,
        profile.profilePicture,
        profile.mobile
      );
    }
  };

  return (
    <main className="welcome">
      <div className="welcome-titleblock">
        <h1 className="h2">Welcome to Cohort Manager</h1>
        <p className="text-blue1">Create your profile to get started</p>
      </div>

      <Stepper header={<WelcomeHeader />} onComplete={onComplete} validate={validate}>
        <StepOne data={profile} setData={onChange} />
        <StepTwo data={profile} setData={onChange} />
        <StepThree data={profile} setData={onChange} />
        <StepFour data={profile} setData={onChange} />
      </Stepper>
    </main>
  );
};

const WelcomeHeader = () => {
  return (
    <div className="welcome-cardheader">
      <h2>Create profile</h2>
      <p className="text-blue1">Tell us about yourself to create your profile</p>
    </div>
  );
};

export default Welcome;
