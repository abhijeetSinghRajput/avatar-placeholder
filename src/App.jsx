import React, { useState } from "react";
import { Copy, CopyCheck, Download } from "lucide-react";
import data from "./data.json";

const App = () => {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (url, index) => {
    navigator.clipboard.writeText(url);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleDownload = async (url, name) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = blobUrl;
      link.download = `${name.replace(/\s+/g, "_").toLowerCase()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto min-h-screen bg-zinc-900 p-8 text-white">
      <div>
        <div className="grid md:grid-cols-2 grid-cols-1 mb-12">
          <div className="space-y-4 my-auto md:text-left text-center">
            <h2 className="font-bold text-5xl">100 Free User Avatars</h2>
            <p className="text-lg text-zinc-400">
              You can download these free placeholder user avatars and profile
              pictures for your design projects. They are available in JPG, PNG
              or WEBP formats!
            </p>
          </div>
          <div className="max-">
            <img
              className="w-full h-full object-contain"
              src="https://tabler.io/img/avatars/hero.png"
              alt="hero"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {data.map(({ name, url, gender }, index) => (
          <div
            key={index}
            className="relative bg-zinc-800 aspect-square rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow group"
          >
            <img
              src={url}
              alt={name}
              className="w-full h-full object-cover rounded-xl"
              referrerPolicy="no-referrer"
            />

            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

            {/* Content container */}
            <div className="p-4 flex justify-between items-end absolute bottom-0 left-0 w-full z-10">
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-white text-sm truncate">
                  {name}
                </h3>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => handleCopy(url, index)}
                  className={`size-7 flex items-center justify-center text-white bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-all  ${
                    copiedIndex === index
                      ? "bg-zinc-100 text-black hover:bg-zinc-100"
                      : ""
                  }`}
                  aria-label="Copy"
                >
                  {copiedIndex === index ? (
                    <CopyCheck size={16} />
                  ) : (
                    <Copy size={16} />
                  )}
                </button>

                <button
                  onClick={() => handleDownload(url, name)}
                  className="size-7 flex items-center justify-center text-white bg-white/20 rounded-lg backdrop-blur-sm hover:bg-white/30 transition-all"
                  aria-label="Download"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
