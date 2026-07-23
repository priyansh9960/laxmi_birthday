import { useState, useEffect } from 'react';
import './index.css';
import Memory1 from './assets/memory_1.jpeg';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState(1);

  const goTo = (n) => {
    setCurrentScreen(n);
  };

  const restart = () => {
    setCurrentScreen(1);
  };

  return (
    <div id="stage" className="relative w-full h-full flex items-center justify-center">
      <PetalField />
      
      {/* SCREEN 1 : DIYA */}
      <ScreenDiya isActive={currentScreen === 1} onNext={() => goTo(2)} />

      {/* SCREEN 2 : GARLAND / TITLE */}
      <ScreenGarland isActive={currentScreen === 2} onNext={() => goTo(3)} />

      {/* SCREEN 3 : CAKE */}
      <ScreenCake isActive={currentScreen === 3} onNext={() => goTo(4)} />

      {/* SCREEN 4 : LETTER */}
      <ScreenLetter isActive={currentScreen === 4} onNext={() => goTo(5)} />

      {/* SCREEN 5 : MEMORIES */}
      <ScreenMemories isActive={currentScreen === 5} onNext={() => goTo(6)} />

      {/* SCREEN 6 : FINALE */}
      <ScreenFinale isActive={currentScreen === 6} onRestart={restart} />
    </div>
  );
}

