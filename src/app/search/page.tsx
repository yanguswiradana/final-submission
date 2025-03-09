import ImageGrid from "../components/ImageGrid";
import SearchBar from "../components/SearchBar";

async function getInitialImages() {
  const res = await fetch(
    `https://pixabay.com/api/?key=${process.env.NEXT_PUBLIC_PIXABAY_API_KEY}&q=nature&image_type=photo&per_page=12`
  );
  const data = await res.json();
  return data.hits;
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
