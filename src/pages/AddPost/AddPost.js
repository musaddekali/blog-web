import './AddPost.css';
import SectionTitle from '../../components/SectionTitle/SectionTitle';
import GoBack from '../../components/GoBack/GoBack';
import AddPostForm from './AddPostForm';

const AddPost = () => {
    return (
        <section className="add-post">
            <div className="container">
                <GoBack />
                <SectionTitle>
                    Add new post and share your knowledge world wide!
                </SectionTitle>
                <AddPostForm />
            </div>
        </section>
    )
}

export default AddPost;
