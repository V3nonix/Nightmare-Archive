import { useState, useEffect} from "react";
import './IndexPage.css';


export default function IndexPage({ user, handleError, navigate, setNavType }) {
    useEffect(() => {
        setNavType('IndexPage');
    }, [setNavType]);

    return (
        <main className='IndexPage'>
            <div>IndexPage</div>
        </main>
    );
}