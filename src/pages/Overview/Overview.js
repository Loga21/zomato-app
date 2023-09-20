import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import { Link } from 'react-router-dom';
import './Overview.scss';

const Overview = () => {
  const [restaurant, setRestaurant] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  useEffect(() => {
    fetchApi('http://localhost:5000/overview', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setRestaurant(resInJson);
          console.log(restaurant);
          setError(false);
        } else {
          setRestaurant({});
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
    <div>
      <div className='d-flex'>
        <div>
          <h4>About this place</h4>
          <div className='d-flex mb-4 mt-4'>
            {restaurant.restroFeatures?.map((feature) => {
              return (
                <div key={feature.id} className='card me-4 px-3 py-2 d-flex flex-row shadow-sm'>
                  <div>
                    <img src={feature.imgUrl} alt='safeRide' height={40} className='me-2' />
                  </div>
                  <div>
                    <p className='m-0' style={{ fontSize: 10 }}>
                      {feature.safetyMeasures}
                    </p>
                    <p className='m-0'>{feature.features}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div>
            <div className='d-flex justify-content-between'>
              <h4 className='mb-3'>Menu</h4>
              <p className='m-0 text-danger me-5'>
                See all menus
                <FontAwesomeIcon
                  icon='fa-solid fa-chevron-right'
                  className='ms-2'
                  style={{ fontSize: 11 }}
                />
              </p>
            </div>
            <div className='geeks rounded'>
              <img
                src='https://b.zmtcdn.com/data/menus/940/18591940/920a90fa4643eaa74f5224880809b54f.jpg?fit=around%7C200%3A200&crop=200%3A200%3B%2A%2C%2A'
                alt='menu'
                height={190}
                className='rounded'
              />
            </div>
            <p className='m-0 mt-1'>Food Menu</p>
            <p className='m-0 text-secondary' style={{ fontSize: 12 }}>
              3 pages
            </p>
          </div>
          <h4 className='mb-3 mt-4'>Cuisines</h4>
          {restaurant.cuisineVarietyBtn?.map((varieties) => {
            return (
              <button
                key={varieties.id}
                className='border-1 border-secondary-subtle rounded-4 bg-transparent px-2 py-1 text-success me-2 mb-4 shadow-sm'>
                {varieties.btnName}
              </button>
            );
          })}
          <h4>People Say This Place Is Known For</h4>
          <p className='m-0 mb-4 text-secondary'>
            Plenty of Vegetarian Options, Lip Smacking Food, Portion, Good Taste, Good Food, Spicy
          </p>
          <h4>Average Cost</h4>
          <p className='m-0 text-secondary mt-3'>₹200 for two people (approx.)</p>
          <p className='m-0 text-secondary mt-1' style={{ fontSize: 13 }}>
            Exclusive of applicable taxes and charges, if any
          </p>
          <p className='m-0 text-secondary border-bottom mt-1 mb-3' style={{ fontSize: 12 }}>
            How do we calculate cost for two?
          </p>
          <p className='m-0'>Cash and Cards accepted</p>
          <p className='m-0 mb-4'>Digital payments accepted</p>
          <h4 className='mb-3'>More Info</h4>
          <div className='me-5 text-secondary restro-icons'>
            {restaurant.moreInfo?.map((info) => {
              return (
                <div key={info.id}>
                  <p>
                    <FontAwesomeIcon
                      icon='fa-regular fa-circle-check'
                      className='text-success me-2'
                    />
                    {info.features}
                  </p>
                </div>
              );
            })}
          </div>
          <h5 className='text-secondary mt-3'>OUR SPONSORS</h5>
          <div className='d-flex flex-wrap my-3'>
            {restaurant.ourSponsors?.map((sponsor) => {
              return (
                <div key={sponsor.id} className='me-3 mb-3'>
                  <img
                    src={sponsor.sponserImgUrl}
                    alt={sponsor.sponserName}
                    height={180}
                    className='rounded mb-2'
                  />
                  <h4>{sponsor.sponserName}</h4>
                  <span
                    className='bg-success rounded text-light px-1 me-1 mt-2'
                    style={{ width: 42, height: 26, fontSize: 16 }}>
                    {sponsor.diningRating}
                    <FontAwesomeIcon
                      icon='fa-solid fa-star'
                      className='fs-n1 text-light'
                      style={{ fontSize: 8, paddingBottom: 2, marginLeft: 2 }}
                    />
                  </span>
                  <span>DINING</span>
                  <span className='border-end border-dark ms-3 me-3'></span>
                  <span
                    className='bg-success rounded text-light px-1 me-1 mt-2'
                    style={{ width: 42, height: 26, fontSize: 16 }}>
                    {sponsor.deliveryRating}
                    <FontAwesomeIcon
                      icon='fa-solid fa-star'
                      className='fs-n1 text-light'
                      style={{ fontSize: 8, paddingBottom: 2, marginLeft: 2 }}
                    />
                  </span>
                  <span>DELIVERY</span>
                  <p className='text-secondary mb-3'>{sponsor.foodVarieties}</p>
                </div>
              );
            })}
          </div>
          <p className='fs-5'>Similar restaurants</p>
          <div className='d-flex my-3'>
            {restaurant.similarRestaurants?.map((restro) => {
              return (
                <div key={restro.id} className='me-2'>
                  <img
                    src={restro.sponserUrl}
                    alt={restro.restaurantName}
                    height={200}
                    className='rounded mb-2'
                  />
                  <h4>{restro.restaurantName}</h4>
                  <span
                    className='bg-success rounded text-light px-1 me-1 mt-2'
                    style={{ width: 42, height: 26, fontSize: 16 }}>
                    {restro.restroDiningRating}
                    <FontAwesomeIcon
                      icon='fa-solid fa-star'
                      className='fs-n1 text-light'
                      style={{ fontSize: 8, paddingBottom: 2, marginLeft: 2 }}
                    />
                  </span>
                  <span>DINING</span>
                  <span className='border-end border-dark ms-1 me-1'></span>
                  <span
                    className='bg-success rounded text-light px-1 me-1 mt-2'
                    style={{ width: 42, height: 26, fontSize: 16 }}>
                    {restro.restroDeliveryRating}
                    <FontAwesomeIcon
                      icon='fa-solid fa-star'
                      className='fs-n1 text-light'
                      style={{ fontSize: 8, paddingBottom: 2, marginLeft: 2 }}
                    />
                  </span>
                  <span>DELIVERY</span>
                  <p className='text-secondary mb-0'>{restro.foodTypes}</p>
                  <p className='text-secondary mb-3'>{restro.location}</p>
                </div>
              );
            })}
          </div>
          <div className='bg-body-secondary rounded py-2'>
            <h4 className='ms-3'>Are you a food blogger?</h4>
            <p className='mb-0 text-danger ms-3'>
              Add a Zomato spoonback to your blog
              <FontAwesomeIcon
                icon='fa-solid fa-chevron-right'
                className='ms-2'
                style={{ fontSize: 11 }}
              />
            </p>
          </div>
          <hr className='text-secondary' />
          <div className='mb-4'>
            <h4 className='mb-3'>Review Highlights</h4>
            {restaurant.reviewHighlights?.map((reviewBtn) => {
              return (
                <button
                  key={reviewBtn.id}
                  className='border-1 border-secondary-subtle rounded-4 bg-transparent px-2 py-1 me-2 shadow-sm'>
                  {reviewBtn.btnName}
                </button>
              );
            })}
          </div>
          <hr className='text-secondary' />
          <h5>HELP US MAKE ZOMATO BETTER</h5>
          <h5 className='mt-3'>Report an error in this listing</h5>
          <p className='mb-0 text-secondary' style={{ fontSize: 11 }}>
            Help us make Zomato more updated and relevant for everyone
          </p>
          <p className='text-danger' style={{ fontSize: 14 }}>
            Report now
            <FontAwesomeIcon
              icon='fa-solid fa-chevron-right'
              className='ms-2'
              style={{ fontSize: 11 }}
            />
          </p>
        </div>
        <div className='card col-md-4 shadow-sm rounded-4' style={{ height: 390 }}>
          <div className='card-body'>
            <h5>Call</h5>
            <p className='text-danger'>+919941504709</p>
            <h5>Direction</h5>
            <div className='position-relative mt-1'>
              <img
                src='https://maps.zomato.com/php/staticmap?center=13.0952593315,80.2410406619&maptype=zomato&markers=13.0952593315,80.2410406619,pin_res32&sensor=false&scale=2&zoom=16&language=en&size=240x150&size=400x240&size=650x250'
                alt='location'
                height={130}
              />
              <p className='m-0 position-absolute bottom-0 start-0 ms-1'>
                Ⓒ <Link to='/'>OpenStreetMap</Link> contributors
              </p>
            </div>
            <p className='mt-2 text-secondary'>
              76, Opposite ESI Hospital, Medavakkam Tank Road, Ramalingapuram, Kilpauk, Chennai
            </p>
            <div className='my-2'>
              {restaurant.gpsBtn?.map((gps) => {
                return (
                  <button
                    key={gps.id}
                    className='border-1 border-secondary-subtle rounded bg-transparent px-2 py-1 me-3'>
                    <FontAwesomeIcon icon={gps.icon} className='text-secondary me-1' />
                    {gps.btnName}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
