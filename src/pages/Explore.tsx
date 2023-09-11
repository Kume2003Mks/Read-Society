import { Icon } from '@iconify/react'
import Collection_Card from '../components/Element/Collection_Card'
import Book_View from '../components/Layouts/Book_View'
import SideBar from '../components/Layouts/SideBar'
import Nav from '../components/nevigation/NavBar'
import '../Style/Global.css'
import { useEffect, useState } from 'react'

const Explore: JSX.ElementType = () => {


    const [data, setdata] = useState([])
    const fetchdata = async () => {
        try {
            const res = await fetch("https://example-data.draftbit.com/books?_limit=33")
            const convert = await res.json()
            setdata(convert)
            console.log(convert)
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchdata();
    }, [])


    return (
        <>
            <Nav />
            <main className="flex-row justify-between flex-wrap flex h-screen p-container">
                <SideBar className='bg-white p-2'>
                    <h1 className='text-2xl font-bold text-center'>Explore</h1>
                    {/* My Creation */}
                    <div className='m-4 border-t-2 border-black' />
                    <h1 className='text-xl font-bold text-left px-3 mb-2'>Category</h1>
                </SideBar>
                <div className='grid-layout h-full flex-1 p-4'>
                    {data?.map((val: any) => (
                        <Collection_Card key={val.id} props={val} className='bg-slate-200 rounded-lg hover:bg-slate-300' />
                    ))}
                </div>
            </main>
        </>

    )
}

export default Explore

const classStyle = {
    MainScreen: 'flex-row justify-between flex-wrap flex h-screen p-container',
    Link_Btn: 'text-base text-center flex flex-row flex-wrap justify-between p-2',
}