import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { User } from 'src/entity/User'
import md5 from 'md5';
import { getDataBaseConnection } from "lib/getDataBaseConnection";

const Users: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, password, passwordConfirmation } = req.body

    const user = new User()

    user.username = username.trim();
    user.password = password;
    user.passwordConfirmation = passwordConfirmation;
    user.validate()
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    if (await user.hasError()) {
        res.statusCode = 422;
        res.write(JSON.stringify(user.errors))
    } else {
        
        user.passwordDigest =md5(user.password);

        const connection = await getDataBaseConnection()
        await connection.manager.save(user)

        res.statusCode = 200;
        res.write(JSON.stringify(user))
    }

    res.end()
    console.log('打印errors 的值：', Object.values(user.errors))
    console.log('打印errors 的键：', Object.keys(user.errors))


}

export default Users;