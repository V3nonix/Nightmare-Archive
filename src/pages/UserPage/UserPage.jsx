import { useState, useEffect} from "react";
import { getUserPosts } from "../../utilities/api/posts";
import './UserPage.css';
import CreatePostForm from "../../components/CreatePostForm/CreatePostForm";
import UserPostList from "../../components/UserPostList/UserPostList";
import Loader from "../../components/Loader/Loader";

export default function UserPage({ user, handleError, navigate, setNavType }) {
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        setNavType('UserPage');
        updatePosts();
    }, [setNavType]);

    async function updatePosts() {
        const posts = await getUserPosts();
        setPosts(posts);
    }

    return (
        <main className='UserPage'>
            <div>UserPage</div>
            <CreatePostForm user={user} />
            { posts ?
                <UserPostList posts={posts} navigate={navigate}/>
            :
                <Loader />
            }
        </main>
    );
}