import { useRouter } from "next/dist/client/router";
import { useCallback, useEffect, useState } from "react"

type Props = Boolean
export function useSet(props: Props) {
    const router = useRouter();
    useEffect(() => { 
        if (props == false) {
            props = true
        } else { 
            props = false
        }
    }, [props])

    /**操作开始**/
    const goHome = useCallback(() => {
        router.push('/')
    }, []);
    const reLogin = useCallback(() => {
        router.push('/sign_in');
    }, []);
    const reSignUp = useCallback(() => {
        router.push('/sign_up');
    }, []);
    const myComment = useCallback(() => {
        window.alert("敬请期待！")
    }, []);
    const setting = useCallback(() => { 
        router.push('/posts');
    }, [])
    
    /**操作结束**/
    const set = (
        <form>
            {props == true ? <div className="hello">
                <button className="btn" onClick={goHome}>我的主页</button>
                <button className="btn" onClick={reLogin}>重新登录</button>
                <button className="btn" onClick={reSignUp}>注册账号</button>
                <button className="btn" onClick={myComment}>我的评论</button>
                <button className="btn" onClick={setting}>设置</button>
            </div> : null}
            <style jsx>{`
                .hello{
                    text-align: left;
                    position: absolute; 
                    right: -50px;
                    top: 38px;
                    width: 100px;
                    -webkit-box-shadow: -2px 3px 9px 1px rgba(100,100,100,0.39);
-moz-box-shadow: -2px 3px 9px 1px rgba(100,100,100,0.39);
box-shadow: -2px 3px 9px 1px rgba(100,100,100,0.39);
                    background-color: aliceblue;
                    z-index: 100;
                }
                .btn{
                    background-color: inherit;
                    width: 100%;
                    border: none;
                    outline: none;
                    margin-top: 10px;
                }
                .hello:last-child{
                    padding-bottom: 10px;
                }
                .btn:hover{
                    background: rgba(122,113,122,0.39);
                }
            `}</style>
        </form>
    )
    return {
        set:set
    }
};