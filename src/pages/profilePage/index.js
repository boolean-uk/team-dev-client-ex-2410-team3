import { createContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from '../../components/card';
import './profilePage.css';
import ProfileHeader from './components/ProfileHeader';
import BasicInfoForm from './components/BasicInfoForm';
import TrainingInfoForm from './components/TrainingInfoForm';
import ContactInfoForm from './components/ContactInfoForm';
import BioForm from './components/BioForm';
import Button from '../../components/button';

// eslint-disable-next-line camelcase
import jwt_decode from 'jwt-decode';
import useAuth from '../../hooks/useAuth';

export const ProfileContext = createContext();

const UserProfile = ({ isEditMode }) => {
  const navigate = useNavigate();
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [rollbackProfile, setRoolbackProfile] = useState(null);
  const [initials, setInitials] = useState('');
  const [isCurrentUserProfile, setIsCurrentUserProfile] = useState(false);
  const [isCurrentUserTeacher, setIsCurrentUserTeacher] = useState(false);

  const { token, role, onGetUser, onUpdateProfile } = useAuth();
  const { userId } = jwt_decode(token);
  console.log('role', role);

  const fetchProfile = async () => {
    try {
      const data = await onGetUser(profileId);

      const profileWithDefaults = {
        ...data,
        role: data.role || 'Student',
        specialism: data.specialism || 'Software Developer',
        cohort_id: data.cohort_id || 'Cohort 4',
        startDate: data.startDate || 'January 2023',
        endDate: data.endDate || 'June 2023',
        username: data.username || '',
        mobile: data.mobile || '123456789'
      };

      setProfile(profileWithDefaults);
      setRoolbackProfile(profileWithDefaults);
      setInitials(profileWithDefaults.firstName[0] + profileWithDefaults.lastName[0]);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfile();
    if (userId === Number(profileId)) {
      setIsCurrentUserProfile(true);
    }
    if (role === 'TEACHER') {
      setIsCurrentUserTeacher(true);
    }
  }, [profileId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateRequiredFields(profile)) {
      return;
    }

    console.log('bio', profile.biography);

    const {
      firstName,
      lastName,
      biography: bio,
      username,
      githubUsername,
      profilePicture,
      mobile
    } = profile;

    try {
      await onUpdateProfile(
        profileId,
        firstName,
        lastName,
        bio,
        username,
        githubUsername,
        profilePicture,
        mobile
      );

      setRoolbackProfile(profile);
      setInitials(profile.firstName[0] + profile.lastName[0]);
      navigate(`/profile/${profileId}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const validateRequiredFields = (profile) => {
    const requiredFields = [
      { name: 'First Name', value: profile.firstName },
      { name: 'Last Name', value: profile.lastName },
      { name: 'Username', value: profile.username },
      { name: 'Github Username', value: profile.githubUsername },
      { name: 'Role', value: profile.role },
      { name: 'Specialism', value: profile.specialism },
      { name: 'Cohort', value: profile.cohort_id },
      { name: 'Start Date', value: profile.startDate },
      { name: 'End Date', value: profile.endDate },
      { name: 'Email', value: profile.email },
      { name: 'Mobile', value: profile.mobile }
    ];

    const missingFields = requiredFields.filter((field) => !field.value);

    if (missingFields.length > 0) {
      alert('Please fill in all the required fields');
      return false;
    }

    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleBioChange = (event) => {
    handleInputChange(event);
  };

  const handleCancel = () => {
    setProfile(rollbackProfile);
    navigate(`/profile/${userId}`);
  };

  const formatRole = (role) => {
    if (!role) return '';
    return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
  };

  if (!profile) {
    return <h1>Loading...</h1>;
  }

  const contextValues = {
    profile,
    setProfile,
    initials,
    setInitials,
    handleSubmit,
    handleInputChange,
    formatRole,
    handleBioChange,
    isEditMode,
    isCurrentUserProfile,
    isCurrentUserTeacher
  };

  return (
    <main className="profile-page-main">
      <h2 className="profile-header">Profile</h2>
      <ProfileContext.Provider value={contextValues}>
        <Card>
          <ProfileHeader />
          <section className="profile-grid">
            <BasicInfoForm />
            <TrainingInfoForm />
            <ContactInfoForm />
            <BioForm />
            <p className="info-text required-text">*Required</p>
            {isEditMode ? (
              <>
                <div className="button-group">
                  <Button
                    text="Cancel"
                    type="button"
                    classes="button cancel-button"
                    onClick={handleCancel}
                  />

                  <Button
                    text="Submit"
                    type="submit"
                    classes="button submit-button"
                    onClick={handleSubmit}
                  />
                </div>
              </>
            ) : (
              (isCurrentUserProfile || isCurrentUserTeacher) && (
                <Button
                  text="Edit"
                  type="button"
                  classes="button edit-button"
                  onClick={() => {
                    navigate(`/profile/${profileId}/edit`);
                  }}
                />
              )
            )}
          </section>
        </Card>
      </ProfileContext.Provider>
    </main>
  );
};

export default UserProfile;
