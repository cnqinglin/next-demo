import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { User } from 'src/entity/User'
import { getDataBaseConnection } from "lib/getDataBaseConnection";

const Users: NextApiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    const { username, password, passwordConfirmation } = req.body
    const connection = await getDataBaseConnection()
    const user = new User()
    user.username = username.trim();
    user.password = password;
    user.passwordConfirmation = passwordConfirmation;
    res.setHeader('Content-Type', 'application/json;charset=utf-8')
    user.validate()

  if (user.hasErrors()) {
        res.statusCode = 422;
        res.write(JSON.stringify(user.errors));
      } else {
        // user.passwordDigest =md5(user.password);
        await connection.manager.save(user);
        res.statusCode = 200;
        res.write(JSON.stringify(user))
    }

    res.end()


}

export default Users;