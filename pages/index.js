import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

// Using RainbowKit to have a ConnectButton for SIWE
import { ConnectButton } from '@rainbow-me/rainbowkit'

const Home = () => {

  const exampleAddress = '0xa8C93d8B2714e11f1f7Bfb54119bd9B823051AF7';

  const hex2int = (hexChar) => parseInt(hexChar, 16);

  const getColor = (hexString) => {
    const data = hexString.length == 4 ? hexString: hexString.length == 3 ? hexString + 'f' : 'ffff'
    const r = hex2int(data.charAt(0)) + hex2int(data.charAt(0)) * 16;
    const g = hex2int(data.charAt(1)) + hex2int(data.charAt(1)) * 16;
    const b = hex2int(data.charAt(2)) + hex2int(data.charAt(2)) * 16;
    const opacity = 0.5 + parseInt(data.charAt(3),16) / 32;
    return `rgba(${r},${g},${b},${opacity})`
  }

  const getBezierCurve = (hexString) => {
    if (hexString.length != 6) return;
    return `Q ${hex2int(hexString.charAt(0))} ${hex2int(hexString.charAt(1))} ${hex2int(hexString.charAt(2))} ${hex2int(hexString.charAt(3))} ${hex2int(hexString.charAt(4))} ${hex2int(hexString.charAt(5))}`
  }

  const getPath = (ethAddress) => {
    const str = ''
    console.log(ethAddress.substring(2,8))
    console.log(ethAddress.substring(8,14))
    console.log(ethAddress.substring(14,20))
    console.log(ethAddress.substring(20,26))
    console.log(ethAddress.substring(26,32))
    console.log(ethAddress.substring(32,38))
    str += getBezierCurve(ethAddress.substring(2,8))
    str += getBezierCurve(ethAddress.substring(8,14))
    str += getBezierCurve(ethAddress.substring(14,20))
    str += getBezierCurve(ethAddress.substring(20,26))
    str += getBezierCurve(ethAddress.substring(26,32))
    str += getBezierCurve(ethAddress.substring(32,38))
    
    return str
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Matias Parij</title>
        <meta name="description" content="Matias' Portfolio Page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Hi! I&apos;m Matias
        </h1>

        <h2 >
          I&apos;m a enthusiastic developer with a soft spot for web3
        </h2>

        <ConnectButton
          chainStatus="icon"
          accountStatus={{
            smallScreen: 'avatar',
            largeScreen: 'full'
          }}
          showBalance={{
            smallScreen: false,
            largeScreen: true
          }}
        />
        <h3>
          {getColor(exampleAddress.substring(2,6))}
        </h3>
        <h3>
          {getColor(exampleAddress.substring(38))}
        </h3>
        <h3>
          {getPath(exampleAddress)}
        </h3>
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