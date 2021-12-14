import { GetServerSideProps, GetStaticProps, NextPage, GetServerSidePropsContext } from 'next';
import { useCallback, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { withSession } from 'lib/withSession';
import { User } from 'src/entity/User';
import { Form } from 'components/Form';
import { useForm } from 'hooks/useForm';

const SignIn: NextPage<{ user: User }> = (props) => {
  const { form } = useForm({
    initFormData: { username: '', password: '', },
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
    buttons: <button type="submit">登录</button>,
    submit: {
      request: formData =>
        axios.post(`/api/v1/sessions`, formData),
      message: '登陆成功！'
    },
  })

  return (
    <>
      {props.user && <div>当前登录用户为{props.user.username}</div>}
      <h1>登录</h1>
      {form}
    </>
  );
};

export default SignIn;

export const getServerSideProps: GetServerSideProps = withSession(
  async (context: GetServerSidePropsContext) => {
    // @ts-ignore
    const user = context.req.session.get('currentUser');
    return {
      props: {
        user: JSON.parse(JSON.stringify(user))
      }
    }
  })