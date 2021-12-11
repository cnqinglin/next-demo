import {withIronSession} from 'next-iron-session';
import { GetServerSideProps, NextApiHandler } from 'next';

export function withSession(handler: NextApiHandler | GetServerSideProps) {
    
    return withIronSession(handler, {
        // password:'c2a85490-cc60-4f21-94e8-8dc5dd3220da',
        // c2a85490-cc60-4f21-94e8-8dc5dd3220da
      
        // password: process.env.SECRET,  // 把密码保存在环境变量上面
        password: process.env.SECRET,
        cookieName: 'blog',
        cookieOptions: {secure: false}
    });
}