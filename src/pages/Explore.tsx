import { Icon } from '@iconify/react'
import Collection_Card from '../components/Element/Collection_Card'
import Book_View from '../components/Layouts/Book_View'
import SideBar from '../components/Layouts/SideBar'
import Nav from '../components/nevigation/NavBar'
import '../Style/Global.css'
import { useEffect, useState } from 'react'
import Capsule from '../components/Element/Capsule'

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
                    <h1 className='text-2xl font-bold text-center underline underline-offset-2'>Explore</h1>
                    {/* My Creation */}
                    <h1 className='text-xl font-bold text-left px-3 mt-2'>Category</h1>
                    <div className='mx-4 border-t-2 border-black' />
                    <div className='grid grid-cols-2 gap-2 mx-2 mt-1'>
                        <Capsule label='Novel' color='red'/><Capsule label='Cartoon' color='orange'/><Capsule label='Cartoon' color='green'/>
                    </div>
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
