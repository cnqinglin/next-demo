import axios from "axios";
import { useForm } from "hooks/useForm";
import { getDatabaseConnection } from "lib/getDataBaseConnection";
import { NextPage, GetServerSideProps } from "next";
import { useRouter } from "next/dist/client/router";

type Props = {
    id: Number;
    post: Post;
}
const PostEdit: NextPage<Props> = (props) => {
  const router = useRouter()
    const { id , post } = props
    const { form } = useForm({
        labelWidth:'3em',
        initFormData: { title: post.title , content: post.content},
        fields: [
          {label: '大标题', type: 'text', key: 'title',className:'',},
          {label: '内容', type: 'textarea', key: 'content',className:'',},
        ],
        buttons: <div className='actions'><button type="submit">保存</button></div>,
        submit: {
            request: formData => axios.patch(`/api/v1/posts/${id}`, { ...formData,id }),
          success: () => {
            window.alert('保存成功')
            router.push('/posts');
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
export default PostEdit;

export const getServerSideProps: GetServerSideProps = async (context) => { 
    const { id } = context.params;
    const connection = await getDatabaseConnection()
    const post = await connection.manager.findOne('Post',id);
    return { 
        props: {
                id: parseInt(id.toString()),
                post:JSON.parse(JSON.stringify(post))
        }
    }
}