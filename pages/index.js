import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

import Link from 'next/link'
import {Layout,  siteTitle } from '../components/Layout'
import utilStyles from '../styles/utils.module.css'
import { getPostsData } from '../lib/post'

//SSGの場合
export async function getStaticProps() {// getStaticPropsはNext.js側が用意した関数。ビルド時に実行される.
  const allPostsData = getPostsData() // 事前に投稿データを取得するための関数を呼び出す;
  return {
    props: {allPostsData}, // コンポーネントに渡すprops
  }
}

export default function Home({allPostsData}) {// HomeコンポーネントはpropsとしてallPostsDataを受け取る。静的生成が可能となる。
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <p className={utilStyles.headingMd}>
          私はフルスタックエンジニアです/ブログを書いています。
        </p>
      </section>
      <section>
        <h2>📝エンジニアのブログ</h2>
        <div className={styles.grid}>
          {allPostsData.map((post) => {
            const {id, title, date, thumbnail} = post;
            return (
            <article key={id}>
              <Link href={`/posts/${id}`}>
                <img src={`${thumbnail}`} className={styles.thumbnailImage} />
              </Link>
              <Link href={`/posts/${id}`} className={utilStyles.boldText}>
                {title}
              </Link>
              <br />
              <small className={utilStyles.lightText}>{date}</small>
            </article>)
          })}
        </div>
      </section>
    </Layout>
  )
}
