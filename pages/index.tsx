import { NextPage } from "next";
import Image from 'next/image';
import Link from "next/link";

const Home: NextPage = () => {
    return (
        <>
            <div className="cover">
                <Image
                    src="/logo.png"
                    alt="Picture of the author"
                    width={100}
                    height={100}
                />
                <h1>青林的个人博客</h1>
                <p>我是个小小小作家</p>
                <p><Link href="/posts"><a>文章列表</a></Link></p>

            </div>
            <style jsx>
                {`
                    .cover{
                        background: yellowgreen;
                        height: 100vh;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        flex-direction: column;
                    }
            `}
            </style>
        </>

    )
}

export default Home;

