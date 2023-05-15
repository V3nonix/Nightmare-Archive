import { useState, useEffect} from "react";
import { useParams, useSearchParams } from 'react-router-dom';
import { getPost } from "../../utilities/api/posts";
import './PostPage.css';
import Loader from '../../components/Loader/Loader';
import background1 from '../../images/background_1.gif'

export default function PostPage({ user, handleError, setNavType }) {
    const [post, setPost] = useState(null);
		const [archivedAt, setArchivedAt] = useState(null);
		const [loading, setLoading] = useState(true);

    let { id } = useParams();
    let [publicStatus] = useSearchParams();

    useEffect(() => {
        setNavType('PostPage');
        (async () => {
            const post = await getPost(id, publicStatus);
            setPost(post);
            console.log(post);
						setArchivedAt(new Date(post.createdAt));
						console.log(archivedAt);
						setLoading(false);
        })();
    }, [setNavType]);

    return (
        <main className='PostPage' style={{ backgroundImage: `url(${background1})` }}>

					{ loading ?
            <Loader />
          :
            <>
						<div className='flex-horizontal'>
							<div className='PostPage-container'>
									<span className='PostPage-title'>{post.title}</span>
									<div className='PostPage-sub-container '>
										<div className='PostPage-image-container'>
											<div className='PostPage-image' style={{backgroundImage: `url(${post.signedImageUrl})`}}/>
										</div>
										<span>ARCHIVED: {archivedAt.toLocaleDateString()}</span><br/>							
									</div>
								</div>
							<div className='PostPage-container'>
								<div className='PostPage-sub-container '>	
									<p className='PostPage-content'>{post.content}</p>		
								</div>
							</div>
						</div>

            </>
          }
        </main>
    );
}