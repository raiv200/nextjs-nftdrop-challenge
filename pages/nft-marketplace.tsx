import type { GetServerSideProps } from 'next'
import Link from 'next/link'
import { Collection } from "../typings"
import { sanityClient, urlFor } from "../sanity";



interface Props {
  collections: Collection[];
}


function NFTMarketplace({ collections }: Props) {
  return (
    <div className="bg-gradient-to-br from-violet-300 to-indigo-400 mx-auto min-h-screen max-w-8xl flex flex-col py-10 px-2 lg:py-8 lg:px-0">
      <header className=" text-white flex items-center justify-between text-center ">
        <h1 className=" text-indigo-100 hover:text-indigo-500  uppercase text-2xl lg:text-5xl mb-10 lg:mb-4 font-semibold mx-auto  ">
          {' '}
          <span className="font-bold block mb-1 text-3xl lg:text-4xl text-indigo-500  decoration-indigo-200 bg-indigo-200 py-1 rounded-lg mx-auto w-[16rem]">
            CRYPTO-APE
          </span>
          {'  '}
          NFT Market Place
        </h1>
      </header>

      <main className="bg-gradient-to-br from-violet-300 to-indigo-400 px-4 pt-8 pb-4 shadow-md rounded-lg  shadow-purple-700 mx-1 lg:mx-4">
        <div className=" flex flex-col md:grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 s ">
          {collections.map((collection) => (
            <Link href={`/nft/${collection.slug.current}`} >
              <div className="flex flex-col items-center cursor-pointer mb-4 px-4 py-2 shadow-xl rounded-xl hover:shadow-2xl hover:shadow-violet-700" key={collection.slug.current}>
                <div className="overflow-hidden rounded-md ring-[6px] ring-indigo-500 mb-4 lg:mb-2">
                  <img className=" h-64 w-[20rem] lg:h-[22rem] lg:w-60 object-cover transition duration-300 hover:scale-150 hover:shadow-2xl rounded-md hover:rotate-12" src={urlFor(collection.mainImage)?.url()} alt="" />
                </div>
                <div className="">
                  <h2 className=" text-md lg:text-lg text-center font-semibold text-indigo-700   hover:bg-indigo-400 hover:text-indigo-100 transition duration-300  bg-indigo-200 px-4 py-2 rounded-2xl mt-2">{collection.title}</h2>
                  <p className="mt-2 text-center text-sm text-indigo-100 font-medium">{collection.description}</p>
                </div>

              </div>
            </Link>
          ))
          }

        </div>
      </main>
    </div>

  )
}

export default NFTMarketplace;



export const getServerSideProps: GetServerSideProps = async () => {

  const query = `*[_type =="collection"]{
    _id,
    title,
    address,
    description,
    nftCollectionName, 
    mainImage{
        asset
    },
    previewImage{
       asset
    },
    slug {
      current
    },
    creator-> {
      _id,
      name,
      address,
      slug{
        current
      },
    },
  }
`
  const collections = await sanityClient.fetch(query);


  return {
    props: {
      collections
    }
  }
}
