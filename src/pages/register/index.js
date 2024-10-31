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

  // Email validation
  const emailPatternDescription = 'Please enter a valid email address';
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  const emailRegexValidChars = 'A-Za-z0-9@._-';
  const isValidEmail = formData.email.match(emailRegex);

  // Password validation
  // The password should not be less than 8 characters in length
  // The password should contain at least one uppercase character: /(?=.*[A-Z])/
  // The password should contain at least one number: /(?=.*[0-9])/
  // The password should contain at least one special character: /(?=.*[!@#$%^&*])/
  const patternDescription =
    'Password must contain at least one uppercase letter, one number, and one special character';
  const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
  const passwordRegexValidChars = 'A-Za-z0-9@._\\-!@#\\$%\\^&\\*';
  const hasValidLength = formData.password.length >= 8;
  const isValidPassword = passwordRegex.test(formData.password) && hasValidLength;

  // Form validation
  const isRequiredFieldsProvided = formData.email && formData.password;
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
              validChars={emailRegexValidChars}
              pattern={emailRegex}
              patternDescription={emailPatternDescription}
            />
            <TextInput
              value={formData.password}
              onChange={onChange}
              name="password"
              label={'Password *'}
              type={'password'}
              isRequired={true}
              validChars={passwordRegexValidChars}
              pattern={passwordRegex}
              patternDescription={patternDescription}
              minLength={8}
            />
          </form>
          {errorMessage && <ErrorMessage message={errorMessage} />}
          <div className={`text-register-info`}>*Required</div>
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
