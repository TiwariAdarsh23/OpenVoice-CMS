import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import CreatePost from './pages/CreatePost'
import 'quill/dist/quill.snow.css'
import { useAppContext } from './context/AppContext'
const App = () => {
  const { token } = useAppContext();
  
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/blog/:id' element={<Blog/>} />
        <Route path='/create-post' element={<CreatePost/>} />
      </Routes>
    </div>
  )
}

export default App