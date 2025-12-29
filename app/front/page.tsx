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

import Squares from "@/components/Squares"
import { FaLaughSquint, FaWindowClose, FaRegThumbsUp, FaInfoCircle } from "react-icons/fa";
import { useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from "react"
import { FaBackspace } from "react-icons/fa";

const ROWS = 6
const COLS = 5
const test = ''


const Front = () => {

  const searchParams = useSearchParams()
  const mode = searchParams.get('mode') // 'single' | 'multi'


  const checkRef = useRef<HTMLDivElement | null>(null)
  // const keyRef = useRef<HTMLButtonElement[]>([])
  const keyRef = useRef<HTMLDivElement | null>(null)
  const p2Ref = useRef<HTMLInputElement | null>(null)



  // ✅ Proper 2D grid (no shared references)
  const [bracket, setBracket] = useState<string[][]>(
    Array.from({ length: ROWS }, () => Array(COLS).fill(''))
  )

  const [currentRow, setCurrentRow] = useState(0)
  const [result, setResult] = useState(false)
  const [pop, setPop] = useState(false)
  const [winner, setWinner] = useState(false)
  const [test, setTest] = useState('')
  const [infoPop, setInfoPop] = useState(false)

  const handleChange = (row: number, col: number, value: string) => {
    if (row !== currentRow) return
    if (!/^[a-zA-Z]?$/.test(value)) return

    // if(check){
    //   console.log('checked')
    // }

    setBracket(prev => {
      const copy = prev.map(r => [...r])
      // console.log(copy)
      copy[row][col] = value.toUpperCase()
      return copy
    })
  }

  const checking = (e: any) => {
    // console.log(e.target.innerText)
    if (e.target.innerText === 'ENTER') {
      // const first = checkRef.current?.children[0] as HTMLElement
      // first.style.backgroundColor = 'red'
      // console.log(first.style.backgroundColor)
      if (!bracket[currentRow].includes('')) {
        // console.log(bracket[currentRow].join(''))
        const change = bracket[currentRow].join('').split('')
        const arr = test.toUpperCase().split('')
        // console.log(change, arr)
        const fk = keyRef?.current?.children
        const array = Array.from(fk || []);
        // console.dir(array)


        for (let i = 0; i < change.length; i++) {

          array.forEach((btn) => {
            Array.from(btn.children).forEach((node, index) => {
              const element = node as HTMLElement;
              // console.log(element.style.backgroundColor);
              if (element.innerHTML === change[i]) {
                if (!arr.includes(change[i])) {
                  element.style.backgroundColor = 'darkgrey'
                }
                else if (arr.indexOf(change[i]) === change.indexOf(change[i])) {
                  element.style.backgroundColor = 'lightgreen'
                }
                else {
                  element.style.backgroundColor = 'yellow'
                }
              }
            });
          });

          // fk.forEach((btn) => {
          //   if (btn.innerText === change[i]) {
          //     if (!arr.includes(change[i])) {
          //       btn.style.backgroundColor = 'darkgrey'
          //     }
          //     else if (arr.indexOf(change[i]) === change.indexOf(change[i])) {
          //       btn.style.backgroundColor = 'lightgreen'
          //     }
          //     else {
          //       btn.style.backgroundColor = 'yellow'
          //     }}

          // });

          // console.log(change[i], arr)
          if (arr.includes(change[i]) && arr.indexOf(change[i]) !== change.indexOf(change[i])) {
            const first = checkRef.current?.children[i] as HTMLElement
            first.style.backgroundColor = 'yellow'
            if (change.lastIndexOf(change[i]) === arr.lastIndexOf(change[i])) {
              let first1 = checkRef.current?.children[change.lastIndexOf(change[i])] as HTMLElement
              first1.style.backgroundColor = 'lightgreen'

              console.log(change[i], i, 'is present but not in the correct bracket')
            }
            // console.log(first.style.backgroundColor)









            // console.log(change[i], change, i, 'is present but not in the correct bracket')

            // arr.indexOf(change[i]) ,
          }

          else if (arr.includes(change[i]) && arr.indexOf(change[i]) === change.indexOf(change[i])) {
            let first = checkRef.current?.children[i] as HTMLElement
            first.style.backgroundColor = 'lightgreen'
            if (arr.join('') === change.join('')) {
              first.style.border = '2px solid gold';
            }

            // if(arr.lastIndexOf(change[i]) === change.lastIndexOf(change[i])){
            //   console.log(change[i], 'is present in the correct bracket')
            // }
            // console.log(change[i], 'is present in the correct bracket')
            if (change.lastIndexOf(change[i]) !== arr.lastIndexOf(change[i])) {
              let first1 = checkRef.current?.children[change.lastIndexOf(change[i])] as HTMLElement
              first1.style.backgroundColor = 'Yellow'
              console.log(change[i], i, 'is present but not in the correct bracket')

            }



            // console.log(change, change[i], arr)
            // arr.indexOf(change[i]) ,
          }
        }
        setCurrentRow(prev => prev + 1)
        // console.log(arr.join(''), change.join(''))
        if (arr.join('') === change.join('')) {
          console.log("Yes")
          setResult(true)
          setPop(true)
          setWinner(true)
          // setCurrentRow(0)
          // setBracket(Array.from({ length: ROWS }, () => Array(COLS).fill('')));
        }
        else if (arr.join('') !== change.join('') && currentRow === 5) {
          console.log("Yes")
          setPop(true)
          setResult(true)
          setWinner(false)
        }
        return
      }
      else {
        alert('Not enough letters')
        return
      }
      return

    }

    if (e.target.innerText === '⌫') {
      // console.log(bracket[currentRow].lastIndexOf(''))
      handleChange(currentRow, bracket[currentRow].indexOf('') - 1, '')
      if (bracket[currentRow].indexOf('') === -1) {
        handleChange(currentRow, 4, '')
      }
      return
    }
    handleChange(currentRow, bracket[currentRow].indexOf(''), e.target.innerText)

  }

  const resetColors = () => {
    // const rows = checkRef.current?.parentElement?.children; // get all row divs
    const rows = document.querySelectorAll('.flex.gap-2');
    // console.log(rows)
    if (!rows) return;

    Array.from(rows).forEach(row => {
      Array.from((row as HTMLElement).children).forEach(cell => {
        const input = cell as HTMLInputElement;
        input.style.backgroundColor = '';
        input.style.borderColor = '';
      });
    });

    // Reset keyboard buttons colors
    const keys = keyRef.current?.querySelectorAll('button');
    // console.log(keys)
    keys?.forEach(key => {
      const btn = key as HTMLElement;
      btn.style.backgroundColor = '';
    });
  };


  const getWord = async () => {
    try {
      const res = await fetch(
        "/api/words",
        { cache: "no-store" }
      )

      // if (!res.ok) throw new Error("Request failed")

      const data = await res.json()
      const random = (Math.floor(Math.random() * data.length))
      setTest(data[random])
      // console.log(data[random])
    } catch (err) {
      console.error(err)
    }
  }

  const restarting = () => {
    setPop(false)
    setResult(false)
    setCurrentRow(0)
    // setWinner(false)
    setBracket(Array.from({ length: ROWS }, () => Array(COLS).fill('')))
    getWord()
    resetColors();
  }

  const hashing = () => {
    // console.log(p2Ref.current.value)
    // setTest(p2Ref.current?.value ?? '')
    const value = p2Ref.current?.value ?? ''

    const isValid =
      value.length === 5 &&
      /^[a-zA-Z]+$/.test(value)

    if (!isValid) {
      // invalid input
      alert('word should exist in alphabets with 5 length limt')
      return
    }

    // ✅ valid input here
    setTest(value)

  }

  useEffect(() => {

    // const getWord = async () => {
    //   const res = await fetch(
    //     "https://api.frontendexpert.io/api/fe/wordle-words",
    //     {
    //       cache: "no-store" // avoid caching if needed
    //     }
    //   );
    //   if (!res.ok) {
    //     throw new Error("Fetch failed")
    //   }
    //   const data = await res.json();
    //   console.log(data);
    // }
    getWord()
    console.log(mode)
  }, [])

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <Squares
        className="absolute top-0 left-0 w-full h-full z-0"
        speed={0.01}
        squareSize={45}
        direction="diagonal"
        borderColor="#222222"
        hoverFillColor="#222222"
      />

      <div className="relative z-10 w-full h-full text-white">
        {/* Header */}
        <div className="h-30 flex justify-between items-center max-md:px-5 px-19">
          <h1 className="text-2xl tracking-widest">
            <span className="text-blue-400">W</span>ordle
          </h1>
          <FaInfoCircle className="text-2xl" onClick={() => setInfoPop(true)} />
        </div>

        <div className={`${mode === 'multi' && test !== p2Ref.current?.value ? 'opacity-100 pointer-events-auto block' : ' opacity-0 pointer-events-none hidden'} shadow-xl/30 flex justify-center h-[80vh] w-full absolute items-center`}>
          <div className="h-60 pt-10 z-15 p-5 rounded-[7.5px] flex flex-col gap-6 bg-[#fff] w-100">
            <p className="text-[#8c8c8c] text-lg">P1 type a word for P2 to find.</p>
            <input ref={p2Ref} placeholder="Enter word" className="border-[black] border-1 bg-[white] text-[#8c8c8c] pl-3 py-2 rounded" type="text" />
            <button onClick={hashing} className="border text-lg border-[black] py-2 text-[#000] transition duration-400 hover:text-[#fff] hover:bg-[#000]">Enter</button>
          </div>
        </div>

        {/* Game area */}
        <div className="h-[80vh] flex relative justify-center items-center">

          <div className={` ${currentRow === 6 || pop ? 'opacity-100' : ''} opacity-0 absolute py-1.5 px-2 bg-[#000] z-15 rounded-[5px] top-10`}>
            {test}
          </div>

          <div className="opacity-85 pt-5 w-150 h-180 max-sm:h-160 max-[380px]:py-10 z-10 flex flex-col justify-between items-center">
            {/* ✅ Wordle Grid */}
            <div className="flex flex-col gap-2 mt-10">
              {bracket.map((row, r) => (
                // ref={r === currentRow ? checkRef : null}
                <div key={r} className="flex gap-2" ref={r === currentRow ? checkRef : null}>
                  {row.map((cell, c) => (
                    <input
                      key={c}
                      value={cell}
                      maxLength={1}
                      disabled={r !== currentRow}
                      onChange={e =>
                        handleChange(r, c, e.target.value)
                      }
                      className="
                        max-sm:w-12
                        max-sm:h-12
                        w-14 h-14
                        border border-[#D3D6DA]
                        text-center text-xl font-bold uppercase
                        outline-none
                        disabled:bg-gray-300
                        disabled:text-black
                      "
                    />
                  ))}
                </div>
              ))}
            </div>
            <div ref={keyRef} className={`${!result ? 'opacity-100 pointer-events-auto block' : ' opacity-0 pointer-events-none hidden'} flex justify-center items-center mb-10 flex-col`}>
              <div>
                {
                  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'].map((letter, i) => {
                    return (
                      <button
                        // ref={el => {
                        //   if (el) {
                        //     keyRef.current[i] = el
                        //   }
                        // }}
                        onClick={(e) => checking(e)} key={letter} className="m-1 max-md:px-3 max-sm:px-2 max-md:py-2 px-4 py-3.5 bg-[#DADCE0] text-[#000] font-bold rounded">{letter}</button>
                    )
                  })
                }
              </div>
              <div>
                {
                  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'].map((letter) => {
                    return (
                      <button onClick={(e) => checking(e)} key={letter} className="m-1 max-md:px-3 max-sm:px-2 max-md:py-2 px-4 py-3.5 bg-[#DADCE0] text-[#000] font-bold rounded">{letter}</button>
                    )
                  })
                }
              </div>
              <div>
                {
                  ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫'].map((letter) => {
                    return (
                      <button key={letter} onClick={(e) => checking(e)} className="m-1 max-md:px-3 max-sm:px-2 max-sm:text-[14px] max-md:py-2 px-4 py-3.5 bg-[#DADCE0] text-[#000] font-bold rounded">{letter}</button>
                    )
                  })
                }
              </div>
            </div>
            <div className={`${result ? 'opacity-100 pointer-events-auto block' : ' opacity-0 pointer-events-none hidden'} flex flex-col gap-5 mb-20.5`}>
              {/* <button className="py-2 text-xl px-15 bg-[#000] transition duration-400 hover:text-[#000] hover:bg-[#fff] text-[#fff] rounded-[505px] cursor-pointer">See results!</button> */}
              <button onClick={() => restarting()} className="py-2 text-xl px-15 bg-[#000] transition duration-400 hover:text-[#000] hover:bg-[#fff] text-[#fff] rounded-[505px] cursor-pointer">New word!</button>
            </div>
          </div>
          <div className={`absolute ${pop ? 'opacity-100 pointer-events-auto' : ' opacity-0 pointer-events-none'} shadow-xl/30 max-md:w-70 max-md:h-50  w-150 h-180 bg-[#fff]/85 z-10 flex justify-center`}>
            <div className="flex gap-4 flex-col text-[#000] justify-center w-full items-center relative">
              {winner == true ? <FaRegThumbsUp className="text-5xl text-[green]" /> : <FaLaughSquint className="text-5xl text-[green]" />}
              {/* <FaLaughSquint className="text-5xl text-[green]" /> */}
              <FaWindowClose onClick={() => setPop(false)} className="absolute cursor-pointer  top-7.5 right-7.5 text-4xl" />
              <h1 className="text-3xl font-bold">{winner ? "Nice One" : "Get better!"}</h1>
            </div>
          </div>

          <div className={`absolute ${infoPop ? 'opacity-100 pointer-events-auto' : ' opacity-0 pointer-events-none'} text-[#000] shadow-xl/30 max-md:w-100 w-130 max-md:h-130 h-140 bg-[#fff]/95 z-10 flex items-center justify-center`}>
            <FaWindowClose onClick={() => setInfoPop(false)} className="absolute cursor-pointer  top-7.5 right-7.5 text-4xl" />
            <div className="flex flex-col gap-4 w-[80%] h-[90%]">
              <ul>
                <h1 className="font-black text-3xl font-mono">How To Play</h1>
                <p className="text-xl font-thin">Guess the Word in 6 tries</p>
              </ul>
              <ul className="list-disc text-[16px]">
                <li>Each guess must be a valid 5-letter word.</li>
                <li>Color of tiles will change to show how close your guess was to the word.</li>
              </ul>
              <ul className="flex flex-col gap-2">
                <li className="font-bold">Examples</li>
                <li>
                  <ul className="flex gap-1">
                    {['S', 'T', 'A', 'R', 'T'].map((word, ind) => { return (<li className={`${word === 'S' ? 'bg-[#64A05E] border-0 text-[#fff]' : ''} text-xl py-1 px-2 border-2 border-black`} key={ind}>{word}</li>) })}
                  </ul>
                </li>
                <li>S is in the word and in the correct spot.</li>
              </ul>
              <ul className="flex flex-col gap-2">
                <li>
                  <ul className="flex gap-1">
                    {['T', 'R', 'A', 'I', 'L'].map((word, ind) => { return (<li className={`${word === 'I' ? 'bg-[limegreen] border-0 text-[#fff]' : ''} text-xl py-1 px-2 border-2 border-black`} key={ind}>{word}</li>) })}
                  </ul>
                </li>
                <li>I is in the word but in the wrong spot.</li>
              </ul>
              <ul className="flex flex-col gap-2">
                <li>
                  <ul className="flex gap-1">
                    {['R', 'O', 'G', 'U', 'E'].map((word, ind) => { return (<li className={`${word === 'U' ? 'bg-[grey] border-0 text-[#fff]' : ''} text-xl py-1 px-2 border-2 border-black`} key={ind}>{word}</li>) })}
                  </ul>
                </li>
                <li>U is not in the word in any spot.</li>
                <li>(Get Started)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Front
