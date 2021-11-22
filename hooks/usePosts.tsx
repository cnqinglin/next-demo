// 自定義kook
import { useEffect, useState } from "react";
import axios from "axios";
// 自己声明一个类型
type Posts = {
    id: string;
    title: string;
    date: string;
}

export const usePosts = () => {
    // 使用useState hook
    const [posts, setPosts] = useState<Posts[]>([]) // useState 後面的是聲明類型，類型是符合Posts 格式的數組
    const [isLoading, setIsLoading] = useState<Boolean>(false)
    const [isEmpty, setIsEmpty] = useState<Boolean>(false)


    // 使用 effect hook
    useEffect(() => {
        setIsLoading(true)
        axios.get('api/v1/posts').then((res) => {
            setPosts(res.data)
            setIsLoading(false)
            if (res.data.length === 0) {
                setIsEmpty(true)
            } else {
                setIsEmpty(false)
            }
        }).catch((err) => {
            setIsLoading(false)
        })
        // 可以返回一個清除effect hook 的方法
        // return () => {
        // }
    }, [])   // 第一次渲染的時候請求，後面不加空數組就是默認每次都要請求

    return {
        posts,setPosts,isLoading,setIsLoading, isEmpty,setIsEmpty
    }
}