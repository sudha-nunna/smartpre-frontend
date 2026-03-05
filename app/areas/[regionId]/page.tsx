"use client";

import { use, useEffect, useState } from "react";

export default function RegionSchoolsPage({ params }: { params: Promise<{ regionId: string }> }) {
  const { regionId } = use(params);
  const [schools, setSchools] = useState<any[]>([]);
  const [filterGender, setFilterGender] = useState("Any");

  useEffect(() => {
    if (regionId) {
      fetch(` https://smartprep-backend-4.onrender.com/api/regional-schools/region/${regionId}`)
        .then((res) => res.json())
        .then((data) => setSchools(data))
        .catch((err) => console.error("Error fetching schools:", err));
    }
  }, [regionId]);

  // ✅ Filter schools by gender
  const filteredSchools =
    filterGender === "Any"
      ? schools
      : schools.filter(
          (s) => s.gender?.toLowerCase() === filterGender.toLowerCase()
        );

  return (
    <div className="p-8">
      {/* Title */}
      <h1 className="text-3xl font-extrabold text-blue-700 mb-6">
        Schools in this Region
      </h1>

      {/* Gender Filter */}
      <div className="mb-6 flex items-center gap-4">
        <label className="text-lg font-medium text-gray-700">Gender:</label>
        <select
          value={filterGender}
          onChange={(e) => setFilterGender(e.target.value)}
          className="px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="Any">Any</option>
          <option value="Boys">Boys</option>
          <option value="Girls">Girls</option>
          <option value="Mixed">Mixed</option>
        </select>
      </div>

      {/* Schools Grid */}
      {filteredSchools.length === 0 ? (
        <p className="text-gray-600">No schools found for this filter.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSchools.map((school) => (
            <div
              key={school._id}
              className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300"
            >
              {/* Logo */}
              {school.logo ? (
                <div className="flex justify-center">
                  <img
                    src={school.logo}
                    alt={school.name || "School Logo"}
                    className="w-28 h-28 object-contain mb-4 rounded-lg border border-gray-200 bg-white p-2"
                  />
                </div>
              ) : (
                <div className="w-28 h-28 bg-gray-200 flex items-center justify-center mx-auto mb-4 rounded-lg">
                  <span className="text-gray-500 text-sm">No Logo</span>
                </div>
              )}

              {/* Name */}
              <h2 className="text-xl font-semibold text-center text-blue-900 mb-2">
                {school.name}
              </h2>

              {/* Gender */}
              <p className="text-center text-sm font-medium text-purple-600">
                {school.gender || "General"}
              </p>

              {/* Description */}
              <p className="text-center text-gray-600 text-sm mt-2">
                {school.description || "No description available."}
              </p>

              {/* CTA Button */}
              <div className="flex justify-center mt-4">
                <button className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg shadow hover:bg-blue-700 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
