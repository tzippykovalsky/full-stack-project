
import { Navigate } from "react-router-dom";


const ProtectedRoute = ({ children }) => {
    let user = localStorage.getItem('myUser')

  console.log(user);
    if (!user||JSON.parse(user).role === 1) {
        return <Navigate to='/login'/>
    }
    return children;
    

}

export default ProtectedRoute;