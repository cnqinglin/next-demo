import {Column, CreateDateColumn, Entity, UpdateDateColumn,OneToMany,PrimaryGeneratedColumn, BeforeInsert} from "typeorm";
import { Post } from "./Post";
import { Comment } from './Comment'
import { getDataBaseConnection } from "lib/getDataBaseConnection";
import md5 from 'md5';
import _ from 'lodash';

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
        let found = await (await getDataBaseConnection()).manager.find(User, { username: this.username });
        if (found.length > 0) {
            this.errors.username.push('用户名长度过短hhhh')
        }
        if (this.password === '') {
            this.errors.password.push('密码不能为空')
        }
        // ui.username = username;
        if (this.password !== this.passwordConfirmation) {
            this.errors.passwordConfirmation.push('密码不匹配')
        }   
    }
    hasErrors() {
        return !!Object.values(this.errors).find(v => v.length > 0);
    }

    // 注释器：在保存之前创建passeordDigest
    @BeforeInsert()
    generatePasswordDigest() {
        this.passwordDigest = md5(this.password);
    }

    toJSON() {
        return _.omit(this,['password','passwordConfirmation','passwordDigest','errors'])
    }
}
