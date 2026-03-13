import { Routes, Route, useLocation } from 'react-router-dom'
import {AnimatePresence} from 'framer-motion'
import Layout from './pages/Layout'
import Home from './pages/Home'
import Projects from './pages/Projects'
import ProjectDetail from './pages/ProjectDetail'
import Contact from './pages/Contact'
import Dashboard from './pages/Dashboard'
import NotFound from './pages/NotFound'
import './index.css'


function App() {
  const location = useLocation()

  return (

    <AnimatePresence mode='wait'>
      <Routes location={location} key={location.pathname}>
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='projects' element={<Projects />} />
        <Route path='projects/:id' element={<ProjectDetail />} />
        <Route path='contact' element={<Contact />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
    </AnimatePresence>
    
  )
}

export default App;