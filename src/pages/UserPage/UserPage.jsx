import { useState, useEffect} from "react";
import './UserPage.css';


export default function UserPage({ user, alterUser, handleError, setNavType }) {
    useEffect(() => {
        setNavType('UserPage');
    }, [setNavType]);

    return (
        <main className='UserPage'>
            <div>UserPage</div>
        </main>
    );
}