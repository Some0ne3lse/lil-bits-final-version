const Footer = () => {
  return (
    <footer className="footer">
      <div className="info">
        <p className="address">9080 Woodman Ave, Arleta, CA 91331, USA</p>
        <a href="tel:1235555" className="phone">
          123-5555
        </a>
        <a href="mailto:frontdesk@lilbits.com" className="email">
          frontdesk@lilbits.com
        </a>
      </div>
      <div className="opening_hours">
        <p className="opening_text">Opening hours:</p>
        <p className="opening_weekdays">Monday to Friday: 16:00 - 23:00</p>
        <p className="opening_weekends">Saturday and Sunday: Closed</p>
      </div>
    </footer>
  );
};

export default Footer;
