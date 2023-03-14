import fs from "fs";
import path from "path"
import matter from "gray-matter"

const postsDirectory = path.join(process.cwd(), "posts")

export default function getSortedPostsData() {
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
