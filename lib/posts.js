import fs from "fs";
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "posts")

export function getSortedPostsData() {
  const allPostsData = fs.readdirSync(postsDirectory).map((fileName) => {
    const fileContents = fs.readFileSync(path.join(postsDirectory, fileName), "utf8")
    const matterResult = matter(fileContents)

    return {
      id:fileName.replace(/\.md$/, "")
      ,...matterResult.data
    }
  })

  return allPostsData.sort((a, b) => a.date < b.date ? 1 : -1)
}

export function getAllPostIds() {
  return fs.readdirSync(postsDirectory).map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      }
    }
  })
}

export function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id
  return {
    id,
    ...matterResult.data,
  };
}
