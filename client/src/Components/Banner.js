import birkbeckEvening from "../images/birkbeck-evening.jpg";

export default function Banner({ scrollToView }) {
  return (
    <div className="banner-main">
      <h1 style={{ fontSize: "2em", letterSpacing: '0.25rem' }}>WELCOME TO BOOKBBK</h1>
      <h2 style={{ fontSize: "1.25em", fontWeight: "normal", padding: "1.5em 0" }}>Find and book venues for any event, corporate or private</h2>
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
