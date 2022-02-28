import { useEffect, useState, useCallback } from 'react';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import { useParams } from 'react-router-dom';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useGlobalContext } from '../../context/context';
import UpdatePostForm from './UpdatePostForm';
import Loading from '../../components/Loading/Loading';
import GoBack from '../../components/GoBack/GoBack';

const UpdatePost = () => {
    const [post, setPost] = useState({});
    const { setUpdateMode } = useGlobalContext();
    const existPost = Object.keys(post).length;
    const { id } = useParams();

    const getItemForUpdate = useCallback(async () => {
        const docRef = doc(db, 'posts', id);
        const snapshot = await getDoc(docRef);
        const docId = snapshot.id;
        setPost({ ...snapshot.data(), id: docId });
        setUpdateMode(true);
    }, [id, setUpdateMode]);

    useEffect(() => {
        getItemForUpdate();
    }, [getItemForUpdate]);

    return (
        <section className="add-post">
            <div className="container">
                <GoBack />
                <SectionTitle>
                    Update your post
                </SectionTitle>
                {!existPost && <Loading />}
                {existPost && <UpdatePostForm post={post} />}
            </div>
        </section>
    )
}

export default UpdatePost;
