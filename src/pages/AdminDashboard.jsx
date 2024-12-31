import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/cookieUtils";
import {
  getServices,
  addService,
  updateService,
  deleteService,
} from "../services/serviceService";
import { getUsers, getServiceProvider } from "../services/adminService";
import {
  fetchAllBookingsForAdmin,
  updateBooking,
  deleteBooking,
  updateBookingStatus,
} from "../services/bookingService"; // Import booking services
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../services/categoryService"; // Import category services
import ServiceList from "./adminComponents/ServiceList";
import ServiceForm from "./adminComponents/ServiceForm";
import BookingList from "./adminComponents/BookingList"; // Import the BookingList component
import BookingForm from "./adminComponents/BookingForm"; // Import the BookingForm component
import CategoryList from "./adminComponents/CategoryList"; // Import the CategoryList component
import CategoryForm from "./adminComponents/CategoryForm"; // Import the CategoryForm component
import ServiceProviderList from "./adminComponents/ServiceProviderList";
import UserList from "./adminComponents/UserList";

const AdminDashboard = () => {
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([]);
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    availability: "Available",
  });
  const [editingService, setEditingService] = useState(null);
  const [newCategory, setNewCategory] = useState({ name: "" });
  const [editingCategory, setEditingCategory] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [editingBooking, setEditingBooking] = useState(null);
  const [users, setUsers] = useState([]);
  const [serviceProviders, setServiceProviders] = useState([]);

  useEffect(() => {
    fetchServices();
    fetchCategories();
    fetchBookings();
    fetchUsers();
    fetchServiceProviders();
  }, []);

  const fetchServices = async () => {
    try {
      const data = await getServices();
      setServices(data);
    } catch (error) {
      console.log("Error fetching services:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.log("Error fetching users:", error);
    }
  };

  const fetchServiceProviders = async () => {
    try {
      const data = await getServiceProvider();
      setServiceProviders(data);
    } catch (error) {
      console.log("Error fetching service providers:", error);
    }
  };

  const fetchBookings = async () => {
    try {
      const data = await fetchAllBookingsForAdmin();
      setBookings(data);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewService({ ...newService, [name]: value });
  };

  const handleAddService = async (e) => {
    e.preventDefault();
    try {
      // Retrieve the JWT token from cookies
      const token = getToken();

      if (!token) {
        console.log("No token found. Please log in.");
        return;
      }

      // Decode the token to get the user's ID
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.id; 

      if (!userId) {
        console.log("Invalid token. User ID not found.");
        return;
      }

      // Set the provider field in the newService object
      const serviceWithProvider = { ...newService, provider: userId };

      // Add the service to the backend
      const addedService = await addService(serviceWithProvider);
      setServices([...services, addedService]);

      // Reset the form
      setNewService({
        name: "",
        description: "",
        price: "",
        category: "",
        availability: "Available",
        provider: "",
      });
    } catch (error) {
      console.log("Error adding service:", error);
    }
  };

  const handleEditService = (service) => {
    setEditingService(service);
    setNewService(service);
  };

  const handleUpdateService = async (e) => {
    e.preventDefault();
    try {
      const updatedService = await updateService(
        editingService._id,
        newService
      );
      setServices(
        services.map((service) =>
          service._id === updatedService._id ? updatedService : service
        )
      );
      setEditingService(null);
      setNewService({
        name: "",
        description: "",
        price: "",
        category: "",
        availability: "Available",
      });
    } catch (error) {
      console.log("Error updating service:", error);
    }
  };

  const handleDeleteService = async (serviceId) => {
    try {
      await deleteService(serviceId);
      setServices(services.filter((service) => service._id !== serviceId));
    } catch (error) {
      console.log("Error deleting service:", error);
    }
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setNewCategory(category);
  };

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      const addedCategory = await createCategory(newCategory);
      setCategories([...categories, addedCategory]);
      setNewCategory({ name: "" });
    } catch (error) {
      console.log("Error adding category:", error);
    }
  };

  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    try {
      const updatedCategory = await updateCategory(
        editingCategory._id,
        newCategory
      );
      setCategories(
        categories.map((category) =>
          category._id === updatedCategory._id ? updatedCategory : category
        )
      );
      setEditingCategory(null);
      setNewCategory({ name: "" });
    } catch (error) {
      console.log("Error updating category:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      await deleteCategory(categoryId);
      setCategories(
        categories.filter((category) => category._id !== categoryId)
      );
    } catch (error) {
      console.log("Error deleting category:", error);
    }
  };

  const handleEditBooking = (booking) => {
    setEditingBooking(booking);
  };

  const handleUpdateBooking = async (bookingId, updates) => {
    try {
      const updatedBooking = await updateBooking(bookingId, updates);
      setBookings(
        bookings.map((booking) =>
          booking._id === updatedBooking._id ? updatedBooking : booking
        )
      );
      setEditingBooking(null);
    } catch (error) {
      console.log("Error updating booking:", error);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    try {
      await deleteBooking(bookingId);
      setBookings(bookings.filter((booking) => booking._id !== bookingId));
    } catch (error) {
      console.log("Error deleting booking:", error);
    }
  };

  const handleUpdateBookingStatus = async (bookingId, status) => {
    try {
      const updatedBooking = await updateBookingStatus(bookingId, status);
      setBookings(
        bookings.map((booking) =>
          booking._id === updatedBooking._id ? updatedBooking : booking
        )
      );
    } catch (error) {
      console.log("Error updating booking status:", error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

      {/* Users Section */}
      <UserList users={users} />

      {/* Service Providers Section */}
      <ServiceProviderList serviceProviders={serviceProviders} />

      {/* Services Section */}
      <ServiceList
        services={services}
        handleEditService={handleEditService}
        handleDeleteService={handleDeleteService}
      />
      <ServiceForm
        newService={newService}
        categories={categories}
        editingService={editingService}
        handleInputChange={handleInputChange}
        handleSubmit={editingService ? handleUpdateService : handleAddService}
      />

      {/* Category Section */}
      <CategoryList
        categories={categories}
        handleEditCategory={handleEditCategory}
        handleDeleteCategory={handleDeleteCategory}
      />
      <CategoryForm
        newCategory={newCategory}
        editingCategory={editingCategory}
        handleInputChange={(e) =>
          setNewCategory({ ...newCategory, name: e.target.value })
        }
        handleSubmit={
          editingCategory ? handleUpdateCategory : handleAddCategory
        }
      />

      {/* Bookings Section */}
      <BookingList
        bookings={bookings}
        handleEditBooking={handleEditBooking}
        handleDeleteBooking={handleDeleteBooking}
        handleUpdateBookingStatus={handleUpdateBookingStatus}
      />
      {editingBooking && (
        <BookingForm
          booking={editingBooking}
          handleUpdateBooking={handleUpdateBooking}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
