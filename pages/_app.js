import '../styles/globals.css'
import styles from '../styles/myStyle.css'
import Head from 'next/head'
import 'github-markdown-css';


function MyApp({ Component, pageProps }) {
  // 可用APP 保存一些全局状态
  // const useState = {state:'qinglin'}
  return (
    <>
    <div className='body'>
      <Head>
        <meta name="viewport,width=device-width;"></meta>
        <meta name="next-head-count" />
        这是头部
        </Head>
        <div className='componentStyle'> 
            <Component {...pageProps} />
        </div>
      </div>
      <style>{`
      .body{
        position:'fixed',
        top:0,
        margin:0,
        padding:0,
        width:100,
        height:100,
      }
      .componentStyle{
        margin:0px,
        padding:0px
      }
      `}</style>
    </>
  )
}

export default MyApp
