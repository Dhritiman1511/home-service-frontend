import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
 const { register } = useAuth();
 const [formData, setFormData] = useState({
   name: '',
   email: '',
   password: '',
   address: '',
   phone: '',
   role: 'user'
 });
 const [error, setError] = useState('');

 const handleChange = (e) => {
   setFormData({ ...formData, [e.target.id]: e.target.value });
 };

 const handleRegister = async (e) => {
   e.preventDefault();
   setError('');
   try {
     await register(formData);
   } catch (err) {
     setError(err.message || 'Registration failed');
   }
 };

 return (
   <div className="max-w-md mx-auto mt-10 p-6 border rounded-lg shadow-lg">
     <h2 className="text-2xl font-bold mb-6">Register</h2>
     {error && (
       <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
         {error}
       </div>
     )}
     <form onSubmit={handleRegister} className="space-y-4">
       <div>
         <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
         <input
           type="text"
           id="name"
           className="w-full p-2 mt-1 border rounded-lg"
           value={formData.name}
           onChange={handleChange}
           required
         />
       </div>

       <div>
         <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
         <input
           type="email"
           id="email"
           className="w-full p-2 mt-1 border rounded-lg"
           value={formData.email}
           onChange={handleChange}
           required
         />
       </div>

       <div>
         <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
         <input
           type="password"
           id="password"
           className="w-full p-2 mt-1 border rounded-lg"
           value={formData.password}
           onChange={handleChange}
           required
         />
       </div>

       <div>
         <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
         <input
           type="text"
           id="address"
           className="w-full p-2 mt-1 border rounded-lg"
           value={formData.address}
           onChange={handleChange}
           required
         />
       </div>

       <div>
         <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
         <input
           type="tel"
           id="phone"
           className="w-full p-2 mt-1 border rounded-lg"
           value={formData.phone}
           onChange={handleChange}
           required
         />
       </div>

       <div>
         <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
         <select
           id="role"
           className="w-full p-2 mt-1 border rounded-lg"
           value={formData.role}
           onChange={handleChange}
           required
         >
           <option value="user">User</option>
           <option value="service_provider">Service Provider</option>
           <option value="admin">Admin</option>
         </select>
       </div>

       <button type="submit" className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600">
         Register
       </button>
     </form>
   </div>
 );
};

export default Register;