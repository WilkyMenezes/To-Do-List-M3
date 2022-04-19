const paletas = [
    {
      id: 1,
      sabor: 'Açai com Leite Condensado',
      descricao: 'Açai com Leite Condensado',
      foto: './assets/image/acai-com-leite-condensado.png',
      preco: 10.0,
    },
    {
      id: 2,
      sabor: 'Banana com Nutella',
      descricao: 'Banana com Nutella',
      foto: './assets/image/banana-com-nutella.png',
      preco: 10.0,
    },
    {
      id: 3,
      sabor: 'Chocolate Belga',
      descricao: 'Chocolate Belga',
      foto: './assets/image/chocolate-belga.png',
      preco: 7.0,
    },
  ];

  const findAllPaletasService = () => {
    return paletas;
  }


  const findByIdPaletaService = (parametroId) => {
    const paleta = paletas.find((paleta) => paleta.id === parametroId);
    return paleta;
  };


const createPaletaService = (newPaleta) => {
  const newId = paletas.length + 1;
  newPaleta.id = newId;
  paletas.push(newPaleta);
  return newPaleta;
};

const updatePaletaService = (id, paletaEdited) => {
  paletaEdited['id'] = id;
  const paletaIndex = paletas.findIndex((paleta) => paleta.id == id);
  paletas[paletaIndex] = paletaEdited;
  return paletaEdited;
};

const deletePaletaService = (id) => {
  const paletaIndex = paletas.findIndex((paleta)=> paleta.id == id);
  return paletas.splice(paletaIndex, 1);
};




  module.exports = {
    findAllPaletasService,
    findByIdPaletaService,
    createPaletaService,
    updatePaletaService,
    deletePaletaService
  }
