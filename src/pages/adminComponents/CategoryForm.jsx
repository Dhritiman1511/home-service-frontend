/* eslint-disable react/prop-types */
const CategoryForm = ({ newCategory, editingCategory, handleInputChange, handleSubmit }) => {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">{editingCategory ? 'Edit Category' : 'Add Category'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              name="name"
              value={newCategory.name}
              onChange={handleInputChange}
              className="border p-2 w-full mt-2"
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded"
          >
            {editingCategory ? 'Update Category' : 'Add Category'}
          </button>
        </form>
      </div>
    );
  };
  
  export default CategoryForm;
  