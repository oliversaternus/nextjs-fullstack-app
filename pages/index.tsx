import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Hello world</title>
        <meta name="description" content="Lorem ipsum" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1>
    </>
  )
}
