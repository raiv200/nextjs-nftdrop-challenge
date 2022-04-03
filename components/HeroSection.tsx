import Link from 'next/link'
import React from 'react'


const style = {
  wrapper: `relative`,
  container: `before:content-[''] before:bg-indigo-400 before:absolute before:top-0 before:left-0 before:right-0 before:bottom-0 before:bg-[url('https://links.papareact.com/bdy')] before:bg-cover before:bg-center before:opacity-40 before:blur`,
  contentWrapper: `flex flex-col  lg:flex-row h-screen relative justify-center lg:justify-evenly items-center lg:space-x-4 `,
  copyContainer: `px-8  lg:pt-0 lg:px-20 lg:w-[45rem] lg:px-0 space-y-6 mb-10  flex flex-col items-center lg:items-start `,
  title: `relative text-3xl lg:text-7xl text-indigo-500 font-bold text-center lg:flex lg:text-left`,
  description: `text-gray-600 container-[400px] text-md lg:text-xl mt-[0.8rem] mb-[2.5rem] text-center lg:flex`,
  ctaContainer: `flex`,
  accentedButton: ` relative animate-pulse text-lg font-semibold px-12 py-4  rounded-lg lg:mr-5 bg-indigo-500 text-indigo-100 hover:bg-indigo-300 hover:text-indigo-500 transition duration-300 ease-in cursor-pointer`,
  button: ` relative text-lg font-semibold px-12 py-4 bg-[#363840] rounded-lg lg:mr-5 text-[#e4e8ea] hover:bg-[#4c505c] cursor-pointer`,
  cardContainer: ` flex animate-bounce `,
}

const HeroSection = () => {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <div className={style.contentWrapper}>
          <div className={style.copyContainer}>
            <div className={style.title}>
              Discover, collect, and sell extraordinary NFTs.
            </div>
            <div className={style.description}>
              NFT marketplace to buy amazing CRYPTO APE's NFT's.
            </div>
            <div className={style.ctaContainer}>
              <Link href="/nft-marketplace">
                <button className={style.accentedButton}>Explore</button>
              </Link>
            </div>
          </div>
          <div className={style.cardContainer}>
            <div className="overflow-hidden rounded-xl ">
              <div className="rounded-xl bg-gradient-to-br from-violet-800 to-indigo-400 transition duration-300 ease-in-out hover:scale-150 hover:rounded-2xl ">
                <img
                  className="w-[20rem] h-[15rem] rounded-xl object-cover p-2 lg:h-96 lg:w-80 "
                  src="https://links.papareact.com/bdy"
                  alt=""
                />
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSection
