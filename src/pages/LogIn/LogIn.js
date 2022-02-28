import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useGlobalContext } from '../../context/context';
import { auth, db } from "../../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./login.css";
import { doc, updateDoc } from "firebase/firestore";
import { GiSurprised } from 'react-icons/gi';
import { BiLoaderCircle } from 'react-icons/bi';

const initialFormData = {
  email: '',
  pwd: '',
}

const LogIn = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const {handleAlert}  = useGlobalContext();
  const navigate = useNavigate();
  const { email, pwd } = formData;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    handleAlert(true, 'info', 'Loging in...', <BiLoaderCircle />);
    try {
      const result = await signInWithEmailAndPassword(auth, email, pwd);
      const docRef = doc(db, "users", result.user.uid);
      await updateDoc(docRef, { isOnline: true });
      handleAlert(true, 'success', `Welcome Sir!`, <GiSurprised />);
      setLoading(false);
      setErrorMsg(null);
      setFormData(initialFormData);
      navigate("/");
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.code);
      handleAlert(true, 'info', err.code, <BiLoaderCircle />);
    }
  };

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <section className="login">
        <div className="container">
          <SectionTitle>Log In</SectionTitle>
          <form onSubmit={handleFormSubmit} className="login-form">
            <h5>Login</h5>
            <input
              onChange={handleOnChange}
              type="text"
              className="login-input"
              placeholder="Email..."
              name="email"
              value={email}
              required
            />
            <input
              onChange={handleOnChange}
              type="password"
              className="login-input"
              placeholder="Password..."
              name="pwd"
              value={pwd}
              required
            />
            <div className="d-grid gap-2">
              <button className="btn login-btn" disabled={loading}>
                {loading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  "LogIn"
                )}
              </button>
            </div>

            {errorMsg && <p className="text-danger">{errorMsg}</p>}

            <Link
              className="d-block text-center mt-3"
              to="/signin"
              title="Create a new Account"
            >
              Don't have any account? Sign Up Now
            </Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default LogIn;
