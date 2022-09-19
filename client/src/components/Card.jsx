import React from 'react';
import styles from '../Styles/Card.module.css';

//paso por props lo que quiero renderizar  asi no tengo que traer ningun estado, la logica esta en Home
export default function Card({name,image,weight,temperaments}){
    return (
        <div className={styles.card}>
            <h3 id="name">{name}</h3>
            <img className={styles.picture} src={image} alt="Img not found" width="240" height="180"  />
            <h4 id="weight">{weight} Kgs.</h4>
            <h5 className={styles.description}>{temperaments}</h5>
           
        </div>
    )
}