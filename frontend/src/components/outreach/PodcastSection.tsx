import React, { useState, useEffect } from 'react';
import { Play } from 'lucide-react';
import api from '../../services/api';

interface Podcast {
  id: number;
  title: string;
  episode_number: number;
  speaker: string;
  description: string;
  media_url: string;
  thumbnail_url: string | null;
  published_on: string;
}

const PodcastSection: React.FC = () => {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPodcasts = async () => {
      try {
        const response = await api.get<Podcast[]>('/outreach/podcasts/');
        setPodcasts(response.data);
      } catch (err) {
        console.error('Error fetching podcasts:', err);
        setError('Failed to load podcasts. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchPodcasts();
  }, []);

  if (loading) {
    return (
      <section id="podcasts\" className="animate-pulse">
        <h2 className="text-3xl font-semibold mb-8 text-slate-800">Podcasts</h2>
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-lg shadow-sm p-6">
              <div className="h-32 bg-gray-200 rounded-md"></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="podcasts">
        <h2 className="text-3xl font-semibold mb-8 text-slate-800">Podcasts</h2>
        <div className="bg-red-50 text-red-600 p-4 rounded-md">{error}</div>
      </section>
    );
  }

  return (
    <section id="podcasts">
      <h2 className="text-3xl font-semibold mb-8 text-slate-800">Podcasts</h2>
      <div className="space-y-6">
        {podcasts.map((podcast) => (
          <div 
            key={podcast.id} 
            className="bg-white rounded-lg shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md"
          >
            <div className="flex flex-col md:flex-row">
              <div className="md:w-48 lg:w-56 flex-shrink-0 bg-gray-100">
                {podcast.thumbnail_url ? (
                  <img 
                    src={podcast.thumbnail_url} 
                    alt={podcast.title}
                    className="w-full h-full object-cover aspect-square" 
                  />
                ) : (
                  <div className="w-full h-full aspect-square flex items-center justify-center bg-slate-100">
                    <span className="text-slate-400">No Image</span>
                  </div>
                )}
              </div>
              <div className="p-6 flex-1">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-1">
                      {podcast.title}
                    </h3>
                    <p className="text-sm text-slate-500 mb-3">
                      Episode {podcast.episode_number}: {podcast.speaker}
                    </p>
                    <p className="text-slate-600 mb-4 line-clamp-2 md:line-clamp-3">
                      {podcast.description}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <a
                      href={podcast.media_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-800 text-white hover:bg-slate-700 transition-colors duration-200"
                    >
                      <Play size={16} />
                      <span>Play</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PodcastSection;