import Form from '../../../components/form';

const StepFour = ({ data, setData }) => {
  return (
    <>
      <div className="welcome-formheader">
        <h3>Bio</h3>
      </div>
      <Form className="welcome-form">
        <div className="welcome-form-inputs">
          <label>
            Bio
            <textarea
              name="bio"
              value={data.bio}
              onChange={setData}
              placeholder="Tell us about yourself, your professional and educational highlights to date..."
              maxLength={300}
            ></textarea>
            {data.bio == null ? `0 / 300` : `${data.bio.length} / 300`}
          </label>
        </div>
      </Form>
    </>
  );
};

export default StepFour;
