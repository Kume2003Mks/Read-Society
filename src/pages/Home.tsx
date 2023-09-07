import Book_Card from '../components/Element/Book_Card'
import Nav from '../components/nevigation/NavBar'
import '../Style/Global.css'

function Home(): JSX.Element {

  return (
    <>
      <Nav />
      <main className='p-container'>
        <div className="hero-container justify-center">
          <p className="">Homu</p>
        </div>

        <div className='items-center flex px-12 mt-4 flex-col'>
          <div className='w-full flex-row flex justify-between '>
            <p className='text-xl'>Popular</p>
            <a href='#'>
              <p className='text-xl underline text-[rgb(192,85,98)]'>
                See All
              </p>
            </a>
          </div>
          <div className='w-full my-2 border-t-2 border-black' />
          <div className=' bg-slate-400 w-full p-8 h-[16rem]'>
            {/**content */}
            <Book_Card/>
          </div>
        </div>
        
      </main>

    </>
  )
}

export default Home
