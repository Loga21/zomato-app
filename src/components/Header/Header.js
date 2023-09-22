import PrimaryHeader from '../PrimaryHeader/PrimaryHeader';
import SecondaryHeader from '../SecondaryHeader/SecondaryHeader';
import StickyOptions from '../StickyOptions/StickyOptions';

const Header = () => {
  const liveUrl = window.location.pathname;
  const homePath = '/';
  console.log(liveUrl);
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
