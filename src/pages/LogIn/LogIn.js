import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';

const LogIn = () => {
  const [countryName, setCountryName] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  useEffect(() => {
    fetchApi('http://localhost:5000/countryDropdownForm', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setCountryName(resInJson);
          console.log(countryName);
          setError(false);
        } else {
          setCountryName({});
        }
      })
      .catch((err) => {
        console.log(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className='spinner-border text-success' data-test-id='spinner'></div>;
  }

  if (error) {
    return <div className='alert-alert-danger'>Some Error Occurred. Try again later.</div>;
  }

  return (
    <div
      className='modal fade'
      id='modal1'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'>
      <div className='modal-dialog modal-content'>
        <div className='modal-header border-0 text-secondary'>
          <h1 className='modal-title fs-3' id='exampleModalLabel'>
            Login
          </h1>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='modal'
            aria-label='Close'></button>
        </div>
        <div className='modal-body'>
          <form className='d-flex border rounded px-2 py-1'>
            <div className='dropdown'>
              <img
                src='https://b.zmtcdn.com/images/flags_z10/in.png?output-format=webp'
                alt='flag'
                height={20}
              />
              <button
                className='btn btn-transparent dropdown-toggle text-secondary'
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'>
                + 91
              </button>
              <ul className='dropdown-menu drop'>
                {countryName.countryName?.map((country) => {
                  return (
                    <li key={country.id}>
                      <a className='dropdown-item d-flex' href='#'>
                        <div>
                          <img
                            src={country.flagUrl}
                            alt={country.alt}
                            height={20}
                            className='me-2'
                          />
                          <span className='me-5'>{country.country}</span>
                        </div>
                        <div className='border-start'>
                          <span className='ms-2'>{country.callCode}</span>
                        </div>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <input
                type='text'
                className='form-control border-0 border-start  border-2 rounded-0'
                id='phoneNumber'
                placeholder='Phone'
              />
            </div>
          </form>
          <div className='text-center my-3'>
            <button className='border-0 bg-danger text-white rounded py-2 px-5'>
              Send One Time Password
            </button>
          </div>
          <div className='hr-text label-l mt-3 mb-4 text-secondary'>or</div>
          <div className='mb-3'>
            {countryName.continueWithBtn?.map((btnName) => {
              return (
                <div
                  key={btnName.id}
                  id='message-text'
                  type='button'
                  className='text-center text-secondary border p-2 rounded my-3'>
                  <FontAwesomeIcon icon={btnName.icon} className='mx-2 text-danger' />
                  {btnName.btnText}
                </div>
              );
            })}
          </div>
        </div>
        <div className='text-secondary p-3 text-center border-top'>
          New to Zomato?
          <span
            type='button'
            className='btn btn-transparent text-danger'
            data-bs-toggle='modal'
            data-bs-target='#modal2'>
            Create account
          </span>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
