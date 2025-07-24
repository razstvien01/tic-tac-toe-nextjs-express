import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";

export default function NewGame() {
  const router = useRouter()
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  
  const startGame = () => {
    if(player1 && player2){
      router.push({
        pathname: "/gameplay",
        query: { player1, player2 }
      })
    }
  }
  
  return (
    <>
      <Head>
        <title>Start New Game</title>
      </Head>
      <main className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">Enter Player Names</h1>
        <input
          className="border p-2 mb-2 w-64"
          placeholder="Player 1"
          value={player1}
          onChange={e => setPlayer1(e.target.value)}
        />
        <input
          className="border p-2 mb-2 w-64"
          placeholder="Player 2"
          value={player1}
          onChange={e => setPlayer2(e.target.value)}
        />
        <button onClick={startGame} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
          Start
        </button>
      </main>
    </>
  )
}