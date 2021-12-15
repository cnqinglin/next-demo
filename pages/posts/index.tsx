// 父目录posts是用来写 SSG 的

import { getDatabaseConnection } from "lib/getDataBaseConnection"
import { GetServerSideProps, NextPage } from "next"
import LINK from 'next/link'
import { Post } from "src/entity/Post"

// import { GetStaticProps, NextPage } from "next";
// import { type } from "os";
// import { usePosts } from "../../hooks/usePosts";
// import getPosts from "../../lib/posts";
// import Link from 'next/link'
// import { idText } from "typescript";

// type Posts = {
//     id: string;
//     title: string;
//     date: string;
// }
// type Props = {
//     posts: Posts[];
// }
// const PostIndex: NextPage<Props> = (props) => { // 指定props 是一个泛型，那么在前面的NextPage后面加类型
//     // const { posts, isLoading, isEmpty } = usePosts()
//     const { posts } = props   // getStaticProps中返回props,在这里引入
//     const btnClick = () => {

//     }
//     return (
//         // <div>
//         //     <h1>文章列表</h1>
//         //     {/*动态内容静态化就是把所有的动态内容全部删掉，只留下静态内容，再通过getStaticProps方法获取动态内容*/}
//         //     {/* {
//         //         isLoading ? <p> 加載中...</p> : isEmpty ? <div>empty</div> : posts.map(item => <div key={item.index}>{item}</div>)
//         //     } */}
//         //     {
//         //         posts.map(id =>
//         //             <div key={id.id}>
//         //                 <Link href="/posts/[id]" as={`/posts/${id}`}>
//         //                     <a key={id.id}>{id}</a>
//         //                 </Link>
//         //             </div>)
//         //     }
//         // </div>
//         <div>
//         <h1>文章列表</h1>
//         {posts.map(p => <div key={p.id}>
//           <Link href={`/posts/${p.id}`}>
//             <a>
//               {p.id}
//             </a>
//           </Link>
//         </div>)}
//       </div>
//     )
// }
// export default PostIndex

// // 在前端页面的function 组件旁边写上去就可以通过props获取动态内容
// export const getStaticProps: GetStaticProps = async () => {
//     const posts = await getPosts()
//     return {
//         // getStaticProps 的固定写法
//         props: {
//             posts: posts
//         }
//     }
// }

type Props = {
  posts:Post[],
  // browser: {
  //     name: string;
  //     version: string;
  //     major: string;
  // }
}
const PostsIndex: NextPage<Props> = (props) => {
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
            <div>
            <LINK href={`/posts/${post.id}`} key={ post.id}>
                  <a>内容是:{ post.content}</a>
              </LINK>
            </div>
          </div>)}
      </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const connection = await getDatabaseConnection()
  const post = await connection.manager.find(Post)


  // const ua = parser(context.req.headers['user-agent'])
  return {
      props : {
          // browser: ua.browser,
          posts:JSON.parse(JSON.stringify(post)),
      }
  }
}

export default PostsIndex;