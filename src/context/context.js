import React, { useContext, useEffect, useState } from "react";
import { FaCheckCircle, FaTrash, FaCheck } from 'react-icons/fa';
import { db, storage, auth } from "../firebase/config";
import { doc, deleteDoc, updateDoc, getDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { useFirestore } from "../hooks/useFirestore";
import { collection, addDoc, Timestamp, onSnapshot } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Loading from '../components/Loading/Loading';

const AppContext = React.createContext();
AppContext.displayName = "AppGlobalContext";

const initialUserData = {
  name: "",
  profileImg: "",
  coverImg: "",
  email: "",
  bio: "",
};

export const AppProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [updateableItem, setUpdateableItem] = useState({});
  const [postImgUrl, setPostImgUrl] = useState("");
  const [postLocalImgUrl, setPostLocalImgUrl] = useState("");
  const [postLastLocalImgUrl, setPostLastLocalImgUrl] = useState("");
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(initialUserData);
  const [loading, setLoading] = useState(true);
  const [alert, setAlert] = useState({ show: false, type: null, msg: null, alertIcon: null });
  const authorPageURL = userData.name ? userData.name.toLowerCase().replace(/ /g, "") : 'author';
  const { docs } = useFirestore("posts");

  // if (docs.length) console.log("Posts Docs -> ", docs);

  const handleUpdatePost = async (collectionName, formData) => {
    const { title, desc } = formData;
    const updateId = updateableItem.id;
    const updateContent = {
      ...updateableItem,
      title,
      desc,
      img: postImgUrl,
      storageLocalImgUrl: postLocalImgUrl,
      lastUpdate: Timestamp.fromDate(new Date()),
    };
    const spacificDoc = doc(db, collectionName, updateId);
    await updateDoc(spacificDoc, updateContent);
    handleAlert(true, 'success', 'Updated successfully', <FaCheckCircle/>);
  };

  const handleAddPost = async (formData) => {
    try {
      const docRef = collection(db, "posts");
      const newItem = {
        ...formData,
        img: postImgUrl,
        storageLocalImgUrl: postLocalImgUrl,
        createdAt: Timestamp.fromDate(new Date()),
      };
      handleAlert(true, 'success', 'Posting...');
      await addDoc(docRef, newItem);
      handleAlert(true, 'success', 'Posted', <FaCheck/>);
    } catch (error) {
      console.log("firestore error -> ", error);
    }
  }

  const handlePostDelete = async (collectionName, id) => {
    if (window.confirm("Delete the item?")) {
      try {
        const docRef = doc(db, collectionName, id);
        const signleDoc = await getDoc(docRef);
        const storagePath = signleDoc.data().storageLocalImgUrl;
        if (storagePath) {
          handleDeleteSotrageImg(storagePath);
        }
        await deleteDoc(docRef);
        handleAlert(true, 'danger', 'Post deleted successfully', <FaTrash />);
      } catch (err) {
        console.log("firebase delete item error -> ", collectionName, err);
      }
    }
  };

  const handleFirestoreDocs = (formData) => {
    if (updateMode) {
      handleUpdatePost("posts", formData);
    } else if (!updateMode) {
      handleAddPost(formData);
    }
  };

  const handleDeleteSotrageImg = async (path) => {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
    } catch (err) {
      console.log('No such a file avialable in the Storage', err);
    }
  };

  const handleSubmit = (formData) => {
    handleFirestoreDocs(formData);
    setPostImgUrl("");
    setPostLocalImgUrl("");
    if (updateMode && (postLastLocalImgUrl !== postLocalImgUrl)) {
      handleDeleteSotrageImg(postLastLocalImgUrl);
    }
    setUpdateMode(false);
    setPostLastLocalImgUrl("");
    setUpdateableItem({});
  };

  const handleAlert = (show = false, type = null, msg = null, alertIcon = null) => {
    setAlert({ show, type, msg, alertIcon });
  }

  // Post Collection
  useEffect(() => {
    if (docs) {
      setPosts(docs);
    }
  }, [docs]);

  // Get user 
  useEffect(() => {
    let unsub;
    onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (user) {
        unsub = onSnapshot(doc(db, 'users', user.uid), (doc) => {
          if (doc.exists()) {
            setUserData(doc.data());
          } else {
            setUserData(initialUserData);
          }
        },
          (err) => {
            console.log('User Data not Found', err);
          }
        );
      } else {
        console.log('No User Logged in Firestore Authentication');
      }
    });
    return () => unsub();
  }, []);


  if (loading) {
    return <Loading />
  }

  return (
    <AppContext.Provider
      value={{
        posts,
        postImgUrl,
        setPostImgUrl,
        postLocalImgUrl,
        setPostLastLocalImgUrl,
        handleSubmit,
        handlePostDelete,
        updateMode,
        setUpdateMode,
        setUpdateableItem,
        setPostLocalImgUrl,
        updateableItem,
        user,
        setUser,
        userData,
        setUserData,
        authorPageURL,
        alert,
        handleAlert,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};
