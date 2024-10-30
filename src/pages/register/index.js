import { useState } from 'react';
import Button from '../../components/button';
import TextInput from '../../components/form/textInput';
import useAuth from '../../hooks/useAuth';
import CredentialsCard from '../../components/credentials';
import ErrorMessage from '../../components/errorMessage';
import './register.css';

const Register = () => {
  const { onRegister } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const isRequiredFieldsProvided = formData.email && formData.password;
  const isValidEmail = formData.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/);
  const isValidPassword = formData.password.length >= 8;

  const isFormDataValid = isRequiredFieldsProvided && isValidEmail && isValidPassword;

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="bg-blue register credentialpage">
      <CredentialsCard
        title="Register"
        socialLinksTitle="Or sign up with"
        altButtonTitle="Already a user?"
        altButtonLink="/login"
        altButtonText="Log in"
      >
        <div className="register-form">
          <form>
            <TextInput
              value={formData.email}
              onChange={onChange}
              type="email"
              name="email"
              label={'Email *'}
              isRequired={true}
              validChars={'A-Za-z0-9@._-'}
            />
            <TextInput
              value={formData.password}
              onChange={onChange}
              name="password"
              label={'Password *'}
              type={'password'}
              isRequired={true}
            />
          </form>
          {errorMessage && <ErrorMessage message={errorMessage} />}
          <Button
            text="Sign up"
            onClick={() => onRegister(formData.email, formData.password, setErrorMessage)}
            // Prevent user from submitting form if email or password (required fields) are empty
            disabled={!isFormDataValid}
            classes="green width-full"
          />
        </div>
      </CredentialsCard>
    </div>
  );
};

export default Register;
