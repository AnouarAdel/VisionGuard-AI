import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SkeletonLoader = () => (
  <motion.div
    className="w-full"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { duration: 0.2 } }}
    exit={{ opacity: 0, transition: { duration: 0.2 } }}
  >
    <div className="w-full animate-pulse">
      <div className="h-8 bg-slate-200 rounded-md w-3/4 mb-4"></div>
      <div className="space-y-3"><div className="h-4 bg-slate-200 rounded-md w-full"></div><div className="h-4 bg-slate-200 rounded-md w-5/6"></div></div>
    </div>
  </motion.div>
);

const ResultDisplay = ({ results }) => {
  const getResultColor = (stage) => { /* ... same as before ... */ switch (stage) { case 0: return 'text-green-600'; case 1: return 'text-yellow-600'; case 2: return 'text-orange-500'; case 3: return 'text-red-600'; case 4: return 'text-red-700'; default: return 'text-slate-600'; } };
  
  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-lg text-slate-600">
        Diagnosis:
        <span className={`ml-2 font-bold text-2xl ${getResultColor(results.stage)}`}>
          {results.name} (Stage {results.stage})
        </span>
      </p>
      <p className="text-slate-500 mt-2">{results.description}</p>
    </motion.div>
  );
};

function Results({ isLoading, results }) {
  const [showLoader, setShowLoader] = useState(false);

  // This effect handles the loader delay to prevent flashing
  useEffect(() => {
    let timer;
    if (isLoading) {
      // Only show loader if loading for more than 300ms
      timer = setTimeout(() => setShowLoader(true), 300);
    } else {
      setShowLoader(false);
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  return (
    <section className="bg-white border border-slate-200 p-8 rounded-2xl shadow-lg h-full">
      <h2 className="text-2xl font-semibold mb-4 text-slate-800 text-center">
        Analysis Results
      </h2>
      <div className="text-left min-h-[150px] flex items-center justify-center">
        <AnimatePresence mode="wait">
          {showLoader && !results ? (
            <SkeletonLoader key="loader" />
          ) : results ? (
            <ResultDisplay key="results" results={results} />
          ) : (
            <motion.p key="placeholder" className="text-center text-slate-400">
              Upload an image to see the diagnosis.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

export default Results;