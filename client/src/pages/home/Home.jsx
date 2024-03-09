
import { useEffect } from 'react'
import Card from '../components/Card'
import Navbar from '../components/Navbar'
import { useState } from 'react'
import axios from 'axios'

const Home = () => {

  const [Books,setBooks] = useState([])

  const fetchBooks = async() => {
    const response = await axios.get('http://localhost:3000/book')
    if (response.status === 200) {
      setBooks(response.data.data)
    }
  }

  useEffect(()=>{
      fetchBooks()
  },[])

  // console.log(Books)
  return (
    <>
    <Navbar/>
    <div className='grid grid-cols-3 pl-32 mt-20 mb-5'>
      {
        Books.length > 0 && Books.map((book)=>{
          return (
            <Card book={book}/>
          )
        })
      }
    </div>
    </>
  )
}

export default Home