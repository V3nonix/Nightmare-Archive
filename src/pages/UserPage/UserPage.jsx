import { useState, useEffect} from "react";
import { getUserPosts } from "../../utilities/api/posts";
import './UserPage.css';
import CreatePostForm from "../../components/CreatePostForm/CreatePostForm";
import UpdatePostForm from "../../components/UpdatePostForm/UpdatePostForm";
import UserPostList from "../../components/UserPostList/UserPostList";
import Loader from "../../components/Loader/Loader";

export default function UserPage({ user, handleError, navigate, setNavType }) {
    const [posts, setPosts] = useState(null);
    const [activeUpdate, setActiveUpdate] = useState(null);

    async function getAndSetPosts() {
        const posts = await getUserPosts();
        console.log(posts);
        setPosts(posts);
    }

    useEffect(() => {
        setNavType('UserPage');
        getAndSetPosts();
    }, [setNavType]);

    function removePost(removedPostId) {
        let tempPosts = posts;
        setPosts(tempPosts.filter(post => post._id !== removedPostId));
    }

    function addPost(createdPost) {
        setPosts(prevPosts => [createdPost, ...prevPosts]);
    }

    function replacePost(updatedPost, idx) {
        let tempPosts = posts;
        tempPosts[idx] = updatedPost;
        setPosts(tempPosts);
        setActiveUpdate(null);
    }

    function alterActiveUpdate(val) {
        setActiveUpdate(val);
    }

    return (
      <main className='UserPage'>
        <aside className='UserPage-aside-left'>
          { activeUpdate || activeUpdate === 0 ?
            <UpdatePostForm replacePost={replacePost} 
              targetPost={posts[activeUpdate]}
              idx={activeUpdate}
              alterActiveUpdate={alterActiveUpdate}
            />
          :
            <>
              <CreatePostForm addPost={addPost} />
            </>
          }
        </aside>
        <aside className='UserPage-aside-right'>
          <h2>Your ARCHIVE</h2>
          { posts ?
            <UserPostList posts={posts} navigate={navigate}
              removePost={removePost} alterActiveUpdate={alterActiveUpdate}
            />
          :
            <Loader />
          }
        </aside>
      </main>
    );
}