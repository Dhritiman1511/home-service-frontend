/* eslint-disable react/prop-types */
const CategoryList = ({ categories, handleEditCategory, handleDeleteCategory }) => {
    return (
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Categories</h2>
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Category Name</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td className="border p-2">{category.name}</td>
                <td className="border p-2">
                  <button
                    className="mr-2 bg-yellow-500 text-white p-2 rounded"
                    onClick={() => handleEditCategory(category)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white p-2 rounded"
                    onClick={() => handleDeleteCategory(category._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default CategoryList;
  