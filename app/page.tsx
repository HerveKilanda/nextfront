// pages/index.js

import Head from "next/head";

import Hero from "@/components/Hero/addHero";

import { getMe } from "@/utils/get-me";



export default async function Home() {
  const me = await getMe();
  console.log(me);
  return (
    <>
      <Head>
        <title>Otakulinks - Emprunte des mangas entre amis</title>
        <meta
          name="description"
          content="Emprunte des mangas avec Otakulinks entre amis. Découvrez notre collection de mangas disponibles dès maintenant!"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Hero />
        {/* Ajoutez d'autres sections ici */}
      </main>
    </>
  );
}
