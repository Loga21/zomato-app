import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConfirmOrder from '../ConfirmOrder/ConfirmOrder';

const ChooseQuantity = () => {
  const [quantity, setQuantity] = useState(1);
  const [itemSize, setItemSize] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  useEffect(() => {
    fetchApi('http://localhost:5000/chooseQuantity', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setItemSize(resInJson);
          setError(false);
        } else {
          setItemSize({});
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
    return <div className='spinner-border text-success invisible' data-test-id='spinner'></div>;
  }

  if (error) {
    return <div className='alert-alert-danger'>Some Error Occurred. Try again later.</div>;
  }

  return (
    <>
      <div
        className='modal fade'
        id='ChooseQuantityModal'
        tabIndex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'>
        <div className='modal-dialog modal-content'>
          <div className='modal-header border-0'>
            <div className='modal-title' id='exampleModalLabel'>
              <img
                src='https://b.zmtcdn.com/data/pictures/0/18591940/feaa196881849fd693d1ede725a373b0_o2_featured_v2.jpg?output-format=webp&fit=around|80:90&crop=80:90;*,*'
                alt='foodItem'
                className='rounded me-4'
              />
              <span className='fs-5 text-dark fw-bold'>Mithai, Bakery</span>
            </div>
            <button
              type='button'
              className='btn-close'
              data-bs-dismiss='modal'
              aria-label='Close'></button>
          </div>
          <div className='modal-body bg-light rounded'>
            <div className='border border-secondary-subtle p-2 rounded shadow-sm bg-white'>
              <h5>QUANTITY</h5>
              <p className='pb-2 border-bottom'>Select only 1 option</p>
              {itemSize.itemSize?.map((item) => {
                return (
                  <div key={item.id} className='d-flex justify-content-between'>
                    <p>{item.size}</p>
                    <div>
                      <input type='radio' value='price' className='me-1' />₹{item.price}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='border border-secondary-subtle p-2 rounded shadow-sm bg-white my-3'>
              <h5>CRISPY CHICKEN ADD ON</h5>
              <p className='border-bottom pb-2'>Select upto 5 options</p>
              {itemSize.addOnOptions?.map((options) => {
                return (
                  <div key={options.id} className='d-flex justify-content-between mb-3'>
                    <div>
                      <FontAwesomeIcon
                        icon='fa-regular fa-circle-dot'
                        className='text-success me-2'
                      />
                      <span className='m-0'>{options.addOnName}</span>
                    </div>
                    <div>
                      <span className='me-2'>₹{options.price}</span>
                      <input type='checkbox' value='price' />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className='d-flex justify-content-between border border-secondary-subtle p-2 rounded shadow-sm bg-white my-3'>
              <div className='border border-danger rounded shadow-sm'>
                <button className='fs-4' onClick={() => setQuantity(quantity - 1)}>
                  -
                </button>
                <span className='mx-3'>{quantity}</span>
                <button className='fs-4' onClick={() => setQuantity(quantity + 1)}>
                  +
                </button>
              </div>
              <div>
                <button
                  className='btn btn-danger rounded'
                  // className='btn btn-transparent'
                  data-bs-toggle='modal'
                  data-bs-target='#ConfirmOrderModal'>
                  Add item
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmOrder />
    </>
  );
};

export default ChooseQuantity;
