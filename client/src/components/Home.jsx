import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRazes, filterRazesByTemp, getTemperaments, filterCreated, orderByName, filterWeigth } from "../actions";
import { Link } from "react-router-dom";
import Card from "./Card";
import SearchBar from './SearchBar';
import Paginate from "./Paginate";
import styles from '../Styles/Home.module.css';

export default function Home() {
    
    const dispatch = useDispatch()
    //me traigo todos los estados de razes, similar al mapStateToProps()
    const allRazes = useSelector((state) => state.razes)
    // eslint-disable-next-line
    const allRazes2 = useSelector((state) => state.allRazes);
    const allTemperaments = useSelector((state) =>state.temperaments);
    // eslint-disable-next-line
    const [order,setOrder] = useState('');
    //estados locales
    const [currentPage, setCurrentPage] = useState(1);
    //estados locales para el paginado
    // eslint-disable-next-line
    const [razesPerPage, setRazesPerPage] = useState(8);
    const indexOfLastRaze = currentPage * razesPerPage //8
    const indexOfFirstRaze = indexOfLastRaze - razesPerPage //0
    //razas de la pagina actual (index de la prim. raza hasta el index de la ult.raza)
    const currentRazes = allRazes.slice(indexOfFirstRaze, indexOfLastRaze);
     //le paso un numero de pagina y seteo la pagina en ese numero
    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    //cuando el componente se monta, uso useEffect
    useEffect (() =>{
        dispatch(getRazes());
        dispatch(getTemperaments());
    },[dispatch])

    //evito bucle infinito 
    function handleClick(e){
        e.preventDefault();
        dispatch(getRazes())
    }
     //Filtro ASC / DES
     function handleSort(e){
        e.preventDefault();
        dispatch(orderByName(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`); // ayuda a realizar el renderizado desde el front
    }                                          //sino , no vamos a lograr el ordenamiento

    //Filtro por peso
    function handleWeight(e){
        e.preventDefault();
        dispatch(filterWeigth(e.target.value));
        setCurrentPage(1);
        setOrder(`Ordered ${e.target.value}`);
    }
    //Filtro por temperamento
    function handleFilterTemp(e){
        e.preventDefault();
        dispatch(filterRazesByTemp(e.target.value));
    }    
    //Filtro por origen de datos
    function handleFilterCreated(e){        
        dispatch(filterCreated(e.target.value))
        setCurrentPage(1);
    }
    

    return (
        <div>
           
           <SearchBar/>
           <br />
           <div >
                 <button className={styles.order} onClick={e=> {handleClick(e)}}>
                       Refresh all breeds
                 </button>
               <div className={styles.areaFilter}>
               <select className={styles.order} onChange={e =>{handleSort(e)}}>
                   <option value= 'asc'>Ascendent</option>
                   <option value= 'des'>Descendent</option>
               </select>
               <select className={styles.order} onChange={e =>{handleFilterCreated(e)}}>
                   <option value='All'>All</option>
                   <option value='created'>Created</option>
                   <option value='api'>From Api</option>
               </select>
               <select className={styles.order} onChange={e =>{handleWeight(e)}}>
                    <option value="">Weight:</option>
                    <option value="menor">Ligther</option>
                    <option value="mayor">Heavier</option>
                </select>
                <select className={styles.order} onChange={e =>{handleFilterTemp(e)}} >
                    <option value="">Temperament :</option>

                    
                        {
                            allTemperaments.map((temp) =>(                                
                                <option key={temp.id} value={temp.name}>{temp.name}</option>
                            ))
                        }
                </select>
                
                    </div>     
                <hr  />
                <div className={styles.pagContainer}>
                  <Paginate
                  razesPerPage = {razesPerPage}
                  allRazes = {allRazes.length}
                  paginate = {paginate} 
                   />   
                    </div>
                <hr />
                <Link className={styles.order} to= '/raze'>Create breed</Link> 
                
                

        <div className={styles.container}>            
            {currentRazes?.map( (e) =>{
                    return(
                        <div className={styles.cardsContainer} key={e.id}>
                            <Link to={`/razes/${e.id}`} className={styles.link}  >
                                <Card name={e.name} image={e.image}height={e.height} life_span={e.life_span} weight={e.weight} temperaments=
                                {e.createdInDb?e.temperamentos.map(e => e.name + ", "):e.temperaments + ", "} />
                            </Link>
                        </div>
                    );                
                })
            }             
        </div>
           </div>
           
           <div >
                 
                   
                </div>
        </div>
    )

}