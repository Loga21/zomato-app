import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

const SignUp = () => {
  const [accBtn, setAccBtn] = useState(false);

  return (
    <div
      className='modal fade'
      id='modal2'
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
          <form>
            <input
              type='text'
              className='form-control rounded mb-3 p-2'
              id='phoneNumber'
              placeholder='Full Name'
            />
            <input
              type='text'
              className='form-control rounded mb-3 p-2'
              id='phoneNumber'
              placeholder='Email'
            />
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
          </form>
          <div className='text-center my-3'>
            <button
              className={
                accBtn
                  ? 'border-0 bg-danger text-white rounded py-2 px-5'
                  : 'border-0 bg-secondary-subtle text-white rounded py-2 px-5'
              }
              onClick={() => setAccBtn(!accBtn)}>
              Create account
            </button>
          </div>
          <div className='hr-text label-l mt-3 mb-4 text-secondary'>or</div>
          <p
            id='message-text'
            type='button'
            className='text-center text-secondary border p-2 rounded my-3'>
            <FontAwesomeIcon icon='fa-brands fa-google' className='mx-2' /> Continue with Google
          </p>
          <p className='ms-2 fs-5 text-center'>
            Already have an account?{' '}
            <span
              type='button'
              className='btn btn-transparent text-danger'
              data-bs-toggle='modal'
              data-bs-target='#modal1'>
              Log in
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
