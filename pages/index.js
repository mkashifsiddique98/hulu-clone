import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Nav from '../components/Nav'
import request from '../utlity/request'
import Result from '../components/Result'
export default function Home({results}) {
  return (
    <div>
      <Head>
        <title>HuluPk</title>
        <meta name="description" content="website Is Develop by Kashif" />
      </Head>
      {/* header of Website  */}
      <Header/>
      <Nav/>
      <Result results={results}/>
    </div>
  )
}
export async function getServerSideProps(context) {
  const genre = context.query.genre || "fetchTrending"; // Default to fetchTrending

  if (!request[genre]) {
    console.error(`Invalid genre: ${genre}`);
    return {
      props: { results: [] },
    };
  }

  const selectedRequest = request[genre];

  try {
    const response = await fetch(`https://api.themoviedb.org/3${selectedRequest.url}`);
    const data = await response.json();

    return {
      props: {
        results: data.results || [],
      },
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return {
      props: { results: [] },
    };
  }
}

