import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Hero from './userComponents/Hero';
import PopularServices from './userComponents/PopularServices';
import WhyCallOnce from './userComponents/WhyCallOnce';
import CustomerReviews from './userComponents/CustomerReviews';

const HomePage = () => {
  const { authData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If the user is logged in, redirect to the User Dashboard
    if (authData) {
      navigate('/user/dashboard');
    }
  }, [authData, navigate]);

  return (
    <div className="font-sans">
      <Hero />
      <PopularServices />
      <WhyCallOnce />
      <CustomerReviews />
    </div>
  );
};

export default HomePage;