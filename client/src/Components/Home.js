import Banner from "./Banner";
import BookingForm from "./BookingForm";
import NavigationBar from "./NavigationBar";
import { useRef } from "react";
import Footer from "./Footer";

export default function Home() {
  const bookingRef = useRef(null);
  const scrollToBooking = () => {
    bookingRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      <NavigationBar />
      <Banner scrollToView={scrollToBooking} />
      <BookingForm ref={bookingRef} />
      <Footer />
    </>
  );
}
