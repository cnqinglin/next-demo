import React, { useCallback } from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Img from 'next/image'
// import png from 'assets/images/1.png'


function About() {

    const clickMe = useCallback(() => {
    }, [])

    return (
        <div>
            <main>
                <button onClick={clickMe}>点击</button>
                {/* <img src={png} alt="图片"></img> */}
            </main>
            <style jsx> {`
                   button{
                       color:blue;
                       font-size:8px;                    
                    }
                `}</style>
        </div>   
    )
  }
  
export default About