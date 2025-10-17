// Gullu - Cute & Romantic Apology (single-file React component)
// How to use:
// 1) Copy this file into a React app (e.g., create-react-app / Vite). Save as src/App.jsx
// 2) Ensure TailwindCSS is configured in your project (recommended) OR the classes will still work but styling may be less refined.
// 3) npm install framer-motion canvas-confetti
// 4) Run the app and deploy (Vercel / Netlify / GitHub Pages). Use the deployed URL to make a QR code.

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function App() {
  const [forgiven, setForgiven] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [floatingHearts, setFloatingHearts] = useState([]);

  useEffect(() => {
    // create a few floating emojis/hearts on load
    const hearts = Array.from({ length: 8 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      size: 18 + Math.random() * 28,
    }));
    setFloatingHearts(hearts);
  }, []);

  function handleForgive() {
    setForgiven(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  }

  function handleMakeBetter() {
    setShowTips(true);
    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.4 },
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-pink-50 via-purple-50 to-yellow-50 p-6">
      {/* Decorative floating hearts/emojis */}
      {floatingHearts.map(h => (
        <motion.div
          key={h.id}
          initial={{ y: 0, opacity: 0 }}
          animate={{ y: -220 - Math.random() * 200, opacity: 1 }}
          transition={{ delay: h.delay, duration: 6 + Math.random() * 6, repeat: Infinity, ease: 'linear' }}
          style={{ left: `${h.left}%`, position: 'absolute', top: '65%' }}
        >
          <div style={{ fontSize: h.size, transform: `rotate(${Math.random()*40-20}deg)` }}>
            {['💖','🥰','😍','🌸','💕','😊','😘','💐'][Math.floor(Math.random()*8)]}
          </div>
        </motion.div>
      ))}

      <div className="relative max-w-2xl w-full">
        <div className="rounded-2xl p-8 shadow-2xl backdrop-blur bg-white/70 border border-white/60">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 flex items-center justify-center text-4xl shadow-xl">🥺</div>
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight">For Gullu — my one and only 🌼</h1>
              <p className="mt-1 text-sm opacity-80">A tiny, very sincere (and slightly silly) apology.</p>
            </div>
          </div>

          <div className="mt-6 p-6 rounded-xl bg-white/90 border border-dashed border-pink-200">
            <motion.p
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-lg leading-relaxed"
            >
              Hey Gullu 💕 — I'm really sorry for being an absolute softie in the mornings. I can't help it: when I see your adorable messy bun, my brain does a dramatic face-plant and forgets how to be a functioning adult. Please forgive this hopelessly smitten fool — I promise to bring you tea, smiles, and better jokes as penance. 😅
            </motion.p>

            <div className="mt-4 flex gap-3 items-center">
              <button
                onClick={handleForgive}
                className="px-4 py-2 rounded-full bg-gradient-to-r from-pink-500 to-red-400 text-white font-semibold shadow hover:scale-105 transform transition"
              >
                {forgiven ? 'You forgave me! ❤️' : 'Forgive me ❤️'}
              </button>

              <button
                onClick={handleMakeBetter}
                className="px-4 py-2 rounded-full border-2 border-pink-300 bg-white font-semibold hover:bg-pink-50 transform transition"
              >
                Make me a better boyfriend ✨
              </button>

              <a
                href="#qr"
                className="ml-auto text-sm opacity-80 underline"
              >Send via QR</a>
            </div>
          </div>

          {/* Funny mini-panel */}
          <div className="mt-6">
            <div className="rounded-xl p-4 bg-gradient-to-r from-yellow-50 to-pink-50 border border-yellow-200">
              <h3 className="font-bold">Funny note (read aloud for best results 😆)</h3>
              <p className="mt-2 text-sm opacity-85">If messy buns were a weapon, I would surrender immediately. Consider this my official, dramatic surrender. Also: I will no longer try to be cool in the morning. My new role is: Chief Bun Admirer & Breakfast Supplier.</p>
            </div>
          </div>

          {/* Make me better section/modal-like panel */}
          {showTips && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6 p-4 rounded-xl bg-white/95 border border-purple-100"
            >
              <h4 className="font-bold">How I'll be a better boyfriend (my promises)</h4>
              <ul className="mt-2 space-y-2 text-sm">
                <li>• I will bring you your fav snack without being asked.</li>
                <li>• I will stop interrupting your shows (unless snacks involved).</li>
                <li>• I will try to cook — and accept constructive criticism with dignity.</li>
                <li>• I will compliment your messy bun like it’s a national treasure.</li>
              </ul>
              <p className="mt-3 text-xs opacity-80">(If there are more things you want, press the big heart and leave your commands.)</p>
            </motion.div>
          )}

          {/* A subtle footer / QR area */}
          <div id="qr" className="mt-6 flex gap-4 items-center">
            <div>
              <p className="text-xs opacity-80">Share this little site with Gullu — create a QR code from your deployed site URL and scan to surprise her.</p>
            </div>
          </div>
        </div>

        {/* corner hearts */}
        <div className="absolute -top-6 -right-6 w-40 h-40 pointer-events-none">
          <motion.div
            animate={{ rotate: [0, 15, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="text-6xl"
            style={{ transformOrigin: 'center' }}
          >
            💕
          </motion.div>
        </div>
      </div>

      {/* Tiny sticky credit */}
      <div className="fixed bottom-4 left-4 text-xs opacity-70">Made with ❤️ — just for Gullu</div>
    </div>
  );
}
