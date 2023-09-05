import Book_View from '../components/Layouts/Book_View'
import Nav from '../components/nevigation/NavBar'

const Explore: JSX.ElementType = () => {
    return (
        <>
            <Nav />
            <main className="h-screen pt-[8vh] overflow-auto flex flex-col">
            
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