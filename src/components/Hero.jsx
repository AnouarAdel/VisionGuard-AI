import ImageUploader from './ImageUploader';
import Results from './Results';
import { motion } from 'framer-motion';

function Hero({ onFileSelect, previewUrl, handleAnalyze, isLoading, results, handleReset, error, setError }) {
  return (
    <motion.section 
      className="w-full max-w-7xl text-center pt-12 sm:pt-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight">
        Early Detection for <span className="text-blue-600">Diabetic Retinopathy</span>
      </h1>
      <p className="mt-4 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
        Leverage the power of AI to analyze retinal images instantly. Upload a fundus photograph to get a preliminary assessment of diabetic retinopathy stages.
      </p>
      <div className="w-full mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-1">
          <ImageUploader 
            onFileSelect={onFileSelect}
            previewUrl={previewUrl}
            handleAnalyze={handleAnalyze}
            isLoading={isLoading}
            handleReset={handleReset}
            error={error}
            setError={setError}
          />
        </div>
        <div className="lg:col-span-1">
          <Results 
            results={results} // <-- Pass 'results' not 'history'
            isLoading={isLoading}
          />
        </div>
      </div>
    </motion.section>
  );
}

export default Hero;