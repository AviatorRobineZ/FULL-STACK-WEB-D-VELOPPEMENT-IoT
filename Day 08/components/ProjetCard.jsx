import  {useReducer } from 'react';
import {motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import Projects from '../data/projects';



const categories = ["Web", "App", "Design"];



const filterReducer = (state, action) => {
  switch (action.type) {
    case 'SET_TAG':
      return { ...state, activeTag: action.payload }
    case 'RESET':
      return { activeTag: null }
    default:
      return state
  }
}

const initialState = {
  activeTag: null
}


const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2  
    }
  }
}


const cardVariants = {
  hidden:  { opacity: 0, y: 30 },           
  visible: { opacity: 1, y: 0,             
    transition: { duration: 0.4, ease: 'easeOut' }
  }
}

const ProjetCard = () => {
    const [filters, dispatch] = useReducer(filterReducer, initialState);

    

    const filteredProjets = filters.activeTag
        ? Projects.filter(p => p.cat === filters.activeTag)
        : Projects; 

        


        return (
    <>
      <div className='filter-buttons'>
        <button
          onClick={() => dispatch({type: 'RESET'})}
          className={filters.activeTag === null ? 'active' : ''}
        >
          Tous
        </button>

        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => dispatch({type: 'SET_TAG', playload: cat })}
            className={filters.activeTag === cat ? 'active' : ''}
          >
            {cat}
          </button>
        ))}
      </div>

        <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        key={filters.activeTag}
      >
        {filteredProjets.map(projet => (
          <motion.article key={projet.id} variants={cardVariants}>
            <h3>{projet.title}</h3>
            <img src={projet.img} width='100%' alt={projet.title} />
            <p>{projet.description}</p>
         
            <Link to={`/projects/${projet.id}`}>Voir plus →</Link>
          </motion.article>
        ))}
      </motion.div>
    </>
  )
}


export default ProjetCard;