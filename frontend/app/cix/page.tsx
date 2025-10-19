'use client';

import { useState } from 'react';
import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';

interface Cell {
  row: number;
  col: number;
  word: string;
  is_given?: boolean;
}

interface Connection {
  from_cell: [number, number];
  to_cell: [number, number];
  connection: string;
}

interface GameData {
  rows: number;
  cols: number;
  cells: Cell[];
  connections: Connection[];
  category: string;
}

// Sample game data
const gameData: GameData = {
  "rows": 12,
  "cols": 12,
  "cells": [
    { "row": 6, "col": 2, "word": "x" },
    { "row": 6, "col": 3, "word": "x", is_given: true },
    { "row": 6, "col": 4, "word": "x" },
    { "row": 6, "col": 5, "word": "x" },
    { "row": 6, "col": 6, "word": "x" },
    { "row": 6, "col": 7, "word": "x" },
    { "row": 2, "col": 6, "word": "x" },
    { "row": 3, "col": 6, "word": "x" },
    { "row": 4, "col": 6, "word": "kotka", is_given: true },
    { "row": 5, "col": 6, "word": "x" },
    { "row": 6, "col": 6, "word": "x" },
    { "row": 7, "col": 6, "word": "x" },
    { "row": 3, "col": 5, "word": "kotka", is_given: true },
    { "row": 3, "col": 6, "word": "x" },
    { "row": 3, "col": 7, "word": "x" },
    { "row": 3, "col": 8, "word": "x" },
    { "row": 3, "col": 9, "word": "x" },
    { "row": 3, "col": 10, "word": "x" },
    { "row": 5, "col": 4, "word": "x" },
    { "row": 6, "col": 4, "word": "hladilnik", is_given: true },
    { "row": 7, "col": 4, "word": "x" },
    { "row": 8, "col": 4, "word": "x" },
    { "row": 9, "col": 4, "word": "x" },
    { "row": 10, "col": 4, "word": "x", is_given: true },
  ],
  "connections": [
    { "from_cell": [6, 2], "to_cell": [6, 3], "connection": "dada"},
    { "from_cell": [6, 3], "to_cell": [6, 4], "connection": "dasa"},
    { "from_cell": [6, 4], "to_cell": [6, 5], "connection": "dasa"},
    { "from_cell": [6, 5], "to_cell": [6, 6], "connection": "dasa"},
    { "from_cell": [6, 6], "to_cell": [6, 7], "connection": "dasa"},
    { "from_cell": [2, 6], "to_cell": [3, 6], "connection": "dasa"},
    { "from_cell": [3, 6], "to_cell": [4, 6], "connection": "dasa"},
    { "from_cell": [4, 6], "to_cell": [5, 6], "connection": "dasa"},
    { "from_cell": [5, 6], "to_cell": [6, 6], "connection": "dasa"},
    { "from_cell": [6, 6], "to_cell": [7, 6], "connection": "dasa"},
    { "from_cell": [3, 5], "to_cell": [3, 6], "connection": "fukhfisoHFOISFSAF"},
    { "from_cell": [3, 6], "to_cell": [3, 7], "connection": "dasa"},
    { "from_cell": [3, 7], "to_cell": [3, 8], "connection": "dasa"},
    { "from_cell": [3, 8], "to_cell": [3, 9], "connection": "dasa"},
    { "from_cell": [3, 9], "to_cell": [3, 10], "connection": "dasa"},
    { "from_cell": [5, 4], "to_cell": [6, 4], "connection": "dasa"},
    { "from_cell": [6, 4], "to_cell": [7, 4], "connection": "dasa"},
    { "from_cell": [7, 4], "to_cell": [8, 4], "connection": "dasa"},
    { "from_cell": [8, 4], "to_cell": [9, 4], "connection": "dasa"},
    { "from_cell": [9, 4], "to_cell": [10, 4], "connection": "dasa"},
  ],
  "category": "animals"
};

