import { FaPlusCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import AuthorBio from './AuthorBio';
import SectionTitle from "../../components/SectionTitle/SectionTitle";
// import SingleCard from "../../components/SingleCard/SingleCard"
import { useGlobalContext } from "../../context/context"
import './Author.css';
import PostCard from './PostCard/PostCard';

const Author = () => {
    const { posts } = useGlobalContext();

    return (
        <section className="author-page">
            <div className="container">
                <AuthorBio />
                <div className="add-post-btn">
                    <Link to="/add-post">Add New Post! <FaPlusCircle /></Link>
                </div>
                <SectionTitle>
                    {`All Posts ( ${posts.length} )`}
                </SectionTitle>
                {
                    posts.length ? (
                        posts.map(post => {
                            return (
                                <div key={post.id} className="author-post">
                                    <PostCard post={post}/>
                                </div>
                            )
                        })
                    ) : (
                        <h1>You have not posted any articles.</h1>
                    )
                }
            </div>
        </section >
    )
}

export default Author;
