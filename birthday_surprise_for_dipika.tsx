import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Gift, Heart, Star, Music, Pause, Play, Sparkles, 
  Camera, ArrowDown, Award, PartyPopper, MessageCircleHeart,
  Laugh, X
} from 'lucide-react';

const birthdayData = {
  name: "Dipika",
  intro: {
    line1: "Hey Dipika... 👀",
    line2: "I made something for you.",
    line3: "But you have to open it yourself...",
    button: "Open Your Surprise"
  },
  reveal: {
    title: "HAPPY BIRTHDAY",
    subtitle: "Today is officially your day. So unfortunately... you have to tolerate all the attention. 😂",
    cakeMessage: "Make a wish, birthday girl. ✨"
  },
  messageCard: {
    heading: "A little something for you 💌",
    content: [
      "Dear Dipika,",
      "Happy Birthday! 🥳",
      "I don't know how many people you meet in life and actually end up becoming genuinely comfortable with, but I'm really glad you're one of those people for me.",
      "You've been there for the random conversations, the stupid jokes, the unnecessary drama, the laughs and all those little moments that somehow become good memories.",
      "You are genuinely one of those people who makes ordinary days a little more fun.",
      "So today, forget everything else for a moment. It's your day.",
      "Eat something amazing. Laugh too much. Take too many pictures. Ignore unnecessary people. And enjoy being the main character. 😂",
      "You deserve a really, really good year ahead.",
      "Happy Birthday once again, Dipika. 🫶🎂",
      "And yes... You're stuck with me as your best friend. Unfortunately. 😂❤️"
    ]
  },
  gallery: [
    { id: 1, caption: "That day 😂", image: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=600&auto=format&fit=crop", rotation: -2 },
    { id: 2, caption: "Why were we like this?", image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=600&auto=format&fit=crop", rotation: 3 },
    { id: 3, caption: "One of those random memories.", image: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?q=80&w=600&auto=format&fit=crop", rotation: -1 },
    { id: 4, caption: "Certified chaos.", image: "https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=600&auto=format&fit=crop", rotation: 4 },
    { id: 5, caption: "Still one of my favorites.", image: "https://images.unsplash.com/photo-1531747056595-07f6cbbe10ad?q=80&w=600&auto=format&fit=crop", rotation: -3 },
    { id: 6, caption: "Proof that we actually go outside.", image: "https://images.unsplash.com/photo-1506869640319-fea1a278e0c8?q=80&w=600&auto=format&fit=crop", rotation: 2 },
  ],
  timeline: [
    { title: "🌱 Then", desc: "Two people who didn't know they'd eventually become this close." },
    { title: "😂 The Random Conversations", desc: "Some conversations started normally. Some absolutely did not." },
    { title: "🫠 The Chaos Era", desc: "At some point, normal friendship stopped being an option." },
    { title: "🫶 The Good Memories", desc: "Some moments are completely ordinary when they happen... but become priceless later." },
    { title: "🎂 Today", desc: "And now we're here. Celebrating you." }
  ],
  traits: [
    "😂 Professional Overthinker",
    "✨ Somehow Always Memorable",
    "🫶 Actually a Good Human",
    "🎀 Main Character Energy",
    "🤣 Unlimited Nonsense",
    "💅 Zero Chill Sometimes",
    "❤️ Someone I'm Glad I Met"
  ],
  awards: [
    "🏆 Best At Making Random Conversations Last Forever",
    "🏆 Most Likely To Say 'Nothing' While Clearly Something Is Wrong",
    "🏆 Lifetime Achievement Award For Being My Best Friend",
    "🏆 Best Supporting Character In My Life",
    "🏆 Most Dangerous Person To Give Gossip To 😂"
  ],
  mysteryCards: [
    { title: "Card 1", message: "You're amazing. Don't let anyone convince you otherwise. 🫶" },
    { title: "Card 2", message: "Congratulations. You unlocked absolutely nothing useful. 😂" },
    { title: "Card 3", message: "Okay fine... here's a virtual hug. 🫂" }
  ],
  emotional: [
    "Life changes.",
    "People come and go.",
    "Everyone gets busy.",
    "Things don't always stay the same.",
    "But some people leave a genuinely good mark on your life.",
    "And you're one of those people.",
    "I'm genuinely grateful for all the memories, conversations, laughs and random moments we've had.",
    "I hope this year gives you more reasons to smile, more opportunities to grow, and a lot of moments you'll remember for years.",
    "Keep being you.",
    "Happy Birthday, Dipika. ❤️"
  ],
  final: {
    heading: "One Last Thing... 💌",
    button: "Open it",
    message1: "Here's to another year of memories, chaos, laughter and everything in between. 🫶",
    message2: "Stay awesome. Stay weird. 😂",
    signoff: "— Your Best Friend"
  }
};

const FloatingParticles = ({ count = 30, color = "bg-white", size = "w-1 h-1" }) => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${color} ${size} opacity-30`}
          initial={{
            x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
            y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000),
            scale: Math.random() * 0.5 + 0.5,
          }}
          animate={{
            y: [null, Math.random() * -100 - 50],
            x: [null, Math.random() * 100 - 50],
            opacity: [0.2, 0.8, 0.2],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const ConfettiBurst = ({ active, x, y }) => {
  if (!active) return null;
  const colors = ['bg-pink-500', 'bg-purple-500', 'bg-yellow-400', 'bg-blue-400', 'bg-emerald-400'];
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" style={{ top: y || 0, left: x || 0 }}>
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-3 h-3 ${colors[Math.floor(Math.random() * colors.length)]} rounded-sm`}
          initial={{ x: '50vw', y: '50vh', scale: 0, rotation: 0 }}
          animate={{
            x: `calc(50vw + ${Math.random() * 600 - 300}px)`,
            y: `calc(50vh + ${Math.random() * 600 - 300}px)`,
            scale: Math.random() * 1.5,
            rotate: Math.random() * 360,
            opacity: [1, 1, 0]
          }}
          transition={{ duration: Math.random() * 2 + 1, ease: "easeOut" }}
        />
      ))}
    </div>
  );
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      // Catch potential errors if no source is provided yet
      audioRef.current.play().catch(e => console.log("Audio play prevented or no source", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* REPLACE THIS SRC with your actual audio file URL */}
      <audio ref={audioRef} loop src="https://assets.mixkit.co/music/preview/mixkit-happy-birthday-to-you-ukulele-version-657.mp3" />
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={togglePlay}
        className="w-12 h-12 bg-white/20 backdrop-blur-md border border-white/30 rounded-full flex items-center justify-center text-white shadow-[0_0_15px_rgba(255,192,203,0.5)] relative"
      >
        {isPlaying ? <Pause size={20} /> : <Music size={20} />}
        {isPlaying && (
          <motion.div className="absolute inset-0 border border-pink-400 rounded-full"
            animate={{ scale: [1, 1.5], opacity: [1, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        )}
      </motion.button>
    </div>
  );
};

const Screen1_Intro = ({ onOpen }) => {
  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-fuchsia-900 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden"
      exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      <FloatingParticles count={50} color="bg-pink-300" />
      <FloatingParticles count={30} color="bg-purple-300" size="w-2 h-2" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="z-10 max-w-md"
      >
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight drop-shadow-lg">
          {birthdayData.intro.line1}
        </h1>
        <p className="text-xl md:text-2xl text-purple-200 mb-2 font-medium">
          {birthdayData.intro.line2}
        </p>
        <p className="text-lg md:text-xl text-purple-300/80 mb-12 italic">
          {birthdayData.intro.line3}
        </p>
        
        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(236,72,153,0.6)" }}
          whileTap={{ scale: 0.95 }}
          className="group relative px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-bold text-lg shadow-[0_0_20px_rgba(236,72,153,0.4)] overflow-hidden transition-all"
        >
          <span className="relative z-10 flex items-center gap-2">
            <Gift className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            {birthdayData.intro.button}
          </span>
          <motion.div 
            className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          />
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

const AnimatedCake = ({ onBlowCandles }) => {
  const [blown, setBlown] = useState(false);

  const handleTap = () => {
    if (!blown) {
      setBlown(true);
      onBlowCandles();
    }
  };

  return (
    <motion.div 
      className="relative w-48 h-48 md:w-64 md:h-64 mx-auto mt-12 cursor-pointer group"
      onClick={handleTap}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Plate */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-56 md:w-72 h-8 bg-gray-200/50 backdrop-blur-sm rounded-[100%] shadow-xl" />
      
      {/* Cake Tiers */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-40 md:w-56 h-20 md:h-24 bg-gradient-to-b from-pink-400 to-pink-600 rounded-xl shadow-lg flex items-center justify-center overflow-hidden">
        {/* Frosting drips */}
        <div className="absolute top-0 left-0 w-full flex space-x-2">
           {[...Array(6)].map((_, i) => (
             <div key={i} className="w-10 h-6 bg-white/80 rounded-b-full shadow-sm" style={{ height: Math.random() * 20 + 10 + 'px' }} />
           ))}
        </div>
      </div>
      
      <div className="absolute bottom-20 md:bottom-24 left-1/2 -translate-x-1/2 w-32 md:w-44 h-16 md:h-20 bg-gradient-to-b from-purple-400 to-purple-600 rounded-xl shadow-lg flex items-center justify-center overflow-hidden">
         <div className="absolute top-0 left-0 w-full flex space-x-2">
           {[...Array(5)].map((_, i) => (
             <div key={i} className="w-10 h-6 bg-white/80 rounded-b-full shadow-sm" style={{ height: Math.random() * 15 + 10 + 'px' }} />
           ))}
        </div>
      </div>

      {/* Candles */}
      <div className="absolute bottom-36 md:bottom-44 left-1/2 -translate-x-1/2 flex gap-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="relative w-3 h-12 bg-gradient-to-b from-white to-pink-200 rounded-sm shadow-sm">
            {/* Flames */}
            <AnimatePresence>
              {!blown && (
                <motion.div
                  exit={{ scale: 0, opacity: 0, y: -10 }}
                  className="absolute -top-6 -left-1 w-5 h-8 bg-gradient-to-t from-yellow-400 to-orange-500 rounded-full shadow-[0_0_10px_rgba(252,211,77,0.8)]"
                  style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }}
                  animate={{
                    scale: [1, 1.1, 0.9, 1],
                    rotate: [0, -2, 2, 0],
                  }}
                  transition={{
                    duration: 0.5 + Math.random() * 0.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
      
      {/* Interaction Hint */}
      {!blown && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap text-white/70 text-sm font-medium tracking-wider pointer-events-none"
        >
          Tap to blow out candles
        </motion.div>
      )}
    </motion.div>
  );
};

const Screen2_Reveal = () => {
  const [wished, setWished] = useState(false);

  return (
    <section className="min-h-[100svh] relative flex flex-col items-center justify-center p-6 bg-gradient-to-b from-fuchsia-900 via-purple-900 to-pink-900 overflow-hidden pt-20">
      <FloatingParticles count={40} color="bg-yellow-200" />
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, type: "spring" }}
        className="text-center z-10 w-full max-w-3xl"
      >
        <motion.h1 
          className="text-5xl md:text-7xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-300 mb-6 drop-shadow-[0_0_15px_rgba(236,72,153,0.3)] leading-tight tracking-tighter"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% auto" }}
        >
          {birthdayData.reveal.title}<br/>{birthdayData.name}!
        </motion.h1>
        
        <p className="text-lg md:text-2xl text-purple-200/90 font-medium max-w-xl mx-auto leading-relaxed">
          {birthdayData.reveal.subtitle}
        </p>

        <AnimatedCake onBlowCandles={() => setWished(true)} />

        <AnimatePresence>
          {wished && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 text-2xl md:text-4xl font-bold text-pink-300 italic flex items-center justify-center gap-3"
            >
              <Sparkles className="text-yellow-400" />
              {birthdayData.reveal.cakeMessage}
              <Sparkles className="text-yellow-400" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      <ConfettiBurst active={wished} />
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-white/50">
        <ArrowDown />
      </div>
    </section>
  );
};

const Screen3_Message = () => {
  return (
    <section className="py-24 px-6 min-h-screen flex items-center justify-center bg-[#fdf5f6] relative">
      <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
      
      <motion.div
        initial={{ opacity: 0, y: 50, rotateX: 20 }}
        whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, type: "spring", bounce: 0.4 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden z-10 border border-pink-100"
      >
        <div className="bg-pink-50 py-6 px-8 border-b border-pink-100 flex items-center gap-4">
          <MessageCircleHeart className="text-pink-500 w-8 h-8" />
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">{birthdayData.messageCard.heading}</h2>
        </div>
        
        <div className="p-8 md:p-12 space-y-6">
          {birthdayData.messageCard.content.map((paragraph, idx) => (
            <motion.p 
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.8 }}
              className={`text-lg md:text-xl text-gray-700 leading-relaxed font-serif ${idx === 0 || idx >= birthdayData.messageCard.content.length - 2 ? 'font-bold text-pink-600' : ''}`}
            >
              {paragraph}
            </motion.p>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

const Screen4_Gallery = () => {
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <section className="py-24 px-4 md:px-8 bg-gradient-to-b from-[#fdf5f6] to-pink-50 relative">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 flex items-center justify-center gap-3">
            <Camera className="text-pink-500" />
            Our Little Collection of Memories
          </h2>
          <p className="text-gray-500 text-lg">Tap any photo to remember</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 auto-rows-[200px] md:auto-rows-[300px]">
          {birthdayData.gallery.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, type: "spring", stiffness: 100 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedImg(item)}
              className="relative rounded-2xl overflow-hidden shadow-lg cursor-pointer bg-white p-2 md:p-3 border border-gray-100 flex flex-col"
              style={{ transform: `rotate(${item.rotation}deg)` }}
            >
              <div className="flex-1 w-full relative overflow-hidden rounded-xl bg-gray-100">
                <img 
                  src={item.image} 
                  alt={item.caption}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  loading="lazy"
                />
              </div>
              <p className="text-center mt-3 font-medium text-gray-700 text-sm md:text-base font-serif italic">
                {item.caption}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImg(null)}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.5, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white p-4 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col"
            >
              <button 
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-pink-500 transition-colors z-10"
              >
                <X size={24} />
              </button>
              <div className="relative flex-1 overflow-hidden rounded-xl min-h-[50vh] bg-gray-100">
                <img 
                  src={selectedImg.image} 
                  alt={selectedImg.caption}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-center mt-4 text-xl md:text-2xl font-serif text-gray-800 italic">
                {selectedImg.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

const Screen5_Timeline = () => {
  return (
    <section className="py-24 px-6 bg-pink-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-30 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-30 translate-y-1/2 -translate-x-1/2" />
      
      <div className="max-w-3xl mx-auto relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-black text-center text-gray-800 mb-20"
        >
          How We Somehow Got Here 😂
        </motion.h2>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-1 before:bg-gradient-to-b before:from-pink-300 before:via-purple-300 before:to-pink-300">
          {birthdayData.timeline.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, type: "spring" }}
              className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
            >
              {/* Marker */}
              <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-white bg-pink-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 relative">
                <Heart className="w-4 h-4 text-white fill-current" />
                <div className="absolute inset-0 rounded-full bg-pink-400 animate-ping opacity-20" />
              </div>
              
              {/* Content Card */}
              <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-6 rounded-2xl bg-white shadow-xl border border-pink-100 hover:-translate-y-1 transition-transform duration-300">
                <h3 className="text-xl md:text-2xl font-bold text-pink-600 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Screen6_7_TraitsAwards = () => {
  return (
    <section className="py-24 px-6 bg-gradient-to-b from-pink-50 to-purple-50">
      <div className="max-w-6xl mx-auto space-y-32">
        
        {/* Traits */}
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12 flex justify-center items-center gap-3"
          >
            <Sparkles className="text-purple-500" />
            Things That Make You... You 💖
          </motion.h2>
          <div className="flex flex-wrap justify-center gap-4">
            {birthdayData.traits.map((trait, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, type: "spring", bounce: 0.5 }}
                whileHover={{ scale: 1.1, rotate: Math.random() * 4 - 2 }}
                className="px-6 py-3 bg-white rounded-full shadow-lg border border-purple-100 text-purple-700 font-medium text-lg cursor-default"
              >
                {trait}
              </motion.div>
            ))}
          </div>
        </div>

        {/* Awards */}
        <div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black text-center text-gray-800 mb-16"
          >
            🏆 The Extremely Serious Dipika Awards
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {birthdayData.awards.map((award, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                whileHover={{ y: -10, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                className="bg-gradient-to-br from-yellow-50 to-amber-100 p-8 rounded-3xl border border-yellow-200 shadow-lg relative overflow-hidden group"
              >
                <div className="absolute -right-6 -top-6 opacity-10 transform group-hover:rotate-12 transition-transform duration-500">
                  <Award size={120} />
                </div>
                <h3 className="text-xl font-bold text-yellow-900 leading-snug relative z-10">{award}</h3>
              </motion.div>
            ))}
          </div>
        </div>
        
      </div>
    </section>
  );
};

const Screen8_Mystery = () => {
  const [openedCards, setOpenedCards] = useState([]);

  const toggleCard = (index) => {
    if (!openedCards.includes(index)) {
      setOpenedCards([...openedCards, index]);
    }
  };

  return (
    <section className="py-24 px-6 bg-purple-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.4)_0,transparent_100%)]" />
      <FloatingParticles count={20} color="bg-white" size="w-1 h-1" />
      
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Pick One 👀
        </motion.h2>
        <p className="text-purple-200 mb-12 text-lg">Choose carefully... or just open them all.</p>

        <div className="grid md:grid-cols-3 gap-6 perspective-1000">
          {birthdayData.mysteryCards.map((card, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, rotateY: -90 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8, type: "spring" }}
              className="relative h-64 cursor-pointer preserve-3d"
              onClick={() => toggleCard(i)}
            >
              <motion.div
                className="w-full h-full absolute top-0 left-0 transition-all duration-700 preserve-3d"
                animate={{ rotateY: openedCards.includes(i) ? 180 : 0 }}
              >
                {/* Front */}
                <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl shadow-xl flex flex-col items-center justify-center border-2 border-white/20">
                  <Gift className="w-16 h-16 text-white mb-4 animate-pulse" />
                  <span className="text-2xl font-bold">{card.title}</span>
                </div>
                
                {/* Back */}
                <div className="absolute w-full h-full backface-hidden bg-white rounded-3xl shadow-xl flex items-center justify-center p-6 border-2 border-pink-300 text-center [transform:rotateY(180deg)]">
                  <p className="text-xl font-bold text-purple-800">{card.message}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Screen9_Emotional = () => {
  return (
    <section className="py-32 px-6 bg-slate-950 text-white relative flex flex-col justify-center items-center min-h-screen">
      <FloatingParticles count={60} color="bg-white" size="w-1 h-1" />
      
      <div className="max-w-3xl mx-auto text-center space-y-12 z-10">
        <motion.h2 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-200px" }}
          className="text-2xl md:text-3xl font-medium text-pink-400 italic mb-16"
        >
          Okay... jokes aside. ❤️
        </motion.h2>

        <div className="space-y-8">
          {birthdayData.emotional.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: i * 0.3 }}
              className={`text-xl md:text-3xl font-light leading-relaxed ${
                i === birthdayData.emotional.length - 1 ? 'font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400 text-3xl md:text-5xl mt-12' : 'text-slate-300'
              }`}
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  );
};

const Screen10_Final = () => {
  const [opened, setOpened] = useState(false);

  return (
    <section className="min-h-screen bg-[#0a0a1a] flex items-center justify-center p-6 relative overflow-hidden">
      {!opened && <FloatingParticles count={20} color="bg-purple-500" />}
      
      <div className="z-10 w-full max-w-2xl flex flex-col items-center">
        {!opened ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl font-bold text-white mb-12 drop-shadow-md">
              {birthdayData.final.heading}
            </h2>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setOpened(true)}
              className="relative w-64 h-48 cursor-pointer group mx-auto"
            >
              {/* Envelope Body */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-600 to-purple-800 rounded-lg shadow-[0_0_50px_rgba(236,72,153,0.5)] border border-pink-400/30 overflow-hidden flex items-center justify-center">
                 <Heart className="w-16 h-16 text-pink-300 animate-pulse" fill="currentColor" />
              </div>
              {/* Flap (Simulated with a triangle div) */}
              <div className="absolute top-0 left-0 w-full h-0 border-l-[128px] border-l-transparent border-r-[128px] border-r-transparent border-t-[100px] border-t-pink-500 rounded-t-lg origin-top transition-transform duration-500 group-hover:rotate-x-12" />
              
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                 <button className="px-6 py-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/30 rounded-full text-white font-medium transition-colors">
                   {birthdayData.final.button}
                 </button>
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
            className="text-center space-y-8 relative"
          >
            <ConfettiBurst active={true} />
            <FloatingParticles count={100} color="bg-pink-400" size="w-2 h-2" />
            <FloatingParticles count={50} color="bg-yellow-300" size="w-3 h-3" />
            
            <motion.h1 
              className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-300 to-yellow-300 drop-shadow-[0_0_30px_rgba(236,72,153,0.8)]"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✨ {birthdayData.name.toUpperCase()} ✨
            </motion.h1>
            
            <div className="text-3xl flex justify-center gap-4 animate-bounce">
              🎈 🎂 🎉 🥳 💖 🎀
            </div>
            
            <div className="space-y-4 bg-white/5 backdrop-blur-xl p-8 rounded-3xl border border-white/10">
              <p className="text-xl md:text-2xl text-pink-100 font-medium">{birthdayData.final.message1}</p>
              <p className="text-xl md:text-2xl text-purple-200 font-bold italic">{birthdayData.final.message2}</p>
              <p className="text-lg text-white/50 pt-4 border-t border-white/10 mt-4">{birthdayData.final.signoff}</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default function App() {
  const [isOpened, setIsOpened] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  return (
    <div className="bg-[#0a0a1a] min-h-screen text-slate-800 font-sans selection:bg-pink-300 selection:text-pink-900 overflow-x-hidden">
      {/* Custom Styles for Utilities */}
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-x-12 { transform: rotateX(12deg); }
        /* Smooth scrolling */
        html { scroll-behavior: smooth; }
        /* Hide scrollbar for cleaner look if desired, but keep functionality */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #1e1e2f; }
        ::-webkit-scrollbar-thumb { background: #ec4899; border-radius: 4px; }
      `}</style>

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <Screen1_Intro key="intro" onOpen={() => setIsOpened(true)} />
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Scroll Progress Indicator */}
            <motion.div
              className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 transform origin-left z-[100]"
              style={{ scaleX }}
            />
            
            <MusicPlayer />
            
            <Screen2_Reveal />
            <Screen3_Message />
            <Screen4_Gallery />
            <Screen5_Timeline />
            <Screen6_7_TraitsAwards />
            <Screen8_Mystery />
            <Screen9_Emotional />
            <Screen10_Final />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}