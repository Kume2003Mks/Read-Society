import Book_Card from '../components/Element/Book_Card'
import ImageSlider from '../components/Element/ImageSlider'
import Book_View from '../components/Layouts/Book_View'
import Nav from '../components/nevigation/NavBar'
import '../Style/Global.css'


function Home(): JSX.Element {

  return (
    <>

      <Nav />
      <main className='p-container overflow-x-hidden h-fit'>
        <div className='flex flex-col overflow-y-auto h-full'>
         
          <ImageSlider/>
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
