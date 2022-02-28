import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import "./signin.css";
import { db, auth } from "../../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, Timestamp } from "firebase/firestore";
import { useGlobalContext } from "../../context/context";
import {GiSurprised} from 'react-icons/gi';
import {BiLoaderCircle} from 'react-icons/bi';

const initialFormData = {
  name: '', 
  email: '',
  pwd: '',
}

const SignIn = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [loading, setLoading] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const {handleAlert} = useGlobalContext();
  const navigate = useNavigate();
  const { name, email, pwd } = formData;

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    handleAlert(true, 'info', 'Creating account...', <BiLoaderCircle/>);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, pwd);
      const docRef = doc(db, "users", result.user.uid);
      await setDoc(docRef, {
        name,
        email: result.user.email,
        createdAt: Timestamp.fromDate(new Date()),
        uid: result.user.uid,
        isOnline: true,
      });
      handleAlert(true, 'success', 'Welcome to Blog Web', <GiSurprised/>);
      setLoading(false);
      setErrorMsg(null);
      setFormData(initialFormData);
      navigate('/');
    } catch (err) {
      setLoading(false);
      setErrorMsg(err.code);
      handleAlert(true, 'danger', err.code);
    }
  };

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <section className="signin">
        <div className="container">
          <SectionTitle>Sign In</SectionTitle>
          <form onSubmit={handleFormSubmit} className="signin-form">
            <h5>Sign In</h5>
            <input
              onChange={handleOnChange}
              type="text"
              className="signin-input"
              placeholder="Name..."
              name="name"
              value={name}
            />
            <input
              onChange={handleOnChange}
              type="email"
              className="signin-input"
              placeholder="Email..."
              name="email"
              value={email}
              required
            />
            <input
              onChange={handleOnChange}
              type="password"
              className="signin-input"
              placeholder="Password..."
              name="pwd"
              value={pwd}
              required
            />
            <div className="d-grid gap-2">
              <button className="btn signin-btn" disabled={loading}>
                {loading ? (
                  <span className="spinner-border spinner-border-sm"></span>
                ) : (
                  "SingIn"
                )}
              </button>
            </div>

            {errorMsg && <p className="text-danger">{errorMsg}</p>}

            <Link
              className="d-block text-center mt-3"
              to="/login"
              title="Log in"
            >
             Already have an account? Log in Now.
            </Link>
          </form>
        </div>
      </section>
    </>
  );
};

export default SignIn;
