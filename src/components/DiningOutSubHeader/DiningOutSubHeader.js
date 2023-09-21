import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Filter from '../Filter/Filter';

const DiningOutSubHeader = () => {
  const [subHeader, setSubHeader] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  useEffect(() => {
    fetchApi('http://localhost:5000/diningOut', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setSubHeader(resInJson);
          console.log(subHeader);
          setError(false);
        } else {
          setSubHeader({});
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
      <nav className='navbar navbar-expand-lg bg-transparent my-4'>
        <div className='container'>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarNavDropdown'
            aria-controls='navbarNavDropdown'
            aria-expanded='false'
            aria-label='Toggle navigation'>
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarNavDropdown'>
            <ul className='navbar-nav'>
              {subHeader.subHeaderMenus?.map((menu) => {
                return (
                  <li key={menu.id} className='nav-item border rounded me-3'>
                    <a
                      className='nav-link active text-secondary'
                      type='button'
                      data-bs-target={menu.id === 1 ? '#modal3' : ''}
                      data-bs-toggle={menu.id === 1 ? 'modal' : ''}>
                      {menu.id === 1 && (
                        <FontAwesomeIcon
                          icon='fa-solid fa-filter'
                          className='text-secondary me-2'
                        />
                      )}
                      {menu.id === 2 && (
                        <img
                          src='https://b.zmtcdn.com/data/o2_assets/577bf55ff265ae45e11cfe6911d176941687789024.png'
                          alt='gold-logo'
                          className='me-2'
                          height={18}
                        />
                      )}
                      {menu.menu}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </nav>
      <Filter />
    </>
  );
};

export default DiningOutSubHeader;
