import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useGlobalContext } from './context/context';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import './styles/blog-web-global.css';
// components 
import Layout from './components/Layout/Layout';
import NotFound from './components/NotFound/NotFound';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
// End Conponents 
// pages 
import Home from './pages/Home/Home';
import PostDetails from './pages/PostDetails/PostDetails';
import Author from './pages/Author/Author';
import AddPost from './pages/AddPost/AddPost';
import UpdateProfile from './pages/UpdateProfile/UpdateProfile';
import UpdatePost from './pages/UpdatePost/UpdatePost';
import LogIn from './pages/LogIn/LogIn';
import SignIn from './pages/SignIn/SignIn';
// End pages 

const App = () => {
    const { authorPageURL } = useGlobalContext();
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path={authorPageURL} element={<PrivateRoute><Author /></PrivateRoute>} />
                    <Route path="update-profile" element={<UpdateProfile />} />
                    <Route path="add-post" element={<PrivateRoute><AddPost /></PrivateRoute>} />
                    <Route path="update-post/:id" element={<UpdatePost />} />
                    <Route path="post-details/:id" element={<PostDetails />} />
                    <Route path="signin" element={<SignIn />} />
                    <Route path="login" element={<LogIn />} />
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </>
    )
}

export default App;