function PetalField() {
  const [petals, setPetals] = useState([]);
  
  useEffect(() => {
    const newPetals = Array.from({ length: 22 }).map(() => ({
      left: Math.random() * 100 + '%',
      animationDuration: (8 + Math.random() * 10) + 's',
      animationDelay: (Math.random() * 10) + 's',
      opacity: 0.3 + Math.random() * 0.4,
      size: (8 + Math.random() * 10) + 'px',
    }));
    setPetals(newPetals);
  }, []);

  return (
    <div className="petal-field absolute inset-0 pointer-events-none overflow-hidden z-10" id="petalField">
      {petals.map((p, i) => (
        <div
          key={i}
          className="petal absolute bg-gold animate-fall rounded-[0_60%_0_60%]"
          style={{
            top: '-5%',
            left: p.left,
            animationDuration: p.animationDuration,
            animationDelay: p.animationDelay,
            opacity: p.opacity,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}

function Screen({ id, isActive, children }) {
  return (
    <div
      id={id}
      className={`screen absolute inset-0 flex flex-col items-center justify-center p-6 text-center transition-opacity duration-700 ${isActive ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
    >
      {children}
    </div>
  );
}

function ScreenDiya({ isActive, onNext }) {
  return (
    <Screen id="screen1" isActive={isActive}>
      <div className="eyebrow font-mukta tracking-[.35em] uppercase text-[11px] text-gold-light mb-[14px] opacity-85">
        A little light, just for you
      </div>
      <div className="diya-wrap relative w-[180px] h-[220px] z-20">
        <div className="flame absolute left-1/2 bottom-[118px] w-[22px] h-[34px] animate-flicker transform -translate-x-1/2"></div>
        <div className="diya-body absolute bottom-[40px] left-1/2 transform -translate-x-1/2 w-[150px] h-[56px]">
          <svg viewBox="0 0 150 56" className="w-full h-full block">
            <path d="M10,10 Q75,55 140,10 L140,20 Q75,45 10,20 Z" fill="#C9A227" stroke="#8a6d16" strokeWidth="1"/>
            <ellipse cx="75" cy="10" rx="65" ry="9" fill="#F0D27A"/>
          </svg>
        </div>
      </div>
      <h2 className="font-rozha font-normal m-0 mt-[26px] text-[22px] text-gold-light">Someone lit a lamp for Laxmi</h2>
      <div className="tap-hint mt-[28px] text-[12px] tracking-[.15em] uppercase text-gold-light opacity-70 animate-pulse">Tap the flame to begin</div>
      <div className="btn-tap-area absolute inset-0 cursor-pointer z-30" onClick={onNext}></div>
    </Screen>
  );
}

function ScreenGarland({ isActive, onNext }) {
  const [marigolds, setMarigolds] = useState([]);
  useEffect(() => {
    const gCount = 9;
    const newMarigolds = Array.from({ length: gCount }).map((_, i) => ({
      left: `calc(${(i / (gCount - 1)) * 100}% - 13px)`,
      animationDelay: (i * 0.15) + 's',
      top: (14 + Math.sin(i) * 6) + 'px',
    }));
    setMarigolds(newMarigolds);
  }, []);

  return (
    <Screen id="screen2" isActive={isActive}>
      <div className="garland relative w-full max-w-[520px] h-[70px] mb-2 z-20" id="garland">
        {marigolds.map((m, i) => (
          <div
            key={i}
            className="marigold absolute w-[26px] h-[26px] rounded-full animate-sway"
            style={{ left: m.left, top: m.top, animationDelay: m.animationDelay }}
          />
        ))}
      </div>
      <div className="eyebrow font-mukta tracking-[.35em] uppercase text-[11px] text-gold-light mb-[14px] opacity-85">Wishing you</div>
      <h1 className="title-name font-rozha font-normal m-0 text-[clamp(42px,10vw,72px)] text-gold-light" style={{ textShadow: '0 0 24px rgba(240,210,122,.5)' }}>Happy Birthday</h1>
      <h1 className="title-name font-rozha font-normal m-0 mt-[-6px] text-[clamp(42px,10vw,72px)] text-gold-light" style={{ textShadow: '0 0 24px rgba(240,210,122,.5)' }}>LAXMI</h1>
      <p className="subtitle font-mukta text-[15px] text-cream opacity-85 max-w-[340px] leading-[1.6] mt-[6px]">May this year bring you as much warmth as a hundred diyas, and as much abundance as your name promises.</p>
      <div className="tap-hint mt-[28px] text-[12px] tracking-[.15em] uppercase text-gold-light opacity-70 animate-pulse">Tap anywhere for cake 🎂</div>
      <div className="btn-tap-area absolute inset-0 cursor-pointer z-30" onClick={onNext}></div>
    </Screen>
  );
}

function ScreenCake({ isActive, onNext }) {
  const [blows, setBlows] = useState(0);

  useEffect(() => {
    if (!isActive) {
      setBlows(0);
    }
  }, [isActive]);

  const handleTap = () => {
    if (blows >= 3) return;
    const newBlows = blows + 1;
    setBlows(newBlows);
    if (newBlows >= 3) {
      setTimeout(() => onNext(), 1600);
    }
  };

  const isOut = blows >= 3;

  return (
    <Screen id="screen3" isActive={isActive}>
      <div className="eyebrow font-mukta tracking-[.35em] uppercase text-[11px] text-gold-light mb-[14px] opacity-85">Make a wish</div>
      <div className="cake-wrap relative z-20">
        <div className="candle relative w-[10px] h-[46px] mx-auto rounded-[2px]" onClick={handleTap} style={{ cursor: 'pointer' }}>
          <div className={`candle-flame absolute left-1/2 top-[-26px] transform -translate-x-1/2 w-[16px] h-[24px] animate-flickerFast transition-all duration-400 ${isOut ? 'opacity-0 scale-y-20' : 'opacity-100'}`}></div>
          <div className={`smoke absolute left-1/2 top-[-30px] w-[3px] h-[3px] transform -translate-x-1/2 ${isOut ? 'animate-smokeRise' : 'opacity-0'}`}></div>
        </div>
        <div className="tiers mt-0">
          <div className="tier tier1 mx-auto rounded-[6px] w-[120px] h-[34px] border-2 border-[#c76a63] mt-[-2px]"></div>
          <div className="tier tier2 mx-auto rounded-[6px] w-[150px] h-[40px] border-2 border-gold mt-[-2px]"></div>
        </div>
        <div className="plate w-[190px] h-[10px] bg-gold rounded-full mx-auto" style={{ boxShadow: '0 4px 10px rgba(0,0,0,.3)' }}></div>
      </div>
      <div className="cake-instruction mt-[22px] text-[13px] tracking-[.1em] text-gold-light uppercase">
        {isOut ? 'Make a wish, Laxmi 🌸' : (blows === 0 ? 'Tap the candle 3 times to blow it out' : `${3 - blows} more to go...`)}
      </div>
      <div className="counter font-rozha text-[34px] text-gold-light h-[44px]">
        {blows > 0 && blows < 3 ? '•'.repeat(blows) : ''}
      </div>
    </Screen>
  );
}

function ScreenLetter({ isActive, onNext }) {
  return (
    <Screen id="screen4" isActive={isActive}>
      <div className="eyebrow font-mukta tracking-[.35em] uppercase text-[11px] text-gold-light mb-[14px] opacity-85">A letter for you</div>
      <div className="lotus-frame relative w-full max-w-[440px] z-20">
        <div className="letter-card rounded-[4px] py-[34px] px-[28px] max-h-[52vh] overflow-y-auto text-left text-ink" style={{ boxShadow: '0 20px 60px rgba(0,0,0,.45)' }}>
          <div className="letter-greeting font-rozha text-[24px] text-maroon mb-[14px]">Dear Laxmi,</div>
          <div className="letter-body font-mukta text-[14.5px] leading-[1.85]">
            On a day as golden as your name, I hope you pause and notice how loved you are.
            You carry warmth into every room, and you deserve every bit of joy this year has to offer.<br/><br/>
            Aur haan, ek chhoti si baat batani thi — Pratik tumhe bohot pasand karta hai. Kabhi kabhi log seedha nahi keh paate, toh yeh diya hi keh raha hai uski taraf se. 🌼<br/><br/>
            Aur mujhe bhi ek cheez yaad aa rahi hai jo main kabhi nahi bhoolungi — woh raat jab hum dono baithe baithe itna hasse ki pet dukhne laga tha, aur baatein karte karte pata hi nahi chala kab subah ho gayi. Woh mera best memory hai tumhare saath — koi bada plan nahi, bas apnapan tha.<br/><br/>
            Aur ek baat aur — agar koi aapko "I love you" bole, toh he does more bolke aap mere pass aajana. 💕<br/><br/>
            May this year bring you steady laughter, good health, and moments that feel exactly like this one — soft, golden, and made just for you.<br/><br/>
            Here's to more birthdays, more stories, and more light. Happy birthday, truly.
          </div>
          <div className="letter-sign mt-[20px] font-rozha text-[16px] text-maroon text-right">— with love</div>
        </div>
      </div>
      <div className="tap-hint mt-[28px] text-[12px] tracking-[.15em] uppercase text-gold-light opacity-70 animate-pulse">Tap to continue</div>
      <div className="btn-tap-area absolute inset-0 cursor-pointer z-30" onClick={onNext}></div>
    </Screen>
  );
}

function ScreenMemories({ isActive, onNext }) {
  return (
    <Screen id="screen5" isActive={isActive}>
      <div className="eyebrow font-mukta tracking-[.35em] uppercase text-[11px] text-gold-light mb-[14px] opacity-85">A few of my favourites</div>
      <h2 className="font-rozha font-normal m-0 text-[22px] text-gold-light mb-[14px]">Us, through the years</h2>
      <div className="gallery-wrap z-20 w-full max-w-[560px]">
        <div className="gallery-scroll flex gap-[14px] overflow-x-auto py-[6px] px-[6px] pb-[18px]" style={{ scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch' }}>
          <div className="mem-card flex-none w-[180px] rounded-[10px] overflow-hidden border-2 border-gold bg-[#2c0b18]" style={{ scrollSnapAlign: 'center', boxShadow: '0 12px 30px rgba(0,0,0,.45)', transform: 'rotate(-3deg)' }}>
            <img src={Memory1} alt="memory 1" className="w-full h-[220px] object-cover block" />
            <div className="mem-caption font-mukta text-[11.5px] text-gold-light py-[8px] px-[10px] text-center">walking through world together</div>
          </div>
        </div>
        <button className="replay-btn mt-[22px] py-[12px] px-[30px] rounded-[30px] border border-gold-light bg-transparent text-gold-light font-mukta text-[13px] tracking-[.1em] uppercase cursor-pointer transition-colors duration-300 hover:bg-gold-light hover:text-maroon-deep z-30 relative" onClick={onNext}>Continue</button>
      </div>
    </Screen>
  );
}

function ScreenFinale({ isActive, onRestart }) {
  return (
    <Screen id="screen6" isActive={isActive}>
      <div className="finale-wrap z-20 flex flex-col items-center">
        <div className="om-ring w-[110px] h-[110px] rounded-full flex items-center justify-center mx-auto mb-[20px]">
          <span className="text-[52px] text-gold-light">✦</span>
        </div>
        <h1 className="font-rozha font-normal m-0 text-[34px] text-gold-light">Happy Birthday, Laxmi</h1>
        <p className="subtitle font-mukta text-[15px] text-cream opacity-85 max-w-[340px] leading-[1.6] mt-[6px]">May your year shine as bright as this little lamp.</p>
        <button className="replay-btn mt-[26px] py-[12px] px-[30px] rounded-[30px] border border-gold-light bg-transparent text-gold-light font-mukta text-[13px] tracking-[.1em] uppercase cursor-pointer transition-colors duration-300 hover:bg-gold-light hover:text-maroon-deep z-30 relative" onClick={onRestart}>Thank you for being with me always</button>
      </div>
    </Screen>
  );
}
