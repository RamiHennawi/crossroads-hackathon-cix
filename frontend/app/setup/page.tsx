'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function FrontPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [language, setLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [streak] = useState(5);

  const levels = ['A1', 'A2', 'B1', 'B2', 'C1'];
  const difficulties = ['Easy', 'Medium', 'Hard'];

  const handleLanguageSubmit = () => {
    if (language.trim()) {
      setStep(2);
    }
  };

  const handleLevelSelect = (level: string) => {
    setSelectedLevel(level);
    setStep(3);
  };

  const handleDifficultySelect = (difficulty: string) => {
    setSelectedDifficulty(difficulty);
    setStep(4);
  };

  const handleStartGame = () => {
    console.log('Starting game with:', { language, selectedLevel, selectedDifficulty });
    router.push('/cix');
  };

  // Generate stars
  useEffect(() => {
    const createStars = () => {
      const starsContainer = document.getElementById('stars-container');
      if (!starsContainer) return;
      
      starsContainer.innerHTML = '';
      
      for (let i = 0; i < 200; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        starsContainer.appendChild(star);
      }
    };
    
    createStars();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-between p-8 bg-black relative overflow-hidden font-mono">     
      <div className="w-full max-w-3xl flex-1 flex flex-col items-center justify-center z-10">
        {/* Step 1: Language Input */}
        {step === 1 && (
          <div className="w-full text-center">
            <h1 className="text-6xl md:text-6xl font-bold text-white mb-12 tracking-wider">
              &gt; SELECT LANGUAGE_
            </h1>
            <div className="backdrop-blur-sm border-2 border-emerald-700/30 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] p-8">
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="type_language_here..."
                className="w-full px-6 py-4 text-xl rounded-lg border-2 border-emerald-700/40 text-white placeholder-emerald-900/50 focus:border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 transition-all mb-6 font-mono"
              />
              <button
                onClick={handleLanguageSubmit}
                disabled={!language.trim()}
                className="w-full px-8 py-4 bg-emerald-800/20 hover:bg-emerald-700/30 border-2 border-emerald-700/50 hover:border-emerald-600 text-white text-xl font-semibold rounded-lg shadow-[0_0_8px_rgba(16,185,129,0.4)] hover:shadow-[0_0_12px_rgba(16,185,129,0.5)] transform hover:scale-105 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                [ CONTINUE ]
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Level Selection */}
        {step === 2 && (
          <div className="w-full text-center">
            <h1 className="text-6xl md:text-6xl font-bold text-white mb-12 tracking-wider">
              &gt; SELECT LEVEL_
            </h1>
            <div className="backdrop-blur-sm border-2 border-emerald-700/30 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] p-8">
              <p className="text-lg text-emerald-600 mb-6">
                LANGUAGE: <span className="font-bold text-white">[{language}]</span>
              </p>
              <div className="grid grid-cols-5 gap-4">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => handleLevelSelect(level)}
                    className="px-6 py-4 text-2xl font-bold bg-emerald-800/20 hover:bg-emerald-700/30 border-2 border-emerald-700/50 hover:border-emerald-600 text-white rounded-lg shadow-[0_0_6px_rgba(16,185,129,0.3)] hover:shadow-[0_0_10px_rgba(16,185,129,0.4)] transform hover:scale-110 transition-all cursor-pointer"
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Difficulty Selection */}
        {step === 3 && (
          <div className="w-full text-center">
            <h1 className="text-6xl md:text-6xl font-bold text-white mb-12 tracking-wider">
              &gt; SELECT DIFFICULTY_
            </h1>
            <div className="backdrop-blur-sm border-2 border-emerald-700/30 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] p-8">
              <p className="text-lg text-emerald-600 mb-6">
                [{language}] - <span className="font-bold text-white">[{selectedLevel}]</span>
              </p>
              <div className="grid grid-cols-3 gap-4">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => handleDifficultySelect(difficulty)}
                    className="px-8 py-6 text-2xl font-bold bg-emerald-800/20 hover:bg-emerald-700/30 border-2 border-emerald-700/50 hover:border-emerald-600 text-white rounded-lg shadow-[0_0_6px_rgba(16,185,129,0.3)] hover:shadow-[0_0_10px_rgba(16,185,129,0.4)] transform hover:scale-110 transition-all cursor-pointer uppercase"
                  >
                    {difficulty}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Start Game */}
        {step === 4 && (
          <div className="w-full text-center">
            <h1 className="text-6xl md:text-6xl font-bold text-white mb-12 tracking-wider">
              &gt; SYSTEM READY_
            </h1>
              <div className="backdrop-blur-sm border-2 border-emerald-700/30 rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)] p-8">
              <div className="mb-8 space-y-3 text-left">
                <p className="text-xl text-emerald-600">
                  &gt; LANGUAGE: <span className="font-bold text-white">{language}</span>
                </p>
                <p className="text-xl text-emerald-600">
                  &gt; LEVEL: <span className="font-bold text-white">{selectedLevel}</span>
                </p>
                <p className="text-xl text-emerald-600">
                  &gt; DIFFICULTY: <span className="font-bold text-white">{selectedDifficulty}</span>
                </p>
              </div>
              <button
                onClick={handleStartGame}
                className="w-full px-8 py-6 text-2xl bg-emerald-800/20 hover:bg-emerald-700/30 border-2 border-emerald-700/50 hover:border-emerald-600 text-white font-bold rounded-lg shadow-[0_0_8px_rgba(16,185,129,0.4)] hover:shadow-[0_0_12px_rgba(16,185,129,0.5)] transform hover:scale-105 transition-all cursor-pointer"
              >
                [ INITIALIZE GAME ]
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

