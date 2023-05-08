import './UserPostList.css';
import Loader from '../Loader/Loader';
import UserPostItem from '../../components/UserPostItem/UserPostItem';


export default function UserPostList({ posts }) {
    
    return (
				<>
					{posts ? 
							<Loader />
						:
							<div className='UserPostList'>
								{posts.map((post, idx) => (
									<UserPostItem key={idx} 
										post={post} idx={idx}
									/>
								))}
							</div>
					}
				</>
    );
}