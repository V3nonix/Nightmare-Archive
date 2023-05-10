import './UserAvatar.css';

export default function UserAvatar({ signedAvatarUrl, type }) {
  return (
    <div className={type === 'large' ? 'UserAvatar-large' : 'UserAvatar-small'}>
        <div className='UserAvatar-image' 
            style={{backgroundImage: signedAvatarUrl ? `url(${post.signedAvatarUrl})` : 'url(default.jpg)'}}
        />
    </div>
  )
}