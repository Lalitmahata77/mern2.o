import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'


const AddBook = () => {

  // const [bookName,setBookName] = useState('')
  // const [bookPrice,setBookPrice] = useState(null)
  // const [isbnNumber,setIsbnNumber] = useState(null)
  // const [authorName,setAuthorName] = useState('')
  // const [publishedAt,setPublishedAt] = useState('')
  // const [publication,setPublication] = useState('')
  // const [image,setImage] = useState(null)

  //for navigate
  const navigate = useNavigate('')

  // first way
  // const handleChange = async(e)=> {
  //   e.preventDefault()
  //   const response = await axios.post('http://localhost:3000/book',{
  //                     bookName,
  //                     bookPrice,
  //                     isbnNumber,
  //                     authorName,
  //                     publishedAt,
  //                     publication,
  //                     image
  //                   },{
  //                     headers:{
  //                       'Content-Type':'multipart/form-data'
  //                     }
  //                   })
  //   if (response.status === 200) {
  //     navigate('/')
  //   }
  //   else{
  //     console.log("Something went wrong")
  //   }
  // }

  // second way 
  // const handleChange = async(e)=> {
  //   e.preventDefault()
  //   //by creating instance of formData object
  //   const formData = new FormData()
  //   formData.append('bookName',bookName)
  //   formData.append('bookPrice',bookPrice)
  //   formData.append('isbnNumber',isbnNumber)
  //   formData.append('authorName',authorName)
  //   formData.append('publishedAt',publishedAt)
  //   formData.append('publication',publication)
  //   formData.append('image',image)
  //   console.log(formData)
  //   const response = await axios.post('http://localhost:3000/book',formData)
  //   if (response.status === 200) {
  //     navigate('/')
  //   }
  //   else{
  //     console.log("Something went wrong")
  //   }
  // }

  // third way

  const [data,setData] = useState({
          'bookName':'',
          'bookPrice':null,
          'isbnNumber':null,
          'authorName':'',
          'publishedAt':'',
          'publication':'',
  })
  const [image,setImage] = useState(null)

  const handleChange = (e)=>{
        const {name,value} = e.target
        setData({
          ...data,
          [name]:value
        })
  }

  const handleSubmit = async(e)=>{
        e.preventDefault()
        const formData = new FormData()
        Object.entries(data).forEach(([key,value])=>{
              formData.append(key,value)
        })
        formData.append('image',image)

        const response = await axios.post('http://localhost:3000/book',formData)
        
        if (response.status === 200) {
          navigate('/')
        }
        else{
          console.log("Something went wrong !!")
        }
  }




  return (
    <>
      <Navbar/>
      <div className="bg-white rounded-lg shadow-md p-8 w-full mx-auto my-16 max-w-md">
        <h2 className="text-2xl font-semibold text-blue-600 mb-6">Add Book</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label htmlFor="bookName" className="block text-sm font-medium text-gray-600">Book Name</label>
                <input type="text" id="bookName" name="bookName" className="mt-1 p-2 w-full border rounded-md text-gray-800" onChange={handleChange} />
            </div>
            <div className="mb-4">
                <label htmlFor="bookPrice" className="block text-sm font-medium text-gray-600">bookPrice</label>
                <input type="number" id="bookPrice" name="bookPrice" className="mt-1 p-2 w-full border rounded-md text-gray-800" onChange={handleChange} />
            </div>
            <div className="mb-4">
                <label htmlFor="isbnNumber" className="block text-sm font-medium text-gray-600">isbnNumber</label>
                <input type="number" id="isbnNumber" name="isbnNumber" className="mt-1 p-2 w-full border rounded-md text-gray-800" onChange={handleChange} />
            </div>
            <div className="mb-4">
                <label htmlFor="authorName" className="block text-sm font-medium text-gray-600">authorName</label>
                <input type="text" id="authorName" name="authorName" className="mt-1 p-2 w-full border rounded-md text-gray-800" onChange={handleChange} />
            </div>
            <div className="mb-4">
                <label htmlFor="publication" className="block text-sm font-medium text-gray-600">publication</label>
                <input type="number"  id="publication" name="publication" className="mt-1 p-2 w-full border rounded-md text-gray-800" onChange={handleChange} />
            </div>
            <div className="mb-4">
                <label htmlFor="publishedAt" className="block text-sm font-medium text-gray-600">publishedAt</label>
                <input type="date" id="publishedAt" name="publishedAt" className="mt-1 p-2 w-full border rounded-md text-gray-800"  onChange={handleChange} />
            </div>
            
            <div className='my-3'>
              <label htmlFor='image' className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload file</label>
              <input type="file" id="image" name='image' onChange={(e)=>setImage(e.target.files[0])} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" aria-describedby="image" />
            </div>

            <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            <Link to={'/'}>
              <button type="button" className="text-white mx-3 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Exit</button>
            </Link>
          </form>
        </div>
     
    </>
  )
}

export default AddBook