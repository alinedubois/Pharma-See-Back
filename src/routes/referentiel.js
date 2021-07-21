const express = require('express');
const ReferentielDesMedicaments = require('../database/ReferentielDesMedicaments');
const router = express.Router();

router.get('/', async function(request, response, next) {
  try {
    const nom = request.query.nom;
    if (nom) {
      const medicaments = await ReferentielDesMedicaments.rechercherParNom(nom);
      response.json(medicaments);
    } else {
      response
        .status(400)
        .send('Le paramètre nom du médicament est obligatoire');
    }
  } catch (error) {
    response
      .status(500)
      .send(`Impossible de récupérer les médicaments de référence : ${error}`);
  }
});

module.exports = router;
