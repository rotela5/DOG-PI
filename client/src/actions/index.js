import axios from 'axios';
//conexion del front con el back
export function getRazes (){
    return async function(dispatch){
         var json = await axios.get('http://localhost:3001/razes');
        //var json = await axios.get(`/razes`);
        return dispatch({
            type:'GET_RAZES', 
            payload: json.data
        })
    }
}

export function getTemperaments (){
    return async function(dispatch){
        var json = await axios.get('http://localhost:3001/temperament')
         return dispatch({
            type:'GET_TEMPERAMENTS', 
            payload: json.data
        })
    }
}
export function filterRazesByTemp (payload){
    return{
        type:'FILTER_BY_TEMP', 
        payload
    }
}
export function filterCreated(payload){
    return{
        type:'FILTER_CREATED',
        payload
    }
}
export function orderByName(payload){
    return{
        type: 'ORDER_BY_NAME',
        payload
    }
}
export function filterWeigth(payload){
    return{
        type:'FILTER_WEIGTH',
        payload
    }
}

export function getRazesName(name){
    return async function(dispatch){
        try{
             var json = await axios.get('http://localhost:3001/razes?name='+ name);
            //var json = await axios.get('/razes?name='+ name);
            return dispatch({
                type:'GET_RAZES_NAME', 
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}
export function postRaze(payload){
    return async function(){
         var json = await axios.post('http://localhost:3001/razes',payload);
        //var json = await axios.post('/razes',payload);
        return json;
    }
}

export function getRazesId(id){
    return async function(dispatch){
        try{
             var json = await axios.get(`http://localhost:3001/razes/${id}`);
            //var json = await axios.get(`/razes/${id}`);
            return dispatch({
                type:'GET_RAZES_ID', 
                payload: json.data
            })
        } catch (error){
            console.log(error)
        }
    }
}

export function reset(){
    return {
        type: 'RESET',
    }
}









 