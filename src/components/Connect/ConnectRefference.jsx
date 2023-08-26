import Image, { StaticImageData } from 'next/image'
import React from 'react'

const ConnectRefference = ({image,url,text}) => {
  
  return (
    <div className='flex p-2'>
        <Image 
        src={image}
        alt={`${text}`}
        width={24}
        height={24}
        className='mx-5'
        />
        <a target="_blank" href={url} rel="noreferrer" className='font-medium'>{text}</a>
    </div>
  )
}

export default ConnectRefference