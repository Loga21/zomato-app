import PrimaryHeader from '../PrimaryHeader/PrimaryHeader';
import SecondaryHeader from '../SecondaryHeader/SecondaryHeader';
import StickyOptions from '../StickyOptions/StickyOptions';

const Header = () => {
  const liveUrl = window.location.pathname;
  const homePath = '/';
  // const cuisinePagePath = '/cuisines';
  // const cuisineDetailPagePath = '/cuisine-details';
  console.log(liveUrl);
  // console.log(homePath);
  return (
    <div>
      {liveUrl !== homePath && (
        <div>
          <PrimaryHeader />
          <SecondaryHeader />
          <StickyOptions />
        </div>
      )}
    </div>
  );
};

export default Header;
