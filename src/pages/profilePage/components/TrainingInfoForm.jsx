import { useContext } from 'react';
import { ProfileContext } from '..';
import Form from '../../../components/form';
import TextInput from '../../../components/form/textInput';

const TrainingInfoForm = () => {
  const { profile, handleInputChange, formatRole } = useContext(ProfileContext);

  return (
    <div className="profile-grid-section">
      <Form>
        <hr className="section-divider" />
        <h3 className="profile-info-header">Training Info</h3>
        <div className="profile-grid-section read-only">
          <TextInput
            name="role"
            label="Role*"
            value={formatRole(profile.role)}
            onChange={handleInputChange}
            type="text"
          />
          <TextInput
            name="specialism"
            label="Specialism*"
            value={profile.specialism}
            onChange={handleInputChange}
            type="text"
          />
          <TextInput
            name="cohort"
            label="Cohort*"
            value={profile.chortId}
            onChange={handleInputChange}
            type="text"
          />
          <TextInput
            name="StartDate"
            label="Start Date*"
            value={profile.startDate}
            onChange={handleInputChange}
            type="text"
          />
          <TextInput
            name="endDate"
            label="End Date*"
            value={profile.endDate}
            onChange={handleInputChange}
            type="text"
          />
        </div>
      </Form>
    </div>
  );
};

export default TrainingInfoForm;