import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';
import ProgressBar from './ProgressBar/ProgressBar';
import { FaUpload } from 'react-icons/fa';

const initialState = {
    img: '',
    title: '',
    desc: '',
}

const UpdatePostForm = ({ post }) => {
    const [formData, setFormData] = useState(initialState);
    const {
        authorPageURL,
        handleSubmit,
        setUpdateableItem,
        setPostImgUrl,
        setPostLocalImgUrl,
        setPostLastLocalImgUrl,
        postImgUrl } = useGlobalContext();

    const navigate = useNavigate();

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (formData.title && formData.desc) {
            handleSubmit(formData);
            navigate(`/${authorPageURL}`);
            setFormData(initialState);
        } else {
            alert('Pleade fill all informations');
        }
    }

    const handleOnChange = (e) => {
        const name = e.target.name;
        const value = name === 'img' ? e.target.files[0] : e.target.value;
        setFormData({ ...formData, [name]: value });
    }

    // menage update data
    useEffect(() => {
        if (post.id) {
            const { img, title, desc, storageLocalImgUrl } = post;
            setFormData({ img: '', title, desc });
            setPostImgUrl(img)
            setPostLocalImgUrl(storageLocalImgUrl)
            setPostLastLocalImgUrl(storageLocalImgUrl)
            setUpdateableItem(post);
        }
    }, [
        post,
        setUpdateableItem,
        setPostImgUrl,
        setPostLocalImgUrl,
        setPostLastLocalImgUrl
    ]
    );

    const { img, title, desc } = formData;

    return (
        <>
            <form onSubmit={handleFormSubmit}>
                <div className="mb-3 bw-file-upload-wrap">
                    <label className="form-label bw-file-upload" htmlFor="post-image">
                        Upload a new image for this post.
                        <FaUpload />
                    </label>
                    <input
                        onChange={handleOnChange}
                        className="form-control"
                        type="file"
                        name="img"
                        id="post-image"
                    />
                    {/* Update Img */}
                    {postImgUrl &&
                        <div>
                            <img
                                src={postImgUrl}
                                alt="updatedImg"
                                style={{ backgroundColor: 'dodgerblue' }}
                                className="mt-3 img-cover update-img rounded shadow border border-2 border-info"
                                height={100}
                                width={100}
                            />
                        </div>
                    }
                    {/* Progress bar */}
                    {
                        img && <ProgressBar
                            formData={formData}
                            setFormData={setFormData}
                            storageFolderName="postImgs"
                        />
                    }
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="post-title">Your post title.</label>
                    <input
                        onChange={handleOnChange}
                        className="form-control"
                        type="text"
                        name="title"
                        value={title}
                        id="post-title"
                        placeholder="Title..."
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="desc">Your post descriptions.</label>
                    <textarea
                        onChange={handleOnChange}
                        className="form-control"
                        name="desc"
                        value={desc}
                        id="desc"
                        rows="3"
                        placeholder="Descriptions..."
                    />
                </div>
                <div className="text-end">
                    <button
                        type="submit"
                        className="btn btn-success btn-small"
                    >
                        Update
                    </button>
                </div>
            </form>
        </>
    )
}

export default UpdatePostForm;