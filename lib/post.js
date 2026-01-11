import path from 'path';
import fs from 'fs';
import matter from "gray-matter";
import {remark} from "remark";
import html from "remark-html";

// posts ディレクトリへのパスを作成（プロジェクトルート + 'posts'）
// process.cwd() は Node プロセスの現在の作業ディレクトリ（プロジェクトのルートを想定）
const postsDirectory = path.join(process.cwd(), 'posts');

export function getPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(fileName => {
    // ファイル名から拡張子 .md を取り除いて id を作る
    // 正規表現 /\.md$/ は末尾の .md のみを削るため安全（例: 'my.md.file.md' -> 'my.md.file')
    const id = fileName.replace(/\.md$/, ''); // ファイル名 (id)

    // ファイル名を posts ディレクトリへ結合してフルパスを作成
    // path.join は OS に応じた区切り文字で正しく結合し、パスを正規化する
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    const matterResult = matter(fileContents);

    // idとメタデータを返す
    return{
      id,
      ...matterResult.data,
    }
  })
  return allPostsData;
}


//getStaticPathsでreturnで使うpathを取得する
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
      return {
        params: {
          id: fileName.replace(/\.md$/, ''),
        }
      }
  });
};



//idに基づいて投稿データを返す
export async function getPostData(id) {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContent = fs.readFileSync(fullPath, 'utf8');

  const matterResult = matter(fileContent);
  const blogContent = await remark()
  .use(html)
  .process(matterResult.content);
  const blogContentHTML = blogContent.toString();

  return {
    id,
    blogContentHTML,
    ...matterResult.data,
  };
}