import { useEffect } from "react";

export default function NavigationBar({ color }) {
  useEffect(() => {
    let prevScrollpos = window.pageYOffset;

    function handleScroll() {
      var currentScrollPos = window.pageYOffset;
      const navBar = document.querySelector(".nav-bar");

      if (navBar) {
        // Check if .nav-bar exists
        if (prevScrollpos > currentScrollPos) {
          navBar.style.top = "0";
        } else {
          navBar.style.top = "-100px";
        }
      }
      prevScrollpos = currentScrollPos;
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll); // Clean up the event listener
    };
  }, []); // Empty dependency array means this runs only on mount and unmount

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
