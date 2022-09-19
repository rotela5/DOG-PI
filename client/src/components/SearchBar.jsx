import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getRazesName } from '../actions';
import { Link } from 'react-router-dom';
import styles from '../Styles/SearchBar.module.css'

export default function SearchBar() {
    const dispatch = useDispatch();
    //estado local
    const [name, setName] = useState("")

    function handleInputChange(e) {
        e.preventDefault();
        setName(e.target.value);
        console.log(name)
    }

    function handleSubmit(e) {
        e.preventDefault();
        dispatch(getRazesName(name))
        setName("")
    }



      return (
        <div >
          <div >
           <Link  to='/'><h1>DOG<span >PLANET</span></h1></Link>
          </div>

        <div > 
         <input className={styles.order}
            type="text"
            placeholder="Search Razes..."
            value={name}
            onChange={(e) => handleInputChange(e)}
          />
          <button  type="submit" className={styles.order} onClick={(e) => handleSubmit(e)}>Search</button> 
        </div>   
        </div>
             )

   }