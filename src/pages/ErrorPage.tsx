import { Link } from "react-router-dom"

const ErrorPage: JSX.ElementType = () => {
  return (
    <div className='flex flex-1 justify-center content-center items-center h-screen flex-col dark:bg-gradient-to-r from-slate-900 to-sky-950'>
     <h1 className='uppercase text-2xl dark:text-white '>Page Not Found</h1> 
      <Link to='/' className='text-red-600 text-base underline underline-offset-4'>Go Home</Link>
    </div>
  )
}

export default ErrorPage