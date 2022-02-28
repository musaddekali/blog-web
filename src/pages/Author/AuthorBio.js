import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../../context/context';

const AuthorBioEditOption = () => {
    return (
        <div className="author-bio-edit">
            <Link className="btn follow" to='/update-profile' title="Edit Your Profile Informations" >Edit Porfile <FaEdit /></Link>
        </div>
    )
}

const AuthorBio = () => {
    const { userData } = useGlobalContext();
    const { profileImg, name, bio, coverImg } = userData;

    return (
        <article className="author-bio shadow">
            <div className="container p-0">
                <div
                    className="author-bio-cover-img"
                    style={{ backgroundImage: `url('${coverImg}')` }}
                    title="Your Cover Photo"
                ></div>
                <AuthorBioEditOption />
                <div className="author-bio-inner">
                    <div className="author-bio-image" title="Your Profile Photo">
                        {profileImg && <img
                            src={profileImg}
                            alt={name}
                            title="Your Profile Picture"
                            className="img-fill img-cover"
                        />}
                        {!profileImg && (
                            <div className="author-info-name-letter">
                                {name && name.charAt(0)}
                            </div>
                        )}
                    </div>
                    {name && <h6 className="author-bio-name">{name}</h6>}
                    {bio && <p className="author-bio-desc">{bio.substring(0, 200)}</p>}
                </div>
            </div>
        </article>
    )
}

export default AuthorBio;

