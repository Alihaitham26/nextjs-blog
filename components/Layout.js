import Head from 'next/head';
import Image from 'next/image';
import styles from './styles/Layout.module.css';
import utilStyles from '../styles/utils.module.css';
import Link from 'next/link';


const name = "ali haitham";
export const siteTitle = "Next.js Sample Website";

export default function Layout({children,home=false}){
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="Learn how to build a personal website using Next.js" />
        <title>{siteTitle}</title>
      </Head>
      <header className={styles.header}>
        {
          home ? (
            <>
              <Image
                priority
                src="/images/profile.jpg"
                alt={name}
                className={utilStyles.borderCircle}
                height={144}
                width={144}
              />
              <h1 className={utilStyles.heading2Xl}>{name}</h1>
            </>
          ):(
            <>
              <Link href="/">
                <Image
                  priority
                  src="/images/profile.jpg"
                  alt={name}
                  className={utilStyles.borderCircle}
                  height={108}
                  width={108}
                />
              </Link>
              <h2 className={utilStyles.headingLg}>
                <Link href="/">
                  {name}
                </Link>
              </h2>
            </>
          )
        }
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">Back to home</Link>
        </div>
      )}
    </div>
  )
}
