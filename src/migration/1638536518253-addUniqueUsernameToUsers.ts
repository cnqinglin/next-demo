import { User } from "src/entity/User";
import {MigrationInterface, QueryRunner, TableIndex} from "typeorm";

export class addUniqueUsernameToUsers1638536518253 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createIndex('users', new TableIndex(
            {
                name: 'users_username',
                columnNames: ['username'],
                isUnique: true
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('users','user_username')
    }

}
