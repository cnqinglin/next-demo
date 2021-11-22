// 父目录posts是用来写 SSG 的

import { GetStaticProps, NextPage } from "next";
import { type } from "os";
import { usePosts } from "../../hooks/usePosts";
import getPosts from "../../lib/posts";
import Link from 'next/link'
import { idText } from "typescript";

type Posts = {
    id: string;
    title: string;
    date: string;
}
type Props = {
    posts: Posts[];
}
const PostIndex: NextPage<Props> = (props) => { // 指定props 是一个泛型，那么在前面的NextPage后面加类型
    // const { posts, isLoading, isEmpty } = usePosts()
    const { posts } = props   // getStaticProps中返回props,在这里引入
    const btnClick = () => {

    }
    return (
        // <div>
        //     <h1>文章列表</h1>
        //     {/*动态内容静态化就是把所有的动态内容全部删掉，只留下静态内容，再通过getStaticProps方法获取动态内容*/}
        //     {/* {
        //         isLoading ? <p> 加載中...</p> : isEmpty ? <div>empty</div> : posts.map(item => <div key={item.index}>{item}</div>)
        //     } */}
        //     {
        //         posts.map(id =>
        //             <div key={id.id}>
        //                 <Link href="/posts/[id]" as={`/posts/${id}`}>
        //                     <a key={id.id}>{id}</a>
        //                 </Link>
        //             </div>)
        //     }
        // </div>
        <div>
        <h1>文章列表</h1>
        {posts.map(p => <div key={p.id}>
          <Link href={`/posts/${p.id}`}>
            <a>
              {p.id}
            </a>
          </Link>
        </div>)}
      </div>
    )
}
export default PostIndex

// 在前端页面的function 组件旁边写上去就可以通过props获取动态内容
export const getStaticProps: GetStaticProps = async () => {
    const posts = await getPosts()
    return {
        // getStaticProps 的固定写法
        props: {
            posts: posts
        }
    }
}