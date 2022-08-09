import Link from 'next/link'
import { useState, useEffect, useRef} from "react"
import Primogem from "./../access/primogem.png"
import Interwined from "./../access/interwined.png"
import Image from "next/image"

export default function IndexPage() {
  const chanceFourStar = 13

  const chanceFiveStar = 0.625


  const confirmFourStar = 10

  const confirmFiveStar = 90

  const [lost, setLost] = useState(false)

  const [fourStarPity, setFourStarPity] = useState(0)
  const [pity, setPity] = useState(0)

  const previousPity = useRef(0)

  const [result, setResult] = useState([])

  // Admin variable

  const [fiveWish, setFiveWish] = useState(0)
  const [fourWish, setFourWish] = useState(0)
  const [lostWish, setLostWish] = useState(0)

  const wishes = (confirm) => {

    let wishedGlobal;

    if (confirm) {
      wishedGlobal = 0.624
    } else {
      wishedGlobal = Math.random() * 100
    }

    setFiveWish(wishedGlobal)
    console.log(wishedGlobal)
    if (pity === confirmFiveStar) { // ถึงการันตี 5 ดาว
      let lostWishes = Math.random() * 100
      setLostWish(lostWishes)
      if (lostWishes < 50 || lost) { // 2

        setResult(result => [...result, <h4 className="win" key="win">Win 50/50 (5 stars / guarantee)</h4>])
        setPity(0)
        setLost(false)
        return;
      }

      setLost(true)
      setResult(result => [...result, <h4 className="lost" key="lost">Lost 50/50 (5 stars / guarantee)</h4>])
      setPity(0)
      // 1
      return;
    }

    if (wishedGlobal <= chanceFiveStar) { // ออก 5 ดาว
      let lostWishes = Math.random() * 100
      setLostWish(lostWishes)
      if (lostWishes < 50 || lost) { // 2

        setResult(result => [...result, <h4 className="win" key="win">Win 50/50 (5 stars)</h4>])
        setPity(0)
        setLost(false)
        return;
      }

      setLost(true)
      setResult(result => [...result, <h4 className="lost" key="lost">Lost 50/50 (5 stars)</h4>])
      setPity(0)
      // 1
      return;
    }

    // 4 STAR
    if (fourStarPity < confirmFourStar) { // ไม่ถึงการันตี 4 ดาว
      let wishedFourStar = Math.random() * 100
      setFourWish(wishedFourStar)

      if (wishedFourStar <= chanceFourStar) { // 4
        console.log("4star")
        setFourStarPity(0)
        setResult(result => [...result, <h4 className="four" key="four">have some 4 stars</h4>])
        //setPity(pity + 1)
        return;
      } // 4 

      console.log("3star")
      setFourStarPity(fourStarPity => fourStarPity + 1)
      setResult(result => [...result, <p className="common" key="common">have some 3 stars</p>])
      //setPity(pity + 1)
      return;
    }


    // ถ้ามีการันตี 4 ดาว
    if (fourStarPity === confirmFourStar) {
      console.log("4starcon")
      setResult(result => [...result, <h4 className="fourgua" key="fourgua">have some 4 stars (guarantee)</h4>])
      //setPity(pity + 1)
      setFourStarPity(0)
      return;
    }
    /* 5 */
  }


  const pulls = (times, confirm) => {
    // setResult([])
    if (times === 1) {
      setPity(pity => pity + 1)
      wishes(confirm)
    } else {
      for (let i = 0; i < 10; i++) {
        setPity(pity => pity + 1)
        wishes()
      }

    }
  }

  useEffect(() => {

  }, [pity])

  return (
    <div className="content">
      <div>
        <h4>Wish</h4>
        <span><Image className="gem" width={20} height={20} src={Primogem}/> -{pity * 160}</span>
        <span><Image className="interwined" width={20} height={20} src={Interwined}/> -{pity}</span>
        <h1>Results:</h1>
        <ul>
          {result.length > 0 ? result.map((val, key) => (
            <li key={key}>{val}</li>
          ))
            :
            "Wishing and pull now"
          }
        </ul>
      </div>
      <div className="pulling">
        <button onClick={() => pulls(1, false)}>
          <label>Wish x1</label>
          <br />
          <Image className="primogem" width={20} height={20} src={Primogem}/> x 160
        </button>
        <button onClick={() => pulls(10, false)} disabled>
          <label>Wish x10</label>
          <br />
          <Image className="primogem" width={20} height={20} src={Primogem}/> x 1600
        </button>
      </div>
      <br />
      <div>
        <h4>Admin zone</h4>
        <button onClick={() => pulls(1, true)}>
          <label>Confirm 5-star</label>
          <br />
          <Image className="primogem" width={20} height={20} src={Primogem}/> x 0
        </button>
        <p>5 stars random chance : {fiveWish}</p>
        <p>4 stars random chance : {fourWish}</p>
        <p>win 5 stars 50/50 : {lostWish}</p>
        <p>4 stars guarantee : {fourStarPity}/10</p>
      </div>
      <p className="right">This gacha system based from Genshin Impact from HoYoVerse</p>
    </div>
  )
}
