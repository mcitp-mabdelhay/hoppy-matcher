import { useState } from 'react';
import BottomNav from './components/BottomNav';
import DiscoverScreen from './screens/DiscoverScreen';
import MessagesScreen from './screens/MessagesScreen';
import ProfileScreen from './screens/ProfileScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import { AnimatePresence, motion } from 'motion/react';

export default function App() {
  const [onboardingComplete, setOnboardingComplete] = useState(false);
  const [currentTab, setCurrentTab] = useState('discover');

  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-900 flex items-center justify-center sm:p-8 font-sans selection:bg-rose-200 dark:selection:bg-rose-900">
        {/* Mobile simulator container */}
        <div className="w-full h-[100dvh] sm:h-[844px] sm:max-w-[390px] bg-white dark:bg-slate-900 sm:rounded-[3rem] sm:shadow-[0_20px_50px_rgb(0,0,0,0.15)] overflow-hidden flex flex-col relative sm:border-[8px] sm:border-gray-800 dark:sm:border-slate-800 ring-1 ring-gray-200 dark:ring-slate-800">
            
            {/* iOS style Status Bar Mock (for aesthetics on desktop) */}
            <div className="h-12 w-full hidden sm:flex items-center justify-between px-6 shrink-0 bg-transparent absolute top-0 left-0 right-0 z-50 pointer-events-none">
                <span className="text-[14px] font-semibold text-gray-900 dark:text-white tracking-tighter">9:41</span>
                <div className="flex items-center gap-1.5 opacity-80">
                    <div className="w-4 h-3 rounded-sm border-[1.5px] border-gray-900 dark:border-white"></div>
                    <div className="w-4 h-3 rounded-sm border-[1.5px] border-gray-900 dark:border-white"></div>
                    <div className="w-6 h-3 rounded-sm border-[1.5px] border-gray-900 dark:border-white"></div>
                </div>
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-hidden relative flex flex-col pt-0 sm:pt-10">
                {!onboardingComplete ? (
                    <OnboardingScreen onComplete={() => setOnboardingComplete(true)} />
                ) : (
                    <AnimatePresence mode="wait">
                        {currentTab === 'discover' && (
                            <motion.div key="discover" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="absolute inset-0 flex flex-col">
                                <DiscoverScreen />
                            </motion.div>
                        )}
                        {currentTab === 'messages' && (
                            <motion.div key="messages" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="absolute inset-0 flex flex-col">
                                <MessagesScreen />
                            </motion.div>
                        )}
                        {currentTab === 'profile' && (
                            <motion.div key="profile" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }} className="absolute inset-0 flex flex-col">
                                <ProfileScreen />
                            </motion.div>
                        )}
                    </AnimatePresence>
                )}
            </div>

            {/* Bottom Navigation */}
            {onboardingComplete && (
                <BottomNav currentTab={currentTab} onTabChange={setCurrentTab} />
            )}
            
            {/* iOS style Home Indicator Mock */}
            <div className="h-8 bg-white dark:bg-slate-900 shrink-0 flex items-center justify-center hidden sm:flex pb-2 z-50">
                <div className="w-32 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full"></div>
            </div>
        </div>
    </div>
  );
}
