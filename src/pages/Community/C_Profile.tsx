import { useEffect, useState } from "react";
import PostBox from "../../components/Element/PostBox"
import SideBar from "../../components/Layouts/SideBar"
import { useParams } from "react-router-dom"
import Social from "../../function/Social";
import { Post, Profile } from "../../function/DeclareType";
import FatchProfiles from "../../function/FetchProfiles";

import profileStyles from "../../Style/C_Profile.module.css"

const C_Profile = () => {

  const { user_id } = useParams();

  const [post, setPost] = useState<Post[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const id: string = user_id!;
        const social = new Social();
        const profile = new FatchProfiles();
        setProfile(await profile.fetchProfile(id));
        setPost((await social.getPostsByID(id)));
        // setLoading(false);
      } catch (error) {
        console.error("Error loading post:", error);
        //  setLoading(false);
      }
    }

    loadPosts();
  }, [user_id]);

  return (
    <main className="flex-row h-screen justify-between flex p-container">
      <SideBar className='p-1 flex items-center gap-3'>
        <img src={profile?.profile_image} alt={profile?.userName} className={profileStyles.image_profile} />
        <div className="w-full px-2">
          <h1 className={profileStyles.header}>{profile?.userName}</h1>
          <p className={profileStyles.content}>{`${profile?.firstName} ${profile?.lastName}`}</p>
        </div>
        <div onClick={() => alert('follow')} className="bg-blue-500 w-[75%] text-white p-2 rounded-lg cursor-pointer">
          <h1 className="text-center">Follow</h1>
        </div>
        <div className="w-full px-2">
          <h1 className={profileStyles.header}>About Me</h1>
          <p className={profileStyles.about}>{profile?.about_me}</p>
        </div>
      </SideBar>
      <div className='flex flex-col flex-1 gap-8 py-8 px-[10%] container overflow-y-auto'>
        {post?.map((props: Post, index: number) => (
          <PostBox
            key={index}
            {...props}
            isSpoil={props?.spoil}
            username={props.profile?.userName}
            userprofile={props.profile?.profile_image}
          />
        ))}
      </div>

      <SideBar className='p-2 sticky top-0'>
        <h1 className='text-xl font-bold text-left px-3 mb-2 '>Following</h1>
      </SideBar>
    </main>
  )
}

export default C_Profile