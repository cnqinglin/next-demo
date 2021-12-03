import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { User } from 'src/entity/User'
import md5 from 'md5';
import { getDataBaseConnection } from "lib/getDataBaseConnection";

const Users: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, password, passwordConfirmation } = req.body

    // 封装报错信息
    const errors = {
        username: [] as string[],
        password: [] as string[],
        passwordConfirmation: [] as string[],
    }

    if (username.trim() === '') {
        errors.username.push('用户名不能为空')
    }
    if (!/[a-zA-Z0-9]/.test(username.trim())) {
        errors.username.push('用户名格式不正确')
    }
    if (username.trim().length > 42) {
        errors.username.push('用户名长度过长')
    }
    if (username.trim().length < 3) {
        errors.username.push('用户名长度过短')
    }
    if (password === '') {
        errors.password.push('密码不能为空')
    }
    // ui.username = username;
    if (password !== passwordConfirmation) {
        errors.passwordConfirmation.push('密码不匹配')
    }

    const hasErrors = Object.values(errors).find(v => v.length > 0);
    console.log('hasErrors',hasErrors)
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    if (hasErrors) {
        res.statusCode = 422;
        res.write(JSON.stringify(errors))
    } else {
        const user = new User()
        user.username = username.trim();
        user.passwordDigest = md5(password)

        const connection = await getDataBaseConnection()
        await connection.manager.save(user)

        res.statusCode = 200;
        res.write(JSON.stringify(user))
    }

    res.end()
    console.log('打印errors 的值：', Object.values(errors))
    console.log('打印errors 的键：', Object.keys(errors))


}

export default Users;