// 类似于Model，在这里封装所有数据相关的校验操作

import { request } from "https";
import md5 from "md5";
import { NextApiHandler } from "next";
import { SignIn } from "src/model/SignIn";
import { withSession } from "../../../lib/withSession";

const Sessions: NextApiHandler = async (req, res) => {
    const { username, password } = req.body;
    res.setHeader('Content-Type', 'application/json;charset=utf8');

    // const signIn = new SignIn(username,password)  // 把username和password放在构造器中的话，这样写
    const signIn = new SignIn();
    signIn.username = username;
    signIn.password = password;

    await signIn.validate()
    if (signIn.hasErrors()) {
        res.statusCode = 422;
        res.write(JSON.stringify(signIn.errors)); // 失败时将对应的错误信息展示在页面中
        res.end();
    } else {
        req.session.set('currentUser', signIn.user);
        await req.session.save();
        res.statusCode = 200;
        res.write(JSON.stringify(signIn.user));  // 成功时将对应的user 的信息展示在页面中
        res.end();
    }



    // model封装报错信息
    // if (user) {
    //     const passwordDigest = md5(password);
    //     if (user.passwordDigest === passwordDigest) {
    //         res.statusCode = 200;
    //         res.end(JSON.stringify(user))
    //     } else {
    //         res.statusCode = 422;
    //         res.end(JSON.stringify({password:['密码不匹配']}))
    //     }
    // } else {
    //     res.statusCode = 422;
    //     res.end(JSON.stringify({username:['用户名不存在']}))
    // }
    // res.statusCode = 200;
    // res.end();
}

export default withSession(Sessions);