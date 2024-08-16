import birkbeckEvening from "../images/birkbeck-evening.jpg";
import Button from "./Button";
import { useNavigate } from "react-router-dom";

export default function Banner({ handlerFn }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/check-booking");
  };
  return (
    <div className="banner-main">
      <h1 style={{ letterSpacing: "0.25rem", fontSize: "3rem" }}>WELCOME TO BOOKBBK</h1>
      <h2 style={{ fontSize: "1.8rem", fontWeight: "normal" }}>
        Find and book venues for any event, corporate or private
      </h2>
      <img className="banner-background" src={birkbeckEvening} alt="university" />

      <Button btnText="Make a Booking" btnClass="banner-book-btn" handlerFn={handlerFn} />
      <Button btnText="Check My Booking" btnClass="banner-book-btn" handlerFn={handleClick} />
    </div>
  );
}
