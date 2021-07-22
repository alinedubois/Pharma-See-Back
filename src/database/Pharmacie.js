const connection = require('../db-config');

const Pharmacie = {
  async medicaments(email) {
    const [medicaments] = await connection
      .promise()
      .query(`select medicaments_de_reference.id, nom, forme, administration, generique, surveillance_renforcee, quantite
              from medicaments_de_reference
               inner join pharmacie on pharmacie.id_medicament = medicaments_de_reference.id
               where email=?`, [email]);
    return medicaments;
  },
  async ajouter(medicamentId, email) {
    const [medicamentDeLaPharmacie] = await connection
      .promise()
      .query(`select id, quantite
              from pharmacie
              where id_medicament = ? and email=?`, [medicamentId, email]);
    if (medicamentDeLaPharmacie.length === 0) {
      await connection
        .promise()
        .query('insert into pharmacie (id_medicament, email, quantite) values (?, ?, 1)', [medicamentId, email]);
    } else {
      await connection
        .promise()
        .query('update pharmacie set quantite = (quantite + 1) where id = ? and email=?', [medicamentDeLaPharmacie[0].id, email]);
    }
  },
  async enlever(medicamentId, email) {
    const [medicamentDeLaPharmacie] = await connection
      .promise()
      .query(`select id, quantite
              from pharmacie
              where id_medicament = ? and email=?`, [medicamentId, email]);
    if (medicamentDeLaPharmacie.length > 0) {
      if (medicamentDeLaPharmacie[0].quantite > 0) {
        await connection
          .promise()
          .query('update pharmacie set quantite = quantite - 1 where id = ? and email=?', [medicamentDeLaPharmacie[0].id, email]);
      } else {
        await connection
          .promise()
          .query('delete from pharmacie where id = ? and email=?', [medicamentDeLaPharmacie[0].id, email]);
      }
    }
  }
};

module.exports = Pharmacie;
