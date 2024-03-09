import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import SingleBook from "./pages/singlebook/SingleBook"
import AddBook from "./pages/addbook/AddBook"
import EditBook from "./pages/editbook/EditBook"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/book/:id" element={<SingleBook/>}/>
          <Route path="/book" element={<AddBook/>}/>
          <Route path="/editBook/:id" element={<EditBook/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
