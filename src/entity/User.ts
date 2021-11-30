import {Column, CreateDateColumn, Entity, UpdateDateColumn,OneToMany,PrimaryGeneratedColumn} from "typeorm";
import { Post } from "./Post";
import { Comment } from './Comment'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('increment')
    id: number;
    @Column('varchar')
    username: string;
    @Column('varchar')
    passwordDigest: string;
    @CreateDateColumn()
    createdAt: Date;
    @UpdateDateColumn()
    updatedAt: Date;
    @OneToMany(() => Post, post => post.author)
    Posts: Post[];
    @OneToMany(() => Comment, Comment => Comment.post)
    comments: Comment[];
}
