import './UserPostItem.css';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';


export default function UserPostItem({ post, idx, archivedAt, editedAt, navigate }) {
    return (
      <div className='UserPostItem'>
      	<div>
          <h3>{post.title}</h3>
          <div>
            <button>Set to {post.public ? 'PRIVATE' : 'PUBLIC'}</button>
						<button>EDIT</button>
						<button>DELETE</button>
	        </div>
          <div className='UserPostItem-image-container'>
            <div className='UserPostItem-image' style={{backgroundImage: `url(${post.imageUrl})`}}
							onClick={() => navigate(`/posts/${post._id}`)}
						/>
          </div>
          <div>
            <span>ARCHIVED: {archivedAt.toLocaleDateString()}</span><br/>
            <span>{ archivedAt.getTime() === editedAt.getTime() ? 'Has not been edited.' : ('LAST EDITED:' + editedAt.toLocaleDateString()) }</span>
          </div>
        </div>
      </div>
    );
}