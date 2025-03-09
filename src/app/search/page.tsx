import ImageGrid from "../components/ImageGrid";
import SearchBar from "../components/SearchBar";

async function getInitialImages() {
  try {
    const res = await fetch(
      `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_API_KEY}&q=nature&image_type=photo&per_page=12`
    );

    if (!res.ok) {
      throw new Error("Failed to fetch images");
    }

    const data = await res.json();
    return data.hits;
  } catch (error) {
    console.error("Error fetching images:", error);
    return [];
  }
}

export default async function SearchPage() {
  const initialImages = await getInitialImages();

  return (
    <div className='min-h-screen bg-gray-100 py-8'>
      <div className='container mx-auto px-4'>
        <h1 className='text-4xl font-bold text-center mb-8'>Image Search</h1>

        <SearchBar />

        <ImageGrid initialImages={initialImages} />
      </div>
    </div>
  );
}
