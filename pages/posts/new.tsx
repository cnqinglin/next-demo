import {NextPage} from 'next';
import axios from 'axios';
import {useForm} from '../../hooks/useForm';

const PostsNew: NextPage = () => {
  const { form } = useForm({
    // labelWidth:'3em',
    initFormData: {title: '', content: ''},
    fields: [
      {label: '大标题', type: 'text', key: 'title',className:'',},
      {label: '内容', type: 'textarea', key: 'content',className:'',},
    ],
    buttons: <div className='actions'><button type="submit">提交</button></div>,
    submit: {
      request: formData => axios.post(`/api/v1/posts`, formData),
      success: () => {
        window.alert('提交成功')
        window.location.href = '/posts'
      }
    }
  });
  return (
    <div className='postsNew'>
      <div className='form-wrapper'>
        {form}
      </div>
      
      <style jsx global>{`
          .form-wrapper{
            padding: 16px;
          }
          .postsNew .field-content textarea{
            height: 20em; 
            resize: none;
          }
          .postsNew .text{
            width: 4em;
          }
          .postsNew .actions {
            text-align: center;
            background-color: #ddd;
            padding: 4px 0;
          }
        `}</style>
    </div>
  );
};

export default PostsNew;