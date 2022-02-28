import { useState, useEffect } from "react";
import { db } from "../firebase/config";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

export const useFirestore = (collectionName) => {
  const [docs, setDocs] = useState([]);

  useEffect(() => {
    const docQueryRef = query(
      collection(db, collectionName),
      orderBy("createdAt", "desc")
    );
    const unsub = onSnapshot(
      docQueryRef,
      (snapshot) => {
        const items = [];
        snapshot.forEach((doc) => items.push({ ...doc.data(), id: doc.id }));
        setDocs(items);
      },
      (err) => {
        console.log("firestore error -> ", err);
      }
    );
    return () => unsub();
  }, [collectionName]);
  return { docs };
};
