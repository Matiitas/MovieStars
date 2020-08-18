import React from "react";
import { Link } from "react-router-dom";

function Footer(props) {
  return (
    <React.Fragment>
      <footer
        className="page-footer font-small pt-4 text-white"
        style={{
          backgroundColor: "#4b4545",
          borderTop: "1px solid #e99f30",
        }}
      >
        <div className="container-fluid text-center text-md-left">
          <div className="row text-center">
            <div className="col-md-6 mt-md-0 mt-3">
              <h4>MovieStars</h4>
              <p>You can search for your favorites movies.</p>
            </div>
            <hr className="clearfix w-100 d-md-none pb-3" />
            <div className="col-md-6 mb-md-0 mb-3">
              <h4>Links</h4>
              <ul className="list-unstyled">
                <li>
                  <Link to="/contact">
                    <span>Contact</span>
                  </Link>
                </li>
                <li>
                  <Link to="/">
                    <span>Github</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>

      <div
        className="footer-copyright text-center py-3 text-white"
        style={{ backgroundColor: "#282525" }}
      >
        © 2020 Copyright: Caballero Victor Matias
      </div>
    </React.Fragment>
  );
}

export default Footer;
