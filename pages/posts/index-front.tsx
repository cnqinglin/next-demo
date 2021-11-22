import { NextPage } from "next";
import { usePosts } from "../../hooks/usePosts";
const PostIndex: NextPage = () => {
    const { posts,isLoading, isEmpty} = usePosts()
    return (
        <div>
            {
                isLoading ? <p> 加載中...</p> : isEmpty ? <div>empty</div> : posts.map(item => <div key={ item.id}>{item}</div>)
            }
        </div>
    )
}


const getStaticProps = () => {
        
}

export default PostIndex