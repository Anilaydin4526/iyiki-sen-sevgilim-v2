import './ParallaxBanner.css';

function ParallaxBanner({ bannerText }) {
  return (
    <div className="parallax-banner">
      <div className="parallax-content">
        <h2>{bannerText}</h2>
      </div>
    </div>
  );
}

export default ParallaxBanner; 