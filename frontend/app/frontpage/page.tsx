'use client';

import React, { useState, useEffect } from 'react';

export default function FrontPage() {
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
    // Add your game start logic here
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
      {/* Starry Background */}
      <div id="stars-container" className="absolute inset-0 z-0"></div>
      
      {/* Glowing planets/circles in background */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-40 left-20 w-40 h-40 bg-cyan-400/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      
      <div className="w-full max-w-2xl flex-1 flex flex-col items-center justify-center z-10">
        {/* Step 1: Language Input */}
        {step === 1 && (
          <div className="w-full text-center">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-12 tracking-wider drop-shadow-[0_0_40px_rgba(30,58,138,0.8)]">
              &gt; SELECT LANGUAGE_
            </h1>
            <div className="bg-slate-950/80 backdrop-blur-sm border-2 border-cyan-700/30 rounded-lg shadow-[0_0_30px_rgba(30,58,138,0.4)] p-8">
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleLanguageSubmit()}
                placeholder="type_language_here..."
                className="w-full px-6 py-4 text-xl rounded-lg border-2 border-cyan-700/40 bg-slate-950/90 text-white placeholder-cyan-900/50 focus:border-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-700/30 transition-all mb-6 font-mono"
              />
              <button
                onClick={handleLanguageSubmit}
                disabled={!language.trim()}
                className="w-full px-8 py-4 bg-cyan-800/20 hover:bg-cyan-700/30 border-2 border-cyan-700/50 hover:border-cyan-600 text-white text-xl font-semibold rounded-lg shadow-[0_0_15px_rgba(30,58,138,0.5)] hover:shadow-[0_0_25px_rgba(30,58,138,0.7)] transform hover:scale-105 transition-all disabled:opacity-30 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
              >
                [ CONTINUE ]
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Level Selection */}
        {step === 2 && (
          <div className="w-full text-center">
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-12 tracking-wider drop-shadow-[0_0_40px_rgba(30,58,138,0.8)]">
              &gt; SELECT LEVEL_
            </h1>
            <div className="bg-slate-950/80 backdrop-blur-sm border-2 border-cyan-700/30 rounded-lg shadow-[0_0_30px_rgba(30,58,138,0.4)] p-8">
              <p className="text-lg text-cyan-600 mb-6 drop-shadow-[0_0_20px_rgba(30,58,138,0.6)]">
                LANGUAGE: <span className="font-bold text-white">[{language}]</span>
              </p>
              <div className="grid grid-cols-5 gap-4">
                {levels.map((level) => (
                  <button
                    key={level}
                    onClick={() => handleLevelSelect(level)}
                    className="px-6 py-4 text-2xl font-bold bg-cyan-800/20 hover:bg-cyan-700/30 border-2 border-cyan-700/50 hover:border-cyan-600 text-white rounded-lg shadow-[0_0_12px_rgba(30,58,138,0.4)] hover:shadow-[0_0_20px_rgba(30,58,138,0.6)] transform hover:scale-110 transition-all"
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
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-12 tracking-wider drop-shadow-[0_0_40px_rgba(30,58,138,0.8)]">
              &gt; SELECT DIFFICULTY_
            </h1>
            <div className="bg-slate-950/80 backdrop-blur-sm border-2 border-cyan-700/30 rounded-lg shadow-[0_0_30px_rgba(30,58,138,0.4)] p-8">
              <p className="text-lg text-cyan-600 mb-6 drop-shadow-[0_0_20px_rgba(30,58,138,0.6)]">
                [{language}] - <span className="font-bold text-white">[{selectedLevel}]</span>
              </p>
              <div className="grid grid-cols-3 gap-4">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty}
                    onClick={() => handleDifficultySelect(difficulty)}
                    className="px-8 py-6 text-2xl font-bold bg-cyan-800/20 hover:bg-cyan-700/30 border-2 border-cyan-700/50 hover:border-cyan-600 text-white rounded-lg shadow-[0_0_12px_rgba(30,58,138,0.4)] hover:shadow-[0_0_20px_rgba(30,58,138,0.6)] transform hover:scale-110 transition-all uppercase"
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
            <h1 className="text-6xl md:text-7xl font-bold text-white mb-12 tracking-wider drop-shadow-[0_0_40px_rgba(30,58,138,0.8)]">
              &gt; SYSTEM READY_
            </h1>
            <div className="bg-slate-950/80 backdrop-blur-sm border-2 border-cyan-700/30 rounded-lg shadow-[0_0_30px_rgba(30,58,138,0.4)] p-8">
              <div className="mb-8 space-y-3 text-left">
                <p className="text-xl text-cyan-600 drop-shadow-[0_0_15px_rgba(30,58,138,0.6)]">
                  &gt; LANGUAGE: <span className="font-bold text-white">{language}</span>
                </p>
                <p className="text-xl text-cyan-600 drop-shadow-[0_0_15px_rgba(30,58,138,0.6)]">
                  &gt; LEVEL: <span className="font-bold text-white">{selectedLevel}</span>
                </p>
                <p className="text-xl text-cyan-600 drop-shadow-[0_0_15px_rgba(30,58,138,0.6)]">
                  &gt; DIFFICULTY: <span className="font-bold text-white">{selectedDifficulty}</span>
                </p>
              </div>
              <button
                onClick={handleStartGame}
                className="w-full px-8 py-6 text-2xl bg-cyan-800/20 hover:bg-cyan-700/30 border-2 border-cyan-700/50 hover:border-cyan-600 text-white font-bold rounded-lg shadow-[0_0_15px_rgba(30,58,138,0.5)] hover:shadow-[0_0_25px_rgba(30,58,138,0.7)] transform hover:scale-105 transition-all"
              >
                [ INITIALIZE GAME ]
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Streak Counter */}
      <div className="mt-8 mb-4 z-10">
        <div className="bg-slate-950/80 backdrop-blur-sm border-2 border-cyan-700/30 rounded-lg shadow-[0_0_20px_rgba(30,58,138,0.3)] px-8 py-4 flex items-center gap-4">
          <div className="text-4xl">🚀</div>
          <div>
            <div className="text-sm text-cyan-600 uppercase tracking-widest font-semibold drop-shadow-[0_0_15px_rgba(30,58,138,0.6)]">
              STREAK
            </div>
            <div className="text-3xl font-bold text-white drop-shadow-[0_0_20px_rgba(30,58,138,0.7)]">
              {streak} {streak === 1 ? 'DAY' : 'DAYS'}
            </div>
          </div>
        </div>
      </div>
      
      {/* CSS for stars animation */}
      <style jsx>{`
        .star {
          position: absolute;
          background: rgba(8, 145, 178, 0.5);
          border-radius: 50%;
          animation: twinkle 3s infinite;
          box-shadow: 0 0 2px rgba(30, 58, 138, 0.6);
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

