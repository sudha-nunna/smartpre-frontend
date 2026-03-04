import VideoCard from "@/components/VideoCard";

export default function VideoTutorialPage() {
  const videos = [
   
    {
      title: "Next.js 13 App Router Basics",
      description: "Learn the new App Router in Next.js 13.",
      youtubeId: "mTz0GXj8NN0", // ✅ working
    },
    {
      title: "JavaScript Full Course",
      description: "Complete JavaScript course for beginners.",
      youtubeId: "PkZNo7MFNFg", // ✅ working
    },
    {
      title: "Tailwind CSS Crash Course",
      description: "Learn Tailwind CSS with examples.",
      youtubeId: "dFgzHOX84xQ", // ✅ working
    },
    {
      title: "Node.js Crash Course",
      description: "Get started with backend development using Node.js.",
      youtubeId: "fBNz5xF-Kx4", // ✅ working
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-blue-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Page Title */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4">
            📺 Video Tutorials
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Watch curated tutorials on React, Next.js, JavaScript, TailwindCSS,
            and more — all in one place!
          </p>
        </div>

        {/* Grid of Videos */}
        <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {videos.map((video) => (
            <VideoCard
              key={video.youtubeId}
              title={video.title}
              description={video.description}
              youtubeId={video.youtubeId}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
