import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'

const SingleBook = () => {
  const {id} = useParams()

  const [book,setBook] = useState({})
  const navigate = useNavigate()
  const fetchBook = async()=>{
    const response = await axios.get(`http://localhost:3000/book/${id}`)
    if (response.status === 200) {
      setBook(response.data.data)
    }
  }
  useEffect(()=>{
    fetchBook()
  },[])
// console.log(book)

  const deleteBook = async()=>{
    const response = await axios.delete(`http://localhost:3000/book/${id}`)
    if (response.status === 200) {
      navigate('/')
    }
    else{
      console.log("Something went wrong !!");
    }
  }
  return (
    <>
    <Navbar/>
    {/* single book display here  */}
    <div className="mt-6 bg-gray-50 dark:bg-black">
      <div className=" px-10 py-6 mx-auto">
          
        <div className="max-w-6xl px-10 py-6 mx-auto bg-gray-50 dark:bg-black mt-3 shadow-lg  border-2 backdrop-blur-lg">
          
            <Link to={'/'} className="block">
                <img className="object-cover w-screen shadow-sm h-screen rounded-lg" src={book.imageUrl ? book.imageUrl : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjMG9mJCo-3BUGr4ryHLw9P29SchAwyaEKoneR7w9H3QBEyy41n3dW0H9uiPnkKBCoPNo&usqp=CAU"} />
            </Link>

            <div className="mt-2">
                  <div className="flex justify-start items-center mt-2">
                      <p className="px-2 py-1 font-bold bg-[#2a2828] cursor-pointer text-white rounded-lg hover:bg-gray-500 mr-4">Auther Name: {book.authorName}</p>
                      <p className="px-2 py-1 font-bold bg-[#2a2828] cursor-pointer text-white rounded-lg hover:bg-gray-500 mr-4">Price: RS.{book.bookPrice}</p>
                      <p className="px-2 py-1 font-bold bg-[#2a2828] cursor-pointer text-white rounded-lg hover:bg-gray-500 mr-4">ISBN: {book.isbnNumber}</p>
                  </div>
            </div>
            
            <div className="mt-2">
              <Link to={'/'} className="sm:text-3xl md:text-3xl lg:text-3xl xl:text-4xl font-bold text-black dark:text-white cursor-pointer my-2 font-mono">{book.bookName}</Link>
                  <div className="flex justify-between items-center mt-2">
                      <p className="text-sm text-blue-500 hover:text-white font-bold bg-gray-100 dark:bg-[#2a2828]  py-2 px-2 cursor-pointer">Published At: {book.publishedAt}</p>
                      <p className="text-sm text-gray-400 font-bold ml-5 cursor-pointer">Publication: {book.publication}</p>
                  </div>
            </div>
            <div className='my-2'>
              <button onClick={deleteBook} className='dark:text-white text-black bg-red-600 px-4 py-2 rounded-lg'>Delete</button>
              <Link to={`/editBook/${book._id}`}>
                    <button className='dark:text-white text-black bg-blue-600 px-4 py-2 rounded-lg mx-3'>Edit</button>
              </Link>
            </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default SingleBook