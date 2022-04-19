const paletasService = require("../services/paleta.service")

const findAllPaletasController = (req, res) => {
  const paletas = paletasService.findAllPaletasService();
  
  if (paletas.length == 0) {
    return res.status(404).send({message: ' Não existe nenhuma paleta cadastrada! '});
  }


  res.send(paletas)
};


const findByIdPaletaController = (req, res) => {
  const parametroId = Number(req.params.id);
    if (!parametroId){
      return res.status(400).send({message: ' Id invalido '});
    }
    const escolhaPaleta = paletasService.findByIdPaletaService(parametroId);
    if (!escolhaPaleta){
      return res.status(404).send({message: 'Paleta não encontrada '});
    }
    res.send(escolhaPaleta);

};

const createPaletaController = (req, res) => {
  const paleta = req.body;

  if (!paleta
    || !paleta.sabor
    || !paleta.descricao
    || !paleta.foto
    || !paleta.preco    
    ){
    return res.status(400).send({message: "Envie todos os campos da paleta"})
  }

  const newPaleta = paletasService.createPaletaService(paleta);
  res.status(201).send(newPaleta);

};

const updatePaletaController = (req, res) => {
  const idParam = Number(req.params.id);

  if (!idParam){
    return res.status(400).send({message: ' Id invalido '});
  }
  const paletaEdit = req.body;
  if (!paletaEdit
    || !paletaEdit.sabor
    || !paletaEdit.descricao
    || !paletaEdit.foto
    || !paletaEdit.preco    
    ){
    return res.status(400).send({message: "Envie todos os campos da paleta"})
  }

  const updatePaleta = paletasService.updatePaletaService(idParam, paletaEdit);
  res.send(updatePaleta);
};



const deletePaletaController = (req, res) => {
  const idParam = Number(req.params.id);
  
  if (!idParam){
    return res.status(400).send({message: ' Id invalido '});
  }
    paletasService.deletePaletaService(idParam);

  res.send({ message: 'Paleta deletada com sucesso!'});
};


module.exports = {
  findAllPaletasController,
  findByIdPaletaController,
  createPaletaController,
  updatePaletaController,
  deletePaletaController
};
