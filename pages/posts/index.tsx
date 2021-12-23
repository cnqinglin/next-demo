import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {UAParser} from 'ua-parser-js';
import {Post} from 'src/entity/Post';
import Link from 'next/link';
import qs from 'querystring';
import {usePager} from '../../hooks/usePager';
import { getDatabaseConnection } from 'lib/getDataBaseConnection';
import { useCallback } from 'react';
import { withSession } from 'lib/withSession'

type Props = {
  posts: Post[];
  count: number;
  perPage: number;
  page: number;
  totalPage: number;
  currentUser: number | null;
}
const PostsIndex: NextPage<Props> = (props) => {
  const {posts, count, page, totalPage,currentUser} = props;
  const { pager } = usePager({ page, totalPage });
  // const editBlog = useCallback(() => {
  //     window.location.href = '/posts/new'
  // },[])
  return (
    <>
      <div className="posts">
        <header className="head">
          <h1>文章列表</h1>
          {
            currentUser && <Link href="/posts/new"><a>写文章</a></Link>
          }
          
          {/* <button onClick={ editBlog }>写文章</button> */}
        </header>
        
      {posts.map(post =>
        <div key={post.id} className="onePost">
          <Link key={post.id} href={`/posts/${post.id}`}>
            <a>
              {post.title}
            </a>
          </Link>
        </div>
      )}
      <footer>
        {pager}
      </footer>
      </div>
      <style jsx>{`
          .posts {
            height: 100vh;
            max-width: 800px;
            margin: 0 auto;
            padding: 16px;
          }
          .posts > .head {
            display: flex;
            justify-content:center;
            align-items: center;
          }
          .posts > .head > h1{
            margin: 0;
            margin-right: auto;
          }
          .posts > .head > a:hover {
              color: red;
          }
          .posts > .onePost {
            padding: 8px 0;
            border-bottom: 1px solid #ddd;
            padding-top: 20px;
          }
          .posts > .onePost > a:hover {
              color: blue;
          }
        `}</style>
      </>
  );
};
export default PostsIndex;

export const getServerSideProps: GetServerSideProps = withSession(async (context:GetServerSidePropsContext) => {
  const index = context.req.url.indexOf('?');
  const search = context.req.url.substr(index + 1);
  const query = qs.parse(search);
  const page = parseInt(query.page?.toString()) || 1;
  const currentUser = context.req.session.get('currentUser') || null;
  const connection = await getDatabaseConnection();// 第一次链接能不能用 get
  const perPage = 10;
  const [posts, count] = await connection.manager.findAndCount(Post,
    {skip: (page - 1) * perPage, take: perPage});
  const ua = context.req.headers['user-agent'];
  const result = new UAParser(ua).getResult();
  return {
    props: {
      browser: result.browser,
      posts: JSON.parse(JSON.stringify(posts)),
      count: count,
      perPage, page,
      totalPage: Math.ceil(count / perPage),
      currentUser
    }
  };
});