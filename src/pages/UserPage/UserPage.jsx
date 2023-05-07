import { useState, useEffect} from "react";
import './UserPage.css';
import CreatePostForm from "../../components/CreatePostForm/CreatePostForm";

export default function UserPage({ user, alterUser, handleError, setNavType }) {
    useEffect(() => {
        setNavType('UserPage');
    }, [setNavType]);

    return (
        <main className='UserPage'>
            <div>UserPage</div>
            <CreatePostForm user={user} />
        </main>
    );
}