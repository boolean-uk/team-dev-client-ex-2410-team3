import React, { useContext } from 'react';
import Form from '../../../components/form';
import { ProfileContext } from '..';

const BioForm = () => {
  const { profile, handleBioChange, isEditMode } = useContext(ProfileContext);
  const maxLength = 300;
  const biography = profile.biography || ''; // Använd en tom sträng som standardvärde
  const isMaxLengthReached = biography.length >= maxLength;

  return (
    <div className="profile-grid-section-bio">
      <div className="profile-grid-section">
        <Form>
          <hr className="section-divider" />
          <h3 className="profile-info-header">Bio</h3>
          <label htmlFor="bio">Bio</label>
          <div className={`profile-grid-section ${isEditMode ? '' : 'read-only'}`}>
            <textarea
              onChange={handleBioChange}
              name="biography"
              value={biography}
              placeholder="Tell us about yourself, your professional interests and educational highlights to date..."
              maxLength={300}
              id="bio"
            ></textarea>
            <div className="info-container">
              <p className="info-text">{biography.length}/300</p>
              {isMaxLengthReached && <p className="error-text">Max length is 300 characters</p>}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default BioForm;
