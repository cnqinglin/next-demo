// 父目录serverSides是用来写SSR 的

import { GetServerSideProps, NextPage, NextPageContext } from "next"
import { useEffect, useState } from "react";
var parser = require('ua-parser-js');

type Props = {
    browser: {
        name: string;
        version: string;
        major: string;
    }
}
const postsIndex: NextPage<Props> = (props) => {
    const { browser } = props

    const [width, setWidth] = useState<Number>(0);
    useEffect(() => {
        debugger;
        const w = document.documentElement.clientWidth
        setWidth(w)
    },[])


    return (
        <div>
            <h3>你的浏览器名称是：{browser.name}</h3>
            <h3>你的浏览窗口宽度是：{width}</h3>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const ua = parser(context.req.headers['user-agent'])
    return {
        props : {
            browser:ua.browser
        }
    }
}

export default postsIndex