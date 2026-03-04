"use client";

export default function StudyGuidesPage() {
  const papers = [
    { name: "Maths Study Guide", file: "/files/11-Plus-Maths-preparation-guide.pdf" },
    { name: "English Study Guide", file: "/files/11-Plus-English-preparation-guide.pdf" },
    { name: "Verbal Reasoning Study Guide", file: "/files/11-Plus-Verbal-preparation-guide.pdf" },
    { name: "Non Verbal Reasoning Study Guide", file: "/files/11-Plus-NVR-preparation-guide.pdf" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-50 via-white to-indigo-50 py-12 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 mb-4">
          Study Guides
        </h1>
        <p className="text-center text-gray-600 mb-10 text-lg">
           Study Guides to prepare effectively.
        </p>

        {/* Papers List */}
        <ul className="grid gap-6 md:grid-cols-2">
          {papers.map((paper, index) => (
            <li
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 flex flex-col justify-between"
            >
              <span className="text-lg font-semibold text-gray-800 mb-4">
                {paper.name}
              </span>
              <a
                href={paper.file}
                target="_blank"
                className="inline-block text-center bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-medium px-5 py-2 rounded-lg hover:from-indigo-700 hover:to-blue-700 transition-all"
              >
                📥 Download
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
