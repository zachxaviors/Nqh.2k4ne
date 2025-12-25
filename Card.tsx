import React, { useState, useEffect, useRef } from 'react';

interface CardProps {
  onClose: () => void;
}

const LINES = [
  "Quang, chúc Bống một mùa Giáng Sinh thật là Happy như cách Bống",
  "Thương, Gia Đình/Chị em mình vậy & Giáng Sinh an lành ❤️.",
  "Bống, như ông già noel vậy vì anh sinh ra anh đã thích ông già noel!",
  "Lắm, Chuyện Để Tâm Sự Nhưng Quang Lại Không Rảnh Để Nói Cùng Bống, Sad!!",
  "Quang Không Giỏi Nói Ngọt vì sợ Bống thành 'Đường Tăng'",
  "Rất nhiều Kẻ Dồm Ngó dù anh có '72 Phép Biến Hoá' cũng khó bảo vệ trước đám tiểu yêu",
  "Thích em như thương bản thân anh vậy vì anh luôn khoe mẽ bản thân anh có và khiến họ ganh tị",
  "Bống như nhà sáng lập Guinness vì anh luôn vì bống mà phá vỡ mọi kỷ lục"
];

const Card: React.FC<CardProps> = ({ onClose }) => {
  const [displayedLines, setDisplayedLines] = useState<string[]>(["", "", ""]);
  const [lineIndex, setLineIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Cursor blinking effect
  useEffect(() => {
    const interval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Typing effect
  useEffect(() => {
    if (lineIndex >= LINES.length) return;

    const timer = setTimeout(() => {
      setDisplayedLines(prev => {
        const newLines = [...prev];
        const currentLineText = LINES[lineIndex];
        if (charIndex < currentLineText.length) {
            newLines[lineIndex] = currentLineText.substring(0, charIndex + 1);
        }
        return newLines;
      });

      if (charIndex + 1 < LINES[lineIndex].length) {
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => {
            setLineIndex(prev => prev + 1);
            setCharIndex(0);
        }, 300);
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [lineIndex, charIndex]);

  const handleSkip = () => {
    setDisplayedLines(LINES);
    setLineIndex(LINES.length);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 p-4 bg-black/70 backdrop-blur-sm animate-[appear_0.5s_ease-out]">
      <div 
        className="relative bg-[#fffaff] border-[3px] border-red-400 rounded-xl p-5 md:p-6 max-w-[90%] md:max-w-sm w-full shadow-[0_0_40px_rgba(255,50,50,0.3)] text-center text-[#222] font-['Mallanna',_sans-serif] transform transition-transform"
        onClick={handleSkip}
      >
        
        <button 
          onClick={(e) => { e.stopPropagation(); onClose(); }}
          className="absolute -top-3 -right-3 w-7 h-7 bg-white border-2 border-red-400 rounded-full flex items-center justify-center text-lg text-red-500 hover:bg-red-500 hover:text-white transition-all z-20 shadow-md"
          aria-label="Đóng"
        >
          &times;
        </button>

        <div className="mb-3">
          <h2 className="text-2xl md:text-3xl text-red-600 font-bold drop-shadow-sm">🎄 Thư Chúc Mừng 🎄</h2>
          <div className="w-12 h-1 bg-red-400 mx-auto mt-1 rounded-full"></div>
        </div>

        <div 
            ref={containerRef}
            className="space-y-3 text-base md:text-lg leading-tight font-semibold min-h-[140px] text-left select-none cursor-pointer overflow-y-auto max-h-[50vh]"
            title="Nhấn để hiện tất cả chữ"
        >
          {displayedLines.map((text, idx) => (
             (idx <= lineIndex) && (
                 <p key={idx} className="bg-red-50/50 p-2 rounded-md border-l-2 border-red-200">
                   {text}
                   {idx === lineIndex && lineIndex < LINES.length && (
                     <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} inline-block w-[2px] h-[1.1em] bg-red-600 ml-1 align-bottom`}></span>
                   )}
                 </p>
             )
          ))}
        </div>

        <div className={`mt-4 text-red-600 font-bold text-lg md:text-xl transition-all duration-1000 ${lineIndex >= LINES.length ? 'opacity-100 scale-105' : 'opacity-0 translate-y-2'}`}>
          Giáng Sinh Vui Vẻ! ❤️
        </div>
        
        {lineIndex < LINES.length && (
            <div className="absolute bottom-2 right-4 text-[9px] text-gray-400 italic animate-pulse">
                Chạm để xem hết...
            </div>
        )}
      </div>
    </div>
  );
};

export default Card;
