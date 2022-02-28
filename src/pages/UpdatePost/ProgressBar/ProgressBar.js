import React, { useEffect } from "react";
import { useGlobalContext } from "../../../context/context";
import { useFireStorage } from "../../../hooks/useFirestorage";

const ProgressBar = ({ formData, setFormData, storageFolderName }) => {
  // for useFireStorage first argu is folderName(string) and second is imageFile
  const { setPostImgUrl, setPostLocalImgUrl } = useGlobalContext();
  const { url, storageLocalUrl, progress } = useFireStorage(
    storageFolderName,
    formData.img
  );

  useEffect(() => {
    if (url) {
      setPostImgUrl(url);
      setPostLocalImgUrl(storageLocalUrl);
      setFormData({ ...formData, img: "" });
    }
  }, [
    url,
    storageLocalUrl,
    setPostLocalImgUrl,
    setPostImgUrl,
    setFormData,
    formData,
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
