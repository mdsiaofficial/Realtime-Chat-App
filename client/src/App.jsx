
import './App.css'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Join from './components/Join'
import Chat from './components/Chat'
function App() {


  return (
    <>
      <h1>Chat App</h1>
      <Router>
        <Routes>
          <Route path="/join" element={<Join/>} />
          <Route path="/chat" element={<Chat/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
