const connection = require('../db-config');

const Pharmacie = {
    async medicaments() {
        const [medicaments] = await connection
            .promise()
            .query(`select medicaments_de_reference.id, nom, forme, administration, generique, surveillance_renforcee, quantite
              from medicaments_de_reference
               inner join pharmacie on pharmacie.id_medicament = medicaments_de_reference.id`);
        return medicaments;
    },
    async ajouter(medicamentId) {
        const [medicamentDeLaPharmacie] = await connection
            .promise()
            .query(`select id, quantite
              from pharmacie
              where id_medicament = ?`, [medicamentId]);
        if (medicamentDeLaPharmacie.length === 0) {
            await connection
                .promise()
                .query('insert into pharmacie (id_medicament, quantite) values (?, 1)', [medicamentId]);
        } else {
            await connection
                .promise()
                .query('update pharmacie set quantite = (quantite + 1) where id = ?', [medicamentDeLaPharmacie[0].id]);
        }
    },
    async enlever(medicamentId) {
        const [medicamentDeLaPharmacie] = await connection
            .promise()
            .query(`select id, quantite
              from pharmacie
              where id_medicament = ?`, [medicamentId]);
        if (medicamentDeLaPharmacie.length > 0) {
            if (medicamentDeLaPharmacie[0].quantite > 0) {
                await connection
                    .promise()
                    .query('update pharmacie set quantite = quantite - 1 where id = ?', [medicamentDeLaPharmacie[0].id]);
            } else {
                await connection
                    .promise()
                    .query('delete from pharmacie where id = ?', [medicamentDeLaPharmacie[0].id]);
            }
        }
    }
};

module.exports = Pharmacie;