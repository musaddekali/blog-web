import { useEffect, useState } from "react";
import { storage } from "../firebase/config";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

// first argu is FolderName and second img File from input-file
export const useFireStorage = (folderName, file) => {
  const [url, setUrl] = useState("");
  const [storageLocalUrl, setStorageLocalUrl] = useState("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let unsub;

    if (folderName && file) {
      const storageRef = ref(storage, `${folderName}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      unsub = uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = parseInt(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );
          setProgress(progress);
        },
        // Error
        (err) => {
          console.log("Storage Error -> ", err);
        },
        // success
        async () => {
          const url = await getDownloadURL(uploadTask.snapshot.ref);
          const pathName = uploadTask.snapshot.ref.fullPath;
          setStorageLocalUrl(pathName);
          setUrl(url);
        }
      );
    }
    return () => unsub();
  }, [folderName, file]);
  return { url, storageLocalUrl, progress };
};
