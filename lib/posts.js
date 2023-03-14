import fs from "fs";
import path from "path"
import matter from "gray-matter"
import { remark } from "remark";
import remarkHtml from "remark-html"
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

export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const matterResult = matter(fileContents);
  const processedContent = await remark().use(remarkHtml).process(matterResult.content);
  const contentHtml = processedContent.toString();
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
