import { motion } from 'framer-motion';

function History({ history, onClearHistory, onItemSelect }) {

  const getResultColor = (stage) => {
    const colors = {
      border: ['border-green-500', 'border-yellow-500', 'border-orange-500', 'border-red-600', 'border-red-700']
    };
    return colors['border'][stage] || 'border-slate-300';
  };

  return (
    <motion.section 
      className="w-full max-w-7xl text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 text-left">
          Analysis History
        </h2>
        <button onClick={onClearHistory} className="bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 px-4 rounded-lg text-sm transition-colors">
          Clear History
        </button>
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {history.map((item) => (
          <button 
            key={item.id}
            onClick={() => onItemSelect(item)}
            className={`bg-white rounded-lg shadow-md overflow-hidden border-b-4 text-left transition-transform transform hover:-translate-y-1 hover:shadow-xl ${getResultColor(item.stage)}`}
          >
            <img src={item.imageUrl} alt="Analyzed retina" className="w-full h-32 object-cover"/>
            <div className="p-4">
              <h3 className="font-bold text-slate-800">{item.name}</h3>
              <p className="text-sm text-slate-500">Stage {item.stage}</p>
            </div>
          </button>
        ))}
      </div>
    </motion.section>
  );
}

export default History;