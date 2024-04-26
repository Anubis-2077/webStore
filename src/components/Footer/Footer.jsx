import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import EmailIcon from "@mui/icons-material/Email";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const imageUrl =
    windowWidth < 500
      ? "/images/dancer-no-bg.png"
      : "/images/dancer.png";

  return (
    <div className="footerContainer">
      <footer>
        <div className="contactContainer">
          <div className="leftSideContainers">
            <div className="addressContainer">
              <h5>Ritual del Vino</h5>
              <p>General Acha 135 sur Capital - San Juan</p>
              <p></p>
            </div>
            <div className="telContainer">
              <h5>Visita nuestras redes</h5>
              <InstagramIcon className="instagram" />
              <FacebookIcon className="facebook" />
              <YouTubeIcon className="youtube" />
              <WhatsAppIcon className="whatsapp" />
            </div>
          </div>
          <div className="ImgContainerFooter">
            <img src={imageUrl} alt="" />
          </div>
          <div className="rightSideContainers">
            <div className="newsletterContainer">
              <h5>Subscríbete a nuestro newsletter</h5>
              <div className="inputButtonContainer">
                <input
                  type="email"
                  placeholder="Tu email"
                  className="newsletterInput"
                />
                <button type="submit" className="newsletterButton">
                  <EmailIcon style={{ color: "#3D0101" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="creditsContainer">
          <p>Diseñado y realizado por <Link to="https://github.com/Anubis-2077/">Anubis</Link></p>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
