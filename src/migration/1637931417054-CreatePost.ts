import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreatePost1637931417054 implements MigrationInterface {
    // 升级数据库
    public async up(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.createTable(new Table({
            name: 'posts',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy:'increment',
                },
                {
                    name: 'title',
                    type: 'varchar',
                },
                {
                    name: 'content',
                    type: 'text',
                },
            ],
        }))
    }
    // 降级数据库
    public async down(queryRunner: QueryRunner): Promise<void> {
        return await queryRunner.dropTable('posts')
    }

}
