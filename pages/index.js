import Link from 'next/link'
import { useState, useEffect, useRef} from "react"

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

  const wishes = () => {

    let wishedGlobal = Math.floor(Math.random() * 100)
    setFiveWish(wishedGlobal)

    if (pity === confirmFiveStar) { // ถึงการันตี 5 ดาว
      let lostWishes = Math.floor(Math.random() * 100)
      setLostWish(lostWishes)
      if (lostWishes < 50) { // 2

        setResult(result => [...result, "Win 50/50 (5 stars)"])
        setPity(0)
        return;
      }

      setLost(true)
      setResult(result => [...result, "Lost 50/50 (5 stars)"])
      setPity(0)
      // 1
      return;
    }

    if (wishedGlobal <= chanceFiveStar) { // ออก 5 ดาว
      let lostWishes = Math.floor(Math.random() * 100)
      setLostWish(lostWishes)
      if (lostWishes < 50) { // 2

        setResult(result => [...result, "Win 50/50 (5 stars)"])
        setPity(0)
        return;
      }

      setLost(true)
      setResult(result => [...result, "Lost 50/50 (5 stars)"])
      setPity(0)
      // 1
      return;
    }

    // 4 STAR
    if (fourStarPity < confirmFourStar) { // ไม่ถึงการันตี 4 ดาว
      let wishedFourStar = Math.floor(Math.random() * 100)
      setFourWish(wishedFourStar)

      if (wishedFourStar <= chanceFourStar) { // 4
        console.log("4star")
        setFourStarPity(0)
        setResult(result => [...result, "have some 4 stars"])
        //setPity(pity + 1)
        return;
      } // 4 

      console.log("3star")
      setFourStarPity(fourStarPity => fourStarPity + 1)
      setResult(result => [...result, "have some 3 stars"])
      //setPity(pity + 1)
      return;
    }


    // ถ้ามีการันตี 4 ดาว
    if (fourStarPity === confirmFourStar) {
      console.log("4starcon")
      setResult(result => [...result, "have some 4 stars (guarantee)"])
      //setPity(pity + 1)
      setFourStarPity(0)
      return;
    }
    /* 5 */
  }


  const pulls = (times) => {
    // setResult([])
    if (times === 1) {
      setPity(pity => pity + 1)
      wishes()
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
    <div>
      <div>
        <h3>Pity: {pity}</h3>
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
      <button onClick={() => pulls(1)}>Wishes x1</button>
      <button onClick={() => pulls(10)} disabled>Wishes x10 (บัคอยู่)</button>
      <br />
      <div>
        <h4>Admin zone</h4>
        <p>5 stars random chance : {fiveWish}</p>
        <p>4 stars random chance : {fourWish}</p>
        <p>win 5 stars 50/50 : {lostWish}</p>
        <p>4 stars guarantee : {fourStarPity}/10</p>
        <p>Primogems eaten : {pity * 160}</p>
      </div>
    </div>
  )
}
