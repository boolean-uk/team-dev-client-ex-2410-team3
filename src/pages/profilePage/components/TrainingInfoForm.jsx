import { useContext } from 'react';
import { ProfileContext } from '..';
import Form from '../../../components/form';
import TextInput from '../../../components/form/textInput';

const TrainingInfoForm = () => {
  const { profile, handleInputChange, formatRole, isEditMode, isCurrentUserTeacher } =
    useContext(ProfileContext);

  return (
    <div className="profile-grid-section">
      <Form>
        <hr className="section-divider" />
        <h3 className="profile-info-header">Training Info</h3>
        <div
          className={`profile-grid-section ${isEditMode && isCurrentUserTeacher ? '' : 'read-only'}`}
        >
          <TextInput
            name="role"
            label="Role*"
            value={formatRole(profile.role)}
            onChange={handleInputChange}
            type="text"
            isLocked={isEditMode && !isCurrentUserTeacher}
            isRequired={true}
            validChars="A-Za-z0-9 -"
          />
          <TextInput
            name="specialism"
            label="Specialism*"
            value={profile.specialism}
            onChange={handleInputChange}
            type="text"
            isLocked={isEditMode && !isCurrentUserTeacher}
            isRequired={true}
            validChars="A-Za-z0-9 -"
          />
          <TextInput
            name="cohort_id"
            label="Cohort*"
            value={profile.cohort_id}
            onChange={handleInputChange}
            type="text"
            isLocked={isEditMode && !isCurrentUserTeacher}
            isRequired={true}
            validChars="A-Za-z0-9 -"
          />
          <TextInput
            name="startDate"
            label="Start Date*"
            value={profile.startDate}
            onChange={handleInputChange}
            type="text"
            isLocked={isEditMode && !isCurrentUserTeacher}
            isRequired={true}
            validChars="A-Za-z0-9 -"
          />
          <TextInput
            name="endDate"
            label="End Date*"
            value={profile.endDate}
            onChange={handleInputChange}
            type="text"
            isLocked={isEditMode && !isCurrentUserTeacher}
            isRequired={true}
            validChars="A-Za-z0-9 -"
          />
        </div>
      </Form>
    </div>
  );
};

export default TrainingInfoForm;
