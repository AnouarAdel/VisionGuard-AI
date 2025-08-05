import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ErrorMessage = ({ message, onDismiss }) => (
  <motion.div
    className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg relative mt-4"
    role="alert"
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20, transition: { duration: 0.2 } }}
  >
    <strong className="font-bold">Error: </strong>
    <span className="block sm:inline">{message}</span>
    <button onClick={onDismiss} className="absolute top-0 bottom-0 right-0 px-4 py-3">
      <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
    </button>
  </motion.div>
);

function ImageUploader({ onFileSelect, previewUrl, handleAnalyze, isLoading, handleReset, error, setError }) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = (file) => {
    if (file && file.type.startsWith('image/')) {
      onFileSelect(file);
    }
  };

  const handleImageChange = (e) => { handleFile(e.target.files[0]); };
  const handleDragOver = (e) => { e.preventDefault(); setIsDragging(true); };
  const handleDragLeave = (e) => { e.preventDefault(); setIsDragging(false); };
  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files.length) { handleFile(files[0]); }
  };

  return (
    <section className="bg-white border border-slate-200 p-8 rounded-2xl shadow-lg h-full flex flex-col justify-center">
      <h2 className="text-2xl font-semibold mb-4 text-slate-800 text-center">
        Upload Retinal Image
      </h2>
      <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-lg p-10 transition-colors duration-300 ${isDragging ? 'border-solid border-blue-600 bg-blue-50' : 'border-slate-300 hover:border-blue-500'}`}
      >
        <input type="file" id="imageUpload" className="hidden" accept="image/png, image/jpeg, image/jpg" onChange={handleImageChange} />
        
        {/* --- This is the corrected, filled-in block --- */}
        {previewUrl ? (
          <div className="text-center">
            <img src={previewUrl} alt="Selected preview" className="max-h-60 mx-auto rounded-md shadow-md" />
            <div className="mt-6 flex justify-center items-center space-x-4">
              <button onClick={handleAnalyze} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-all duration-300">
                {isLoading ? 'Analyzing...' : 'Analyze Image'}
              </button>
              <button onClick={handleReset} disabled={isLoading} className="bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-300 text-slate-700 font-bold py-3 px-6 rounded-lg transition-all duration-300">
                Clear
              </button>
            </div>
          </div>
        ) : (
          <label htmlFor="imageUpload" className="flex flex-col items-center cursor-pointer">
            <svg className="w-16 h-16 text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
            <p className="text-slate-500"><span className="font-semibold text-blue-600">Click to upload</span> or drag and drop</p>
            <p className="text-xs text-slate-400 mt-2">PNG, JPG, or JPEG</p>
          </label>
        )}
        {/* --- End of corrected block --- */}

      </div>
      <AnimatePresence>
        {error && <ErrorMessage message={error} onDismiss={() => setError(null)} />}
      </AnimatePresence>
    </section>
  );
}

export default ImageUploader;