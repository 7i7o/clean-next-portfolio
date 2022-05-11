import Head from 'next/head'
import styles from '../styles/Home.module.css'

import SVGies from './components/SVGies';

import { useAccount, useConnect, useDisconnect, useEnsAvatar, useEnsName } from 'wagmi'


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


  const { data: account } = useAccount()
  const { data: ensAvatar } = useEnsAvatar({ addressOrName: account?.address })
  const { data: ensName } = useEnsName({ address: account?.address })
  const { connect, connectors, error, isConnecting, pendingConnector } =
    useConnect()
  const { disconnect } = useDisconnect()


  return (
    <div className={styles.container}>
      <Head>
        <title>SVGies</title>
        <meta name="description" content="Colorful SVGs as visual representation of ethereum Addresses" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          {/* Hi! I&apos;m Matias */}
          SVGies
        </h1>

        <h2 className={styles.description}>
          {/* I&apos;m a enthusiastic developer with a soft spot for web3 */}
          Colorful SVGs as a visual representation of your ethereum address
        </h2>

        {!account &&
          <>
            <h2>Connect your wallet to see yours</h2>
            <div className={styles.connectors}>
              {connectors.map((x) => (
                <button className={styles.web3button} key={x.id} onClick={() => connect(x)}>
                  {x.name} {!x.ready && ' (unsupported)'}
                </button>
              ))}
            </div>
            <div className={styles.spacer}>&nbsp;</div>
          </>
        }

        {account &&
          <>
            <h2>Here is your wallet&apos;s SVGie</h2>
            <div className={styles.connectors}>
              <button className={styles.web3button} onClick={disconnect}>Disconnect</button>
            </div>
            <h4>{ensName ? `${ensName}` : account.address}</h4>
            {/* <h5>{ensName ? `${ensName} (${account.address})` : account.address}</h5> */}
            <div className={styles.grid}>
              <div className={styles.card}><SVGies address={account.address} width={200} height={200} fill={`#000`} /></div>
            </div>
          </>
        }

        <footer className={styles.footer}>
          <h2>Some example SVGies are</h2>
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
        </footer>

      </main>

    </div>
  )
}

export default Home;