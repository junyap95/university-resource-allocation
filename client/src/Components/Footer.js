import logo from "../images/bbk-logo.png";

function Footer() {
  return (
    <div className="footer-box">
      <div className="footer-main">
        <div className="logo-bbk">
          <img alt="logo" src={logo} />
        </div>
        <div>
          <ul>
            <li className="foot-head">BOOKBBK</li>
            <li>IMPACT AT BBK</li>
            <li>PRODUCT AUTHENTICITY</li>
            <li>MEDIA CENTRE</li>
            <li>PRIVACY POLICY</li>
            <li>TERMS AND CONDITIONS</li>
            <li>CAREER</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="foot-head">SHOP</li>
            <li>IMPACT AT BBK</li>
            <li>PRODUCT AUTHENTICITY</li>
            <li>MEDIA CENTRE</li>
            <li>PRIVACY POLICY</li>
            <li>TERMS AND CONDITIONS</li>
            <li>CAREER</li>
          </ul>
        </div>
        <div>
          <ul>
            <li className="foot-head">HELP</li>
            <li>IMPACT AT BBK</li>
            <li>PRODUCT AUTHENTICITY</li>
            <li>MEDIA CENTRE</li>
            <li>PRIVACY POLICY</li>
            <li>TERMS AND CONDITIONS</li>
            <li>CAREER</li>
          </ul>
        </div>

        <div className="foot-subscribe">
          <h2>Subscribe for news and offers</h2>
          <form>
            <input
              className="input-box"
              type="text"
              placeholder="ex. john_doe@gmail.com"
            />
          </form>
          <div>You may unsubscribe from these communications at anytime</div>
          <div>
            <button className="btn banner-book-button" type="button">
              SIGN UP
            </button>
          </div>
          <div>
            By signing up, you agree to BBK's <u>privacy policy</u> and{" "}
            <u>terms and conditions</u>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
