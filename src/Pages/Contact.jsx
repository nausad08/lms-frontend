import { useState } from 'react'
import HomeLayout from '../Layouts/HomeLayout'
import toast from 'react-hot-toast';

const Contact = () => {

  const [userInput, setUserInput] = useState({
    name:"",
    email:"",
    message:""
  })
  function handleInputChange (e){
    const{name,value} = e.target;
    console.log(name);
    setUserInput({
      ...userInput,[name]:value
    })

  }
  const onFromSubmit = async (e)=>{
    e.preventDefault();
    if(!userInput.name || !userInput.email || !userInput.message ){
      toast.error("All fields are required")
      return;
    }

  }

  return (
    <HomeLayout>
      <div className='flex items-center justify-center h-[100vh]'>
        <form
         onSubmit={onFromSubmit}
         noValidate
         className='flex flex-col items-center justify-center gap-2 p-5 rounded-md text-white shadow-[0_0_10px_black] w-[22rem]'>
          <h1 className='text-3xl font-semibold'>
            Contact Form
          </h1>
          <div className='flex flex-col w-full gap-1'>
            <label htmlFor='name' className='text-xl font-semibold'>
              Name
            </label>
            <input className='bg-transparent border px-2 py-1 rounded-sm'
            id='name'
            name='name'
            type='text'
            placeholder='Enter your name'
            value={userInput.name}
            onChange={handleInputChange} />
          </div>
          <div className='flex flex-col w-full gap-1'>
            <label htmlFor='email' className='text-xl font-semibold'>
              Email 
            </label>
            <input className='bg-transparent border px-2 py-1 rounded-sm'
            id='email'
            name='email'
            type='email'
            placeholder='Enter your email'
            value={userInput.email}
            onChange={handleInputChange} />
          </div>

          <div className='flex flex-col w-full gap-1'>
            <label htmlFor='message' className='text-xl font-semibold'>
              Messsage
            </label>
            <textarea className='bg-transparent border px-2 py-1 rounded-sm h-40 resize-none'
            id='message'
            name='message'
            type='message'
            placeholder='Enter your message...'
            value={userInput.message}
            onChange={handleInputChange} />
          </div>

          <button type='submit'
           className='w-full bg-yellow-600 hover:bg-yellow-400 cursor-pointer transition-all ease-in-out duration-300 p-4 rounded-lg font-semibold text-lg '>
            Submit
          </button>

        </form>
      </div>
    </HomeLayout>
  )
}

export default Contact
