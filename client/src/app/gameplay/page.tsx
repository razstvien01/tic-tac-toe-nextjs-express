import Head from "next/head";
import { useRouter } from "next/router";

export default function Gameplay() {
  const router = useRouter();
  const { player1, player2 } = router.query;

  return (
    <>
      <Head>
        <title>Game On!</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="texgt-2xl font-bold mb-4">Game Started</h1>
        <p className="mb-2">Player 1: {player1}</p>
        <p className="mb-4">PLayer 2: {player2}</p>
      </main>
    </>
  );
}
