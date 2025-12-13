import React from "react";
import styles from "./PostCard.module.css";
import { Post } from "../../types/post";

interface Props {
  post: Post;
}

const PostCard: React.FC<Props> = ({ post }) => {
  return (
    <div className={styles.card}>
      <img src={post.image} alt={post.title} className={styles.image} />

      <div className={styles.content}>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.description}>{post.shortDescription}</p>

        <div className={styles.category}>
          Категория: {post.category.name}
        </div>

        <div className={styles.tags}>
          {post.tags.map((tag) => (
            <span key={tag.id} className={styles.tag}>
              #{tag.name}
            </span>
          ))}
        </div>

        <div className={styles.date}>{post.createdAt}</div>
      </div>
    </div>
  );
};

export default PostCard;
