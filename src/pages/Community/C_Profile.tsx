import { useEffect, useState } from "react";
import PostBox from "../../components/Element/PostBox"
import SideBar from "../../components/Layouts/SideBar"
import { useParams } from "react-router-dom"
import Social from "../../function/Social";
import { Followers, Post, Profile } from "../../function/DeclareType";
import FatchProfiles from "../../function/FetchProfiles";

import profileStyles from "../../Style/C_Profile.module.css"
import { useAuth } from "../../function/context/AuthContext";
import { useFollow } from "../../function/context/GetFollow";
import Follower from "../../components/Element/Follower";

const C_Profile = () => {

  const { user_id } = useParams();
  const { userData, isLoggedIn } = useAuth();
  const { followingUsers } = useFollow();



  const [post, setPost] = useState<Post[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [showbtn, setshowbtn] = useState<boolean>(true);
  const [isFollowing, setIsFollowing] = useState(false);


  useEffect(() => {
    async function loadPosts() {
      try {
        const id: string = user_id!;
        const social = new Social();
        const profile = new FatchProfiles();
        setProfile(await profile.fetchProfile(id));
        if (user_id === (userData && userData.user?.uid)) {
          setshowbtn(false);
        }
        const posts = await social.getPostsByID(id);
        const sortedPosts = posts.slice().sort((a, b) => {
          if (a.timestamp && b.timestamp) {
            return b.timestamp.toMillis() - a.timestamp.toMillis();
          }
          return 0;
        });

        setPost(sortedPosts);
      } catch (error) {
        console.error("Error loading post:", error);
      }
    }

    loadPosts();

    const checkFollowStatus = async () => {
      if (userData && userData.user) {
        const social = new Social();
        const status = await social.checkFollowStatus(userData.user.uid, user_id!);
        setIsFollowing(status);
      }
    };

    checkFollowStatus();

  }, [userData, user_id]);

  const handleFollow = async () => {
    if (profile && userData && userData.user) {
      const social = new Social();
      const currentUserUid = userData.user.uid;

      try {
        if (isFollowing) {
          await social.unfollowUser(currentUserUid, user_id!);
          console.log('Successfully unfollowed user!');
        } else {
          await social.followUser(currentUserUid, user_id!);
          console.log('Successfully followed user!');
        }

        setIsFollowing(!isFollowing);
      } catch (error) {
        console.error('Error handling follow/unfollow:', error);
      }
    }
  };

  return (
    <main className="flex-row h-screen justify-between flex p-container">
      <SideBar className='p-1 flex items-center gap-3'>
        <img src={profile?.profile_image} alt={profile?.userName} className={profileStyles.image_profile} />
        <div className="w-full px-2">
          <h1 className={profileStyles.header}>{profile?.userName}</h1>
          <p className={profileStyles.content}>{`${profile?.firstName} ${profile?.lastName}`}</p>
        </div>
        {(showbtn && isLoggedIn) &&
          <div onClick={handleFollow} className={`bg-blue-500 w-[75%] text-white p-2 rounded-lg cursor-pointer`}>
            <h1 className="text-center">{isFollowing ? 'Unfollow' : 'Follow'}</h1>
          </div>
        }
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

      <SideBar className='p-2 flex gap-2'>
        <h1 className='text-xl font-bold text-left px-3 mb-2 '>Following</h1>
        {followingUsers?.map((props: Followers, index: number) => (
          <Follower key={index} uid={props.uid} image={props.profile.profile_image} name={props.profile.userName} />
        ))}
      </SideBar>
    </main>
  )
}

export default C_Profile