import { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function TopicVisualizer() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [topics, setTopics] = useState<Record<string, number> | null>(null);
  const [error, setError] = useState('');

  const analyzeTopics = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setTopics(null);

    try {
      const response = await fetch('/api/analyze-topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze topics');
      }

      const data = await response.json();
      setTopics(data.topics);
    } catch (err) {
      setError('Failed to analyze topics. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const chartData = topics ? {
    labels: Object.keys(topics),
    datasets: [
      {
        label: 'Topic Frequency',
        data: Object.values(topics),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Website Topics Distribution',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Website Topic Analyzer</h1>
      
      <form onSubmit={analyzeTopics} className="mb-8">
        <div className="flex gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter website URL"
            required
            className="flex-1 p-2 border rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-blue-300"
          >
            {loading ? 'Analyzing...' : 'Analyze'}
          </button>
        </div>
      </form>

      {error && (
        <div className="text-red-500 mb-4">{error}</div>
      )}

      {topics && chartData && (
        <div className="bg-white p-4 rounded shadow">
          <Bar data={chartData} options={chartOptions} />
        </div>
      )}
    </div>
  );
}