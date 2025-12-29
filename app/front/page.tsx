// 'use client'
// import Squares from "@/components/Squares";
// import { useState } from "react";

// const front = () => {

//     const [bracket, setBracket] = useState(Array(5).fill(Array(5).fill('')));

//     return (
//         <div className="relative w-full h-screen bg-black overflow-hidden">
//             <Squares
//                 className="absolute top-0 left-0 w-full h-full z-0"
//                 speed={0.1}
//                 squareSize={45}
//                 direction="diagonal" // options: up, down, left, right, diagonal
//                 borderColor="#222222"
//                 hoverFillColor="#222222"
//             />
//             <div className="relative z-10 w-full h-full text-white">
//                 <div className="h-30 flex justify-between items-center px-19">
//                     <h1 className="text-2xl tracking-widest"><span className="text-blue-400">W</span>ordle</h1>
//                 </div>
//                 <div className="h-[80vh] flex justify-center items-center">
//                     <div className="bg-[grey] opacity-85 pt-5 w-150 h-180 z-10 flex justify-center">
//                         {/* <ul className="flex gap-2.5 h-17">
//                             {bracket.map((row, indRow) => {
//                                 return (
//                                     <input key={indRow} className=" w-15 outline-none border border-[#D3D6DA]"

//                                     />
//                                 )
//                             })}
//                         </ul> */}
//                         <div className="flex justify-center mt-10">
//                             {bracket.map((_, i) => (
//                                 <ul key={i} className="flex gap-2 flex-col">
//                                     <li>
//                                         <input
//                                             maxLength={1}
//                                             className="w-14 h-14 border border-[#D3D6DA] text-center text-xl font-bold uppercase outline-none"
//                                         />
//                                     </li>
//                                     <li>
//                                         <input
//                                             maxLength={1}
//                                             className="w-14 h-14 border border-[#D3D6DA] text-center text-xl font-bold uppercase outline-none"
//                                         />
//                                     </li>
//                                     <li>
//                                         <input
//                                             maxLength={1}
//                                             className="w-14 h-14 border border-[#D3D6DA] text-center text-xl font-bold uppercase outline-none"
//                                         />
//                                     </li>
//                                     <li>
//                                         <input
//                                             maxLength={1}
//                                             className="w-14 h-14 border border-[#D3D6DA] text-center text-xl font-bold uppercase outline-none"
//                                         />
//                                     </li>
//                                     <li>
//                                         <input
//                                             maxLength={1}
//                                             className="w-14 h-14 border border-[#D3D6DA] text-center text-xl font-bold uppercase outline-none"
//                                         />
//                                     </li>

//                                 </ul>
//                             ))}
//                         </div>
//                     </div>
//                 </div>
//             </div>


//         </div>
//     )
// }


// export default front







'use client'

import dynamic from 'next/dynamic'

// Dynamically import the client-only GameClient
const GameClient = dynamic(() => import('@/components/GameClient/GameClient'), {
  ssr: false, // important: disables server-side rendering
})

export default function FrontPage() {
  return <GameClient />
}