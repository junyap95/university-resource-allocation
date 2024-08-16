import { useRef } from "react";
import Banner from "./Banner";
import BookingForm from "./Booking/BookingForm";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

export default function Home() {
  const bookingRef = useRef(null);
  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <NavigationBar color="nav-bar-transparent" />
      <Banner handlerFn={scrollToBooking} />
      <BookingForm ref={bookingRef} />
      <Footer />
    </>
  );
}
