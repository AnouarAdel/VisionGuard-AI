import React from 'react';
import { motion } from 'framer-motion';

const stages = [
  { stage: 0, name: 'No DR', description: 'No abnormalities are found. The retina appears healthy. Regular annual screenings are still recommended for diabetic patients.', colorClass: 'text-green-600', borderClass: 'border-green-500' },
  { stage: 1, name: 'Mild DR', description: 'The earliest stage. Small areas of swelling in the retina\'s blood vessels (microaneurysms) may be present.', colorClass: 'text-yellow-600', borderClass: 'border-yellow-500' },
  { stage: 2, name: 'Moderate DR', description: 'More significant damage to blood vessels is observed. Some blood vessels may be blocked, affecting blood flow to the retina.', colorClass: 'text-orange-500', borderClass: 'border-orange-500' },
  { stage: 3, name: 'Severe DR', description: 'Many blood vessels are blocked, leading to a significant decrease in blood supply to areas of the retina. The body signals for new blood vessels to grow.', colorClass: 'text-red-600', borderClass: 'border-red-500' },
  { stage: 4, name: 'Proliferative DR', description: 'The most advanced stage. New, fragile blood vessels begin to grow in the retina and into the vitreous (the gel-like fluid that fills the eye). These can leak blood and cause vision loss.', colorClass: 'text-red-700', borderClass: 'border-red-700' },
];

function UnderstandingStages() {
  return (
    <motion.section 
      id="about-stages" // <-- Add id here
      className="w-full max-w-7xl text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
        Understanding the Stages
      </h2>
      <p className="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
        Diabetic Retinopathy is classified into five stages, ranging from no signs to the most severe, vision-threatening level.
      </p>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
        {stages.map((stage) => (
          <div 
            key={stage.stage}
            className={`bg-white p-6 rounded-2xl border-t-4 shadow-lg transition-transform transform hover:-translate-y-2 ${stage.borderClass} ${stage.stage === 4 ? 'md:col-span-2 lg:col-span-1' : ''}`}
          >
            <h3 className={`text-2xl font-bold ${stage.colorClass}`}>
              Stage {stage.stage}: {stage.name}
            </h3>
            <p className="mt-3 text-slate-600">{stage.description}</p>
          </div>
        ))}
      </div>
    </motion.section>
  );
}

export default UnderstandingStages;