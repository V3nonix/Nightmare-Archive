import './UserPostItem.css';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';


export default function UserPostItem({ post, idx }) {
    
    return (
        <div className='UserPostItem'>
            <h3>post.title</h3>
            <div>
                <button>Set to {post.public ? 'PRIVATE' : 'PUBLIC'}</button>
                <button>EDIT</button>
                <button>DELETE</button>
            </div>
            <div>
                <img src={post.imageUrl}/>
            </div>
            <div>
                <span>ARCHIVED: {archivedAt.toLocaleDateString}</span>
                <span>{ archivedAt === editedAt ? 'Has not been edited.' : ('LAST EDITED:' + editedAt.toLocaleDateString) }</span>
            </div>
        </div>
    );
}