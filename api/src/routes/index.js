const { Router } = require('express');
const { Raza,Temperamento } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const {API_KEY}=process.env;
const axios = require('axios')

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () =>{
    const apiUrl = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const apiInfo = await apiUrl.data.map(el =>{
        return {
            id:el.id,
            name: el.name,
            weight: el.weight.metric,
            height: el.height.metric,
            life_span: el.life_span,
            image: el.image.url,
            temperaments:el.temperament,
        };
    });
    return apiInfo;
};

/* function getApiInfo (){
axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`)
  .then(response=> response.json())
  .catch(error=> console.log(error))
  .then(data=> data.map(el=>{
    return {
            id:el.id,
            name: el.name,
            weight: el.weight.metric,
            height: el.height.metric,
            life_span: el.life_span,
            image: el.image.url,
            temperaments:el.temperament,
      }
  }) 
  ) 
} */

const getDBInfo = async () => {
    return await Raza.findAll({
       include:{
           model: Temperamento,
           attributes: ['name'], //no me traigo Id porque viene con "name"
           through:{
               attributes:[],
           },
       } 
    })
};

const getAllRazes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDBInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get('/razes', async (req, res) => {
    const {name} = req.query;
    let razesTotal = await getAllRazes();
    if(name){
        let razeName = await razesTotal.filter(el => el.name.toLowerCase().includes(name.toLowerCase()))
        razeName.length ?  //pregunto si se encontro un name
        res.status(200).send(razeName) : 
        res.status(404).send('Dog raze not found!!');
    }else{  //sino hubo un query
        res.status(200).send(razesTotal); //manda todo
     }
});
//aqui quiero traer los temperamentos de api y guardarlos en mi Db
router.get("/temperament", async (req, res) => {
    const temperamentApi = (await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    )).data  //Api trae temperaments en strings separados con comas!!!!!
    let temperaments = temperamentApi.map((el) => el.temperament);
    temperaments = temperaments.join().split(',');//uno los strings y los conv. array (,)
    temperaments = temperaments.map(t => t.trim()); //elimino espacios en blanco
    temperaments = temperaments.filter(t => t); //filtro en nuevo array
    temperaments = [...new Set(temperaments)].sort(); //almaceno en un nuevo set ordenado
           console.log(temperaments)                  //cuyos valores son unicos
    temperaments.forEach((el) => {        //para cada uno de los temperament             
      Temperamento.findOrCreate({         //entra al modelo Temperamento y busca,
        where: { name: el },              //si no lo encuentra lo crea. 
      });
    });
    const allTemperaments = await Temperamento.findAll(); //guarda los temp. en mi modelo
    res.send(allTemperaments);
  });

  router.post("/razes", async (req, res) => {
    let { name,
        weight,
        height,
        life_span,
        image,
        temperament,
        createdInDb, //si bien esta en true, lo tengo que pasar igual
    } = req.body
      
    try {
      let razeCreated = await Raza.create({name,
        weight,
        height,
        life_span,
        image,
        createdInDb,
    });     
       let temperamentDb = await Temperamento.findAll({ //el post de temp.lo hago desde la Db
           where: { name: temperament }                 //que es donde tengo los temp.guardados
       })
       razeCreated.addTemperamento(temperamentDb)

      //await razeCreated.addTemperamento(temperament)
      
      res.send('Raze created!')
    } catch (error) {
      console.log(error)
      res.status(400).send(error);
    }
  });

  router.get('/razes/:id', async (req, res) =>{
    const id = req.params.id;
    const razesTotal = await getAllRazes()
    if(id){
        let razeId = await razesTotal.filter(el => el.id ==id)
        razeId.length?
        res.status(200).json(razeId) :
        res.status(400).send('Raze not found');
    }
});




module.exports = router;
