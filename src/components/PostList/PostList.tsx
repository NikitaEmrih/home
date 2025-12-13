import React from "react";
import styles from "./PostList.module.css";


import { posts } from "../../data/posts";
import { tags } from "../../data/tags";
import PostCard from "../PostCard/PostCard";

const PostList: React.FC = () => {
  return (
    <div className={styles.wrapper}>
   
      <div className={styles.filters}>
        <h3>Фильтры</h3>
        <div className={styles.tagsBlock}>
          {tags.map(tag => (
            <button key={tag.id} className={styles.tagBtn}>
              {tag.name}
            </button>
          ))}
        </div>
      </div>

     
      <div className={styles.list}>
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default PostList;
