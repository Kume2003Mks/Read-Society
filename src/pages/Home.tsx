import Book_Card from '../components/Element/Book_Card'
import Book_View from '../components/Layouts/Book_View'
import Book_CardTT from '../components/Element/Book_cardTT'
import Nav from '../components/nevigation/NavBar'
import '../Style/Global.css'

function Home(): JSX.Element {

  return (
    <>
      <Nav />
      <main className='p-container overflow-x-hidden h-fit'>
        <div className='flex flex-col overflow-y-auto h-full'>
        <div className="hero-container justify-center">
          <p className="">Homu</p>
        </div>

        <Book_View title='Popular' className='grid-row-layout snap-both'>
          <Book_CardTT TTT='Nocel' BCT='The Fool' BCT1='FanPendleton' IMGT='https://i.pinimg.com/564x/00/11/bc/0011bc9e313292c3fe3b706f9b345a08.jpg'/>
          <Book_CardTT TTT='Nocel' BCT='The Empress' BCT1='FanPendleton' IMGT='https://i.pinimg.com/564x/49/99/d4/4999d49d6f6f9bb6910815e84aae31bc.jpg'/>
          <Book_CardTT TTT='Cartoon' BCT='JoJoLand' BCT1='Hirohiko Araki' IMGT='https://static.jojowiki.com/images/thumb/0/00/latest/20230816103048/Volume_132.jpg/1200px-Volume_132.jpg'/>
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
        <Book_CardTT TTT='Nocel' BCT='The Fool' BCT1='FanPendleton' IMGT='https://i.pinimg.com/564x/00/11/bc/0011bc9e313292c3fe3b706f9b345a08.jpg'/>
          <Book_CardTT TTT='Nocel' BCT='The Empress' BCT1='FanPendleton' IMGT='https://i.pinimg.com/564x/49/99/d4/4999d49d6f6f9bb6910815e84aae31bc.jpg'/>
          <Book_CardTT TTT='Cartoon' BCT='JoJoLand' BCT1='Hirohiko Araki' IMGT='https://static.jojowiki.com/images/thumb/0/00/latest/20230816103048/Volume_132.jpg/1200px-Volume_132.jpg'/>
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
        <Book_CardTT TTT='Nocel' color='#FF0000' BCT='The Fool' BCT1='FanPendleton' IMGT='https://i.pinimg.com/564x/00/11/bc/0011bc9e313292c3fe3b706f9b345a08.jpg'/>
          <Book_CardTT TTT='Nocel' BCT='The Empress' BCT1='FanPendleton' IMGT='https://i.pinimg.com/564x/49/99/d4/4999d49d6f6f9bb6910815e84aae31bc.jpg'/>
          <Book_CardTT TTT='Cartoon' BCT='JoJoLand' BCT1='Hirohiko Araki' IMGT='https://static.jojowiki.com/images/thumb/0/00/latest/20230816103048/Volume_132.jpg/1200px-Volume_132.jpg'/>
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
