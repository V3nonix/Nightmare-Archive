import { useState, useEffect} from "react";
import './IndexPage.css';


export default function IndexPage({ user, alterUser, handleError, setNavType }) {
    useEffect(() => {
        setNavType('IndexPage');
    }, [setNavType]);

    return (
        <main className='IndexPage'>
            <div>IndexPage</div>
        </main>
    );
}