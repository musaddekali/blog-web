import { useEffect } from "react";
import { FaHome } from "react-icons/fa";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { updateDoc, doc } from "firebase/firestore";
import { useGlobalContext } from "../../context/context";
import "./Navbar.css";
import {FiAlertTriangle} from 'react-icons/fi';
import {BiLoaderCircle} from 'react-icons/bi';

const Navbar = () => {
  const { user, userData, setUserData, authorPageURL,handleAlert } = useGlobalContext();

  const { name, profileImg } = userData;

  const handleNavLinkToggle = () => {
    const navItem = document.querySelectorAll(".nav-item");
    navItem.forEach((item) => {
      item.addEventListener("click", () => {
        document.querySelector(".navbar-collapse").classList.remove("show");
      });
    });
  };

  const logOut = async () => {
    if (window.confirm(`${name} do you want to log out?`)) {
      handleAlert(true, 'info', 'Logging out...', <BiLoaderCircle />);
      try {
        if (user) {
          await signOut(auth);
          await updateDoc(doc(db, "users", user.uid), { isOnline: false });
          setUserData({});
          handleAlert(true, 'danger', 'Logged out', <FiAlertTriangle/>)
        }
      } catch (err) {
        console.log("Log Out Error-> ", err.code);
        handleAlert(true, 'danger', err.code, <FiAlertTriangle/>)
      }
    }
  };

  useEffect(() => {
    handleNavLinkToggle();
  }, []);

  return (
    <header className="header fixed-top">
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Blog Web
          </Link>
          <div className="d-flex align-items-center d-lg-none">
            {/* home page*/}
            <div className="mobile-home">
              <Link to="/">
                {" "}
                <FaHome />{" "}
              </Link>
            </div>
            {/* author profile */}
            {user && (
              <div className="author-mobile-profile">
                <Link className="img" to={`/${authorPageURL}`}>
                  {profileImg && (
                    <img src={profileImg} alt="author" className="img-fill img-cover" />
                  )}
                  {!profileImg && (
                    <div className="author-info-name-letter">
                      {name && name.charAt(0)}
                    </div>
                  )}
                </Link>
              </div>
            )}
            {/* mobile nav toggler  */}
            <button
              className="navbar-toggler shadow-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav align-items-lg-center ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link home" to="/">
                  <FaHome />
                </Link>
              </li>
              {user && (
                <li className="nav-item author-profile mb-lg-0 mb-3">
                  <Link
                    to={`/${authorPageURL}`}
                    title="Author Page"
                    className="nav-link author d-flex align-items-center"
                  >
                    <div title="User Profile" className="image">
                      {profileImg ? (
                        <img
                          src={profileImg}
                          alt={name}
                          className="w-100 h-100"
                        />
                      ) : (
                        <div className="author-info-name-letter">
                          {name && name.charAt(0)}
                        </div>
                      )}
                    </div>
                    <span className="author-name">{name}</span>
                  </Link>
                </li>
              )}
              {!user && (
                <>
                  <li className="nav-item login mb-lg-0 mb-3">
                    <Link
                      to="/login"
                      className="nav-link btn btn-success text-white ms-2"
                    >
                      Login
                    </Link>
                  </li>
                  <li className="nav-item signin mb-lg-0 mb-3">
                    <Link
                      to="/signin"
                      className="nav-link btn btn-success text-white ms-2"
                    >
                      Signin
                    </Link>
                  </li>
                </>
              )}
              {user && (
                <li className="nav-item logout mb-lg-0 mb-3">
                  <Link
                    onClick={logOut}
                    to="#"
                    className="nav-link btn btn-outline-danger ms-2"
                  >
                    Logout
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
