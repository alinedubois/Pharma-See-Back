const express = require('express');
const Pharmacie = require('../database/Pharmacie');
const router = express.Router();

router.get('/:email', async function(request, response, next) {
  try {
    const medicaments = await Pharmacie.medicaments(request.params.email);
    response.status(200).json(medicaments);
  } catch (error) {
    response
      .status(500)
      .send(`Impossible de récupérer les médicaments de la pharmacie : ${error}`);
  }
});

router.post('/:email', async function(request, response) {
  try {
    const {id} = request.body;
    if (id) {
      await Pharmacie.ajouter(id, request.params.email);
      response.status(201).send('');
    } else {
      response.status(400).send(`Le corps de la requête doit contenir l'id du médicament`);
    }
  } catch (error) {
    response
      .status(500)
      .send(`Impossible d'ajouter le médicament dans la pharmacie : ${error}`);
  }
});

router.delete('/:email/:id', async function(request, response) {
  try {
    await Pharmacie.enlever(request.params.id, request.params.email);
    response.status(204).send();
  } catch (error) {
    response
      .status(500)
      .send(`Impossible d'enlever le médicament de la pharmacie : ${error}`);
  }
});

module.exports = router;
