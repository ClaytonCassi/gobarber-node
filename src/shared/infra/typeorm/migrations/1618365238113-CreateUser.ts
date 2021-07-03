
import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUser1618365238113 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({

            name: 'users',
            columns: [
            {
               name: 'id',
               type: 'uuid',
               isPrimary: true,
               generationStrategy: 'uuid',
               default: 'uuid_generate_v4()'
            
            },
            {
                name: 'name',
                type: 'varchar',
                isNullable: false,

            },
            
            {
                name: 'password',
                type: 'varchar',
            },
            {
                name: 'email',
                type: 'varchar',
                isNullable: false,
                isUnique: true

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
        await queryRunner.dropTable('users');
    }

}
