import './UserPostList.css';
import UserPostItem from '../../components/UserPostItem/UserPostItem';


export default function UserPostList({ posts, navigate, removePost }) {
    
    return (
				<>
					{posts.length > 0 ?
							<div className='UserPostList'>
								{posts.map((post, idx) => (
									<UserPostItem key={idx} post={post} idx={idx}
										archivedAt={new Date(post.createdAt)}
										editedAt={new Date(post.updatedAt)}
										navigate={navigate} removePost={removePost}
									/>
								))}
							</div>
						:
							<h4>You have nothing ARCHIVED.</h4>
					}
				</>
    );
}