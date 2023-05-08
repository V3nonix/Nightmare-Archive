import { useState, useEffect} from "react";
import './PostPage.css';


export default function PostPage({ user, handleError, setNavType }) {
    useEffect(() => {
        setNavType('PostPage');
    }, [setNavType]);

    return (
        <main className='PostPage'>
            <div>PostPage</div>
        </main>
    );
}