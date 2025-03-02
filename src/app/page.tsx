import { useState } from "react";
import type { GetServerSideProps, NextPage } from "next";

// Define the type for an image
type Image = {
  id: number;
  webformatURL: string;
  tags: string;
};

// Define the props for the component
type HomeProps = {
  initialImages: Image[]; // Images fetched on the server side
};

const Home: NextPage<HomeProps> = ({ initialImages }) => {
  const [query, setQuery] = useState<string>("");
  const [images, setImages] = useState<Image[]>(initialImages);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle search form submission (Client-Side Rendering)
  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`/api/search?q=${query}`);
      const data = await response.json();
      setImages(data.images); // Update images with the search results
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='min-h-screen bg-gray-100 py-8'>
      <div className='container mx-auto px-4'>
        <h1 className='text-4xl font-bold text-center mb-8'>Image Search</h1>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className='mb-8'>
          <div className='flex justify-center'>
            <input
              type='text'
              value={query}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setQuery(e.target.value)
              }
              placeholder='Search for images...'
              className='w-full max-w-md px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
            />
            <button
              type='submit'
              className='px-6 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              Search
            </button>
          </div>
        </form>

        {/* Image Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {loading
            ? // Show loading skeletons
              Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className='bg-white rounded-lg shadow-md overflow-hidden'
                >
                  <div className='w-full h-48 bg-gray-200 animate-pulse'></div>
                  <div className='p-4'>
                    <div className='h-4 bg-gray-200 animate-pulse rounded'></div>
                  </div>
                </div>
              ))
            : // Show actual images
              images.map((image) => (
                <div
                  key={image.id}
                  className='bg-white rounded-lg shadow-md overflow-hidden'
                >
                  <img
                    src={image.webformatURL}
                    alt={image.tags}
                    className='w-full h-48 object-cover'
                  />
                  <div className='p-4'>
                    <p className='text-sm text-gray-700'>{image.tags}</p>
                  </div>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

// Fetch initial data on the server side (Server-Side Rendering)
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  // Fetch initial images from Pixabay API
  const PIXABAY_API_KEY = "YOUR_PIXABAY_API_KEY"; // Replace with your Pixabay API key
  const res = await fetch(
    `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=nature&image_type=photo&per_page=12`
  );
  const data = await res.json();
  const initialImages: Image[] = data.hits;

  return {
    props: {
      initialImages,
    },
  };
};

export default Home;
