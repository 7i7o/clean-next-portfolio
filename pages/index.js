import Head from 'next/head'
// import Image from 'next/image'
import styles from '../styles/Home.module.css'

// Using RainbowKit to have a ConnectButton for SIWE
import { ConnectButton } from '@rainbow-me/rainbowkit'
import SVGies from './components/SVGies';

const Home = () => {

  const exampleAddress1 = '0xC53128eAe55d64C2bD70F842247a0E8D27647241'; // Wave Portal
  const exampleAddress2 = '0xa8B1b015E007D588cdD5DFfe61D0d8ec8fC75359'; // Ape Waver
  const exampleAddress3 = '0xDEBD7a625a4666419Dbd6C3134088307F5D273c8'; // CCC
  const exampleAddress4 = '0x45ee33C1806a9e6976d0985246ae839Ea7Fc3dB4'; // SSBM


  return (
    <div className={styles.container}>
      <Head>
        <title>Matias Parij</title>
        <meta name="description" content="Matias' Portfolio Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {/* Hi! I&apos;m Matias */}
          SVGies
        </h1>

        <h2 >
          {/* I&apos;m a enthusiastic developer with a soft spot for web3 */}
          A colorful SVG representation of your ethereum address
        </h2>

        {/* <ConnectButton
          chainStatus="icon"
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full'
          }}
          showBalance={{
            smallScreen: false,
            largeScreen: true
          }}
        /> */}
        <div className="SVGie"><SVGies address={exampleAddress1} width="200"/></div>
        <div className="SVGie"><SVGies address={exampleAddress2} width="200"/></div>
        <div className="SVGie"><SVGies address={exampleAddress3} width="200"/></div>
        <div className="SVGie"><SVGies address={exampleAddress4} width="200"/></div>
        
        {/* 
        <p className={styles.description}>
          Get started by editing{' '}
          <code className={styles.code}>pages/index.js</code>
        </p>

        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Documentation &rarr;</h2>
            <p>Find in-depth information about Next.js features and API.</p>
          </a>

          <a href="https://nextjs.org/learn" className={styles.card}>
            <h2>Learn &rarr;</h2>
            <p>Learn about Next.js in an interactive course with quizzes!</p>
          </a>

          <a
            href="https://github.com/vercel/next.js/tree/canary/examples"
            className={styles.card}
          >
            <h2>Examples &rarr;</h2>
            <p>Discover and deploy boilerplate example Next.js projects.</p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
          >
            <h2>Deploy &rarr;</h2>
            <p>
              Instantly deploy your Next.js site to a public URL with Vercel.
            </p>
          </a>
        </div> */}

      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  )
}

export default Home;