import React from 'react';
import { motion } from 'framer-motion';

const Step = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-lg text-left">
    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
      {icon}
    </div>
    <h3 className="mt-5 text-xl font-bold text-slate-800">{title}</h3>
    <p className="mt-2 text-slate-500">{description}</p>
  </div>
);

function HowItWorks() {
  return (
    <motion.section 
      id="how-it-works" // <-- Add id here
      className="w-full max-w-7xl text-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-3xl sm:text-4xl font-bold text-slate-800">
        A Simple Three-Step Process
      </h2>
      <p className="mt-3 text-lg text-slate-600">
        Get your preliminary analysis in under a minute.
      </p>
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <Step
          icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>}
          title="1. Upload Image"
          description="Select a clear, high-quality fundus photograph from your device. Our tool supports PNG and JPG formats."
        />
        <Step
          icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M12 6V3m0 18v-3" /></svg>}
          title="2. AI Analysis"
          description="Our deep learning model, trained on the APTOS 2019 dataset, analyzes the image for signs of retinopathy."
        />
        <Step
          icon={<svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
          title="3. Review Results"
          description="Receive a preliminary classification into one of the five stages, helping you understand the potential severity."
        />
      </div>
    </motion.section>
  );
}

export default HowItWorks;