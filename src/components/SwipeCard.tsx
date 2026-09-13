import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { User } from '../types';
import { CheckCircle, MapPin, Heart, X, Info } from 'lucide-react';
import { useState } from 'react';

interface Props {
  user: User;
  matchPercent: number;
  commonHobbies: string[];
  onSwipe: (dir: 'left' | 'right') => void;
  active: boolean;
  zIndex: number;
  key?: string;
}

export default function SwipeCard({ user, matchPercent, commonHobbies, onSwipe, active, zIndex }: Props) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  const opacity = useTransform(x, [-200, 0, 200], [0.5, 1, 0.5]);
  const scale = active ? 1 : 0.95;
  const yOffset = active ? 0 : 20;
  
  const [showDetails, setShowDetails] = useState(false);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      animate(x, 400, { duration: 0.2 }).then(() => onSwipe('right'));
    } else if (info.offset.x < -100) {
      animate(x, -400, { duration: 0.2 }).then(() => onSwipe('left'));
    } else {
      animate(x, 0, { type: 'spring', stiffness: 300, damping: 20 });
    }
  };

  const forceSwipe = (dir: 'left' | 'right') => {
      animate(x, dir === 'left' ? -300 : 300, { duration: 0.3 }).then(() => {
          onSwipe(dir);
      });
  }

  return (
    <motion.div
      style={{ x, rotate, opacity, zIndex, y: yOffset }}
      animate={{ scale, y: yOffset }}
      drag={active ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className={`absolute inset-0 w-full h-full bg-white dark:bg-slate-800 rounded-[2.5rem] shadow-xl overflow-hidden ${active ? 'cursor-grab active:cursor-grabbing' : ''} border border-rose-50 dark:border-slate-700/50 flex flex-col will-change-transform`}
    >
      <div className="relative flex-1 bg-gray-200 dark:bg-slate-900">
         <img src={user.photos[0]} alt={user.name} className="w-full h-full object-cover pointer-events-none select-none" draggable={false} />
         
         <div className="absolute top-5 left-5 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md px-3.5 py-1.5 rounded-full text-sm font-bold text-rose-500 dark:text-rose-400 shadow-sm border border-white/20 dark:border-slate-700/50">
            {matchPercent}% Match
         </div>
         
         {user.isOnline && (
             <div className="absolute top-5 right-5 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5 border border-emerald-400">
                 <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span> Online
             </div>
         )}

         <div className="absolute bottom-0 left-0 right-0 p-6 pt-24 bg-gradient-to-t from-black/90 via-black/50 to-transparent text-white pointer-events-none">
            <div className="flex items-center gap-2 mb-1 pointer-events-auto">
                <h2 className="text-3xl font-bold tracking-tight">{user.name}, {user.age}</h2>
                {user.isVerified && <CheckCircle className="w-6 h-6 text-blue-400" fill="currentColor" />}
            </div>
            
            <div className="flex items-center gap-1.5 text-white/90 text-sm mb-4 font-medium">
                <MapPin className="w-4 h-4" /> {user.location} • {user.distance}m away
            </div>

            <div className="flex flex-wrap gap-2 mb-3 pointer-events-auto">
                {commonHobbies.map(hobby => (
                    <span key={hobby} className="px-3 py-1 bg-rose-500/80 backdrop-blur-md rounded-full text-xs font-medium border border-rose-400/50 text-white shadow-sm">
                        {hobby}
                    </span>
                ))}
            </div>
            
            {showDetails && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="text-sm text-white/90 mt-3 font-medium leading-relaxed pointer-events-auto bg-black/20 p-3 rounded-xl backdrop-blur-sm border border-white/10">
                    {user.bio}
                </motion.div>
            )}
            
            <button onClick={(e) => { e.stopPropagation(); setShowDetails(!showDetails); }} className="mt-2 text-xs font-medium text-white/80 hover:text-white flex items-center gap-1 pointer-events-auto bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-md transition-colors hover:bg-white/20">
                <Info className="w-4 h-4" /> {showDetails ? 'Hide details' : 'Show full bio'}
            </button>
         </div>
      </div>
      
      <div className="h-[100px] shrink-0 bg-white dark:bg-slate-900 flex items-center justify-center gap-8 border-t border-rose-50 dark:border-slate-800">
          <button onClick={() => forceSwipe('left')} disabled={!active} className="w-16 h-16 bg-white dark:bg-slate-800 rounded-full shadow-[0_8px_30px_rgb(0,0,0,0.08)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.3)] flex items-center justify-center text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-700 transition-colors border border-gray-100 dark:border-slate-700 active:scale-95 disabled:opacity-50">
              <X className="w-8 h-8" strokeWidth={2.5} />
          </button>
          <button onClick={() => forceSwipe('right')} disabled={!active} className="w-16 h-16 bg-gradient-to-tr from-rose-400 to-orange-400 rounded-full shadow-[0_8px_30px_rgb(251,113,133,0.3)] flex items-center justify-center text-white hover:opacity-90 transition-opacity active:scale-95 disabled:opacity-50">
              <Heart className="w-8 h-8" fill="currentColor" />
          </button>
      </div>
    </motion.div>
  );
}
