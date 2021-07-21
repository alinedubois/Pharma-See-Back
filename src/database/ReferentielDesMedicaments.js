const connection = require('../db-config');

const ReferentielDesMedicaments = {
  async rechercherParNom(nom) {
    const [medicaments] = await connection
      .promise()
      .query('SELECT * FROM medicaments_de_reference WHERE nom like ?', ['%' + nom + '%']);
    return medicaments;
  }
};

module.exports = ReferentielDesMedicaments;
