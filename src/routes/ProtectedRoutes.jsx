//  import { useContext, useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { toast } from 'react-toastify';
// import { jwtDecode } from 'jwt-decode';

// const ProtectedRoute = ({ children }) => {
//   const [state, dispatch] = useContext(AuthContext);
// //   const [isValidating, setIsValidating] = useState(true);
//   const [isTokenValid, setIsTokenValid] = useState(false);

//   useEffect(() => {
//     const validateToken = () => {
//       const token = localStorage.getItem('auth-token');
      
//       if (!token) {
//         setIsTokenValid(false);
//         setIsValidating(false);
//         return;
//       }

//       try {
//         const decodedToken = jwtDecode(token);
//         const currentTime = Date.now() / 1000;
//         if (decodedToken.exp && decodedToken.exp < currentTime) {
//           throw new Error('Token expired');
//         }
//         if (!decodedToken.sub && !decodedToken.userId) {
//           throw new Error('Invalid token structure');
//         }

//         setIsTokenValid(true);
//         // dispatch({ 
//         //   type: 'setT', 
//         //   payload: {
//         //     id: decodedToken.userId,
//         //     email: decodedToken.email
//         //   }
//         // });

//       } catch (error) {
//         console.error('Token validation failed:', error);
//         localStorage.removeItem('auth-token');
//         dispatch({ type: 'setToken', payload: null });
        
//         toast.error('Session expired. Please log in again.', {
//           position: 'top-center',
//           autoClose: 3000
//         });
        
//         setIsTokenValid(false);
//       } finally {
//         setIsValidating(false);
//       }
//     };

//     validateToken();
//   }, [dispatch]);

// //   if (isValidating) {
// //     return (
// //       <div className="min-h-screen flex items-center justify-center bg-gray-100">
// //         <div className="text-center">
// //           <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
// //           <p className="mt-4 text-gray-600">Verifying session...</p>
// //         </div>
// //       </div>
// //     );
// //   }

//   if (!isTokenValid) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// };

// export default ProtectedRoute;