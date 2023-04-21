import { Navigate, Outlet } from "react-router-dom"
import Cookies from "universal-cookie"




export const Protect = ({  children }) => {

   const cookies = new Cookies();

   const token = cookies.get('MyCookies')


   if (!token) {

   return <Navigate to="/login" />
   }
 

   return children ? children : <Outlet />

}




/*
 email de Heroku : giancarlosgenao7@gmail.com
 contrasena  del nuevo hosting : HerokyYankis$1

 dashboard.heroku.com/new-app
*/