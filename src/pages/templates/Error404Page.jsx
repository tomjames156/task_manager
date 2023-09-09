import Header from '../../components/sectioning/Header.jsx'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

function Error404Page() {
  const mover = useNavigate()

  return (
    <div className='container'>
      <Header/>
      <motion.main id='error'
        initial={{opacity: 0}}
        animate={{opacity: 1}}
      >
        <div>
          <h1>404</h1>
          <h4>WE ARE SORRY, BUT THE PAGE YOU REQUESTED WAS NOT FOUND</h4>
          <div className="buttons">
            <button onClick={() => mover('/')}><i className="fa-solid fa-house"></i>TO HOME</button>
            <button onClick={() => mover('/profile')}><i className="fa-solid fa-user"></i>YOUR PROFILE</button>
          </div>
        </div>
      </motion.main>
    </div>
  )
}

export default Error404Page