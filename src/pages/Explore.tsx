import Collection_Card from '../components/Element/Collection_Card'
import SideBar from '../components/Layouts/SideBar'
import '../Style/Global.css'
import { useEffect, useState } from 'react'
import Capsule from '../components/Element/Capsule'
import getdata from '../function/test/getdata'

const Explore: JSX.ElementType = () => {

    const [data, setdata] = useState([])

    async function fatchtest() {
        let test:any = await getdata();
        setdata(test)
    }

    useEffect(() => {
        fatchtest()
    }, [])

    return (
        <>
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
