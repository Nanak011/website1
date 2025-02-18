import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Droplets, AlertTriangle, Heart, Activity, Plus, RotateCcw } from 'lucide-react';

type BloodType = 'A' | 'B' | 'AB' | 'O';
type RhFactor = 'positive' | 'negative';
type AntibodyTest = 'anti-a' | 'anti-b' | 'rh';

interface TestResult {
  antiA: boolean;
  antiB: boolean;
  rh: boolean;
}

interface BloodSample {
  type: BloodType;
  rhFactor: RhFactor;
}

const BloodTypingLab = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedSample, setSelectedSample] = useState<BloodSample | null>(null);
  const [testResults, setTestResults] = useState<TestResult>({ antiA: false, antiB: false, rh: false });
  const [completedTests, setCompletedTests] = useState<AntibodyTest[]>([]);
  const [showResults, setShowResults] = useState(false);

  const bloodSamples: BloodSample[] = [
    { type: 'A', rhFactor: 'positive' },
    { type: 'B', rhFactor: 'positive' },
    { type: 'AB', rhFactor: 'positive' },
    { type: 'O', rhFactor: 'negative' },
    { type: 'A', rhFactor: 'negative' },
    { type: 'B', rhFactor: 'negative' }
  ];

  const steps = [
    {
      number: 1,
      title: 'Select Blood Sample',
      description: 'Choose a blood sample to test. Each sample is from a different donor.'
    },
    {
      number: 2,
      title: 'Prepare Test Slides',
      description: 'Place three drops of blood on separate slides for Anti-A, Anti-B, and Rh testing.'
    },
    {
      number: 3,
      title: 'Add Antibodies',
      description: 'Add Anti-A, Anti-B, and Rh antibodies to respective slides and observe reactions.'
    },
    {
      number: 4,
      title: 'Observe Results',
      description: 'Check for agglutination (clumping) in each slide to determine blood type.'
    }
  ];

  const performTest = (antibody: AntibodyTest) => {
    if (!selectedSample) return;

    let result = false;
    if (antibody === 'anti-a') {
      result = selectedSample.type === 'A' || selectedSample.type === 'AB';
    } else if (antibody === 'anti-b') {
      result = selectedSample.type === 'B' || selectedSample.type === 'AB';
    } else if (antibody === 'rh') {
      result = selectedSample.rhFactor === 'positive';
    }

    setTestResults(prev => ({ ...prev, [antibody.replace('-', '')]: result }));
    setCompletedTests(prev => [...prev, antibody]);

    if (completedTests.length === 2) {
      setCurrentStep(4);
    }
  };

  const determineBloodType = () => {
    const { antiA, antiB, rh } = testResults;
    let type: BloodType;
    if (antiA && antiB) type = 'AB';
    else if (antiA) type = 'A';
    else if (antiB) type = 'B';
    else type = 'O';

    return `${type} ${rh ? 'Positive' : 'Negative'}`;
  };

  const resetExperiment = () => {
    setSelectedSample(null);
    setTestResults({ antiA: false, antiB: false, rh: false });
    setCompletedTests([]);
    setShowResults(false);
    setCurrentStep(1);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 p-6"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">Blood Typing Lab</h1>
          <p className="text-purple-200 text-lg">Determine blood types through antibody testing</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex justify-between items-center max-w-3xl mx-auto">
            {steps.map((step) => (
              <div
                key={step.number}
                className={`flex flex-col items-center ${
                  currentStep >= step.number ? 'text-white' : 'text-purple-300'
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                    currentStep >= step.number ? 'bg-purple-500' : 'bg-white/10'
                  }`}
                >
                  {step.number}
                </div>
                <p className="text-sm">{step.title}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Main Testing Area */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
            {currentStep === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">Select Blood Sample</h2>
                <div className="grid grid-cols-2 gap-4">
                  {bloodSamples.map((sample, index) => (
                    <motion.button
                      key={index}
                      onClick={() => {
                        setSelectedSample(sample);
                        setCurrentStep(2);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-red-500/20 p-4 rounded-lg border border-red-500/30 text-white hover:bg-red-500/30 transition-colors"
                    >
                      <Heart className="w-8 h-8 mx-auto mb-2 text-red-400" />
                      <p>Sample {index + 1}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 2 && selectedSample && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">Prepare Test Slides</h2>
                <div className="grid grid-cols-3 gap-4">
                  {['Anti-A', 'Anti-B', 'Rh'].map((test) => (
                    <div
                      key={test}
                      className="bg-white/5 p-4 rounded-lg border border-white/10 text-center"
                    >
                      <div className="w-16 h-16 mx-auto bg-red-500/20 rounded-full mb-2" />
                      <p className="text-white">{test} Test</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setCurrentStep(3)}
                  className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Continue to Testing
                </button>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">Add Antibodies</h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { id: 'anti-a', name: 'Anti-A', color: 'blue' },
                    { id: 'anti-b', name: 'Anti-B', color: 'yellow' },
                    { id: 'rh', name: 'Anti-D (Rh)', color: 'green' }
                  ].map((antibody) => (
                    <motion.button
                      key={antibody.id}
                      onClick={() => performTest(antibody.id as AntibodyTest)}
                      disabled={completedTests.includes(antibody.id as AntibodyTest)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`p-4 rounded-lg border ${
                        completedTests.includes(antibody.id as AntibodyTest)
                          ? 'bg-purple-500/20 border-purple-500/30'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
                      } transition-colors`}
                    >
                      <Droplets className={`w-8 h-8 mx-auto mb-2 text-${antibody.color}-400`} />
                      <p className="text-white">{antibody.name}</p>
                      {completedTests.includes(antibody.id as AntibodyTest) && (
                        <p className="text-sm text-purple-200">Test Complete</p>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white mb-4">Results</h2>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className={`p-4 rounded-lg ${testResults.antiA ? 'bg-red-500/20' : 'bg-white/5'} border border-white/10`}>
                    <p className="text-white">Anti-A Test</p>
                    <p className="text-purple-200">{testResults.antiA ? 'Positive' : 'Negative'}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${testResults.antiB ? 'bg-red-500/20' : 'bg-white/5'} border border-white/10`}>
                    <p className="text-white">Anti-B Test</p>
                    <p className="text-purple-200">{testResults.antiB ? 'Positive' : 'Negative'}</p>
                  </div>
                  <div className={`p-4 rounded-lg ${testResults.rh ? 'bg-red-500/20' : 'bg-white/5'} border border-white/10`}>
                    <p className="text-white">Rh Test</p>
                    <p className="text-purple-200">{testResults.rh ? 'Positive' : 'Negative'}</p>
                  </div>
                </div>
                
                <div className="bg-white/10 p-6 rounded-lg">
                  <h3 className="text-xl font-bold text-white mb-2">Blood Type:</h3>
                  <p className="text-2xl text-purple-300">{determineBloodType()}</p>
                </div>

                <button
                  onClick={resetExperiment}
                  className="w-full bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Start New Test
                </button>
              </div>
            )}
          </div>

          {/* Information Panel */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-4">Lab Information</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Current Step</h3>
                <p className="text-purple-200">{steps[currentStep - 1].description}</p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-white mb-2">Blood Typing Guide</h3>
                <div className="space-y-2 text-purple-200">
                  <p>• Type A: Agglutination with Anti-A only</p>
                  <p>• Type B: Agglutination with Anti-B only</p>
                  <p>• Type AB: Agglutination with both</p>
                  <p>• Type O: No agglutination</p>
                  <p>• Rh+: Agglutination with Anti-D</p>
                  <p>• Rh-: No agglutination with Anti-D</p>
                </div>
              </div>

              {selectedSample && (
                <div className="bg-purple-500/20 p-4 rounded-lg">
                  <h3 className="text-lg font-medium text-white mb-2">Active Sample</h3>
                  <div className="flex items-center space-x-2">
                    <Activity className="text-purple-300" />
                    <p className="text-purple-200">Sample under testing</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BloodTypingLab;