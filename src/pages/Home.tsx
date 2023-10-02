import Book_Card from '../components/Element/Book_Card'
import Book_View from '../components/Layouts/Book_View'
import '../Style/Global.css'

function Home(): JSX.Element {

  return (
    <>
      <main className='p-container overflow-x-hidden h-fit'>
        <div className='flex flex-col overflow-y-auto h-full'>
        <div className="hero-container justify-center">
          <p className="">Homu</p>
        </div>

        <Book_View title='Popular' className='grid-row-layout snap-both'>
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
        </Book_View>

        <Book_View title='New Arrival' className='grid-row-layout snap-both'>
        <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
        </Book_View>
        <Book_View title='Other' className='grid-layout'>
        <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
          <Book_Card />
        </Book_View>
        </div>
        

      </main>

    </>
  )
}

export default Home
