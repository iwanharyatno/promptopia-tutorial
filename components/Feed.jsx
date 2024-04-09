'use client';

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { useDebouncedCallback } from 'use-debounce';

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}

const Feed = () => {
  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  useEffect(useDebouncedCallback(() => {
    const fetchPosts = async() => {
      const response = await fetch(`/api/prompt?q=${searchText}`);
      const data = await response.json();

      setPosts(data);
    }
    fetchPosts();
  }, 300), [searchText]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username..."
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer" />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={(tag) => {
          setSearchText(tag);
        }}
      />
    </section>
  )
}

export default Feed;