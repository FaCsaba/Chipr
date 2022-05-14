import { Navigate } from "react-router-dom"
import { useAuth } from '../store/AuthProvider';

function PrivateRoute({children}: {children: JSX.Element}) {
    const {currentUser} = useAuth()

    return currentUser? children : <Navigate to={'/'}/>
}

export default PrivateRoute