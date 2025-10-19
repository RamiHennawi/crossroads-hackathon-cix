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
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-80"
        style={{ backgroundImage: 'url(/images/default_bg.jpg)' }}
      ></div>
      <div className="w-full max-w-3xl flex-1 flex flex-col items-center justify-center z-10">
        {/* Step 1: Language Input */}
        {step === 1 && (
          <div className="w-full text-center flex flex-col justify-center items-center">
            <h1 className="text-5xl md:text-5xl font-black text-white mb-8 tracking-wider">
              &gt; ENTER LANGUAGE_
            </h1>
            <div className="w-3/4 backdrop-blur-sm border-2 border-white/30 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.15)] p-6">
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                placeholder="type_language_here..."
                className="w-full px-3 py-4 text-md rounded-md border-2 border-white/40 text-white placeholder-white/50 focus:border-white focus:outline-none focus:ring-2 focus:ring-white/30 transition-all mb-4 font-mono"
              />
              <button
                onClick={handleLanguageSubmit}
                disabled={!language.trim()}
                className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 border-2 border-white/50 hover:border-white text-white text-md font-semibold rounded-md shadow-[0_0_8px_rgba(255,255,255,0.15)] hover:shadow-[0_0_12px_rgba(255,255,255,0.25)] transform hover:scale-101 transition-all cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                [ CONTINUE ]
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Level Selection */}
        {step === 2 && (
          <div className="w-full text-center flex flex-col justify-center items-center">
            <h1 className="text-5xl md:text-5xl font-black text-white mb-8 tracking-wider">
              &gt; SELECT LEVEL_
            </h1>
            <div className="w-3/4 backdrop-blur-sm border-2 border-white/30 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.15)] p-6">
              <p className="text-base text-white/70 mb-4">
                LANGUAGE: <span className="font-bold text-white">[{language}]</span>
              </p>
              <div className="grid grid-cols-5 gap-3">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => handleLevelSelect(level)}
                    className="px-3 py-2 text-xl font-bold bg-white/10 hover:bg-white/20 border-2 border-white/50 hover:border-white text-white rounded-lg shadow-[0_0_6px_rgba(255,255,255,0.15)] hover:shadow-[0_0_10px_rgba(255,255,255,0.25)] transform hover:scale-101 transition-all cursor-pointer"
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
          <div className="w-full text-center flex flex-col justify-center items-center">
            <h1 className="text-5xl md:text-5xl font-black text-white mb-8 tracking-wider">
              &gt; SELECT DIFFICULTY_
            </h1>
            <div className="w-3/4 backdrop-blur-sm border-2 border-white/30 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.15)] p-6">
              <p className="text-base text-white/70 mb-4">
                [{language}] - <span className="font-bold text-white">[{selectedLevel}]</span>
              </p>
              <div className="grid grid-cols-3 gap-3">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => handleDifficultySelect(difficulty)}
                    className="px-4 py-2 text-xl font-bold bg-white/10 hover:bg-white/20 border-2 border-white/50 hover:border-white text-white rounded-lg shadow-[0_0_6px_rgba(255,255,255,0.15)] hover:shadow-[0_0_10px_rgba(255,255,255,0.25)] transform hover:scale-101 transition-all cursor-pointer uppercase"
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
          <div className="w-full text-center flex flex-col justify-center items-center">
            <h1 className="text-5xl md:text-5xl font-black text-white mb-8 tracking-wider">
              &gt; SYSTEM READY_
            </h1>
            <div className="w-3/4 backdrop-blur-sm border-2 border-white/30 rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.15)] p-6">
              <p className="text-base text-white/70 mb-4">
                [{language}] - [{selectedLevel}] - <span className="font-bold text-white">[{selectedDifficulty}]</span>
              </p>
              <button
                onClick={handleStartGame}
                className="w-full px-4 py-2 text-xl bg-white/10 hover:bg-white/20 border-2 border-white/50 hover:border-white text-white font-bold rounded-lg shadow-[0_0_8px_rgba(255,255,255,0.15)] hover:shadow-[0_0_12px_rgba(255,255,255,0.25)] transform hover:scale-101 transition-all cursor-pointer"
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
