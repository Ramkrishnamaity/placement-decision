import React from 'react'
import {BiSolidQuoteAltLeft, BiSolidQuoteAltRight} from 'react-icons/bi'

const Card = ({data}) => {
  return (
    <div className='p-5 flex flex-col gap-3'>

        <div className='flex items-center justify-start gap-2'>
            <img
            alt='dataimag'
            src={data.image}
            className='w-[70px] h-[70px] rounded-full'
            />
            <div>
                <p className='text-richBlack text-xl'>{data.name}</p>
                <p className='text-midBlack text-sm'>{data.designation}</p>
            </div>
        </div>
        <div className='flex justify-center items-center flex-col gap-2 pb-5 text-softBlack'>
        <BiSolidQuoteAltLeft/><p className=''>{data.description}</p><BiSolidQuoteAltRight/>
        </div>

    </div>
  )
}

export default Card