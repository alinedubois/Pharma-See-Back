drop database if exists pharmaseedb;
create database if not exists pharmaseedb;

use pharmaseedb;

create table medicaments_de_reference (
    id int not null auto_increment primary key,
    nom varchar(200) not null,
    forme varchar(100) not null,
    administration varchar(100) not null,
    generique boolean not null default false,
    surveillance_renforcee boolean not null default false
);

insert into medicaments_de_reference (nom, forme, administration, generique, surveillance_renforcee)
VALUES ('Doliprane (Paracétamol) 500mg, 16 gélules', 'Gélules', 'Voie orale', false, false),
       ('Ebastine Zentiva 10mg, 30 comprimés pelliculés', 'Comprimés', 'Voie orale', false, false),
       ('Berocca Energie, Pack ECO 60 comprimés', 'Comprimés', 'Voie orale', false, false),
       ('Rescue Compte gouttes', 'Gouttes', 'Voie orale', false, false);

create table pharmacie (
    id int not null auto_increment primary key,
    id_medicament int not null references medicaments_de_reference(id),
    quantite int not null default 0
);

alter table pharmacie
add constraint fk_pharmacie_medicaments_de_reference
foreign key (id_medicament) references medicaments_de_reference(id);
