import useModal from '../../hooks/useModal';
import { useState } from 'react';
import Button from '../button';

const CreateCohortModal = () => {
  const { closeModal } = useModal();
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') setTitle(value);
    if (name === 'startDate') setStartDate(value);
    if (name === 'endDate') setEndDate(value);
  };

  const onSubmit = () => {
    console.log('Submit button was clicked! Closing modal in 2 seconds...');
    console.log(title);
    console.log(startDate);
    console.log(endDate);
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <section>
        <input
          type="text"
          name="title"
          value={title}
          onChange={onChange}
          placeholder="Cohort Title"
        />
      </section>
      <section>
        <input
          type="date"
          name="startDate"
          value={startDate}
          onChange={onChange}
          placeholder="Start Date"
          min={today}
        />
      </section>
      <section>
        <input
          type="date"
          name="endDate"
          value={endDate}
          onChange={onChange}
          placeholder="End Date"
          min={today}
        />
      </section>

      <section className="create-port-actions">
        <Button
          onClick={onSubmit}
          text="Create Cohort"
          classes={`${title.length ? 'blue' : 'offwhite'} width-full`}
          disabled={!title.length}
        />
      </section>
    </div>
  );
};

export default CreateCohortModal;
