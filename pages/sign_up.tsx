import { NextPage } from 'next';
import { useCallback, useState } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Form } from 'components/Form';
import { useForm } from 'hooks/useForm';
import { useRouter } from 'next/dist/client/router';


const SignUp: NextPage = () => {
  const login = useCallback(() => {
    router.push('/sign_in')
  }, []);
  const router = useRouter()
  const { form, setErrors } = useForm({
    labelWidth: '7em',
    initFormData: {
      username: '',
      password: '',
      passwordConfirmation: ''
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
      },
      {
        label: '确认密码：',
        type: 'password',
        key: 'passwordConfirmation',
      }
    ],
    buttons: <button type='submit' style={{
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
    }}> 注册</button >,
    submit: {
      request: formData => axios.post(`/api/v1/users`, formData),
      success: () => { window.alert('注册成功！'); }
    }
  })

  return (
    <div>
      <div className='wrap' style={{margin:'60px auto'}}>
        <div className='tab'>
          <div className='signUp'><button style={{
            border: 'none',
            backgroundColor: 'inherit',
            fontSize: 26,
            fontWeight: 300,
            color: 'gray',
          }} onClick={login}>登录</button></div>
          {router.pathname == '/sign_up' && <div className='signUp'><button style={{
            border: 'none',
            backgroundColor: 'inherit',
            paddingBottom: '15px',
            borderBottom: '2px solid red',
            fontSize: 26,
            fontWeight: 500,
          }}>注册</button></div>}
        </div>
        {form}
      </div>
      <style jsx>{`
          .wrap {
            position: relative;
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
           width: 30%;
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

export default SignUp;