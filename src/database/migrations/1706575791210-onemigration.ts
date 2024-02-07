import { MigrationInterface, QueryRunner } from "typeorm";

export class Onemigration1706575791210 implements MigrationInterface {
    name = 'Onemigration1706575791210'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`alumno\` (\`matricula\` int NOT NULL, \`nombre_alumno\` varchar(150) NOT NULL, \`apellidos_alumno\` varchar(150) NOT NULL, PRIMARY KEY (\`matricula\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`categoria\` (\`id_categoria\` int NOT NULL AUTO_INCREMENT, \`nombre_categoria\` varchar(150) NOT NULL, PRIMARY KEY (\`id_categoria\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`recurso\` (\`id_recurso\` int NOT NULL AUTO_INCREMENT, \`nombre_recurso\` varchar(500) NOT NULL, \`hash\` varchar(64) NULL, \`portada\` tinyint NOT NULL DEFAULT 0, \`tipo_recurso\` enum ('Pdf', 'Enlace', 'Imagen') NOT NULL, \`id_publicacion\` int NULL, PRIMARY KEY (\`id_recurso\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rol\` (\`id_rol\` int NOT NULL AUTO_INCREMENT, \`nombre_rol\` varchar(120) NOT NULL, PRIMARY KEY (\`id_rol\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`departamento\` (\`id_departamento\` int NOT NULL AUTO_INCREMENT, \`nombre_depto\` varchar(120) NOT NULL, PRIMARY KEY (\`id_departamento\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`usuario\` (\`id_usuario\` int NOT NULL AUTO_INCREMENT, \`correo\` varchar(255) NOT NULL, \`id_rol\` int NULL, \`id_departamento\` int NULL, UNIQUE INDEX \`IDX_349ecb64acc4355db443ca17cb\` (\`correo\`), PRIMARY KEY (\`id_usuario\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`publicacion\` (\`id_publicacion\` int NOT NULL AUTO_INCREMENT, \`titulo_publicacion\` varchar(120) NOT NULL, \`descripcion\` text NOT NULL, \`resumen\` varchar(110) NOT NULL, \`status\` enum ('aprobado', 'pendiente', 'rechazado') NOT NULL DEFAULT 'pendiente', \`fecha\` datetime NULL, \`fecha_evento\` datetime NULL, \`tipo_publicacion\` enum ('Evento', 'Convocatoria externa', 'Convocatoria interna', 'Proyecto', 'Investigación') NOT NULL, \`fijado\` tinyint NOT NULL DEFAULT 0, \`etiquetas\` text NOT NULL, \`comentario\` varchar(255) NULL, \`id_categoria\` int NULL, \`id_usuario\` int NULL, PRIMARY KEY (\`id_publicacion\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`registro\` (\`id_registro\` int NOT NULL AUTO_INCREMENT, \`alumno_matricula\` int NULL, \`id_publicacion\` int NULL, PRIMARY KEY (\`id_registro\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`recurso\` ADD CONSTRAINT \`fk_post_asset\` FOREIGN KEY (\`id_publicacion\`) REFERENCES \`publicacion\`(\`id_publicacion\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_3628e9894c4b014d61a01cb21dd\` FOREIGN KEY (\`id_rol\`) REFERENCES \`rol\`(\`id_rol\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`usuario\` ADD CONSTRAINT \`FK_62b68676176f06eeabb8a361a99\` FOREIGN KEY (\`id_departamento\`) REFERENCES \`departamento\`(\`id_departamento\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`publicacion\` ADD CONSTRAINT \`FK_b62df2c1cdb9126f37647d90025\` FOREIGN KEY (\`id_categoria\`) REFERENCES \`categoria\`(\`id_categoria\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`publicacion\` ADD CONSTRAINT \`FK_b0cd676ac183ff45644252a0265\` FOREIGN KEY (\`id_usuario\`) REFERENCES \`usuario\`(\`id_usuario\`) ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`registro\` ADD CONSTRAINT \`FK_eaad2b562da213947ed3db8842c\` FOREIGN KEY (\`alumno_matricula\`) REFERENCES \`alumno\`(\`matricula\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`registro\` ADD CONSTRAINT \`fk_regist_event_post\` FOREIGN KEY (\`id_publicacion\`) REFERENCES \`publicacion\`(\`id_publicacion\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`registro\` DROP FOREIGN KEY \`fk_regist_event_post\``);
        await queryRunner.query(`ALTER TABLE \`registro\` DROP FOREIGN KEY \`FK_eaad2b562da213947ed3db8842c\``);
        await queryRunner.query(`ALTER TABLE \`publicacion\` DROP FOREIGN KEY \`FK_b0cd676ac183ff45644252a0265\``);
        await queryRunner.query(`ALTER TABLE \`publicacion\` DROP FOREIGN KEY \`FK_b62df2c1cdb9126f37647d90025\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_62b68676176f06eeabb8a361a99\``);
        await queryRunner.query(`ALTER TABLE \`usuario\` DROP FOREIGN KEY \`FK_3628e9894c4b014d61a01cb21dd\``);
        await queryRunner.query(`ALTER TABLE \`recurso\` DROP FOREIGN KEY \`fk_post_asset\``);
        await queryRunner.query(`DROP TABLE \`registro\``);
        await queryRunner.query(`DROP TABLE \`publicacion\``);
        await queryRunner.query(`DROP INDEX \`IDX_349ecb64acc4355db443ca17cb\` ON \`usuario\``);
        await queryRunner.query(`DROP TABLE \`usuario\``);
        await queryRunner.query(`DROP TABLE \`departamento\``);
        await queryRunner.query(`DROP TABLE \`rol\``);
        await queryRunner.query(`DROP TABLE \`recurso\``);
        await queryRunner.query(`DROP TABLE \`categoria\``);
        await queryRunner.query(`DROP TABLE \`alumno\``);
    }

}
