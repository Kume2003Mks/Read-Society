import { Icon } from "@iconify/react"
import PostBox from "../../../components/Element/PostBox"
import SideBar from "../../../components/Layouts/SideBar"


const Profile = () => {
  return (
    <>
    <main className="flex-row h-screen justify-between flex p-container">
        <SideBar className='p-1'>
            <img src="" alt="" />
            <h1>About Me</h1>
        </SideBar>
        <div className='flex flex-col flex-1 gap-8 py-8 px-[10%] container overflow-y-auto'>
            <PostBox content='{faketext}' img_link='https://images.pexels.com/photos/18355606/pexels-photo-18355606/free-photo-of-e-commerce-banner-photo.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'/>
        </div>

        <SideBar className='p-2 sticky top-0'>
            <h1 className='text-xl font-bold text-left px-3 mb-2 '>Following</h1>
        </SideBar>
    </main>
</>
  )
}

export default Profile