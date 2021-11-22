import '../styles/globals.css'
import styles from '../styles/myStyle.css'
import Head from 'next/head'

function MyApp({ Component, pageProps }) {
  // 可用APP 保存一些全局状态
  // const useState = {state:'qinglin'}
  return(
  <div>
      <Head>
        <meta name="viewport,width=device-width;"></meta>
        <meta name="next-head-count" />
        这是头部
      </Head>
      <Component {...pageProps}/>
  </div>)
}

export default MyApp
