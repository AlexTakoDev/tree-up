import React from 'react'
import captcha from '../../assets/img/icons/logos_recaptcha.svg'

function Captcha() {
  return (
    <div className='w-full sm:w-4/5 h-24 bg-white mt-4 mb-8 flex flex-row justify-center items-center rounded-lg'>
        <input type="checkbox" id="checkCaptcha" />
        <label htmlFor='checkCaptcha' className='ml-2 mr-4'>Je ne suis pas un robot</label>
        <img src={captcha} alt='Icon-recapchat'></img>
    </div>
  )
}

export default Captcha