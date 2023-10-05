import { useState } from 'react';
// import { fetchApi } from '../../utils/fetchApi';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ConfirmOrder from '../ConfirmOrder/ConfirmOrder';
import PropTypes from 'prop-types';

const ChooseQuantity = ({ modal }) => {
  const details = modal;
  // console.log(details);
  // console.log(details.addOn);
  // console.log(details.quantitySize)
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(0);
  const [addOnPrice, setAddOnPrice] = useState(0);
  // const [itemSize, setItemSize] = useState({});
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(true);
  // useEffect(() => {
  //   fetchApi('http://localhost:5000/chooseQuantity', 'GET')
  //     .then((resInJson) => {
  //       if (resInJson.statusCode !== 404) {
  //         setItemSize(resInJson);
  //         setError(false);
  //       } else {
  //         setItemSize({});
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setError(true);
  //     })
  //     .finally(() => {
  //       setLoading(false);
  //     });
  // }, []);

  // if (loading) {
  //   return <div className='spinner-border text-success invisible' data-test-id='spinner'></div>;
  // }

  // if (error) {
  //   return <div className='alert-alert-danger'>Some Error Occurred. Try again later.</div>;
  // }
  const totalAmt = price + addOnPrice;
  const handleAddOn = (options) => {
    setAddOnPrice(options.addOnPrice);
  };

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
              <img src={details.cuisineImg} alt='foodItem' height={50} className='rounded me-4' />
              <span className='fs-5 text-dark fw-bold'>{details.cuisineName}</span>
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
              {/* {itemSize.itemSize?.map((item) => { */}
              {/* return ( */}
              {details.quantitySize?.map((foodSize) => {
                return (
                  <div key={foodSize.id} className='d-flex justify-content-between'>
                    <p>{foodSize.size}</p>
                    <div>
                      <input
                        type='radio'
                        value='medium-price'
                        className='me-1'
                        onClick={() => {
                          foodSize.id === 1 ? setPrice(foodSize.price) : setPrice(foodSize.price);
                        }}
                      />
                      <span id='medium-price'>₹{foodSize.price}</span>
                    </div>
                  </div>
                );
              })}
              {/* <div className='d-flex justify-content-between'>
                <p>Large</p>
                <div>
                  <input
                    type='radio'
                    value='Max-price'
                    className='me-1'
                    onClick={() => setPrice(details.largePrice)}
                  />
                  <span id='max-price'>₹{details.largePrice}</span>
                </div>
              </div> */}
              {/* );
              })} */}
            </div>
            <div className='border border-secondary-subtle p-2 rounded shadow-sm bg-white my-3'>
              <h5>{details.addOnType}</h5>
              <p className='border-bottom pb-2'>Select upto 4 options</p>
              {details.addOn?.map((options) => {
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
                      <span className='me-2'>₹{options.addOnPrice}</span>
                      <input
                        type='checkbox'
                        value='addOnPrice'
                        onClick={handleAddOn.bind(this, options)}
                      />
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
                  {price > 0 && (
                    <span className='m-0 ms-2'>
                      ₹{price > 0 && addOnPrice === 0 ? price : totalAmt}
                    </span>
                  )}
                  {/* {Price + addOnPrice} */}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmOrder details={details} total={totalAmt} />
    </>
  );
};

ChooseQuantity.propTypes = {
  modal: PropTypes.object
};

export default ChooseQuantity;
