import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetchApi';
import './DiningOutPage.scss';
import DiningOutSubHeader from '../../components/DiningOutSubHeader/DiningOutSubHeader';
import TrendingDinings from './TrendingDinings/TrendingDinings';
import Accordian from '../../components/Accordian/Accordian';

const DiningOutPage = () => {
  const [collections, setCollections] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  useEffect(() => {
    fetchApi('http://localhost:5000/diningOut', 'GET')
      .then((resInJson) => {
        if (resInJson.statusCode !== 404) {
          setCollections(resInJson);
          setError(false);
        } else {
          setCollections({});
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
    return (
      <div
        className='spinner-border text-success position-absolute top-50 start-50 translate-middle'
        data-test-id='spinner'></div>
    );
  }

  if (error) {
    return <div className='alert-alert-danger'>Some Error Occurred. Try again later.</div>;
  }
  return (
    <div className='container my-3'>
      <h3>Collections</h3>
      <div className='position-relative mt-4'>
        <p className=''>
          Explore curated lists of top restaurants, cafes, pubs, and bars in Chennai, based on
          trends
        </p>
        <button className='position-absolute top-0 end-0'>
          <Link to='#' className='text-decoration-none text-danger'>
            All collections in Chennai
            <FontAwesomeIcon icon='fa-solid fa-caret-right' className='ms-2' />
          </Link>
        </button>
      </div>
      <div className='position-relative'>
        <FontAwesomeIcon
          icon='fa-solid fa-angle-left'
          className='bg-white p-3 text-center rounded-pill position-absolute top-50 start-0'
        />
        <div className='d-flex row-poster'>
          {collections.zomatoCollections?.map((items) => {
            return (
              <div key={items.id} className='col-md-3 px-2 pb-3'>
                <div className='card text-white position-relative'>
                  <img
                    src={items.bgImageUrl}
                    className='card-img'
                    alt={items.highlightedText}
                    height={320}
                  />
                  <div className='position-absolute bottom-0 px-3 py-2 card-wrapper'>
                    <h5 className='card-title fw-normal'>{items.highlightedText}</h5>
                    <p className='card-text'>
                      <small>
                        {items.totalPlaces} Places{' '}
                        <FontAwesomeIcon icon='fa-solid fa-caret-right' className='ms-1' />
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <FontAwesomeIcon
          icon='fa-solid fa-angle-right'
          className='bg-white p-3 text-center rounded-pill position-absolute top-50 end-0'
        />
      </div>
      <DiningOutSubHeader />
      <div className='card border-0'>
        <img
          src='https://b.zmtcdn.com/data/o2_assets/da94405b04f6ae6bf64a4e2a01b1b5c11686563732.png'
          className='card-img'
          alt='offerBanner'
        />
      </div>
      <h3 className='mt-4 mb-5'>Trending dining restaurants in Chennai</h3>
      <TrendingDinings />
      <h3 className='my-4'>Explore options near me</h3>
      <Accordian />
    </div>
  );
};

export default DiningOutPage;
