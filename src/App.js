import "./App.css"
import { useState, useEffect, useRef } from "react"
import Card from"./card"

function App() {
  const [onscreen, setOnscreen] = useState(false)
  const [query, setQuery] = useState()
  const loadNext = useRef(false)
  const clientId = `?client_id=${process.env.REACT_APP_KEY}`
  //https://stackoverflow.com/questions/48699820/how-do-i-hide-api-key-in-create-react-app
  // make sure to put env file in .ignore anf create it in the 'topmost' root folder
  //some more ideas including custom hook and use page number to trigger next page call
  // https://medium.com/suyeonme/react-how-to-implement-an-infinite-scroll-749003e9896a
  const mainUrl = `https://api.unsplash.com/photos/`
  const searchUrl = `https://api.unsplash.com/search/photos/`
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [data, setData] = useState([])
  let options = {
    root: null,
    rootMargin: "0px",
    threshold: 1,
  }

  const getPhotos = async () => {
    let url
    if (query) {
      url = `${searchUrl}${clientId}&page=${page}&query=${query}`
    } else {
      url = `${mainUrl}${clientId}&page=${page}`
    }
    const response = await fetch(url)
    const jsonData = await response.json()
    if (query) {
      setData((prevData) => [...prevData, ...jsonData.results])
    } else {
      setData((prevData) => [...prevData, ...jsonData])
    }
    setIsLoading(false)
    setPage((prevPage) => prevPage + 1)
    console.log(jsonData)
  }

  useEffect(() => {
    getPhotos()
    const observer = new IntersectionObserver((items) => {
      items[0].isIntersecting ? setOnscreen(true) : setOnscreen(false)
    }, options)
    observer.observe(loadNext.current)
  }, [])

  useEffect(() => {
    if (onscreen) {
      getPhotos()
    }
  }, [onscreen])

  return (
    <>
      <h1 id="title">{isLoading ? "Loading" : "Photos Loaded"}</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
        }}
      />
      <button
        onClick={(e) => {
          setPage(1)
          setData([])
          getPhotos()
        }}
      >
        submit
      </button>
      <div className="container">
        {isLoading ? (
          <h2>Loading Data</h2>
        ) : (
          data.map((item, index) => {
            return <Card key={index} item={item} />
          })
        )}{" "}
        <div className="hoverBoy">
          {`${query}${page}`}
          {onscreen ? "Yes" : "No"}
          <a href="#title">back to to top</a>
        </div>
      </div>
      <div>
        {isLoading && <p>Loading...</p>}
        {/* {error && <p>Error!</p>} */}
        <div ref={loadNext}></div>
      </div>
    </>
  )
}

export default App
