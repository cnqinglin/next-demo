import { GetServerSideProps, GetStaticProps, NextPage, GetServerSidePropsContext } from 'next';
import { useCallback, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { withSession } from 'lib/withSession';
import { User } from 'src/entity/User';
import { Form } from 'components/Form';
import { useForm } from 'hooks/useForm';
import { useRouter } from 'next/dist/client/router';
import { log } from 'console';
import { getDatabaseConnection } from 'lib/getDataBaseConnection';
import md5 from 'md5';
import { type } from 'os';
const queryString = require('query-string');


const SignIn: NextPage<{ user: User }> = (props) => {
  console.log('props.user23333',props.user);
  
  const router = useRouter();
  const registe = useCallback(() => {
    router.push('/sign_up')
  }, []);
  const { form } = useForm({
    labelWidth: '7em',
    initFormData: {
      username: props.user.username ? props.user.username : '',
      password: '',
    },
    fields: [
      {
        label: '用户名:',
        type: 'text',
        key: 'username',
      }, {
        label: '密码：',
        type: 'password',
        key: 'password',
      }
    ],
    buttons: <button type="submit" style={{
      width: '80%',
      padding: '9px',
      margin: '0 auto',
      border: 'none',
      color: '#fff',
      background: '#42c02e',
      cursor: 'pointer',
      outline: 'none',
      display: 'block',
      clear: 'both',
      borderRadius: '25px',
    }}>登录</button>,
    submit: {
      request: formData =>
        axios.post(`/api/v1/sessions`, formData),
      success: () => {
        window.alert('登录成功。。。。，是否跳转博客主页')
        // const qurey = queryString.parse(location.search);
        // window.location.href = qurey.return_to.toString();
        // window.location.href = qurey.return_to;

        // const query = queryString.parse(window.location.search.substr(1));
        // window.location.href = query.returnTo?.toString();

        router.push('/posts')

      }
    },
  })

  return (
    <div>
      <div className='wrap' style={{ margin: '60px auto' }}>
        {props.user && <div>当前登录用户为{props.user.username}</div>}
        <div className='tab'>
          <div className='signUp'><button style={{
            border: 'none',
            backgroundColor: 'inherit',
            paddingBottom: '15px',
            borderBottom: '2px solid red',
            fontSize: 26,
            fontWeight: 500,
          }}>登录</button></div>
          {router.pathname == '/sign_in' && <div className='signUp'><button style={{
            border: 'none',
            backgroundColor: 'inherit',
            fontSize: 26,
            fontWeight: 300,
            color: 'gray',
          }} onClick={registe}>注册</button></div>}
        </div>
        {form}
      </div>
      <style jsx>{`
          .wrap {
              width: 40%;
              padding: 40px 40px;
              background-color: #fff;
              border-radius: 4px;
              box-shadow: 0 0 8px rgb(0 0 0 / 10%);
          }
          .tab{
            display: flex;
            flex-direction: row;
            justify-content: space-around;
         }
         .tab > .login{
           width: 50%;
         }
         .tab > .signUp {
           text-align: center;
           width: 50%;
           padding: 10px 0;
           font-size: 26px;
         }
        `}</style>
    </div>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get('currentUser');
    // console.log('用户信息password', user);
    return {
      props: {
        user: JSON.parse(JSON.stringify(user || '')),
      }
    }
  })