import {NextPage} from 'next';
import axios from 'axios';
import {useForm} from '../../hooks/useForm';

const PostsNew: NextPage = () => {
  const { form } = useForm({
    labelWidth:'3em',
    initFormData: {title: '', content: ''},
    fields: [
      {label: '大标题', type: 'text', key: 'title',className:'',},
      {label: '内容', type: 'textarea', key: 'content',className:'',},
    ],
    buttons: <div className='actions'><button type="submit" style={{
      width: '80%',
      padding: '9px',
      margin: '0 auto',
      border:'none',
      color:'#fff',
      background: '#42c02e',
      cursor: 'pointer',
      outline: 'none',
      display: 'block',
      clear: 'both',
      borderRadius:'25px',
    }}>提交</button></div>,
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
        .postsNew {
          width: 1200px;
          margin: 0 auto;
        }
          .form-wrapper{
            margin: 50px auto;
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
            padding: 4px 0;
            margin:0 400px;
          }
        `}</style>
    </div>
  );
};

export default PostsNew;