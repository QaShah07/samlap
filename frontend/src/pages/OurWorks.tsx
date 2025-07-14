// frontend/src/pages/OurWorks.tsx

import React, { useState, useEffect } from "react";
import DownloadModal from "../components/DownloadModal";
import api from "../services/api";

type ResourceItem = {
  id: number;
  title: string;
  description: string;
  category: "paper" | "dataset" | "code";
  slug: string;
  thumbnail_url: string | null;
  file_url: string | null;
  external_url: string | null;
};

const OurWorks: React.FC = () => {
  // 1. State for all resources fetched from backend
  const [resources, setResources] = useState<ResourceItem[]>([]);
  // 2. Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<ResourceItem | null>(null);

  // 3. Fetch resources on first render
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await api.get<ResourceItem[]>("/resources/");
        setResources(response.data);
      } catch (err) {
        console.error("Failed to load resources", err);
      }
    };
    fetchResources();
  }, []);

  // 4. Open modal for a given resource
  const openModal = (item: ResourceItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  // 5. Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-6">Our Works</h1>

      {/* Optionally, a search bar or filter could go here */}

      <div className="grid grid-cols-1 gap-12">
        {resources.map((item) => (
          <div
            key={item.slug}
            className="flex flex-col md:flex-row items-start bg-white rounded-xl shadow-md overflow-hidden"
          >
            {/* Thumbnail/Image */}
            <div className="md:w-1/3 w-full">
              {item.thumbnail_url ? (
                <img
                  src={item.thumbnail_url}
                  alt={item.title}
                  className="w-full h-auto object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
            </div>

            {/* Text Section */}
            <div className="md:w-2/3 w-full p-6">
              <p className="text-sm uppercase text-gray-500 mb-1">
                {item.category === "paper"
                  ? "Research Paper"
                  : item.category === "dataset"
                  ? "Dataset"
                  : "Code Repository"}
              </p>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {item.title}
              </h2>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <button
                onClick={() => openModal(item)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-full"
              >
                Submit & Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 6. Download Modal */}
      {selectedItem && (
        <DownloadModal
          isOpen={isModalOpen}
          onClose={closeModal}
          resourceType={selectedItem.category}
          resourceSlug={selectedItem.slug}
          resourceName={selectedItem.title}
          // Choose file_url if it exists, otherwise external_url
          downloadUrl={selectedItem.file_url || selectedItem.external_url || ""}
        />
      )}
    </div>
  );
};

export default OurWorks;
