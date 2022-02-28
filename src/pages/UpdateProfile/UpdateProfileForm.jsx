import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import { db, auth } from "../../firebase/config";
import { updateDoc, doc } from "firebase/firestore";
import ProgressBar from "./ProgressBar/ProgressBar";
import { BsCardImage } from "react-icons/bs";
import { FaCheck } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

const UpdateProfileForm = () => {
  // const { userData, profileImgUrl, coverImgUrl } = useGlobalContext();
  const { userData, handleAlert } = useGlobalContext();
  const [formData, setFormData] = useState({
    ...userData,
    profileImg: "",
    coverImg: "",
  });
  const [profileImgUrl, setProfileImgUrl] = useState(null);
  const [coverImgUrl, setCoverImgUrl] = useState(null);

  const navigate = useNavigate();

  const authorPageURL = formData.name.toLowerCase().replace(/ /g, "");

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (name) {
      await updateDoc(doc(db, "users", auth.currentUser.uid), {
        name,
        bio,
        profileImg: profileImgUrl,
        coverImg: coverImgUrl,
      });
      navigate(`/${authorPageURL}`);
      handleAlert(true, 'success', 'Profile Updated', <FaCheck/>);
    }
  };

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value =
      name === "coverImg" || name === "profileImg"
        ? e.target.files[0]
        : e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (Object.values(userData).length) {
      setFormData({
        ...userData,
        profileImg: "",
        coverImg: "",
      });
      if (userData.coverImg) setCoverImgUrl(userData.coverImg);
      if (userData.profileImg) setProfileImgUrl(userData.profileImg);
    }
  }, [userData]);

  const { name, coverImg, profileImg, bio } = formData;

  return (
    <form onSubmit={handleFormSubmit}>
      <div className="mb-3 bw-file-upload-wrap">
        <label className="form-label bw-file-upload" htmlFor="author-cover-img">
          Select cover picture
          <BsCardImage />
        </label>
        <input
          onChange={handleOnChange}
          className="form-control"
          type="file"
          name="coverImg"
          id="author-cover-img"
        />
        {coverImg && (
          <ProgressBar
            formData={formData}
            setFormData={setFormData}
            storageFolderName="user/coverImg"
            setCoverImgUrl={setCoverImgUrl}
          />
        )}
        {coverImgUrl && (
          <div>
            <img
              src={coverImgUrl}
              alt="updatedImg"
              style={{
                backgroundColor: "dodgerblue",
                objectFit: "cover",
                height: "250px",
                width: "100%",
              }}
              className="mt-3 update-img rounded shadow border border-2 border-info"
            />
          </div>
        )}
      </div>
      <div className="mb-3 bw-file-upload-wrap">
        <label className="form-label bw-file-upload" htmlFor="author-img">
          Select profile picture
          <CgProfile />
        </label>
        <input
          onChange={handleOnChange}
          className="form-control"
          type="file"
          name="profileImg"
          id="author-img"
        />
        {profileImg && (
          <ProgressBar
            formData={formData}
            setFormData={setFormData}
            storageFolderName="user/profileImg"
            setProfileImgUrl={setProfileImgUrl}
          />
        )}
        {profileImgUrl && (
          <div>
            <img
              src={profileImgUrl}
              alt="updatedImg"
              style={{
                backgroundColor: "dodgerblue",
                height: "130px",
                width: "130px",
                objectFit: "cover",
              }}
              className="mt-3 update-img rounded rounded-circle shadow border border-2 border-info"
            />
          </div>
        )}
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="author-name">
          Your Name
        </label>
        <input
          onChange={handleOnChange}
          className="form-control"
          type="text"
          name="name"
          value={name}
          id="author-name"
          placeholder="Name..."
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label" htmlFor="author-desc">
          Your profile bio (within 0-200 alphabet)
        </label>
        <textarea
          onChange={handleOnChange}
          className="form-control"
          name="bio"
          value={bio}
          id="author-desc"
          rows="3"
          placeholder="Bio..."
        />
      </div>
      <div className="text-end">
        <button type="submit" className="btn btn-success btn-small">
          Save
        </button>
      </div>
    </form>
  );
};

export default UpdateProfileForm;
