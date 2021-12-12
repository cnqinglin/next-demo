import axios, { AxiosResponse } from "axios";
import { Form } from "components/Form";
import { NextPage } from "next";
import { useCallback, useState } from "react";

const PostsNew: NextPage = () => {

    const [formData, setFormData] = useState({
        title: '',
        content: '',
        // passwordConfirmation: ''
      });
      const [errors, setErrors] = useState({
        title: [], content: [],
        // passwordConfirmation: []
      });
      const onChange = useCallback((key, value) =>
        setFormData({
          ...formData,
          [key] : value
        })
        , [formData]);
      const onSubmit = useCallback((e) => {
        e.preventDefault();
        axios.post(`/api/v1/posts`, formData)
          .then(() => {
            window.alert('提交成功！')
            setErrors({
              title: [], content: [],
              // passwordConfirmation: []
            });
            // window.location.href = '/sign_in';
          }, (error) => {
            if (error.response) {
              const response: AxiosResponse = error.response;
              if (response.status === 422) {
                setErrors(response.data);
              }
            }
          }).catch(res => {
            console.log('resresres', res)
          });
      }, [formData]);

    return (
        < div>
            <Form
        fields={[
          {
            label: '标题:',
                type: 'text',
                value:formData.title,
            onChange: e => onChange('username',e.target.value),
            errors: errors.title
          }, {
            label: '内容：',
                type: 'textarea',
                value:formData.content,
            onChange: e => onChange('password',e.target.value),
            errors: errors.content,
          }
        ]}
        onSubmit={onSubmit}
        buttons={
          <><button type="submit">提交</button>
        </>}/>
        </div >
    )
}

export default PostsNew;