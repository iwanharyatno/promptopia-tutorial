'use client';

import { useEffect, useState } from "react";

import Profile from "@/components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const MyProfile = ({ params }) => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const router = useRouter();

  const isOtherUser = params.id.toLowerCase() !== 'my';

  const [otherUser, setOtherUser] = useState(null);

  useEffect(() => {
    const fetchPosts = async() => {
      let userId = '';

      if (session?.user.id) userId = session?.user.id;

      if (isOtherUser) {
        userId = params.id;
        const response = await fetch(`/api/users/${userId}`);
        const data = await response.json();

        console.log(data);

        setOtherUser(data);
      }

      const response = await fetch(`/api/users/${userId}/posts`);
      const data = await response.json();

      setPosts(data || []);
    }
    if (session?.user.id) fetchPosts();
  }, [session]);

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
  };

  const handleDelete = async (post) => {
    const hasConfirmed = confirm("Are you sure to delete this post?");
    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        });

        const filteredPost = posts.filter((p) => p._id !== post._id);
        setPosts(filteredPost);
      } catch (error) {}
    }
  };

  return (
    <Profile
      name={otherUser ? otherUser.username : 'My'}
      desc={otherUser ? "Explore prompts shared by this user" : 'Welcome to your personalized profile page'}
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  )
}

export default MyProfile;