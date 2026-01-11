import {Layout} from "../../components/Layout";
import { getAllPostIds, getPostData } from "../../lib/post";
import utilStyles from "../../styles/utils.module.css"
import Head  from "next/head";

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback:false,// 静的なパス以外でアクセスすると404エラーになる。trueの場合用意していないurlでサーバーサイド側がページを作成してくれる。
  };
}

export async function getStaticProps({params}) {// getStaticPropsはNext.js側が用意した関数。ビルド時に実行される.
  const postData = await getPostData(params.id); // 事前に投稿データを取得するための関数を呼び出す;
  return{
    props:{postData}
  }
}


export default function Post({postData}) {
  return (
    <div>
      <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
        <article>
          <h1 className={utilStyles.headingXl}>{postData.title}</h1>
          <div className={utilStyles.lightText}>{postData.date}</div>
          <div dangerouslySetInnerHTML={{__html:postData.blogContentHTML}}/>
        </article>
      </Layout>
    </div>
  );
}