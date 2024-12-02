import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Button variant="outline-danger" onClick={handleLogout} className="justify-content-end">
      Logout
    </Button>
  );
}

export default Logout; 