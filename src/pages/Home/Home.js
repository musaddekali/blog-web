import { FaPlusCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useGlobalContext } from "../../context/context";
import PostCard from "./PostCard/PostCard";

const LetestPosts = () => {
  const { posts } = useGlobalContext();

  return (
    <section className="letest-posts">
      <div className="container">
        <div className="add-post-btn">
          <Link to="/add-post">
            Add New Post! <FaPlusCircle />
          </Link>
        </div>
        <SectionTitle>Letest Posts netlyfy</SectionTitle>
        <div className="row">
          {posts.length ? (
            posts.map((item) => {
              return (
                <div
                  key={item.id}
                  className="col-xl-3 col-lg-4 col-md-6 mb-4 d-flex align-items-stretch"
                >
                  <PostCard key={item.id} post={item} />
                </div>
              );
            })
          ) : (
            <div className="no-posts">
              <h1>No Post Yet</h1>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

const Home = () => {
  return (
    <>
      <LetestPosts />
    </>
  );
};

export default Home;
