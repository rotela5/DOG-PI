import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { getRazes } from "../actions";
import styles from '../Styles/LandingPage.module.css';


export default function LandingPage() {
    const dispatch = useDispatch();
   useEffect(() => dispatch(getRazes()), [dispatch])
    return (
        <div >
            <h1>Welcome to Dog Planet</h1>
            <Link to='home'>
                <button className={styles.startBtn}>START!!!</button>
            </Link>
        </div>
    )
}