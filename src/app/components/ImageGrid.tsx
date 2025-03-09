"use client";

import { useEffect, useState } from "react";

type Image = {
  id: number;
  webformatURL: string;
  tags: string;
};

export default function ImageGrid({
  initialImages,
}: {
  initialImages: Image[];
}) {
  const [images, setImages] = useState<Image[]>(initialImages);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const query = searchParams.get("q");

    if (query) {
      setLoading(true);
      fetch(`/api/search?q=${query}`)
        .then((res) => res.json())
        .then((data) => {
          setImages(data.images);
          setLoading(false);
        });
    }
  }, [window.location.search]);

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      {loading
        ? Array.from({ length: 8 }).map((_, index) => (
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
        : images.map((image) => (
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
  );
}
