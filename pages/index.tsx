import type { NextPage, GetServerSideProps } from 'next'
import Head from 'next/head'

import Link from 'next/link'
import HeroSection from "../components/HeroSection";
import { Collection } from "../typings"



interface Props {
    collections: Collection[];
  }


const Home = ({collections} :Props) => {

  return (
     <div className="" >
      <Head>
        <title>NFTDrop - CRYPTO APE's</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HeroSection />  
    </div>
  )
}

export default Home

  
