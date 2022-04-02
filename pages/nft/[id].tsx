import React from "react";
import { useAddress, useDisconnect, useMetamask, useNFTDrop } from "@thirdweb-dev/react";
import type { GetServerSideProps } from 'next';
import { sanityClient, urlFor } from "../../sanity";
import { Collection } from "../../typings"
import Link from "next/link";
import { useState, useEffect } from "react";
import { BigNumber } from "ethers";
import toast, { Toaster } from 'react-hot-toast';

interface Props {
    collection: Collection;
}


function NFTDropPage({ collection }: Props) {

    // Authentication

    const connectWithMetamask = useMetamask();
    const address = useAddress();
    const disconnect = useDisconnect();

    //-----

    const [claimedSupply, setClaimedSupply] = useState<number>(0);
    const [totalSupply, setTotalSupply] = useState<BigNumber>();

    const [loading, setLoading] = useState<boolean>(true);
    const [priceInEth, setPriceInEth] = useState<string>();

    const nftDrop = useNFTDrop(collection.address);

    const mintNFT = () => {

        if(!nftDrop || !address){
            return;
        }

        const quantity = 1;  // how many NFT does the waat to buy
        setLoading(true);
            
             const notification = toast.loading('Minting NFT...' , { 
                 style:{
                     background:'white',
                     color:"green",
                     fontWeight:"bolder",
                     fontSize:"17px",
                     padding:"20px",
                 }
             } )
        
         nftDrop.claimTo(address,quantity).then ( async (trxData) => {

            const reciept = trxData[0].receipt;
            const claimedTokenId =trxData[0].id;
            const claimedNFT = await  trxData[0].data();
            
            toast("Congratulation... You Successfully Minted !!" , {
                duration:8000,
                style:{
                    background:'green',
                    color:"white",
                    fontWeight:"bolder",
                    fontSize:"17px",
                    padding:"20px",
                }
            })

            console.log(reciept);
            console.log(claimedNFT);
            console.log(claimedTokenId);

        }).catch ((err) => {
            console.log(err);
            toast("Whoops... Something Went Wrong!!!" , {
                style:{
                    background:'red',
                    color:"white",
                    fontWeight:"bolder",
                    fontSize:"17px",
                    padding:"20px",
                }
            })
        })
        .finally(()=> {
            setLoading(false);
            toast.dismiss(notification);
        })
    }

    useEffect(() => {
        if (!nftDrop) {
            return;
        }

        const fetchNFTDropData = async () => {


            const claimed = await nftDrop.getAllClaimed();

            const total = await nftDrop.totalSupply();


            setClaimedSupply(claimed.length);
            setTotalSupply(total);

            setLoading(false);
        }

        fetchNFTDropData();

    }, [nftDrop])

     useEffect(() => {
        if (!nftDrop) {
            return;
        }
        const fetchPrice = async () => {
           
            const claimConditions = await nftDrop.claimConditions.getAll();
           
            setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue);
        } 

         fetchPrice();

     } ,[nftDrop])


    

    return (
        <div className="flex h-screen flex-col lg:grid lg:grid-cols-10">
            
            <Toaster position="top-center" />
            
            
            {/* left  */}
            <div className="bg-gradient-to-br from-violet-300 to-indigo-500 lg:col-span-4 pt-8 lg:pt-0">
                <div className="flex flex-col items-center justify-center  py-2 lg:min-h-screen ">
                    <div className="overflow-hidden ring-8 ring-indigo-500 rounded-xl">
                        <div className="  ">


                            <img className="w-44 rounded-xl object-cover hover:scale-150  transition duration-200 lg:h-96 lg:w-72 " src={urlFor(collection.previewImage).url()} alt={collection.nftCollectionName} />

                        </div>
                    </div>
                    <div className="p-5 text-center space-y-2 ">
                        <h1 className=" text-3xl lg:text-4xl font-bold text-indigo-200">{collection?.nftCollectionName}</h1>
                        <h2 className=" text-md lg:text-xl text-indigo-100 font-medium ">{collection?.description}</h2>
                    </div>

                </div>
            </div>

            {/* Right  */}
            <div className="flex flex-1 flex-col p-12 lg:col-span-6 bg-indigo-300/30 ">
                {/* Header  */}

                <header className=" flex items-center justify-between ">
                    <Link href="/">

                        <h1 className="w-52 cursor-pointer text-md lg:text-xl font-extralight sm:w-80  ">
                            The  {' '}
                            <span className="font-extrabold text-lg lg:text-xl text-indigo-500 underline decoration-indigo-200">
                                CRYPTO APE
                            </span>
                            {'  '}
                            NFT Market Place
                        </h1>
                    </Link>
                    <button onClick={() => address ? disconnect() : connectWithMetamask()} className="rounded-lg py-2 px-4 font-bold text-sm bg-indigo-300 text-indigo-500 hover:bg-indigo-500 hover:text-indigo-200 trasnsition duration-300 lg:px-5 lg:py-3 lg:text-base">
                        {address ? 'Disconnect Wallet' : 'Connect Wallet'}
                    </button>
                </header>

                <hr className="my-4 border-1 border-indigo-500 " />
                {address && (
                    <p className="text-center font-normal text-sm lg:text-lg my-4 text-indigo-600 "> You are Logged In with Wallet
                        {'  '}
                        <span className="text-sm lg:text-lg font-bold text-indigo-600 ml-2 bg-indigo-200 px-2 py-1 rounded-xl">

                            {address.substring(0, 5)}...
                            {address.substring(address.length - 4)}
                        </span>
                        {' '}
                    </p>
                )}

                {/* Content  */}
                <div className="mt-10 lg:mt-1 flex flex-1 flex-col items-center space-y-6 text-center lg:justify-center lg:space-y-0  ">
                    <div className="  overflow-hidden rounded-2xl mb-6">

                        <img className="w-80 object-cover rounded-2xl lg:h-[20rem] lg:w-[25rem] hover:scale-150 transition duration-200" src={urlFor(collection.mainImage).url()} alt={collection.nftCollectionName} />
                    </div>
                    <h1 className="text-3xl text-indigo-400 font-bold lg:text-4xl lg:font-extrabold ">
                        {collection?.title}
                    </h1>

                    {loading ? (
                        <p className="pt-2 lg:pt-6 text-xl text-amber-500  ">
                            <svg className="animate-spin -ml-1 mr-3 h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        </p>

                    ) : (

                        <p className="pt-2 lg:pt-6 text-xl text-indigo-700 mt-4 ">{claimedSupply}/{totalSupply?.toString()} NFT's claimed</p>

                    )}

                    {/* { loading && (
                    //    <img className=" bg-transparent h-80 w-80 object-contain" src="https://cdn.hackernoon.com/images/0*4Gzjgh9Y7Gu8KEtZ.gif" alt=" "/>
                    
                   )} */}
                </div>


                {/* Mint Button  */}


                <button onClick={mintNFT} disabled={loading || claimedSupply === totalSupply?.toNumber() || !address} className="h-16 mt-4 lg:mt-8 font-bold text-lg w-full rounded-lg bg-indigo-500 text-indigo-200 disabled:bg-indigo-200 hover:bg-indigo-200 hover:text-indigo-500 disabled:text-indigo-400 disabled:hover:text-indigo-600 transition duration-300 ">
                    {loading ?
                        (
                            <> Loading </>
                        ) : claimedSupply === totalSupply?.toNumber() ? (
                            <>SOLD OUT</>
                        ) : !address ? (
                            <>Sign In to Mint</>
                        ) : (
                            <span className="font-bold"> Mint NFT ({priceInEth} ETH) </span>
                        )}
                </button>

            </div>
        </div>
    )
}

export default NFTDropPage;




export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const query = `*[_type =="collection" && slug.current == $id][0]{
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
    const collection = await sanityClient.fetch(query, {
        id: params?.id
    });

    if (!collection.creator) {
        return {
            notFound: true,
        }
    }


    return {
        props: {
            collection
        }
    }

}