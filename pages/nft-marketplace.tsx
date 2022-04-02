import type { GetServerSideProps } from 'next'
import Link from 'next/link'
import { Collection } from "../typings"
import { sanityClient, urlFor } from "../sanity";



interface Props {
  collections: Collection[];
}


function NFTMarketplace({ collections }: Props) {
  return (
    <div className=" mx-auto min-h-screen max-w-[1300px] flex flex-col py-10 px-2 lg:py- lg:px-0">
      <header className=" flex items-center justify-between ">
        <h1 className=" text-2xl lg:text-3xl mb-10 lg:mb-8 font-semibold mx-auto ">
          The  {' '}
          <span className="font-extrabold text-3xl lg:text-4xl text-indigo-500 underline decoration-indigo-200">
            CRYPTO-APE
          </span>
          {'  '}
          NFT Market Place
        </h1>
      </header>

      <main className="bg-gradient-to-br from-rose-300 to-indigo-400 px-10 pt-8 shadow-lg rounded-2xl shadow-indigo-500 mx-10">
        <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 ">
          {collections.map((collection) => (
            <Link href={`/nft/${collection.slug.current}`} >
              <div className="flex flex-col items-center cursor-pointer mb-4  " key={collection.slug.current}>
                <div className="overflow-hidden rounded-2xl ring-[8px] ring-indigo-500 mb-4 lg:mb-2">
                  <img className=" h-64 w-60 lg:h-96 lg:w-60 object-cover transition duration-300 hover:scale-150 rounded-2xl" src={urlFor(collection.mainImage)?.url()} alt="" />
                </div>
                <div className="">
                  <h2 className=" text-md lg:text-2xl text-center font-semibold text-indigo-700 py-3 ">{collection.title}</h2>
                  <p className="mt-2 text-sm  text-indigo-500 font-medium hover:bg-indigo-400 hover:text-indigo-100 transition duration-300  bg-indigo-200 px-4 py-2 rounded-2xl">{collection.description}</p>
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
