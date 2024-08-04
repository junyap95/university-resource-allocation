export default function NavigationBar({ color }) {
  return (
    <div className={color}>
      <a href="/" className="nav-bar-sub">
        <h3>BOOKBBK</h3>
      </a>
      <div className="nav-bar-sub">
        <a href="/check-booking" target="blank">
          My Booking
        </a>

        <a href="/view-all-bookings" className="nav-btn">
          BBK Staff
        </a>
      </div>
    </div>
  );
}
