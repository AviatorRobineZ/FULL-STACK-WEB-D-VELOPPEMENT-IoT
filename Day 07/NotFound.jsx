import { Link } from 'react-router-dom';
import PageTransition from '../components/PageTransition'

function NotFound() {
  return (
    <PageTransition>
      <h1>404 - Page not found</h1>
      <Link to='/'>Go back home</Link>
    </PageTransition>
  );
};

export default NotFound;