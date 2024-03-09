import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import axios from 'axios'
import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

const EditBook = () => {

      const {id} = useParams()
      const navigate = useNavigate()
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

        const response = await axios.patch(`http://localhost:3000/book/${id}`,formData)
        
        if (response.status === 200) {
          navigate(`/book/${id}`)
        }
        else{
          console.log("Something went wrong !!")
        }
      }

      const fetchBook = async()=>{
          const response = await axios.get(`http://localhost:3000/book/${id}`)
          if (response.status === 200) {
            setData(response.data.data)
          }
          else{
            console.log("Something went wrong !!");
          }
      }

      useEffect(()=>{
        fetchBook()
      },[])

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
            <Link to={`/book/${id}`}>
              <button type="button" className="text-white mx-3 bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800">Exit</button>
            </Link>
          </form>
        </div>
     
    </>
  )
}

export default EditBook