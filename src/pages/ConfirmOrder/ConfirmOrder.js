import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const ConfirmOrder = () => {
  const [btnLable, setBtnLable] = useState({});
  const [payMethod, setPayMethod] = useState('GPay');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  useEffect(() => {
    fetchApi('http://localhost:5000/confirmOrder', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setBtnLable(resInJson);
          setError(false);
        } else {
          setBtnLable({});
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
    <div
      className='modal fade'
      id='ConfirmOrderModal'
      tabIndex='-1'
      aria-labelledby='exampleModalLabel'
      aria-hidden='true'>
      <div className='modal-dialog modal-content'>
        <div className='modal-header border-0'>
          <div className='modal-title' id='exampleModalLabel'>
            <span className='fs-5 text-dark fw-bold'>Mr/Mr.s someone</span>
          </div>
          <button
            type='button'
            className='btn-close'
            data-bs-dismiss='modal'
            aria-label='Close'></button>
        </div>
        <div className='modal-body bg-light rounded'>
          <p className='border border-secondary-subtle p-2 rounded bg-white shadow-sm'>
            <FontAwesomeIcon icon='fa-solid fa-motorcycle' className='text-success me-2' />
            Delivery in <b>41 min</b>
          </p>
          <div className='hr-text label-l mt-3 mb-4 text-secondary'>ITEM(S) ADDED</div>
          <div className='d-flex justify-content-between border border-secondary-subtle p-2 rounded bg-white shadow-sm my-4'>
            <div>
              <FontAwesomeIcon icon='fa-regular fa-square-plus' />
              <span className='ms-2'>Chicken</span>
              <div className='ms-4'>
                <p className='m-0'>₹290</p>
                <p className='m-0'>Medium</p>
                <button className='btn btn-sm p-0 text-danger'>+ Edit -</button>
              </div>
            </div>
            <div className='text-end'>
              <div className='border border-danger rounded shadow-sm'>
                <button className='fs-4'>-</button>
                <span className='mx-3'>1</span>
                <button className='fs-4'>+</button>
              </div>
              <p className='m-0 mt-2'>₹290</p>
            </div>
          </div>
          {btnLable.addBtn?.map((lable) => {
            return (
              <div
                key={lable.id}
                className='border border-secondary-subtle p-2 rounded bg-white shadow-sm mt-2'>
                <FontAwesomeIcon icon={lable.icon} />
                <span className='ms-2'>{lable.btnLable}</span>
                <FontAwesomeIcon icon='fa-solid fa-angle-right' className='float-end pt-1' />
              </div>
            );
          })}
          <div className='hr-text label-l mt-3 mb-4 text-secondary'>SAVINGS CORNER</div>
          <div className='border border-secondary-subtle p-2 rounded bg-white shadow-sm my-4'>
            <div className='d-flex justify-content-between'>
              <div>
                <FontAwesomeIcon
                  icon='fa-solid fa-hand-holding-dollar'
                  className='text-primary me-2'
                />
                <span>Save ₹100 more on this order</span>
              </div>
              <div>
                <button className='text-danger'>Apply</button>
              </div>
            </div>
            <p className='ms-4 border-bottom pb-2'>Code: ZOMATO</p>
            <p className='m-0 text-center'>
              View off coupons <FontAwesomeIcon icon='fa-solid fa-angle-right' />
            </p>
          </div>
          <div className='hr-text label-l mt-3 mb-4 text-secondary'>BILL SUMMARY</div>
          <div className='border border-secondary-subtle p-2 rounded bg-white shadow-sm my-4'>
            {btnLable.billSummaryData?.map((data) => {
              return (
                <div
                  key={data.id}
                  className={
                    data.id === 3
                      ? ' border-bottom d-flex justify-content-between my-1 mb-3'
                      : 'd-flex justify-content-between my-1'
                  }>
                  <div>
                    <p className='m-0'>{data.lable}</p>
                    {data.id === 1 && (
                      <p className='m-0 text-secondary mb-2'>Includes ₹2 Feeding India donation</p>
                    )}
                    {data.id === 3 && (
                      <p className='m-0 text-secondary mb-2'>
                        Fully goes to them for their efforts
                      </p>
                    )}
                  </div>
                  <p>₹{data.price}</p>
                </div>
              );
            })}
          </div>
          <div className='d-flex justify-content-between border border-secondary-subtle p-2 rounded bg-white shadow-sm my-4'>
            <div>
              <p className='m-0 mb-2'>Feeding India donation</p>
              <p>working towards a malnutrition free India</p>
            </div>
            <div>
              <input type='checkbox' value='price' />
              <p className='m-0 mt-2 me-2'>₹2</p>
            </div>
          </div>
          <div className='d-flex justify-content-between border border-secondary-subtle rounded bg-white p-2 shadow-sm mb-3'>
            <div className='btn-group sortby'>
              <button
                className='btn btn-transparent dropdown-toggle'
                type='button'
                data-bs-toggle='dropdown'
                aria-expanded='false'>
                {payMethod}
              </button>
              <ul className='dropdown-menu shadow'>
                {btnLable.paymentMethod?.map((method) => {
                  return (
                    <li className='p-1' key={method.id}>
                      <Link
                        className='dropdown-item text-secondary'
                        to='#'
                        onClick={() => setPayMethod(method.method)}>
                        <img src={method.icon} alt='method' height={18} className='me-2' />
                        {method.method}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div>
              <button className='btn btn-danger'>Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
