import birkbeckEvening from "../images/birkbeck-evening.jpg";

export default function Banner({ scrollToView }) {
  return (
    <div className="banner-main">
      <h1>WELCOME TO BOOKBBK</h1>
      <h2>Find and book venues for any event, corporate or private</h2>
      <img
        className="banner-background"
        src={birkbeckEvening}
        alt="university"
      />
      <button
        className="btn banner-book-button"
        type="button"
        onClick={scrollToView}
      >
        Book Now!
      </button>
    </div>
  );
}
