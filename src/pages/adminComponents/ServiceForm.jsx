/* eslint-disable react/prop-types */

const ServiceForm = ({
  newService,
  categories,
  editingService,
  handleInputChange,
  handleSubmit,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="p-4 bg-gray-200 rounded shadow"
    >
      <h2 className="text-xl font-semibold mb-4">
        {editingService ? 'Edit Service' : 'Add Service'}
      </h2>
      <input
        type="text"
        name="name"
        placeholder="Service Name"
        value={newService.name}
        onChange={handleInputChange}
        required
        className="block w-full p-2 mb-4"
      />
      <input
        type="text"
        name="description"
        placeholder="Service Description"
        value={newService.description}
        onChange={handleInputChange}
        required
        className="block w-full p-2 mb-4"
      />
      <input
        type="number"
        name="price"
        placeholder="Service Price"
        value={newService.price}
        onChange={handleInputChange}
        required
        className="block w-full p-2 mb-4"
      />
      {/* Category Dropdown */}
      <select
        name="category"
        value={newService.category}
        onChange={handleInputChange}
        required
        className="block w-full p-2 mb-4"
      >
        <option value="">Select Category</option>
        {categories.map((category) => (
          <option key={category._id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      {/* Availability Dropdown */}
      <select
        name="availability"
        value={newService.availability}
        onChange={handleInputChange}
        className="block w-full p-2 mb-4"
      >
        <option value="Available">Available</option>
        <option value="Unavailable">Unavailable</option>
      </select>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        {editingService ? 'Update Service' : 'Add Service'}
      </button>
    </form>
  );
};

export default ServiceForm;
