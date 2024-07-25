import { useNavigate } from "react-router-dom";

export default function NavigationBar() {
  const navigate = useNavigate();
  const routeChange = () => {
    const path = `users`;
    navigate(path);
  };

  return (
    <div className="nav-bar-main">
      <div className="nav-bar-sub">
        <h3>BOOKBBK</h3>
      </div>
      <div className="nav-bar-sub">
        <div>My Booking</div>
        <div className="nav-btn" onClick={routeChange}>
          Staff Login
        </div>
      </div>
    </div>
  );
}