export default function CixGame() {
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [inputText, setInputText] = useState('');
  const [guessedWords, setGuessedWords] = useState<Map<string, string>>(new Map());
  const [hoverInfo, setHoverInfo] = useState<{ type: 'node' | 'connection'; value: string } | null>(null);

  // Get word for a cell (either given or guessed)
  const getCellWord = (row: number, col: number): string => {
    const cell = gameData.cells.find(c => c.row === row && c.col === col);
    if (!cell) return '';
    
    const key = `${row}-${col}`;
    if (guessedWords.has(key)) {
      return guessedWords.get(key)!;
    }
    
    return cell.is_given ? cell.word : '';
  };

  // Check if a cell has a value (given or guessed)
  const hasValue = (row: number, col: number): boolean => {
    const cell = gameData.cells.find(c => c.row === row && c.col === col);
    if (!cell) return false;
    if (cell.is_given) return true;
    return guessedWords.has(`${row}-${col}`);
  };

  // Check if a cell is given
  const isGiven = (row: number, col: number): boolean => {
    const cell = gameData.cells.find(c => c.row === row && c.col === col);
    return cell?.is_given || false;
  };

  // Check if a node is active (adjacent to a node with a value)
  const isNodeActive = (row: number, col: number): boolean => {
    if (hasValue(row, col)) return true;
    
    // Check if any adjacent cell has a value
    const adjacentCells = [
      [row - 1, col], [row + 1, col],
      [row, col - 1], [row, col + 1]
    ];
    
    return adjacentCells.some(([r, c]) => hasValue(r, c));
  };

  // Check if a connection is active (at least one endpoint has a value)
  const isConnectionActive = (conn: Connection): boolean => {
    const [fromRow, fromCol] = conn.from_cell;
    const [toRow, toCol] = conn.to_cell;
    return hasValue(fromRow, fromCol) || hasValue(toRow, toCol);
  };

  const handleCellClick = (row: number, col: number) => {
    if (isGiven(row, col)) return; // Can't edit given nodes
    if (!isNodeActive(row, col)) return; // Can't edit inactive nodes
    
    setSelectedCell({ row, col });
    setInputText(getCellWord(row, col));
  };

  const handleSend = () => {
    if (!selectedCell || !inputText.trim()) return;
    
    const key = `${selectedCell.row}-${selectedCell.col}`;
    const newGuesses = new Map(guessedWords);
    newGuesses.set(key, inputText.trim());
    setGuessedWords(newGuesses);
    
    setInputText('');
    setSelectedCell(null);
  };

  const handleClear = () => {
    setGuessedWords(new Map());
    setInputText('');
    setSelectedCell(null);
  };

  // Keyboard panning support
  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevent default for arrow keys to avoid page scroll
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      e.preventDefault();
    }
  };

  // Cell size in pixels for the large grid
  const cellSize = 300;
  const nodeRadius = cellSize * 0.3; // Increased from 0.25 to 0.3
  const gridWidth = gameData.cols * cellSize;
  const gridHeight = gameData.rows * cellSize;

  return (
    <div 
      className="min-h-screen relative overflow-hidden" 
      style={{ 
        backgroundImage: 'url(/images/default_bg.jpg)', 
        backgroundSize: 'cover', 
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <TransformWrapper
        initialScale={1}
        minScale={0.3}
        maxScale={5}
        centerOnInit={true}
        limitToBounds={false}
        wheel={{ 
          step: 0.15,
          smoothStep: 0.01,
        }}
        doubleClick={{ mode: "zoomIn", step: 0.5 }}
        panning={{ 
          disabled: false,
          velocityDisabled: true,
          lockAxisX: false,
          lockAxisY: false,
        }}
        velocityAnimation={{
          disabled: true,
        }}
        alignmentAnimation={{
          disabled: true,
        }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            {/* Zoom Controls - Top Left */}
            <div className="fixed top-6 left-6 flex flex-col gap-2 z-20 pointer-events-none">
              <button
                onClick={() => zoomIn()}
                className="w-10 h-10 bg-transparent border-2 border-gray-700 rounded-lg transition-colors shadow-lg flex items-center justify-center text-xl font-bold pointer-events-auto cursor-pointer background-blur-sm"
                title="Zoom In (or use Scroll Wheel)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
              </button>
              <button
                onClick={() => zoomOut()}
                className="w-10 h-10 bg-transparent border-2 border-gray-700 rounded-lg transition-colors shadow-lg flex items-center justify-center text-xl font-bold pointer-events-auto cursor-pointer background-blur-sm"
                title="Zoom Out (or use Scroll Wheel)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
                </svg>
              </button>
              <button
                onClick={() => resetTransform()}
                className="w-10 h-10 bg-transparent border-2 border-gray-700 rounded-lg transition-colors shadow-lg flex items-center justify-center text-sm pointer-events-auto cursor-pointer background-blur-sm"
                title="Reset Zoom & Position"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </button>
            </div>
            
            {/* Instructions */}
            <div className="fixed top-6 left-20 bg-transparent backdrop-blur-sm border border-gray-700 rounded-lg px-3 py-2 text-xs text-gray-300 shadow-lg pointer-events-none z-20 backdrop-blur-sm">
              <div>🖱️ Click & drag to move</div>
              <div>🔍 Scroll to zoom</div>
            </div>

            {/* Hover Info - Above search field */}
            {hoverInfo && (
              <div className="fixed bottom-46 right-6 bg-transparent border-2 border-gray-700 rounded-lg px-4 py-2 text-sm text-white shadow-lg pointer-events-none z-20 backdrop-blur-sm">
                <span className="font-semibold text-emerald-400">{hoverInfo.type === 'node' ? 'Node' : 'Connection'}:</span> {hoverInfo.value}
              </div>
            )}

            {/* Canvas Area */}
            <TransformComponent
              wrapperStyle={{ width: '100vw', height: '100vh' }}
              contentStyle={{ width: '100%', height: '100%' }}
            >
              <div className="w-full h-full flex items-center justify-center p-8">
                <div 
                  className="relative bg-transparent"
                  style={{ width: `${gridWidth}px`, height: `${gridHeight}px` }}
                >
                  <svg width={gridWidth} height={gridHeight} className="absolute inset-0">
                    {/* Define holographic glow filter */}
                    <defs>
                      <filter id="holographicGlow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    {/* Draw connections */}
                    {gameData.connections.map((conn, idx) => {
                      const [fromRow, fromCol] = conn.from_cell;
                      const [toRow, toCol] = conn.to_cell;
                      
                      const centerFromX = (fromCol + 0.5) * cellSize;
                      const centerFromY = (fromRow + 0.5) * cellSize;
                      const centerToX = (toCol + 0.5) * cellSize;
                      const centerToY = (toRow + 0.5) * cellSize;
                      
                      // Calculate line endpoints at circle edge
                      const dx = centerToX - centerFromX;
                      const dy = centerToY - centerFromY;
                      const dist = Math.sqrt(dx * dx + dy * dy);
                      const unitX = dx / dist;
                      const unitY = dy / dist;
                      
                      // Offset by node radius so lines stop at circle edge
                      const x1 = centerFromX + unitX * nodeRadius;
                      const y1 = centerFromY + unitY * nodeRadius;
                      const x2 = centerToX - unitX * nodeRadius;
                      const y2 = centerToY - unitY * nodeRadius;
                      
                      const midX = (centerFromX + centerToX) / 2;
                      const midY = (centerFromY + centerToY) / 2;
                      
                      const active = isConnectionActive(conn);
                      const isVertical = fromCol === toCol;
                      
                      // For vertical connections, offset text to the right
                      const textX = isVertical ? midX + 15 : midX;
                      const textY = isVertical ? midY + 5 : midY - 10;
                      
                      return (
                        <g key={idx}>
                          <line
                            x1={x1}
                            y1={y1}
                            x2={x2}
                            y2={y2}
                            stroke="white"
                            strokeWidth="6"
                            opacity={active ? 1 : 0.2}
                            className={active ? "hover:stroke-emerald-400 transition-colors cursor-pointer" : ""}
                            onMouseEnter={() => active && setHoverInfo({ type: 'connection', value: conn.connection })}
                            onMouseLeave={() => setHoverInfo(null)}
                          />
                          {active && (
                            <text
                              x={textX}
                              y={textY}
                              textAnchor={isVertical ? "start" : "middle"}
                              fontSize="16"
                              fill="#fff"
                              className="pointer-events-none select-none font-medium"
                            >
                              {conn.connection.slice(0, 10)}
                              {conn.connection.length > 15 && '...'}
                            </text>
                          )}
                        </g>
                      );
                    })}

                    {/* Draw nodes */}
                    {gameData.cells.map((cell, idx) => {
                      const active = isNodeActive(cell.row, cell.col);
                      const given = isGiven(cell.row, cell.col);
                      const word = getCellWord(cell.row, cell.col);
                      const isSelected = selectedCell?.row === cell.row && selectedCell?.col === cell.col;
                      
                      return (
                        <g key={idx}>
                          <circle
                            cx={(cell.col + 0.5) * cellSize}
                            cy={(cell.row + 0.5) * cellSize}
                            r={nodeRadius}
                            fill={isSelected ? 'rgba(16, 185, 129, 0.2)' : (given ? 'rgba(16, 185, 129, 0.3)' : 'rgba(0, 0, 0, 0.75)')}
                            stroke={given ? '#10b981' : 'white'}
                            strokeWidth={5}
                            opacity={active ? 1 : 0.2}
                            filter={given ? 'url(#holographicGlow)' : undefined}
                            className={active && !given ? "cursor-pointer hover:fill-emerald-900 transition-colors" : given ? "" : ""}
                            onClick={() => handleCellClick(cell.row, cell.col)}
                            onMouseEnter={() => active && !given && setHoverInfo({ type: 'node', value: word || '???' })}
                            onMouseLeave={() => setHoverInfo(null)}
                          />
                          {word && (
                            <text
                              x={(cell.col + 0.5) * cellSize}
                              y={(cell.row + 0.5) * cellSize + 6}
                              textAnchor="middle"
                              fontSize="20"
                              fill="white"
                              className="pointer-events-none select-none font-semibold"
                            >
                              {word.slice(0, 12)}
                              {word.length > 12 && '...'}
                            </text>
                          )}
                        </g>
                      );
                    })}
                  </svg>
                </div>
              </div>
            </TransformComponent>

            {/* Sticky Controls at Bottom Right */}
            <div className="fixed bottom-6 right-6 flex flex-col gap-4 w-96 z-20 pointer-events-none">
              {/* Input Field */}
              <div className="bg-transparent border-2 border-gray-700 shadow-lg p-4 rounded-lg pointer-events-auto backdrop-blur-sm bg-black/80">
                {selectedCell ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Type your guess..."
                        disabled={isGiven(selectedCell.row, selectedCell.col)}
                        className="flex-1 px-4 py-2 bg-black border border-gray-700 rounded text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/60 disabled:opacity-50"
                      />
                      <button
                        onClick={handleSend}
                        disabled={isGiven(selectedCell.row, selectedCell.col)}
                        className="px-2 py-2 bg-emerald-500/40 border-2 border-emerald-400/80 text-white rounded hover:bg-emerald-700/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed backdrop-blur-sm cursor-pointer"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-white-500 py-2">
                    Click on an active node to guess
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pointer-events-auto">
                <button
                  className="flex-1 px-4 py-3 bg-transparent text-white rounded-lg transition-all duration-150 shadow-lg border-2 border-gray-700 cursor-pointer transform hover:scale-103 hover:backdrop-blur-md backdrop-blur-sm"
                >
                  Hint
                </button>
                <button
                  onClick={handleClear}
                  className="flex-1 px-4 py-3 bg-transparent text-white rounded-lg transition-all duration-150 shadow-lg border-2 border-gray-700 cursor-pointer transform hover:scale-103 hover:backdrop-blur-md backdrop-blur-sm"
                >
                  Clear
                </button>
                <button
                  className="flex-1 px-4 py-3 bg-transparent text-white rounded-lg transition-all duration-150 shadow-lg border-2 border-gray-700 cursor-pointer transform hover:scale-103 hover:backdrop-blur-md backdrop-blur-sm"
                >
                  Submit
                </button>
              </div>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}

