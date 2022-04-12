import axios from "axios";
import { useComment } from "hooks/useComment";
import { request } from "https";
import { getDatabaseConnection } from "lib/getDataBaseConnection";
import { GetServerSideProps, NextPage } from "next";
import { useRouter } from "next/dist/client/router";
type Post = {
    id: string;
    date: string;
    title: string;
    content: string;
    htmlContent: string;
  }
type Props = {
    id: Number;
    post: Post;
}
const PostComment: NextPage<Props> = (props) => {
    const Router = useRouter()
    const { post, id } = props;
    const { form } = useComment({
        initFormData: {
            content: post.content,
            title: post.title,
            commentContent:'',
        },
        labelWidth:'5em',
        fields: [
            {
                label: '标题：',
                key: 'title',
                textIlag: false,
                className: 'biaoTi',
            },
            { label: '文章内容：', key: 'content', textIlag:false,className:''},
            {label:'评论内容：',key:'commentContent',textIlag:true,className:'neirong'},
        ],
        buttons: <div className="action"><p><button>发表评论</button></p></div>,
        submit: {
            request: formData => axios.post(`/api/v1/comments/${id}`, {...formData,id}),
            success: () => {
                console.log('成功了了')
                window.alert('发表成功!')
                console.log('发表成功id',id)
                // window.location.href = `/posts/${id}`
                Router.push(`/posts/${id}`)
            },
            fail: () => { 
                console.log('失败了')
            }
        }
    });
    return (
        <>
            <div className="wrapper">
                { form }
            </div > 
            <style jsx>
                {`
                    .wrapper{
                        display:flex;
                        justify-content:center;
                        align-items: center;
                        flex-direction: row;
                        margin: 0 auto;
                        padding:16px;
                    }
                    .warpper > .label > .neirong {
                        height: 20em; 
                        width: 100%;
                        resize: none;
                    }
                `}
            </style>
        </>
    )
}
export default PostComment;

export const getServerSideProps: GetServerSideProps = async (context) => { 
    const { id } = context.params;
    const connection = await getDatabaseConnection();
    const post = await connection.manager.findOne('Post', id);
    return {
        props: {
            id: parseInt(id.toString()),
            post: JSON.parse(JSON.stringify(post))
        }
    }
}