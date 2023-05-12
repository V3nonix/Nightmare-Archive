import { useState, useEffect} from "react";
import { useParams, useSearchParams } from 'react-router-dom';
import { getPost } from "../../utilities/api/posts";
import './PostPage.css';


export default function PostPage({ user, handleError, navigate, setNavType }) {
    const [post, setPost] = useState(null);

    let { id } = useParams();
    let [publicStatus] = useSearchParams();

    useEffect(() => {
        setNavType('PostPage');
        (async () => {
            const post = await getPost(id, publicStatus);
            setPost(post);
            console.log(post);
        })();
    }, [setNavType]);

    return (
        <main className='PostPage'>
            <div>PostPage</div>
        </main>
    );
}