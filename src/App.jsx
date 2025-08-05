import { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import UnderstandingStages from './components/UnderstandingStages';
import History from './components/History';
import Footer from './components/Footer';
import Modal from './components/Modal';

function App() {
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [history, setHistory] = useState([]);
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState(null);

  const onFileSelect = (file) => { setImageFile(file); setPreviewUrl(URL.createObjectURL(file)); setError(null); setResults(null); };
  const handleAnalyze = async () => { if (!imageFile) return; setIsLoading(true); setError(null); setResults(null); const formData = new FormData(); formData.append('file', imageFile); try { const response = await fetch('http://localhost:5000/predict', { method: 'POST', body: formData }); if (!response.ok) { const errorData = await response.json().catch(() => ({ error: 'An unknown server error occurred.' })); throw new Error(errorData.error || `Server responded with status: ${response.status}`); } const data = await response.json(); const newResult = { ...data, id: new Date().getTime(), imageUrl: previewUrl }; setHistory(prevHistory => [newResult, ...prevHistory]); setResults(newResult); } catch (err) { console.error("Analysis Error:", err); setError(err.message || 'Failed to analyze image. Please try again.'); } finally { setIsLoading(false); } };
  const handleReset = () => { setImageFile(null); setPreviewUrl(''); setError(null); setResults(null); };
  const handleClearHistory = () => { setHistory([]); setSelectedHistoryItem(null); };
  const getResultColor = (stage, type = 'border') => { const colors = { border: ['border-green-500', 'border-yellow-500', 'border-orange-500', 'border-red-600', 'border-red-700'], text: ['text-green-600', 'text-yellow-600', 'text-orange-500', 'text-red-600', 'text-red-700'], bg: ['bg-green-100', 'bg-yellow-100', 'bg-orange-100', 'bg-red-100', 'bg-red-100'] }; return colors[type][stage] || 'border-slate-300'; };

  return (
    <div id="app-container">
      {/* We add padding here (py-6 for top/bottom) to create our own controlled spacing */}
      <div className="min-h-screen bg-slate-50 text-slate-800 py-6">
        <Header />
        <main className="w-full max-w-7xl mx-auto flex flex-col items-center px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
          <Hero onFileSelect={onFileSelect} previewUrl={previewUrl} handleAnalyze={handleAnalyze} isLoading={isLoading} results={results} handleReset={handleReset} error={error} setError={setError} />
          <HowItWorks />
          {history.length > 0 && (
            <History
              history={history}
              onClearHistory={handleClearHistory}
              onItemSelect={setSelectedHistoryItem}
            />
          )}
          <UnderstandingStages />
        </main>
        <Footer />
      </div>

      <Modal isOpen={!!selectedHistoryItem} onClose={() => setSelectedHistoryItem(null)}>
        {selectedHistoryItem && (
          <div>
            <div className={`p-4 rounded-t-lg ${getResultColor(selectedHistoryItem.stage, 'bg')}`}>
              <h2 className={`text-2xl font-bold ${getResultColor(selectedHistoryItem.stage, 'text')}`}>
                {selectedHistoryItem.name} (Stage {selectedHistoryItem.stage})
              </h2>
            </div>
            <div className="p-6">
              <img src={selectedHistoryItem.imageUrl} alt="Analyzed retina" className="w-full rounded-lg shadow-md mb-6" />
              <p className="text-slate-600">{selectedHistoryItem.description}</p>
              <div className="mt-6 p-4 bg-slate-100 rounded-lg">
                <p className="text-sm text-slate-700">
                  <span className="font-bold">Disclaimer:</span> This AI-generated analysis is for informational purposes only and does not constitute a medical diagnosis. Please consult a qualified ophthalmologist for a comprehensive evaluation.
                </p>
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default App;