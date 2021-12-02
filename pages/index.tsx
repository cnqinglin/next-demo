// 父目录serverSides是用来写SSR 的

import { getDataBaseConnection } from "lib/getDataBaseConnection";
import { GetServerSideProps, NextPage, NextPageContext } from "next"
import { useState,useEffect } from "react";
import { Post } from "src/entity/Post";
import { User } from "src/entity/User";
import { createConnection } from 'typeorm';
var parser = require('ua-parser-js');
import Link from 'next/link'

type Props = {
    posts:Post[],
    // browser: {
    //     name: string;
    //     version: string;
    //     major: string;
    // }
}
const postsIndex: NextPage<Props> = (props) => {
    // const { browser,post } = props
    const { posts } = props
    // const [width, setWidth] = useState<Number>(0);
    // useEffect(() => {
    //     const w = document.documentElement.clientWidth
    //     setWidth(w)
    // },[])


    return (
        <div>
            {posts.map(post => <div key={ post.id}>
                <h1>标题是：{post.title}</h1>
                <Link href={`/posts/${post.id}`} key={ post.id}>
                    <a>内容是:{ post.content}</a>
                </Link>
            </div>)}
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const connection = await getDataBaseConnection()
    const post = await connection.manager.find(Post)


    // const ua = parser(context.req.headers['user-agent'])
    return {
        props : {
            // browser: ua.browser,
            posts:JSON.parse(JSON.stringify(post)),
        }
    }
}

export default postsIndex