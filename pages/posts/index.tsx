import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';
import { UAParser } from 'ua-parser-js';
import { Post } from 'src/entity/Post';
import Link from 'next/link';
import qs from 'querystring';
import { usePager } from '../../hooks/usePager';
import { getDatabaseConnection } from 'lib/getDataBaseConnection';
import { useCallback, useEffect, useState } from 'react';
import { withSession } from 'lib/withSession'
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
import Image from 'next/image'
import { useSet } from 'hooks/useDialog';
import bg from '../../public/cover.jpeg'

type Props = {
  posts: Post[];
  count: number;
  perPage: number;
  page: number;
  totalPage: number;
  currentUser: number | null;
}
const PostsIndex: NextPage<Props> = (props) => {
  // 特殊的写法，样式也可以通过js来写
  const customStyle = {
    backgroundImage:`url(${bg})`,
    layout: 'fixed',
    paddingTop: '0px',
    height:'500',
  }

  const { posts, count, page, totalPage, currentUser } = props;
  const { pager } = usePager({ page, totalPage });

  const [state, setState] = useState(false)
  const { set } = useSet(state)

  const setting = useCallback(() => {
    if (state == false) {
      setState(true)
    } else {
      setState(false)
    }
  }, [state])

  const router = useRouter()
  const deleteBlog = (id: Number) => useCallback(() => {
    axios.delete(`/api/v1/posts/${id}`).then(
      () => {
        window.alert('删除成功');
        // router.push('/posts')
        let index: number
        for (let i = 0; i < posts.length; i++) {
          if (posts[i].id.toString() === id.toString()) {
            index = i
          }
        }
        posts.slice(index - 1, index);
      },
      () => {
        window.alert('删除失败');
      });
  }, [id]);

  return (
    <>
      <div className='frame'>
        <span className='menu'>个人博客 / 文章列表</span>
        <a className='right'>
          <Image
            className='pic'
            src="/avatar.png"
            alt="Picture of the author"
            width={40}
            height={40}
          />
          <button onClick={setting} className='set' style={{
            backgroundColor: 'inherit',
            borderColor: 'inherit',
            verticalAlign: 'middle',
            padding: '0px',
            width: '0px',
            height: '0px',
            borderTop: '10px solid black',
            borderRight: '10px solid transparent',
            borderLeft: '10px solid transparent',
            borderBottom: '10px solid transparent',
            position: 'relative',
          }}>
            {set}
          </button>
        </a>
      </div>
      <div className="posts" style={customStyle}>
        <header className="head">
          <Image
            className='pic'
            src="/files.png"
            alt="Picture of the author"
            width={14}
            height={18}
          />
          <h3>文章列表</h3>
          {
            currentUser && <Link href="/posts/new"><a>写文章</a></Link>
          }
        </header>
        <main className='main'>
        <Image
            src="/main.jpeg"
            alt="Picture of the author"
            width={'800px'}
            height={'220px'}
          />
        </main>
        {posts.map(post =>
          <div key={post.id} className="onePost">
            <div>
              <Image
                className='pic'
                src="/fil.png"
                alt="Picture of the author"
                width={12}
                height={16}
              />
              <Link key={post.id} href={`/posts/${post.id}`}>
                <a className='title'>
                  {post.title}
                </a>
              </Link>
            </div>
            <div>
              <Image
                className='pic'
                src="/delete.png"
                alt="Picture of the author"
                width={12}
                height={14}
              />
              <button className='btn' onClick={deleteBlog(post.id)}>删除</button>
            </div>
          </div>
        )}
        <footer className='foot'>
          {pager}
        </footer>
      </div>
      <div className='footer'>
        <button className='button'>关于</button>
        <button className='button'>博客</button>
        <button className='button'>网站</button>
      </div>
      <style jsx>{`
        .frame {
          margin: 0;
          padding: 14px 100px 14px 80px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgb(238,174,202);
          background: radial-gradient(circle, 
            rgba(238,174,202,1) 4%, 
            rgba(153,148,233,0.6054796918767507) 78%);
            font-family: Georgia, 'Times New Roman', Times, serif;
            color: rgb(49, 48, 48);
            font-size: 24px;
        }
        .frame > .right > .pic {
          position: relative;
        }
        .frame > .right > .set {
          margin-top: -30px;  
        }
          .posts {
            height: 100vh;
            max-width: 100%;
            margin: 0 auto;
            padding: 20px;
            position: relative;
          }
          .posts > .head {
            margin: 0px auto;
            width: 800px;
            display: flex;
            justify-content:center;
            align-items: center;
            padding-bottom: 20px;
            border-bottom: 4px solid rgb(201, 199, 199);
            background-color: aliceblue;
            padding: 20px 14px;
          }
          .posts > .head > h3{
            margin: 0;
            margin-left: 10px;
            margin-right: auto;
          }
          .posts > .head > a:hover {
              color: red;
          }
          .posts > .main {
            padding: 0px;
            margin: 0px auto;
            width: 800px;
            height: 220px;
          }
          .posts > .onePost {
            margin: 0px auto;
            width: 800px;
            padding: 11px 20px;
            border-bottom: 1px solid #ddd;
            padding-top: 20px;
            background-color: aliceblue;
          }
          .onePost .btn{
            margin: 0;
            padding: 0;
            outline: none;
            border: none;
            font-size: 12px;
          }
          .onePost .btn:hover{
            color: red;
          }
          .posts > .onePost > a:hover {
              color: blue;
          }
          .onePost {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
          .onePost .title {
            margin-left: 10px;
          }
          .foot{
            margin: 0px auto;
            width: 800px;
            text-align: right;
            color: rgba(49, 48, 48,.5); 
            background-color: aliceblue;
          }
          .footer{
            position: fixed;
            bottom: 0px;
            width: 100%;
            margin: 0;
            padding:10px 0px;
            text-align: center;
            background-color:#fff;
          }
          .footer > .button {
            background-color: inherit;
            outline: none;
            border: none;
            cursor: pointer;
          }
        `}</style>
    </>
  );
};
export default PostsIndex;

export const getServerSideProps: GetServerSideProps = withSession(async (context: GetServerSidePropsContext) => {
  const index = context.req.url.indexOf('?');
  const search = context.req.url.substr(index + 1);
  const query = qs.parse(search);
  const page = parseInt(query.page?.toString()) || 1;
  const currentUser = context.req.session.get('currentUser') || null;
  const connection = await getDatabaseConnection();// 第一次链接能不能用 get
  const perPage = 10;
  const [posts, count] = await connection.manager.findAndCount(Post,
    { skip: (page - 1) * perPage, take: perPage });
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