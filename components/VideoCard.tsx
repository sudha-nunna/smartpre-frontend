"use client";

type VideoCardProps = {
  title: string;
  description: string;
  youtubeId: string;
};

export default function VideoCard({ title, description, youtubeId }: VideoCardProps) {
  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-4 mb-6">
      <h3 className="text-xl font-bold mb-2">{title}</h3>

      {/* Responsive video */}
      <div className="relative pb-[56.25%] h-0 overflow-hidden mb-2">
        <iframe
          className="absolute top-0 left-0 w-full h-full rounded"
          src={`https://www.youtube.com/embed/${youtubeId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>

      <p className="text-gray-600">{description}</p>
    </div>
  );
}
