import React, { useEffect } from "react";
import { useFireStorage } from "../../../hooks/useFirestorage";

const ProgressBar = ({ formData, setFormData, storageFolderName, setCoverImgUrl, setProfileImgUrl}) => {
  const { profileImg, coverImg } = formData;
  const { url, storageLocalUrl, progress } = useFireStorage(
    storageFolderName,
    profileImg ? profileImg : coverImg ? coverImg : null
  );
  
  useEffect(() => {
    if (url) {
      if (storageLocalUrl.indexOf("user/cover") > -1) {
        setCoverImgUrl(url);
      }
      if (storageLocalUrl.indexOf("user/profile") > -1) {
        setProfileImgUrl(url);
      }
      setFormData({ ...formData, coverImg: "", profileImg: "" });
    }
  }, [
    formData,
    setFormData,
    url,
    setProfileImgUrl,
    setCoverImgUrl,
    storageLocalUrl,
  ]);

  return (
    <div className="progress-bar-wrapper">
      <span className="spinner-border"></span>
      <div className="progress my-3">
        <div
          className="progress-bar"
          role="progressbar"
          style={{ width: `${progress}%` }}
        >
          {progress}% Done
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
