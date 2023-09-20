import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';

const SecondaryHeader = () => {
  const [menu, setMenu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/secondaryHeader', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setMenu(resInJson);
          console.log(menu);
          setError(false);
        } else {
          setMenu([]);
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
    <>
      <nav className='navbar navbar-expand-lg bg-light'>
        <div className='container'>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNav'
            aria-controls='navbarNav'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNav'>
            <ul className='navbar-nav'>
              {menu?.map((items) => {
                return (
                  <li key={items.id} className='nav-item ms-2'>
                    <a
                      className={
                        items.id === 1 ? 'nav-link active fs-5 text-danger' : 'nav-link text-secondary fs-5'
                      }
                      aria-current='page'
                      href='#'>
                      <span
                        className={
                          items.id === 1
                            ? 'bg-warning-subtle rounded-circle py-4 px-1 me-2'
                            : 'bg-body-secondary rounded-circle py-4 px-1 me-2'
                        }>
                        <img
                          src={items.imgUrl}
                          alt={items.toolTip}
                          // width='80'
                          height='70'
                          className='p-3'
                        />
                      </span>
                      {items.toolTip}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
      <hr className='text-secondary m-0' />
    </>
  );
};

export default SecondaryHeader;
