import Book_View from '../components/Layouts/Book_View'
import Nav from '../components/nevigation/NavBar'
import '../Style/Global.css'

const Explore: JSX.ElementType = () => {
    return (
        <>
            <Nav />
            <main className="h-screen p-container overflow-y-scroll flex flex-col">
                <div className='w-full justify-center flex px-12'>
                    <ul className='filter-list flex justify-between container'>
                        <li>
                            All
                        </li>
                        <li>
                            Novel
                        </li>
                        <li>
                            Cartoon
                        </li>
                        <li>
                            Genaral
                        </li>
                        <li>
                            Other
                        </li>
                    </ul>
                </div>

                <Book_View title='New'>

                </Book_View>

                <Book_View title='Novel'>

                </Book_View>

                <Book_View title='Manga'>

                </Book_View>


            </main>
        </>

    )
}

export default Explore