import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";

const About = (props) => {
  return (
    <React.Fragment>
      <Navbar />
      <div className="min-vh-100 pt-5 mb-5">
        <div className="container pt-5">
          <div className="row justify-content-center pt-5">
            <div
              className="col-10 text-white text-center p-4"
              style={{
                border: "1px solid #e99f30",
                backgroundColor: "#4b4545",
              }}
            >
              <h1>About MovieStars</h1>
              <h3>Branch Prueba-1</h3>
              <br />
              <p>
                MovieStars was created by Matias Caballero, a university student
                of computer science to acquire knowledge about the tools
                necessary for the development of web applications. Some of the
                tools used were: Reactjs, Nodejs, Bootstrap, Expressjs, among
                others.{" "}
              </p>
              <br />
              <p>
                In MovieStars you can search for the movies which you want to
                know about, add them to favorites, remove them from favorites.
              </p>
              <br />
              <p>
                Thank you for reading this far. If you want to see more of my
                projects:{" "}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://github.com/Matiitas"
                >
                  GitHub
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default About;
