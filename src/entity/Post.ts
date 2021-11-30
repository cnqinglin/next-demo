import { Column, Entity, UpdateDateColumn, CreateDateColumn, ManyToOne,OneToMany,PrimaryGeneratedColumn } from "typeorm";
import { User } from './User'
import { Comment } from './Comment'

@Entity()
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('varchar')
    title: string;
    @Column('text')
    content: string;
    @Column('int')
    authorId: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @ManyToOne(() => User, user => user.Posts)
    author: User;
    @OneToMany(() => Comment, Comment =>Comment.comment)
    comments: Comment[];
}
