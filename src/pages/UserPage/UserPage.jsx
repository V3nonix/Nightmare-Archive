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

    async function removePost(removedPostId) {
        let tempPosts = posts;
        setPosts(tempPosts.filter(post => post._id !== removedPostId));
    }

    return (
        <main className='UserPage'>
            <aside className='UserPage-aside-left'>
                <CreatePostForm user={user} />
            </aside>
            <aside className='UserPage-aside-right'>
                <h2>Your ARCHIVE</h2>
                { posts ?
                        <UserPostList posts={posts} navigate={navigate}
                            removePost={removePost}
                        />
                    :
                        <Loader />
                }
            </aside>

        </main>
    );
}