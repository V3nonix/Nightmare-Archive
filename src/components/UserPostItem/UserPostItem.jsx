import { useState } from "react";
import { createSearchParams } from "react-router-dom";
import './UserPostItem.css';
import { deletePost } from '../../utilities/api/posts';

export default function UserPostItem({ post, idx, archivedAt, editedAt, navigate, removePost, alterActiveUpdate }) {
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    async function handleDelete() {
        const deleteRes = await deletePost(post._id);
        if (deleteRes === 'File deleted successfully!') removePost(post._id);
    }

    function navigateToPost() {
        navigate({
            pathname: `/posts/${post._id}`, 
            search: `?${createSearchParams({ publicStatus: post.public })}`
        });
    }

    function toggleDeleteConfirm() {
      setDeleteConfirm(!deleteConfirm);
    }

    return (
      <div className='UserPostItem'>
      	<div>
          { deleteConfirm ?
            <div>
              <span>Are you sure you want to delete '{post.title}'?</span>
              <div>
                <button onClick={toggleDeleteConfirm}>NO</button>
                <button onClick={handleDelete} className="button-red-dark">
                  YES
                </button>
              </div>
            </div>

          :
            <div>
              <h3 className='UserPostItem-title'>{post.title}</h3>
              <button>Set to {post.public ? 'PRIVATE' : 'PUBLIC'}</button>
              <button onClick={() => alterActiveUpdate(idx)}>EDIT</button>
              <button onClick={toggleDeleteConfirm} className="button-red-dark">
                DELETE
              </button>
            </div>
          }
          <div className='UserPostItem-image-container'>
            <div className='UserPostItem-image' style={{backgroundImage: `url(${post.signedImageUrl})`}}
							onClick={navigateToPost}
						/>
          </div>
          <div className='UserPostItem-text-container'>
            <span>ARCHIVED: {archivedAt.toLocaleDateString()}</span><br/>
            <span>{ archivedAt.getTime() === editedAt.getTime() ? 'Has not been edited.' : ('LAST EDITED: ' + editedAt.toLocaleDateString()) }</span>
          </div>
        </div>
      </div>
    );
}