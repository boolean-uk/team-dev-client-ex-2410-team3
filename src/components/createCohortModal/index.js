import useModal from '../../hooks/useModal';
import { useState } from 'react';
import Button from '../button';
import { postCohort, addUserToCohort } from '../../service/apiClient';

const CreateCohortModal = ({ userId, fetchCohorts }) => {
  const { closeModal } = useModal();
  const [name, setName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const onChange = (e) => {
    const { value } = e.target;
    if (e.target.name === 'name') setName(value);
    if (e.target.name === 'startDate') setStartDate(value);
    if (e.target.name === 'endDate') setEndDate(value);
  };

  const onSubmit = () => {
    console.log('Submit button was clicked! Closing modal in 2 seconds...');
    console.log(name);
    console.log(startDate);
    console.log(endDate);
    postCohort(name, startDate, endDate).then((res) => {
      console.log(res);
      addUserToCohort(res.data.id, userId).then((res) => {
        console.log(res);
        fetchCohorts();
      });
    });
    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div>
      <section>
        <input type="text" name="name" value={name} onChange={onChange} placeholder="Cohort Name" />
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
          classes={`${name.length ? 'blue' : 'offwhite'} width-full`}
          disabled={!name.length}
        />
      </section>
    </div>
  );
};

export default CreateCohortModal;
