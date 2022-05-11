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
  const exampleAddress5 = '0xE9a28de8C39E0605F44A4C465C179685abc6c7dF'; // AAVE Test
  const exampleAddress6 = '0x4bBeEe56221242E4cdBdE226A25d4948e957F392'; // MateDAO
  const exampleAddress7 = '0xB563C841C6FdE27A8e533E67fb15f4C270860BED'; // Pixel Avatars
  const exampleAddress8 = '0x0b29CF9b4D48BF75Bd1c2681cA07aB102F85c98C'; // 7i7o-domains
  const exampleAddress9 = '0xBE127507dA672f51492C416274470702F89c4918'; // Cobie
  const exampleAddress0 = '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'; // HH #0


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
          Colorful SVGs as a visual representation of your ethereum address
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
        <div className={styles.grid}>
          <div className={styles.card}><SVGies address={exampleAddress6} width={200} height={200} fill={`#000`} /></div>
          <div className={styles.card}><SVGies address={exampleAddress2} width={200} height={200} fill={`#000`} /></div>
          <div className={styles.card}><SVGies address={exampleAddress7} width={200} height={200} fill={`#000`} /></div>
          <div className={styles.card}><SVGies address={exampleAddress9} width={200} height={200} fill={`#000`} /></div>
          <div className={styles.card}><SVGies address={exampleAddress1} width={200} height={200} fill={`#000`} /></div>
          <div className={styles.card}><SVGies address={exampleAddress0} width={200} height={200} fill={`#000`} /></div>
          <div className={styles.card}><SVGies address={exampleAddress4} width={200} height={200} fill={`#000`} /></div>
          <div className={styles.card}><SVGies address={exampleAddress3} width={200} height={200} fill={`#000`} /></div>
          <div className={styles.card}><SVGies address={exampleAddress8} width={200} height={200} fill={`#000`} /></div>

          {/* <div className={styles.card}><SVGies address={exampleAddress5} width={200} height={200} /></div> */}
        </div>

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