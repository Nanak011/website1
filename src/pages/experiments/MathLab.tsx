import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Calculator, LineChart, Shapes, Plus, Minus, X, Divide, FunctionSquare as Function, Grid } from 'lucide-react';
import functionPlot from 'function-plot';
import * as math from 'mathjs';

interface Problem {
  id: string;
  type: 'arithmetic' | 'algebra' | 'geometry' | 'graphing';
  question: string;
  solution: number | string;
  hint: string;
}

interface Point {
  x: number;
  y: number;
}

const problems: Problem[] = [
  {
    id: 'p1',
    type: 'arithmetic',
    question: 'Solve: 125 ÷ 5 + 10 × 3',
    solution: 55,
    hint: 'Remember order of operations (PEMDAS)'
  },
  {
    id: 'p2',
    type: 'algebra',
    question: 'If 3x + 7 = 22, what is x?',
    solution: 5,
    hint: 'Subtract 7 from both sides, then divide by 3'
  },
  {
    id: 'p3',
    type: 'geometry',
    question: 'What is the area of a triangle with base 8 and height 6?',
    solution: 24,
    hint: 'Area = (base × height) ÷ 2'
  },
  {
    id: 'p4',
    type: 'graphing',
    question: 'Graph the function y = x²',
    solution: 'x^2',
    hint: 'This is a parabola that opens upward'
  }
];

