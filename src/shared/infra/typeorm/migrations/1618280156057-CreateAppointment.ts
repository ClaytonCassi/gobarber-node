import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAppointment1618280156057 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({

            name: 'appointments',
            columns: [
            {
               name: 'id',
               type: 'uuid',
               isPrimary: true,
               generationStrategy: 'uuid',
               default: 'uuid_generate_v4()'
            
            },
            {
                name: 'provider',
                type: 'varchar',
                isNullable: false,

            },
            {
                name: 'date',
                type: 'timestamp with time zone',
                isNullable: false,

            },
            
            {
                name: 'created_at',
                type: 'timestamp',
                isNullable: false,
                default: 'now()'

            },
            {
                name: 'updated_at',
                type: 'timestamp',
                isNullable: false,
                default: 'now()'

            }
             ]
         })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('appointments');
    }

}
