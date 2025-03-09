"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      const encodedQuery = encodeURIComponent(query.trim());
      router.replace(`/search?q=${encodedQuery}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className='mb-8'>
      <div className='flex justify-center'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder='Search for images...'
          className='w-full max-w-md px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
          aria-label='Search for images'
        />
        <button
          type='submit'
          className='px-6 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
          aria-label='Submit search'
        >
          Search
        </button>
      </div>
    </form>
  );
}
