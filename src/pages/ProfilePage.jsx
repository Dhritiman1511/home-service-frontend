import React from 'react';

const ProfilePage = () => (
  <div className="container mx-auto mt-8">
    <h1 className="text-2xl font-bold">Your Profile</h1>
    <form className="space-y-4 mt-4">
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="w-full border p-2"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border p-2"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2">
        Save Changes
      </button>
    </form>
  </div>
);

export default ProfilePage;
