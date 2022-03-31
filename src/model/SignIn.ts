// 这个model也是个类，但不同于entity 类（注册有关）的区别是不会存储到数据库中，只是关于登录

import { getDatabaseConnection } from "lib/getDataBaseConnection";
import _ from "lodash";
import { User } from "src/entity/User";
import md5 from 'md5';


export class SignIn {
    // constructor(username:string, password:string,user:string) {
    //     this.username = username;
    //     this.password = password;
    // }
    username: string;
    password: string;
    user: User;
    errors = {
        username: [] as string[],
        password: [] as string[],
    };
    async validate() {
        if (this.username.trim() === '') {
            this.errors.username.push('请填写用户名');
        }
        const connection = await getDatabaseConnection()
        const user = await connection.manager.findOne(User, { where: { username: this.username } })
        this.user = user;  // 为了在成功的情况下展示user 的信息而写的
        if (user) {
            if (md5(this.password) !== user.passwordDigest) {
                this.errors.password.push('密码不匹配')
            }
        } else {
            this.errors.username.push('用户名不存在')
        }
        //   if (!/[a-zA-Z0-9]/.test(this.username.trim())) {
        //     this.errors.username.push('用户名格式不合法');
        //   }
        //   if (this.username.trim().length > 42) {
        //     this.errors.username.push('太长');
        //   }
        //   if (this.username.trim().length <= 3) {
        //     this.errors.username.push('用户名太短');
        //   }
        // const found = await (await getDatabaseConnection()).manager.find(User, { username:this.username });
        // if (found.length > 0) {
        //   this.errors.username.push('已存在，不能重复注册');
        // }
        if (this.password === '') {
            this.errors.password.push('密码不能为空');
        }
        if (this.password) {
            // this.errors.passwordConfirmation.push('密码不匹配');
        }
    };
    hasErrors() {
        return !!Object.values(this.errors).find(v => v.length > 0)
    };
    toJSON() {
        return _.omit(this, ['password', 'errors'])
    }
}