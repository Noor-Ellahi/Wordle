'use client'
// import { FaAngleDown } from "react-icons/fa";
import { PK, US, GB } from "country-flag-icons/react/3x2"
import { RxCaretDown } from "react-icons/rx";
import { BsFillPersonFill } from "react-icons/bs";
import Link from "next/link";
import Squares from "@/components/Squares";
import { useState } from "react";
import { useRouter } from "next/navigation";


const Home = () => {

  const router = useRouter()

  const [difficulty, setDifficulty] = useState("easy");
  const [drop, setDrop] = useState(false);
  
  // const res = await fetch(
  //   "https://api.frontendexpert.io/api/fe/wordle-words",
  //   {
  //     cache: "no-store" // avoid caching if needed
  //   }
  // );

  // const data = await res.json();
  // console.log(data);


  return (

    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Squares
        className="absolute top-0 left-0 w-full h-full z-0"
        speed={0.1}
        squareSize={45}
        direction="diagonal" // options: up, down, left, right, diagonal
        borderColor="#222222"
        hoverFillColor="#222222"
      />
      <div className="relative z-10 w-full h-full text-white">
        <div className="h-30 flex justify-between items-center px-19 max-md:px-5">
          <h1 className="text-2xl tracking-widest"><span className="text-blue-400">W</span>ordle</h1>
          <ul className="flex gap-15 max-sm:gap-5">
            <li onClick={() => router.push('/front?mode=multi')}  className="flex gap-4 border p-2 justify-center items-center cursor-pointer"><span className="hidden sm:inline">2 Players</span><ul className="flex"><BsFillPersonFill className="text-xl text-[red]"/><BsFillPersonFill className="text-[cyan] text-xl"/></ul></li>
            <li onClick={() => setDrop(!drop)}  className="flex gap-1 text-lg items-center relative">
              Difficulty <RxCaretDown />
              <ul className={`flex flex-col absolute left-[-14] top-10 border rounded-sm transition duration-500 w-29  opacity-0 ${drop ? 'opacity-100' : 'opacity-0'} bg-[#222222]`}>
                <li onClick={() => setDifficulty('hard')} className="px-5 py-1 transition duration-500 hover:text-[#000] hover:bg-[#fff]">Hard <span>{difficulty === 'hard' ? '•' : ''}</span></li>
                <li onClick={() => setDifficulty('normal')} className="px-5 py-1 transition duration-500 hover:text-[#000] hover:bg-[#fff]">Normal <span>{difficulty === 'normal' ? '•' : ''}</span></li>
                <li onClick={() => setDifficulty('easy')} className="px-5 py-1 transition duration-500 hover:text-[#000] hover:bg-[#fff]">Easy <span>{difficulty === 'easy' ? '•' : ''}</span></li>
              </ul>
            </li>
            <li className="flex gap-1 items-center max-md:hidden"> <US className="h-5 w-6" /> <RxCaretDown /></li>
          </ul>
        </div>

        <div className="h-[80vh] flex justify-center items-center">
          <div className="flex flex-col gap-15 justify-center items-center">
            <h1 className="text-7xl"><span className="text-blue-400">W</span>ordle</h1>
            <Link href="/front" className="px-10 py-3 bg-blue-600 rounded-md text-lg hover:bg-blue-700 transition">Play Now</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Home;