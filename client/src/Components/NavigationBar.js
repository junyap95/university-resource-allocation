export default function NavigationBar({ color }) {
  return (
    <div className={`nav-bar ${color}`}>
      <a href="/">
        <h3>BOOKBBK</h3>
      </a>
      <div>
        <a href="/check-booking" target="blank" className="nav-btn">
          My Booking
        </a>

        <a href="/view-entry" className="nav-btn">
          BBK Staff
        </a>
      </div>
    </div>
  );
}
