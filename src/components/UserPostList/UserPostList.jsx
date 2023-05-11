import './UserPostList.css';
import UserPostItem from '../../components/UserPostItem/UserPostItem';
import background1 from '../../images/background_1.gif'


export default function UserPostList({ posts, navigate, removePost, alterActiveUpdate }) {

    return (
				<>
					<div className='UserPostList' style={{ backgroundImage: `url(${background1})` }}>
						{posts.length > 0 ?
							<>
								{posts.map((post, idx) => (
									<UserPostItem key={idx} post={post} idx={idx}
										archivedAt={new Date(post.createdAt)}
										editedAt={new Date(post.updatedAt)}
										navigate={navigate} removePost={removePost}
										alterActiveUpdate={alterActiveUpdate}
									/>
								))}
							</>
						:
							<h4>You have nothing ARCHIVED.</h4>
						}
					</div>
				</>
    );
}