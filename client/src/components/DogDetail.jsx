import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {getRazesId, reset} from "../actions";
import { useParams } from 'react-router';
import styles from '../Styles/DogDetail.module.css';

export default function DogDetails() {
  
    const dispatch = useDispatch();
    const { id } = useParams();
     
    useEffect(()=>{
      dispatch(getRazesId(id));
    },[dispatch,id]);

    useEffect(() => {
      dispatch(reset('reset'))
    },[dispatch])
    //me traigo el estado del reducer razasDetail
    const details = useSelector((state) => state.razasDetail);

    return (
    
        <div className={styles.wc}>
          
           {details.length > 0 ?
          <div className={styles.container}>
            <div className={styles.container}>
    
              <div className={styles.container}>          
                <h1>{details[0].name}</h1>
                <img src={details[0].image} className={styles.imagen} width="400" height="300" alt="Img not found"/>
                <h2 className={styles.text_white}>{!details[0].createdInDb ? details[0].temperaments + ', ' : details[0].temperamentos.map(e=> e.name + (', '))} </h2>
              </div>
    
              <div className={styles.description}>
                <h2 className={styles.wc}>Breed Details:</h2>
    
                <hr />
    
                <h3 className={styles.text_white}>Height: {details[0].height} Cms.</h3>
                <h3 className={styles.text_white}>Weight: {details[0].weight} Kgs.</h3>
                <h3 className={styles.text_white}>Life Span: {details[0].life_span} </h3>
                {/* <div className={styles.areaBoton}>
                  <Link className={styles.order} to='/home'>Previous Stage</Link>
                </div> */}

                <br />
                 <Link to= "/home">
                   <button className={styles.order} onClick={"reset"}>Previous Stage</button>
                 </Link>
              </div>
    
            </div>
          </div>: <p>LOADING!</p>
        }
        </div>
      
      );
}