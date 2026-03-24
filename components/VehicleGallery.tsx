"use client";

import { useMemo, useState } from "react";

type VehicleGalleryProps = {
  title: string;
  images: string[] | null | undefined;
  status?: string | null;
};

export default function VehicleGallery({
  title,
  images,
  status,
}: VehicleGalleryProps) {
  const validImages = useMemo(() => {
    if (!Array.isArray(images)) return [];
    return images.filter(
      (img): img is string => typeof img === "string" && img.trim() !== ""
    );
  }, [images]);

  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedImage =
    validImages[selectedIndex] || validImages[0] || "/placeholder.jpg";

  return (
    <div>
      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#101010]">
        <img
          src={selectedImage}
          alt={title}
          className="h-[520px] w-full object-cover"
        />

        <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.35),transparent_45%)]" />

        {status && (
          <div className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs uppercase tracking-[0.2em] text-white backdrop-blur-md">
            {status}
          </div>
        )}
      </div>

      {validImages.length > 1 && (
        <div className="mt-4 grid grid-cols-4 gap-3 sm:grid-cols-5">
          {validImages.map((image, index) => {
            const isActive = index === selectedIndex;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setSelectedIndex(index)}
                className={`overflow-hidden rounded-2xl border transition ${
                  isActive
                    ? "border-[#d71920] ring-2 ring-[#d71920]/30"
                    : "border-white/10 hover:border-white/30"
                }`}
              >
                <img
                  src={image}
                  alt={`${title} ${index + 1}`}
                  className="h-24 w-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}