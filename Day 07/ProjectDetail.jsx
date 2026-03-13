import { useParams, useNavigate, Navigate } from 'react-router-dom'
import PageTransition from '../components/PageTransition'
import Projets from '../data/projects'

function ProjectDetail() {
  const { id } = useParams()           
  const navigate = useNavigate()       

  const project = Projets.find(p => p.id === parseInt(id))  

 
  if (!project) return <Navigate to='/projects' />

  return (
    <PageTransition>
      <button onClick={() => navigate(-1)}>← Retour</button>
      <h1>{project.title}</h1>
      <img src={project.img} width='100%' alt={project.title} />
      <p>{project.description}</p>
      <span>{project.cat}</span>
    </PageTransition>
  )
};

export default ProjectDetail;