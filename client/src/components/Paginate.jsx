import React from "react";
import styles from '../Styles/Paginate.module.css';

export default function Paginate({razesPerPage, allRazes, paginate}){
    const pageNumbers = [];
    // Math.ceil redondea para arriba todas las razas sobre la razas por pagina
    //aqui obtengo todo el paginado
    for(let i=0; i<=Math.ceil(allRazes/razesPerPage); i++){
        pageNumbers.push(i+1)
    }
    return(
        <div className={styles.navContainer}>
            <div className={styles.pagination}>
                { 
                pageNumbers &&
                pageNumbers.map((number) =>{
                    return (
                        <button className={styles.number} key={number}
                             onClick={() => paginate(number)}>{number}
                            
                        </button>
                    )
                    
                })}
            </div>
        </div>
        
    )
}