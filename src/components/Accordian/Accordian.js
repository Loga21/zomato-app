import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';

const Accordian = () => {
  const [food, setFood] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  useEffect(() => {
    fetchApi('http://localhost:5000/cuisine', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setFood(resInJson);
          console.log(food);
          setError(false);
        } else {
          setFood({});
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
      <div className='accordion container' id='accordion1'>
        <div className='accordion-item'>
          <h2 className='accordion-header'>
            <button
              className='accordion-button fs-5'
              type='button'
              data-bs-toggle='collapse'
              data-bs-target='#collapseOne'
              aria-expanded='true'
              aria-controls='collapseOne'>
              Popular cuisines near me
            </button>
          </h2>
          <div
            id='collapseOne'
            className='accordion-collapse collapse'
            data-bs-parent='#accordion1'>
            <div className='accordion-body'>
              Bakeries near me. Bars near me. Beverage Shops near me. Bhojanalya near me. Cafés near
              me. Casual Dining near me. Clubs near me. Cocktail Bars near me. Confectioneries near
              me. Dessert Parlors near me. Dhabas near meFine Dining near me. Food Courts near me.
              Food Trucks near me. Irani Cafes near me. Kiosks near me. Lounges near me. Paan Shop
              near me. Pubs near me. Quick Bites near me. Shacks near me. Sweet Shops near me
            </div>
          </div>
        </div>
      </div>
      <div className='accordion container mt-4' id='accordion2'>
        {food.accordionValues?.map((item) => {
          return (
            <div className='accordion-item mt-4 rounded' key={item.id}>
              <h2 className='accordion-header border rounded'>
                <button
                  className='accordion-button fs-5'
                  type='button'
                  data-bs-toggle='collapse'
                  data-bs-target={item.toggleTarget}
                  aria-expanded='true'
                  aria-controls={item.ariaControls}>
                  {item.btnName}
                </button>
              </h2>
              <div
                id={item.targetId}
                className='accordion-collapse collapse'
                data-bs-parent={item.dataParent}>
                <div
                  className={
                    item.id === 2
                      ? 'accordion-body d-flex justify-content-around'
                      : 'accordion-body d-flex justify-content-evenly'
                  }>
                  <p className='m-0'>{item.brand1}</p>
                  <p className='m-0'>{item.brand2}</p>
                  <p className='m-0'>{item.brand3}</p>
                  <p className='m-0'>{item.brand4}</p>
                  <p className='m-0'>{item.brand5}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Accordian;
