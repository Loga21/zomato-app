import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import './SignUp.scss';

const SignUp = () => {
  const [nameInput, setNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [accInfo, setAccInfo] = useState(false);
  // const [inputErrorMsg, setInputErrorMsg] = useState(false);
  const [nameInputErrorMsg, setNameInputErrorMsg] = useState(false);
  const [emailInputErrorMsg, setEmailInputErrorMsg] = useState(false);
  const emailRegex = /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;

  function validateEmail(emailInput) {
    return emailRegex.test(emailInput);
  }
  const isValidEmail = validateEmail(emailInput);
  // console.log(isValidEmail);

  const handleSubmit = (event) => {
    event.preventDefault();
    nameInput === '' || emailInput === '' || !isValidEmail ? setAccInfo(false) : setAccInfo(true);
    // console.log(isValidEmail);
    nameInput === '' ? setNameInputErrorMsg(true) : setNameInputErrorMsg(false);
    emailInput === '' || !isValidEmail ? setEmailInputErrorMsg(true) : setEmailInputErrorMsg(false);
    // console.log(nameInput, emailInput, accInfo);
    // console.log(inputErrorMsg)
  };

  const handleGoBackBtn = () => {
    setNameInput('');
    setEmailInput('');
    setAccInfo(false);
  };

  return (
    <div
      className='modal fade'
      id='signUpModal'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'>
      <div className='modal-dialog modal-content'>
        <div className='modal-header border-0 text-secondary'>
          <h1 className='modal-title fs-3' id='exampleModalLabel'>
            Sign up
          </h1>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='modal'
            aria-label='Close'></button>
        </div>
        <div className='modal-body'>
          {!accInfo && (
            <form>
              <div>
                <input
                  type='text'
                  className='form-control rounded mb-3 p-2 focus-out'
                  id='phoneNumber'
                  placeholder='Full Name'
                  onChange={(e) => setNameInput(e.target.value)}
                />
                {nameInput === '' && nameInputErrorMsg && (
                  <p className='text-danger'>Please Enter your Name</p>
                )}
                <input
                  type='text'
                  className='form-control rounded mb-3 p-2 focus-out'
                  id='phoneNumber'
                  placeholder='Email'
                  onChange={(e) => setEmailInput(e.target.value)}
                />
                {emailInput === '' && emailInputErrorMsg && (
                  <p className='text-danger'>Please Enter your Email</p>
                )}
                {emailInput !== '' && !isValidEmail && emailInputErrorMsg && (
                  <p className='text-danger'>Please Enter Valid Email</p>
                )}
                <div className='d-flex text-secondary'>
                  <div>
                    <input type='checkbox' id='check' className='ms-2 me-2' />
                  </div>
                  <div>
                    I agree to Zomatos
                    <span className='text-danger'> Terms of Service, Privacy Policy </span>and
                    <span className='text-danger'> Content Policies.</span>
                  </div>
                </div>
              </div>
              <div className='text-center my-3'>
                <button
                  className='border-0 bg-danger text-white rounded py-2 px-5'
                  onClick={handleSubmit}>
                  Create account
                </button>
              </div>
            </form>
          )}
          {accInfo && (
            <div className='text-center'>
              <p className='text-success fw-bold'>Account Created Successfully</p>
              <p>
                You can continue to{' '}
                <span
                  type='button'
                  className='ms-1 text-danger'
                  data-bs-toggle='modal'
                  data-bs-target='#loginModal'>
                  Log in
                </span>
              </p>
              <button
                className='bg-warning border-0 rounded text-dark p-1 px-2'
                onClick={handleGoBackBtn}>
                Go back
              </button>
            </div>
          )}
          <div className='hr-text label-l mt-3 mb-4 text-secondary'>or</div>
          <p
            id='message-text'
            type='button'
            className='text-center text-secondary border p-2 rounded my-3'>
            <FontAwesomeIcon icon='fa-brands fa-google' className='mx-2' /> Continue with Google
          </p>
          <p className='ms-2 fs-5 text-center m-0 mb-3'>
            Already have an account?
            <span
              type='button'
              className='text-danger ms-3'
              data-bs-toggle='modal'
              data-bs-target='#loginModal'>
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
