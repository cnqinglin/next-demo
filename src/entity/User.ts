import {Column, CreateDateColumn, Entity, UpdateDateColumn,OneToMany,PrimaryGeneratedColumn} from "typeorm";
import { Post } from "./Post";
import { Comment } from './Comment'
import { getDataBaseConnection } from "lib/getDataBaseConnection";

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

    // 封装报错信息
    errors = {
        username: [] as string[],
        password: [] as string[],
        passwordConfirmation: [] as string[],
    }

    password: string;
    passwordConfirmation: string;

    async validate() {
        if (this.username.trim() === '') {
            this.errors.username.push('用户名不能为空')
        }
        if (!/[a-zA-Z0-9]/.test(this.username.trim())) {
            this.errors.username.push('用户名格式不正确')
        }
        if (this.username.trim().length > 42) {
            this.errors.username.push('用户名长度过长')
        }
        if (this.username.trim().length < 3) {
            this.errors.username.push('用户名长度过短')
        }
    
        const found = await (await getDataBaseConnection()).manager.find(User, { username:this.username })
        if (found.length > 0) {
            this.errors.username.push('用户名已存在，不能重复注册')
        }
    
        if (this.password === '') {
            this.errors.password.push('密码不能为空')
        }
        // ui.username = username;
        if (this.password !== this.passwordConfirmation) {
            this.errors.passwordConfirmation.push('密码不匹配')
        }   
    }


    hasError() {
        return !!Object.values(this.errors).find(v => v.length > 0);
    }
}
