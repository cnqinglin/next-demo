import axios, { AxiosError, AxiosResponse } from "axios";
import { NextPage } from "next";
import { stringify } from "querystring";
import { useCallback, useState } from "react";

const SignUp: NextPage = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirmation: ''
    })

    const [errors, setErrors] = useState({
        username: [],
        password: [],
        passwordConfirmation: []
    })

    const onSubmit = useCallback((e) => {
        e.preventDefault();
        axios.post('api/v1/users', formData).then((res) => { console.log('res', res) }, (error) => {
            if (error.response) {
                const responses: AxiosResponse = error.response;
                if (responses.status === 422) {
                    setErrors({ ...errors, ...responses.data})
                }
            }
        }).catch((err) => { console.log('出错了'), err })
    }, [formData]);
    return (
        <div>
            <div>
                <h1>注册</h1>
                <hr />
                <label>用户名：<input type="text" value={formData.username} onChange={e => {
                    setFormData({
                        ...formData,
                        username: e.target.value
                    })
                }} /></label>
                {errors.username?.length > 0 && <div>{errors.username.join(',')}</div>}
            </div>
            <div><label>密码：<input type="password" value={formData.password} onChange={e => {
                setFormData({
                    ...formData,
                    password: e.target.value
                })
            }} /></label>
                {errors.password?.length > 0 && <div>{errors.password.join(',')}</div>}
            </div>
            <div><label>重置密码：<input type="password" value={formData.passwordConfirmation} onChange={e => {
                setFormData({
                    ...formData,
                    passwordConfirmation: e.target.value
                })
            }} /></label>
                {errors.passwordConfirmation?.length > 0 && <div>{errors.passwordConfirmation}</div>}
            </div>
            <button onClick={onSubmit}>注册</button>
        </div>
    )
}
export default SignUp