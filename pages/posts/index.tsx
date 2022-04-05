import {GetServerSideProps, GetServerSidePropsContext, NextPage} from 'next';
import {UAParser} from 'ua-parser-js';
import {Post} from 'src/entity/Post';
import Link from 'next/link';
import qs from 'querystring';
import {usePager} from '../../hooks/usePager';
import { getDatabaseConnection } from 'lib/getDataBaseConnection';
import { useCallback } from 'react';
import { withSession } from 'lib/withSession'
import axios from 'axios';
import { useRouter } from 'next/dist/client/router';
// import pn from '/assets/images/1.png'
import Image from 'next/image'
import { log } from 'console';

type Props = {
  posts: Post[];
  count: number;
  perPage: number;
  page: number;
  totalPage: number;
  currentUser: number | null;
}
const PostsIndex: NextPage<Props> = (props) => {
  const { posts, count, page, totalPage, currentUser } = props;  
  const { pager } = usePager({ page, totalPage });
  const router = useRouter()
  let active:Boolean = false
  console.log('111');
  
  const set = () => useCallback(() => { 
    console.log('222');
    active = true
    console.log('333');
  },[active])
  const deleteBlog = (id:Number) => useCallback(() => {
    axios.delete(`/api/v1/posts/${id}`).then(
      () => {
        window.alert('删除成功');
        // router.push('/posts')
        let index:number
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
  }, [id])

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
          <button onClick={set} className='set' style={{
            backgroundColor: 'inherit',
            borderColor:'inherit',  
            verticalAlign:'middle',
            padding:'0px',
            width: '0px',
            height: '0px',
            borderTop: '10px solid black',
            borderRight: '10px solid transparent',
            borderLeft: '10px solid transparent',
            borderBottom: '10px solid transparent',
          }}></button>
          {active && <div style={{width:'20px',height:'20px'}}>你好</div>}
        </a>
      </div>
      <div className="posts">
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
        <span className="bottomSt"></span>
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
            <button className='btn' onClick={deleteBlog(post.id) }>删除</button>
          </div>
        </div>
      )}
        <footer className='foot'>
        {pager}
      </footer>
      </div>
      <style jsx>{`
        .frame {
          margin: 0;
          padding: 14px 100px 16px 80px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgb(238,174,202);
          background: radial-gradient(circle, 
            rgba(238,174,202,1) 4%, 
            rgba(153,148,233,0.6054796918767507) 78%);
        }
        .frame > menu{
          font-size: 12px;
        }
        .frame > .right > .pic {
          position: relative;
        }
        .frame > .right > .set {
          margin-top: -30px;  
        }
          .posts {
            height: 100vh;
            max-width: 800px;
            margin: 0 auto;
            padding: 16px;
            position: relative;
            background-color: aliceblue;
          }
          .posts > .head {
            display: flex;
            justify-content:center;
            align-items: center;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 4px solid rgb(201, 199, 199);
          }
          .posts > .bottomSt{
            position: absolute;
            top: 42px;
            width: 13%;
            height: 20px;
            border-bottom: 4px solid black;
          }
          .posts > .head > h3{
            margin: 0;
            margin-left: 10px;
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
            text-align: right;
            color: rgba(49, 48, 48,.5); 
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
  const perPage = 4;
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