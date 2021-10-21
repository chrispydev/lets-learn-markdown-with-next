import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Head from "next/head";

import { sortByDate } from "../utils/index";
import Post from "../components/Post";

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Bev Blog</title>
      </Head>
      <div className='posts'>
        {posts.map((post, index) => (
          <Post post={post} key={index} />
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  // get files from the post directory
  const files = fs.readdirSync(path.join("posts"));

  // get slog in frontmatter from post
  const posts = files.map((filesname) => {
    // create slug
    const slug = filesname.replace(".md", "");

    // get frontmatter
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filesname),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate),
    },
  };
}
