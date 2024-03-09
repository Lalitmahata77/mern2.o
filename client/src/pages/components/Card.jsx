import { Link } from "react-router-dom"

const Card = ({book}) => {
    
  return (
    
      <div className="max-w-sm bg-white rounded-xl dark:bg-gray-800 mt-5 shadow-lg backdrop-blur-md" key={book._id}>
              <img className="rounded-t-lg w-full h-fit" src={book.imageUrl ? book.imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjMG9mJCo-3BUGr4ryHLw9P29SchAwyaEKoneR7w9H3QBEyy41n3dW0H9uiPnkKBCoPNo&usqp=CAU"} alt="Book Image" />
          <div className="p-5">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{book.bookName}</h5>
              <div className="flex justify-between flex-wrap dark:text-white mb-2">
                <p>Rs. {book.bookPrice}</p>
                <p>ISBN. {book.isbnNumber}</p>
              </div>
              <Link to={`/book/${book._id}`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Read more
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </Link>
          </div>
      </div>

  )
}

export default Card