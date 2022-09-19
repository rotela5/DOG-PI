const initialState = { 
    razes : [],
    allRazes:[],            //aqui guardo copia del estado con TODAS las razas para aplicarlo en GET_RAZES
    razasDetail : [],      // y  filter TEMP, HACE DE SOPORTE SIEMPRE QUE CONSULTA RAZES Y TEMPERAMENTS
    temperaments : []
   
}

function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_RAZES':
            return {
                ...state,
                razes: action.payload,
                allRazes: action.payload //me traigo allRazes para cada vez que renderizo
            }                            //y hago un filtrado, me muestre todas las razas
                                         //es un estado "auxiliar"
        case 'GET_TEMPERAMENTS':
            return {
                ...state,
                temperaments: action.payload

            }
        case 'ORDER_BY_NAME':
            let sortedArr = action.payload ==='asc'?
            state.razes.sort(function(a,b) {
                if (a.name > b.name){
                    return 1;
                }
                if (b.name > a.name){
                    return -1;
                }
                return 0;
            }) :
            state.razes.sort(function(a,b){
                if (a.name > b.name){
                    return -1;
                }
                if (b.name > a.name){
                    return 1;
                }
                return 0;
            })
            return {
                ...state,
                razes: sortedArr
            }
        case 'GET_RAZES_NAME':
            return {
                ...state,
                razes: action.payload,
                allRazes: action.payload
            }
        case 'GET_RAZES_ID':
            return {
                ...state,
                razasDetail: action.payload

            }
        case 'FILTER_BY_TEMP':
            const allRazes = state.allRazes 
            const razesFiltered=allRazes.filter(el => el.temperaments?.includes(action.payload)) 
            
            return{
                ...state,
                razes: razesFiltered
            }
        case 'FILTER_CREATED':
            const allRazes2 = state.allRazes            
            const createdFilter = action.payload ==='created'?
             allRazes2.filter(el => el.createdInDb): allRazes2.filter(el =>!el.createdInDb)            
            return{
                ...state,
                razes: createdFilter
            }
        case 'FILTER_WEIGTH':
            let arraySort= action.payload==="mayor"?
            state.razes.sort(function(a,b){
                if(parseInt(a.weight.split('-')[1]) > parseInt(b.weight.split('-')[1])){
                    return -1;
                }
                if(parseInt(b.weight.split('-')[1]) > parseInt(a.weight.split('-')[1])){
                    return 1;
                }
                return 0;            
            })
            :state.razes.sort(function(a,b){
                if(parseInt(a.weight.split('-')[0]) > parseInt(b.weight.split('-')[0])){
                    return 1;
                }
                if(parseInt(b.weight.split('-')[0]) > parseInt(a.weight.split('-')[0])){
                    return -1;
                }
                return 0; 
            });
            return{
                ...state,
                razes:arraySort,
            };
        case 'POST_RAZE':
            return {
                ...state
            }
        case 'RESET':
            return {
                ...state,
                params: []
            }    
        default : return state
    }
}

export default rootReducer;