const MathLab = () => {
  const [selectedProblem, setSelectedProblem] = useState<Problem | null>(null);
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [graphMode, setGraphMode] = useState<'function' | 'points'>('function');
  const [functionInput, setFunctionInput] = useState('x^2');
  const [points, setPoints] = useState<Point[]>([]);
  const [graphError, setGraphError] = useState('');
  const graphRef = useRef<HTMLDivElement>(null);

  const plotFunction = () => {
    if (!graphRef.current) return;

    try {
      // Clear previous error
      setGraphError('');

      // Parse the function using mathjs to validate it
      math.parse(functionInput);

      // Clear the container
      graphRef.current.innerHTML = '';

      functionPlot({
        target: graphRef.current,
        width: 600,
        height: 400,
        grid: true,
        data: [{
          fn: functionInput,
          color: 'rgb(168, 85, 247)' // Purple color
        }],
        annotations: points.map(point => ({
          x: point.x,
          y: point.y,
          text: `(${point.x}, ${point.y})`
        }))
      });
    } catch (err: any) {
      setGraphError('Invalid function. Please check your syntax.');
      console.error('Plotting error:', err);
    }
  };

  const plotPoints = () => {
    if (!graphRef.current || points.length === 0) return;

    try {
      // Clear previous error
      setGraphError('');

      // Clear the container
      graphRef.current.innerHTML = '';

      // Find the range for x and y axes
      const xValues = points.map(p => p.x);
      const yValues = points.map(p => p.y);
      const xMin = Math.min(...xValues);
      const xMax = Math.max(...xValues);
      const yMin = Math.min(...yValues);
      const yMax = Math.max(...yValues);
      const padding = 2;

      functionPlot({
        target: graphRef.current,
        width: 600,
        height: 400,
        grid: true,
        xAxis: {
          domain: [xMin - padding, xMax + padding]
        },
        yAxis: {
          domain: [yMin - padding, yMax + padding]
        },
        data: [{
          points: points.map(p => [p.x, p.y]),
          fnType: 'points',
          graphType: 'scatter',
          color: 'rgb(168, 85, 247)' // Purple color
        }]
      });
    } catch (err: any) {
      setGraphError('Error plotting points.');
      console.error('Plotting error:', err);
    }
  };

  const addPoint = () => {
    const newPoint: Point = {
      x: Math.random() * 10 - 5, // Random x between -5 and 5
      y: Math.random() * 10 - 5  // Random y between -5 and 5
    };
    setPoints([...points, newPoint]);
  };

  const clearPoints = () => {
    setPoints([]);
  };

  useEffect(() => {
    if (graphMode === 'function') {
      plotFunction();
    } else {
      plotPoints();
    }
  }, [functionInput, points, graphMode]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProblem) return;

    let isCorrect = false;
    if (typeof selectedProblem.solution === 'number') {
      isCorrect = Number(answer) === selectedProblem.solution;
    } else {
      isCorrect = answer.toLowerCase() === selectedProblem.solution.toLowerCase();
    }
    setFeedback(isCorrect ? 'correct' : 'incorrect');
  };

  const resetProblem = () => {
    setSelectedProblem(null);
    setAnswer('');
    setFeedback(null);
    setShowHint(false);
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
          <h1 className="text-4xl font-bold text-white mb-4">Mathematics Lab</h1>
          <p className="text-purple-200 text-lg">Practice problems and explore mathematical concepts</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Problem Selection */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6">Problem Set</h2>
            
            <div className="space-y-4">
              {problems.map((problem) => (
                <motion.button
                  key={problem.id}
                  onClick={() => {
                    setSelectedProblem(problem);
                    setAnswer('');
                    setFeedback(null);
                    setShowHint(false);
                  }}
                  className={`w-full text-left p-4 rounded-lg transition-colors ${
                    selectedProblem?.id === problem.id
                      ? 'bg-purple-500/20 border-purple-500/50'
                      : 'bg-white/5 hover:bg-white/10 border-transparent'
                  } border`}
                  whileHover={{ x: 10 }}
                >
                  <div className="flex items-center space-x-4">
                    {problem.type === 'arithmetic' && <Calculator className="w-6 h-6 text-purple-300" />}
                    {problem.type === 'algebra' && <Function className="w-6 h-6 text-purple-300" />}
                    {problem.type === 'geometry' && <Shapes className="w-6 h-6 text-purple-300" />}
                    {problem.type === 'graphing' && <LineChart className="w-6 h-6 text-purple-300" />}
                    <span className="text-white">{problem.question}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Problem Solving Area */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-lg p-6 rounded-xl border border-white/20">
              {selectedProblem ? (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Problem</h3>
                    <p className="text-purple-200 text-lg">{selectedProblem.question}</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-purple-200 text-sm font-medium mb-2">
                        Your Answer
                      </label>
                      <input
                        type={typeof selectedProblem.solution === 'number' ? 'number' : 'text'}
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                        placeholder="Enter your answer"
                        step="any"
                      />
                    </div>

                    <div className="flex space-x-4">
                      <button
                        type="submit"
                        className="bg-purple-500 text-white px-6 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                      >
                        Check Answer
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowHint(true)}
                        className="bg-gray-500 text-white px-6 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Show Hint
                      </button>
                    </div>
                  </form>

                  {feedback && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg ${
                        feedback === 'correct'
                          ? 'bg-green-500/20 border border-green-500/50'
                          : 'bg-red-500/20 border border-red-500/50'
                      }`}
                    >
                      <p className="text-white">
                        {feedback === 'correct'
                          ? 'Correct! Well done!'
                          : 'Incorrect. Try again!'}
                      </p>
                    </motion.div>
                  )}

                  {showHint && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-blue-500/20 border border-blue-500/50 p-4 rounded-lg"
                    >
                      <p className="text-white">{selectedProblem.hint}</p>
                    </motion.div>
                  )}
                </div>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-6">Graphing Calculator</h3>
                  
                  {/* Mode Selection */}
                  <div className="flex space-x-4 mb-6">
                    <button
                      onClick={() => setGraphMode('function')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        graphMode === 'function'
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/5 text-purple-200 hover:bg-white/10'
                      }`}
                    >
                      Plot Function
                    </button>
                    <button
                      onClick={() => setGraphMode('points')}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        graphMode === 'points'
                          ? 'bg-purple-500 text-white'
                          : 'bg-white/5 text-purple-200 hover:bg-white/10'
                      }`}
                    >
                      Plot Points
                    </button>
                  </div>

                  {/* Function Input */}
                  {graphMode === 'function' && (
                    <div className="mb-6">
                      <label className="block text-purple-200 text-sm font-medium mb-2">
                        Enter Function (e.g., x^2, sin(x), x^3 - 2*x)
                      </label>
                      <div className="flex space-x-4">
                        <input
                          type="text"
                          value={functionInput}
                          onChange={(e) => setFunctionInput(e.target.value)}
                          className="flex-1 bg-white/5 border border-white/10 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                          placeholder="Enter function"
                        />
                        <button
                          onClick={plotFunction}
                          className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                        >
                          Plot
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Point Controls */}
                  {graphMode === 'points' && (
                    <div className="mb-6 flex space-x-4">
                      <button
                        onClick={addPoint}
                        className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors"
                      >
                        Add Random Point
                      </button>
                      <button
                        onClick={clearPoints}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Clear Points
                      </button>
                    </div>
                  )}

                  {/* Error Display */}
                  {graphError && (
                    <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg">
                      <p className="text-red-200">{graphError}</p>
                    </div>
                  )}

                  {/* Graph Container */}
                  <div
                    ref={graphRef}
                    className="w-full h-[400px] bg-white/5 rounded-lg overflow-hidden"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MathLab;