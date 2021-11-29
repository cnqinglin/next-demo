import { text } from "stream/consumers";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('posts')  // 这个实体对应的表是posts

export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('varchar')
    title: string;
    @Column('text')
    content: string;
    constructor(
        // public title:string,  //写public就等于给this添加了title属性 
        // public content:string
        attributes:Partial<Post>
    ) {
        Object.assign(this,attributes)
    }
}
