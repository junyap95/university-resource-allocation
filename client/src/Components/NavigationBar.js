export default function NavigationBar({ color }) {
  let prevScrollpos = window.pageYOffset;
  window.onscroll = function () {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.querySelector(".nav-bar").style.top = "0";
    } else {
      document.querySelector(".nav-bar").style.top = "-100px";
    }
    prevScrollpos = currentScrollPos;
  };
  return (
    <div className={`nav-bar ${color}`}>
      <a href="/">
        <h3>BOOKBBK</h3>
      </a>
      <div>
        <a href="/staff-login" className="nav-btn">
          BBK Staff
        </a>
      </div>
    </div>
  );
}
