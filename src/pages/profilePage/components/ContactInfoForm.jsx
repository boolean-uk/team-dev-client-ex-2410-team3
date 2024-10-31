import React, { useContext } from 'react';
import { ProfileContext } from '..';
import Form from '../../../components/form';
import TextInput from '../../../components/form/textInput';

const ContactInfoForm = () => {
  const { profile, handleInputChange, isEditMode } = useContext(ProfileContext);

  return (
    <div className="profile-grid-section">
      <Form>
        <hr className="section-divider" />
        <h3 className="profile-info-header">Contact Info</h3>
        <div className={`profile-grid-section ${isEditMode ? '' : 'read-only'}`}>
          <TextInput
            name="email"
            label="Email*"
            value={profile.email}
            onChange={handleInputChange}
            type="email"
            isRequired={true}
            validChars="A-Za-z0-9@."
          />
          <TextInput
            name="mobile"
            label="Mobile*"
            value={profile.mobile}
            onChange={handleInputChange}
            type="text"
            validChars="0-9()+-"
            isRequired={true}
          />
          <div className={`profile-grid-section read-only`}>
            <TextInput
              name="password"
              label="Password*"
              value={profile.password ? profile.password : 'mockpassword'}
              onChange={handleInputChange}
              type="password"
              isRequired={true}
              validChars="A-Za-z0-9 -"
              showPasswordToggle={false}
            />
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ContactInfoForm;
