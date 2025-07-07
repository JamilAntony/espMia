import React, { useState, useEffect, useRef } from 'react';
import { Heart, Sparkles, MessageCircle, Send } from 'lucide-react';

// Tipos explícitos para los estados
interface GrassBlade {
  id: number;
  x: number;
  height: number;
  width: number;
  rotation: number;
  animationDelay: number;
  color: string;
}

interface Firework {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  particles: number;
}

interface FloatingWord {
  id: number;
  text: string;
  x: number;
  y: number;
  color: string;
}

export default function AmorInteractivo() {
  const [plantStage, setPlantStage] = useState(0);
  const [loveClicks, setLoveClicks] = useState(0);
  const [showFireworks, setShowFireworks] = useState(false);
  const [isNight, setIsNight] = useState(false);
  const [nightProgress, setNightProgress] = useState(0);
  const [floatingWords, setFloatingWords] = useState<FloatingWord[]>([]);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState('');
  const [savedMessage, setSavedMessage] = useState('');
  const [fireworks, setFireworks] = useState<Firework[]>([]);
  const [grassBlades, setGrassBlades] = useState<GrassBlade[]>([]);
  const intervalRef = useRef<any>(null);
  const nightTransitionRef = useRef<any>(null);
  const [showRoots, setShowRoots] = useState(false);
  const [showStem, setShowStem] = useState(false);
  const [showLeaves, setShowLeaves] = useState(false);
  const [showBranches, setShowBranches] = useState(false);
  const [showBuds, setShowBuds] = useState(false);
  const [showPetals, setShowPetals] = useState(false);
  const [showPolen, setShowPolen] = useState(false);

  const loveWords = ['Te amo', 'Mi amor', 'Corazón', 'Amor mío', 'Mi vida', 'Cariño', 'Amor eterno', 'Hermosa', 'Preciosa'];

  // Generar pasto al inicio
  useEffect(() => {
    const newGrass = [];
    for (let i = 0; i < 80; i++) {
      newGrass.push({
        id: i,
        x: Math.random() * 100,
        height: Math.random() * 15 + 8,
        width: Math.random() * 2 + 1,
        rotation: Math.random() * 20 - 10,
        animationDelay: Math.random() * 2,
        color: `hsl(${Math.random() * 30 + 90}, ${Math.random() * 30 + 60}%, ${Math.random() * 20 + 35}%)`
      });
    }
    setGrassBlades(newGrass);
  }, []);

  // Progresión de la planta basada en clicks
  useEffect(() => {
    const newStage = Math.floor(loveClicks / 20);
    if (newStage !== plantStage && newStage <= 10) {
      setPlantStage(newStage);
    }
  }, [loveClicks]);

  // Transición nocturna gradual
  useEffect(() => {
    if (plantStage === 10) {
      nightTransitionRef.current = setInterval(() => {
        setNightProgress(prev => {
          const newProgress = prev + 0.02;
          if (newProgress >= 1) {
            setIsNight(true);
            setShowFireworks(true);
            startFireworks();
            clearInterval(nightTransitionRef.current);
            return 1;
          }
          return newProgress;
        });
      }, 100);
    }
  }, [plantStage]);

  const startFireworks = () => {
    const colors = ['#ff6b9d', '#ffd93d', '#6bcf7f', '#4ecdc4', '#45b7d1', '#9d4edd', '#f72585', '#4cc9f0'];
    
    intervalRef.current = setInterval(() => {
      // Fuegos artificiales múltiples
      for (let i = 0; i < 3; i++) {
        setTimeout(() => {
          const newFirework = {
            id: Date.now() + Math.random(),
            x: Math.random() * 100,
            y: Math.random() * 40 + 10,
            color: colors[Math.floor(Math.random() * colors.length)],
            size: Math.random() * 30 + 20,
            particles: Math.floor(Math.random() * 8) + 12
          };
          setFireworks(prev => [...prev, newFirework]);
          
          setTimeout(() => {
            setFireworks(prev => prev.filter(fw => fw.id !== newFirework.id));
          }, 3000);
        }, i * 200);
      }
    }, 800);

    setTimeout(() => {
      clearInterval(intervalRef.current);
    }, 15000);
  };

  const handleScreenClick = (e) => {
    if (plantStage >= 10) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    const word = loveWords[Math.floor(Math.random() * loveWords.length)];
    const newWord = {
      id: Date.now() + Math.random(),
      text: word,
      x: x,
      y: y,
      color: ['#ff6b9d', '#ff8fab', '#ffa8cc', '#ffb3d4', '#e91e63', '#f48fb1'][Math.floor(Math.random() * 6)]
    };
    
    setFloatingWords(prev => [...prev, newWord]);
    setLoveClicks(prev => prev + 1);
    
    setTimeout(() => {
      setFloatingWords(prev => prev.filter(w => w.id !== newWord.id));
    }, 3000);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      setSavedMessage(message);
      setMessage('');
      setShowMessage(false);
    }
  };

  const getProgressText = () => {
    if (plantStage === 0) return `Prepara el suelo con amor (${loveClicks}/20)`;
    if (plantStage === 1) return `¡Semilla germinando! (${loveClicks}/40)`;
    if (plantStage === 2) return `Primeras raíces creciendo (${loveClicks}/60)`;
    if (plantStage === 3) return `Tallo emergiendo (${loveClicks}/80)`;
    if (plantStage === 4) return `Primeras hojas (${loveClicks}/100)`;
    if (plantStage === 5) return `Ramas desarrollándose (${loveClicks}/120)`;
    if (plantStage === 6) return `Capullos formándose (${loveClicks}/140)`;
    if (plantStage === 7) return `Primeros pétalos (${loveClicks}/160)`;
    if (plantStage === 8) return `Orquídea floreciendo (${loveClicks}/180)`;
    if (plantStage === 9) return `¡Casi en plenitud! (${loveClicks}/200)`;
    return '¡Orquídea del amor eterna!';
  };

  const getSkyGradient = () => {
    if (plantStage < 10) {
      return 'bg-gradient-to-b from-blue-300 via-pink-200 to-green-200';
    }
    
    const dayGradient = 'from-blue-300 via-pink-200 to-green-200';
    const nightGradient = 'from-purple-900 via-blue-900 to-purple-800';
    
    if (nightProgress === 0) return `bg-gradient-to-b ${dayGradient}`;
    if (nightProgress === 1) return `bg-gradient-to-b ${nightGradient}`;
    
    return `bg-gradient-to-b from-blue-300 via-pink-200 to-green-200`;
  };

  // Devuelve los pétalos principales y secundarios con tonos morados/violetas
  const getOrchidPetals = () => {
    if (plantStage < 7) return [];

    // Pétalos secundarios (círculo exterior)
    const secondaryPetals = [
      { rotation: 0, scale: 1.7, color: 'from-violet-700 via-fuchsia-600 to-violet-300', delay: 0.1, shape: 'oval' },
      { rotation: 60, scale: 1.5, color: 'from-violet-700 via-fuchsia-600 to-violet-300', delay: 0.2, shape: 'oval' },
      { rotation: 120, scale: 1.5, color: 'from-violet-700 via-fuchsia-600 to-violet-300', delay: 0.3, shape: 'oval' },
      { rotation: 180, scale: 1.7, color: 'from-violet-700 via-fuchsia-600 to-violet-300', delay: 0.4, shape: 'oval' },
      { rotation: 240, scale: 1.5, color: 'from-violet-700 via-fuchsia-600 to-violet-300', delay: 0.5, shape: 'oval' },
      { rotation: 300, scale: 1.5, color: 'from-violet-700 via-fuchsia-600 to-violet-300', delay: 0.6, shape: 'oval' },
    ];

    // Pétalos principales (círculo interior)
    const mainPetals = [
      { rotation: -20, scale: 1.3, color: 'from-fuchsia-700 via-violet-500 to-violet-200', delay: 0.7, shape: 'oval' },
      { rotation: 20, scale: 1.3, color: 'from-fuchsia-700 via-violet-500 to-violet-200', delay: 0.8, shape: 'oval' },
      { rotation: -90, scale: 1.1, color: 'from-violet-800 via-fuchsia-500 to-violet-200', delay: 0.9, shape: 'oval' },
      { rotation: 90, scale: 1.1, color: 'from-violet-800 via-fuchsia-500 to-violet-200', delay: 1.0, shape: 'oval' },
      { rotation: 180, scale: 1.5, color: 'from-fuchsia-800 via-violet-400 to-violet-100', delay: 1.1, shape: 'labelo' },
    ];

    // Mostrar todos los pétalos cuando la flor está completamente abierta
    const visiblePetals = plantStage >= 9 ? [...secondaryPetals, ...mainPetals] : mainPetals;
    return visiblePetals;
  };

  // Animación secuencial de crecimiento
  useEffect(() => {
    if (plantStage >= 2 && !showRoots) {
      setTimeout(() => setShowRoots(true), 300);
    }
    if (plantStage >= 3 && !showStem) {
      setTimeout(() => setShowStem(true), 400);
    }
    if (plantStage >= 4 && !showLeaves) {
      setTimeout(() => setShowLeaves(true), 500);
    }
    if (plantStage >= 5 && !showBranches) {
      setTimeout(() => setShowBranches(true), 600);
    }
    if (plantStage >= 6 && !showBuds) {
      setTimeout(() => setShowBuds(true), 700);
    }
    if (plantStage >= 7 && !showPetals) {
      setTimeout(() => setShowPetals(true), 800);
    }
    if (plantStage >= 8 && !showPolen) {
      setTimeout(() => setShowPolen(true), 1200);
    }
  }, [plantStage]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Fondo del cielo con transición gradual */}
      <div 
        className={`absolute inset-0 transition-all duration-1000 ${getSkyGradient()}`}
        style={{
          background: plantStage >= 10 ? 
            `linear-gradient(to bottom, 
              rgb(${76 + (147-76) * (1-nightProgress)}, ${29 + (196-29) * (1-nightProgress)}, ${149 + (103-149) * (1-nightProgress)}),
              rgb(${59 + (191-59) * (1-nightProgress)}, ${130 + (219-130) * (1-nightProgress)}, ${246 + (185-246) * (1-nightProgress)}),
              rgb(${34 + (74-34) * (1-nightProgress)}, ${197 + (144-197) * (1-nightProgress)}, ${94 + (226-94) * (1-nightProgress)}))`
            : undefined
        }}
      >
        {/* Estrellas nocturnas */}
        {nightProgress > 0.3 && (
          <div className="absolute inset-0">
            {[...Array(100)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 70}%`,
                  width: `${Math.random() * 3 + 1}px`,
                  height: `${Math.random() * 3 + 1}px`,
                  animationDelay: `${Math.random() * 3}s`,
                  opacity: nightProgress * 0.8
                }}
              />
            ))}
          </div>
        )}
        
        {/* Nubes */}
        {nightProgress < 0.7 && (
          <>
            <div 
              className="absolute top-10 left-10 w-20 h-12 bg-white rounded-full transition-opacity duration-1000"
              style={{ opacity: 0.7 * (1 - nightProgress) }}
            />
            <div 
              className="absolute top-16 left-16 w-16 h-8 bg-white rounded-full transition-opacity duration-1000"
              style={{ opacity: 0.6 * (1 - nightProgress) }}
            />
            <div 
              className="absolute top-20 right-20 w-24 h-10 bg-white rounded-full transition-opacity duration-1000"
              style={{ opacity: 0.5 * (1 - nightProgress) }}
            />
          </>
        )}
      </div>

      {/* Área principal clickeable */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={handleScreenClick}
      >
        {/* Palabras flotantes */}
        {floatingWords.map((word) => (
          <div
            key={word.id}
            className="absolute text-xl font-bold pointer-events-none"
            style={{
              left: `${word.x}%`,
              top: `${word.y}%`,
              color: word.color,
              animation: 'floatUp 3s ease-out forwards'
            }}
          >
            {word.text} ❤️
          </div>
        ))}

        {/* Fuegos artificiales mejorados */}
        {fireworks.map((fw) => (
          <div
            key={fw.id}
            className="absolute pointer-events-none"
            style={{
              left: `${fw.x}%`,
              top: `${fw.y}%`,
            }}
          >
            {/* Núcleo del fuego artificial */}
            <div
              className="absolute w-6 h-6 rounded-full"
              style={{
                backgroundColor: fw.color,
                boxShadow: `0 0 ${fw.size}px ${fw.color}`,
                animation: 'fireworkCore 3s ease-out forwards'
              }}
            />
            
            {/* Partículas del fuego artificial */}
            {[...Array(fw.particles)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 rounded-full"
                style={{
                  backgroundColor: fw.color,
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${(360 / fw.particles) * i}deg) translateY(0px)`,
                  animation: `fireworkParticle 3s ease-out forwards ${i * 0.05}s`
                }}
              />
            ))}
            
            {/* Estrellas secundarias */}
            {[...Array(6)].map((_, i) => (
              <div
                key={`star-${i}`}
                className="absolute text-yellow-200"
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-${Math.random() * 30 + 20}px)`,
                  animation: `sparkStar 2s ease-out forwards ${i * 0.1}s`
                }}
              >
                ✨
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Suelo con textura */}
      <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-amber-900 via-amber-700 to-amber-600">
        <div className="absolute inset-0 opacity-40">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-amber-800 rounded-full"
              style={{
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                left: `${Math.random() * 100}%`,
                bottom: `${Math.random() * 60 + 10}%`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Pasto animado */}
      <div className="absolute bottom-32 left-0 right-0 h-8">
        {grassBlades.map((blade) => (
          <div
            key={blade.id}
            className="absolute bottom-0 rounded-t-full"
            style={{
              left: `${blade.x}%`,
              width: `${blade.width}px`,
              height: `${blade.height}px`,
              backgroundColor: blade.color,
              transform: `rotate(${blade.rotation}deg)`,
              animation: `grassSway 3s ease-in-out infinite ${blade.animationDelay}s`
            }}
          />
        ))}
      </div>

      {/* Orquídea completa */}
      <div className="absolute bottom-48 left-1/2 transform -translate-x-1/2">
        {/* Sistema de raíces animadas */}
        {showRoots && (
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 animate-rootGrow">
            <div className="w-2 h-2 bg-amber-600 rounded-full animate-pulse shadow-lg" />
            <div className="absolute w-1 h-6 bg-amber-700 rounded-full left-1/2 -translate-x-1/2 rotate-12 opacity-80 animate-rootGrow2" />
            <div className="absolute w-1 h-5 bg-amber-700 rounded-full left-1/2 -translate-x-1/2 -rotate-12 opacity-80 animate-rootGrow2" />
          </div>
        )}

        {/* Tallo principal con animación de crecimiento y transición de color */}
        {showStem && (
          <div className="relative">
            <div 
              className="w-6 rounded-t-md transition-all duration-1000 ease-out shadow-lg animate-stemGrow"
              style={{ 
                height: `${Math.min(plantStage * 18, 160)}px`,
                background: `linear-gradient(to top, #4f46e5, #22d3ee, #bbf7d0)`
              }}
            />
            {/* Ramas secundarias más naturales */}
            {showBranches && (
              <>
                <div 
                  className="absolute top-2/3 left-1 w-3 h-12 bg-gradient-to-t from-green-700 to-green-400 rounded-t-md transform -rotate-30 origin-bottom animate-branchSway"
                  style={{ animationDelay: '0.5s' }}
                />
                <div 
                  className="absolute top-3/4 right-1 w-3 h-10 bg-gradient-to-t from-green-700 to-green-400 rounded-t-md transform rotate-25 origin-bottom animate-branchSway2"
                  style={{ animationDelay: '0.8s' }}
                />
              </>
            )}
            {/* Hojas más pequeñas y naturales */}
            {showLeaves && (
              <>
                <div 
                  className="absolute left-0 top-1/2 w-16 h-5 bg-gradient-to-r from-green-500 to-green-300 rounded-full transform -rotate-30 shadow-lg animate-leafSway"
                  style={{ animationDelay: '0.3s' }}
                />
                <div 
                  className="absolute right-0 top-1/3 w-14 h-5 bg-gradient-to-l from-green-500 to-green-300 rounded-full transform rotate-25 shadow-lg animate-leafSway2"
                  style={{ animationDelay: '0.6s' }}
                />
                <div 
                  className="absolute left-0 top-2/3 w-10 h-4 bg-gradient-to-r from-green-500 to-green-300 rounded-full transform rotate-20 shadow-lg animate-leafSway3"
                  style={{ animationDelay: '0.9s' }}
                />
              </>
            )}
          </div>
        )}

        {/* Capullos y pétalos animados */}
        {showBuds && (
          <div className="absolute -top-32 left-1/2 transform -translate-x-1/2">
            {/* Resplandor animado alrededor de la flor */}
            {showPetals && (
              <div className="absolute left-1/2 top-1/2 w-56 h-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-pink-300 opacity-30 blur-2xl animate-flowerGlow z-0" />
            )}
            {/* Centro de la orquídea con columna */}
            <div className="absolute w-10 h-20 bg-gradient-to-b from-yellow-200 to-green-300 rounded-full z-20 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-xl animate-flowerPulse border-2 border-yellow-100" />
            {/* Pétalos de orquídea grandes y animados */}
            {showPetals && getOrchidPetals().map((petal, i) => (
              <div
                key={i}
                className={`absolute bg-gradient-to-b ${petal.color} shadow-2xl transform origin-bottom border-2 border-violet-300 animate-bigPetalOpen${i%2===0?1:2}`}
                style={{
                  width: petal.shape === 'labelo' ? '28px' : '32px',
                  height: petal.shape === 'labelo' ? '38px' : '48px',
                  borderRadius: petal.shape === 'labelo' ? '50% 50% 80% 80%' : '70% 70% 50% 50%',
                  transform: petal.shape === 'labelo'
                    ? `rotate(${petal.rotation}deg) translateY(10px) scale(${petal.scale * 0.9})`
                    : `rotate(${petal.rotation}deg) translateY(-32px) scale(${petal.scale * 1.5})`,
                  animationDelay: `${petal.delay + 0.5}s`,
                  left: '50%',
                  top: '50%',
                  marginLeft: petal.shape === 'labelo' ? '-14px' : '-16px',
                  marginTop: petal.shape === 'labelo' ? '10px' : '-24px',
                  filter: 'drop-shadow(0 2px 12px #a78bfa88)',
                  boxShadow: '0 0 32px 8px #a78bfa55'
                }}
              />
            ))}
            {/* Manchas características de orquídea en el labelo */}
            {plantStage >= 9 && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 translate-y-16 z-25">
                <div className="w-3 h-3 bg-purple-600 rounded-full opacity-70 animate-pulse" />
                <div className="w-2 h-2 bg-purple-600 rounded-full opacity-70 absolute top-3 left-3 animate-pulse" />
                <div className="w-2 h-2 bg-purple-600 rounded-full opacity-70 absolute top-6 left-0 animate-pulse" />
              </div>
            )}
            {/* Pistilo y antera */}
            {plantStage >= 8 && (
              <div className="absolute w-3 h-8 bg-gradient-to-t from-white to-yellow-100 rounded-full z-30 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-8 animate-budPulse">
                <div className="absolute -top-2 left-1/2 w-6 h-2 bg-yellow-300 rounded-full transform -translate-x-1/2" />
              </div>
            )}
            {/* Partículas de polen/destellos */}
            {showPolen && (
              <>
                {[...Array(18)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute bg-yellow-100 rounded-full opacity-80 animate-pollen"
                    style={{
                      left: '50%',
                      top: '50%',
                      width: `${Math.random() * 6 + 4}px`,
                      height: `${Math.random() * 6 + 4}px`,
                      transform: `translate(-50%, -50%) rotate(${i * 20}deg) translateY(-${Math.random() * 40 + 40}px)`,
                      animationDelay: `${i * 0.08 + 0.5}s`,
                      filter: 'blur(1px) drop-shadow(0 0 12px #fde68a)'
                    }}
                  />
                ))}
                {/* Destellos animados */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={`sparkle-${i}`}
                    className="absolute text-yellow-200 animate-sparkle"
                    style={{
                      left: '50%',
                      top: '50%',
                      fontSize: '2rem',
                      transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-70px)`,
                      animationDelay: `${i * 0.2 + 0.5}s`
                    }}
                  >
                    ✨
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Panel de progreso */}
      <div className="absolute top-4 left-4 right-4 bg-white bg-opacity-95 rounded-xl p-4 shadow-2xl backdrop-blur-sm">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-semibold text-gray-700">
            {getProgressText()}
          </span>
          <div className="flex items-center space-x-2">
            <Heart className="w-5 h-5 text-red-500 animate-pulse" />
            <span className="text-lg font-bold text-red-500">{loveClicks}</span>
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 h-3 rounded-full transition-all duration-500 animate-pulse"
            style={{ width: `${Math.min((loveClicks / 200) * 100, 100)}%` }}
          />
        </div>
      </div>

      {/* Botón de mensaje */}
      <button
        onClick={() => setShowMessage(true)}
        className="absolute top-4 right-4 bg-gradient-to-r from-pink-500 to-purple-500 text-white p-3 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-3"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Modal de mensaje */}
      {showMessage && (
        <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
            <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">Escribe tu mensaje de amor</h3>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribe aquí tu refrán o carta de amor..."
              className="w-full h-40 p-4 border-2 border-gray-300 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
            />
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowMessage(false)}
                className="px-6 py-3 text-gray-600 hover:text-gray-800 transition-colors font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleSendMessage}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
              >
                <Send className="w-5 h-5" />
                <span>Enviar</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mensaje guardado */}
      {savedMessage && (
        <div className="absolute bottom-4 left-4 right-4 bg-gradient-to-r from-pink-50 to-purple-50 border-l-4 border-pink-500 p-6 rounded-xl shadow-lg backdrop-blur-sm">
          <p className="text-gray-700 italic text-lg font-medium">"{savedMessage}"</p>
        </div>
      )}

      {/* Mensaje de celebración */}
      {showFireworks && (
        <div className="absolute top-1/4 right-4 md:right-8 z-50 flex justify-end w-full pointer-events-none">
          <div className="bg-gradient-to-br from-violet-100/90 via-white/80 to-fuchsia-100/90 border-2 border-violet-300 rounded-3xl shadow-2xl px-8 py-8 max-w-md w-full md:w-96 backdrop-blur-lg flex flex-col items-center animate-celebrateBox">
            <h1 className="text-3xl md:text-4xl font-extrabold text-violet-700 mb-4 flex items-center gap-2">
              <span>¡Rosa de Amor Eterno!</span>
              <span className="animate-bounce">🌸</span>
            </h1>
            <p className="text-lg md:text-xl text-fuchsia-700 font-medium text-center flex items-center gap-2">
              <span>Nuestro amor ha florecido en perfecta armonía</span>
              <span className="animate-pulse">❤️</span>
              <span className="animate-spin">🌺</span>
            </p>
          </div>
        </div>
      )}

      {/* Mensaje dedicado a la izquierda, siempre visible */}
      <div className="fixed top-1/4 left-4 md:left-8 z-50 flex justify-start w-full pointer-events-none">
        <div className="bg-gradient-to-br from-pink-100/90 via-white/80 to-violet-100/90 border-2 border-pink-300 rounded-3xl shadow-2xl px-8 py-8 max-w-md w-full md:w-96 backdrop-blur-lg flex flex-col items-center animate-celebrateBox pointer-events-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold text-pink-700 mb-3 flex items-center gap-2">
            <span>💖</span>
            <span>Para Mi Amada Luz Maribel</span>
            <span>💧</span>
          </h2>
          <p className="text-lg md:text-xl text-fuchsia-700 font-medium text-center">
            Hice esto para ti :<br/>
            Haz click hasta el cansancio.
          </p>
        </div>
      </div>

      {/* Estilos CSS personalizados */}
      <style>{`
        @keyframes rootGrow {
          0% { opacity: 0; transform: scaleY(0.2) translateY(10px); }
          100% { opacity: 1; transform: scaleY(1) translateY(0); }
        }
        @keyframes rootGrow2 {
          0% { opacity: 0; height: 0; }
          100% { opacity: 0.8; height: 24px; }
        }
        @keyframes stemGrow {
          0% { height: 0px; opacity: 0; }
          100% { opacity: 1; }
        }
        @keyframes branchSway {
          0%, 100% { transform: rotate(-30deg) scaleY(0.2); }
          50% { transform: rotate(-35deg) scaleY(1.1); }
        }
        @keyframes branchSway2 {
          0%, 100% { transform: rotate(25deg) scaleY(0.2); }
          50% { transform: rotate(30deg) scaleY(1.1); }
        }
        @keyframes leafSway {
          0%, 100% { transform: rotate(-30deg) scale(0.2); }
          50% { transform: rotate(-35deg) scale(1.1); }
        }
        @keyframes leafSway2 {
          0%, 100% { transform: rotate(25deg) scale(0.2); }
          50% { transform: rotate(30deg) scale(1.1); }
        }
        @keyframes leafSway3 {
          0%, 100% { transform: rotate(20deg) scale(0.2); }
          50% { transform: rotate(25deg) scale(1.1); }
        }
        @keyframes budPulse {
          0%, 100% { box-shadow: 0 0 0 0 #fde68a55; }
          50% { box-shadow: 0 0 16px 6px #fde68a99; }
        }
        @keyframes petalSway1 {
          0%, 100% { transform: scale(0.2) rotate(-10deg); }
          50% { transform: scale(1.1) rotate(-20deg); }
        }
        @keyframes petalSway2 {
          0%, 100% { transform: scale(0.2) rotate(10deg); }
          50% { transform: scale(1.1) rotate(20deg); }
        }
        @keyframes pollen {
          0% { opacity: 0; transform: scale(0.2) translateY(0); }
          50% { opacity: 1; transform: scale(1.1) translateY(-10px); }
          100% { opacity: 0; transform: scale(0.2) translateY(-30px); }
        }
        @keyframes floatUp {
          0% {
            transform: translateY(0px) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-30px) scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-80px) scale(0.8);
            opacity: 0;
          }
        }
        @keyframes fireworkCore {
          0% {
            transform: scale(0);
            opacity: 1;
          }
          20% {
            transform: scale(1.5);
            opacity: 0.9;
          }
          100% {
            transform: scale(3);
            opacity: 0;
          }
        }
        @keyframes fireworkParticle {
          0% {
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(0px);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(-60px);
            opacity: 0;
          }
        }
        @keyframes sparkStar {
          0% {
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(0px) scale(0);
            opacity: 1;
          }
          50% {
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(-20px) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) rotate(var(--rotation)) translateY(-40px) scale(0);
            opacity: 0;
          }
        }
        @keyframes grassSway {
          0%, 100% { transform: rotate(var(--rotation)) translateX(0px); }
          25% { transform: rotate(var(--rotation)) translateX(2px); }
          75% { transform: rotate(var(--rotation)) translateX(-2px); }
        }
        @keyframes flowerGlow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.7; }
        }
        @keyframes flowerPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 32px 8px #fde68a55; }
          50% { transform: scale(1.08); box-shadow: 0 0 64px 24px #fde68a99; }
        }
        @keyframes bigPetalOpen1 {
          0% { transform: scale(0.2) rotate(-10deg); opacity: 0; }
          60% { transform: scale(1.2) rotate(-30deg); opacity: 1; }
          100% { transform: scale(2.2) rotate(-20deg); opacity: 1; }
        }
        @keyframes bigPetalOpen2 {
          0% { transform: scale(0.2) rotate(10deg); opacity: 0; }
          60% { transform: scale(1.2) rotate(30deg); opacity: 1; }
          100% { transform: scale(2.2) rotate(20deg); opacity: 1; }
        }
        @keyframes sparkle {
          0% { opacity: 0; transform: scale(0.5) rotate(0deg); }
          40% { opacity: 1; transform: scale(1.2) rotate(10deg); }
          80% { opacity: 1; transform: scale(1) rotate(-10deg); }
          100% { opacity: 0; transform: scale(0.5) rotate(0deg); }
        }
        @keyframes celebrateBox {
          0% { opacity: 0; transform: translateX(60px) scale(0.8); }
          60% { opacity: 1; transform: translateX(-8px) scale(1.05); }
          100% { opacity: 1; transform: translateX(0) scale(1); }
        }
      `}</style>
    </div>
  );
}