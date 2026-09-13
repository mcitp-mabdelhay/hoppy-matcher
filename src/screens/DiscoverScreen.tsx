import { useState } from 'react';
import { POTENTIAL_MATCHES, CURRENT_USER } from '../mockData';
import SwipeCard from '../components/SwipeCard';
import { AnimatePresence } from 'motion/react';
import { Heart, Sparkles } from 'lucide-react';

export default function DiscoverScreen() {
  const [cards, setCards] = useState(POTENTIAL_MATCHES);

  const calculateMatch = (userHobbies: string[]) => {
     const common = CURRENT_USER.hobbies.filter(h => userHobbies.includes(h));
     const percent = Math.min(99, Math.round((common.length / Math.max(CURRENT_USER.hobbies.length, 1)) * 100) + 30);
     return { common, percent: percent > 100 ? 98 : percent };
  };

  const handleSwipe = (direction: 'left' | 'right') => {
     setTimeout(() => {
        setCards(prev => prev.slice(1));
     }, 100); // Slight delay for animation to complete fully
  };

  return (
    <div className="flex-1 relative overflow-hidden flex flex-col bg-rose-50/30 dark:bg-slate-950">
       <div className="px-6 py-4 flex justify-between items-center z-10 shrink-0">
           <div className="flex items-center gap-2">
               <div className="w-8 h-8 bg-gradient-to-tr from-rose-400 to-orange-400 rounded-xl flex items-center justify-center text-white shadow-sm">
                   <Heart className="w-5 h-5" fill="currentColor" />
               </div>
               <h1 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">HobbyMatch</h1>
           </div>
           <button className="p-2 text-rose-500 bg-rose-50 dark:bg-rose-900/20 rounded-full hover:bg-rose-100 dark:hover:bg-rose-900/40 transition-colors">
               <Sparkles className="w-5 h-5" />
           </button>
       </div>

       <div className="flex-1 relative flex items-center justify-center p-4 pb-8">
           {cards.length > 0 ? (
               <div className="relative w-full max-w-sm h-full max-h-[600px]">
                 <AnimatePresence>
                     {cards.map((user, index) => {
                         // Only render top 2 cards for performance and visual stacking
                         if (index > 1) return null; 
                         const { common, percent } = calculateMatch(user.hobbies);
                         return (
                             <SwipeCard
                                key={user.id}
                                user={user}
                                matchPercent={percent}
                                commonHobbies={common}
                                onSwipe={handleSwipe}
                                active={index === 0}
                                zIndex={cards.length - index}
                             />
                         )
                     }).reverse()}
                 </AnimatePresence>
               </div>
           ) : (
               <div className="text-center flex flex-col items-center opacity-70 dark:opacity-50">
                   <div className="w-24 h-24 bg-rose-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-6 shadow-inner">
                       <Heart className="w-10 h-10 text-rose-300 dark:text-slate-600" />
                   </div>
                   <p className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-2">You're all caught up!</p>
                   <p className="text-sm text-gray-500 max-w-[200px]">We are looking for more people with similar hobbies near you.</p>
               </div>
           )}
       </div>
    </div>
  );
}
