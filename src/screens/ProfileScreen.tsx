import { CURRENT_USER } from '../mockData';
import { Moon, Shield, Eye, Lock, ShieldCheck, LogOut, Settings, Bell } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function ProfileScreen() {
   const [darkMode, setDarkMode] = useState(() => document.documentElement.classList.contains('dark'));
   const [privacy, setPrivacy] = useState(CURRENT_USER.privacy);

   useEffect(() => {
       if (darkMode) {
           document.documentElement.classList.add('dark');
       } else {
           document.documentElement.classList.remove('dark');
       }
   }, [darkMode]);

   return (
       <div className="flex-1 flex flex-col overflow-y-auto bg-gray-50 dark:bg-slate-950 pb-8">
            <div className="bg-white dark:bg-slate-900 p-6 shadow-sm border-b border-rose-100/50 dark:border-slate-800/50 flex flex-col items-center pb-8 relative">
                <button className="absolute top-6 right-6 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
                    <Settings className="w-6 h-6" />
                </button>
                <div className="relative mt-4 mb-4">
                    <img src={CURRENT_USER.photos[0]} className="w-28 h-28 rounded-full object-cover border-[4px] border-white dark:border-slate-800 shadow-xl" alt="" />
                    <div className="absolute -bottom-2 -right-2 bg-blue-500 rounded-full p-1.5 border-[3px] border-white dark:border-slate-900">
                        <ShieldCheck className="w-4 h-4 text-white" />
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                    {CURRENT_USER.name}, {CURRENT_USER.age}
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 font-medium">{CURRENT_USER.location}</p>
                
                <div className="flex gap-4 mt-6 w-full max-w-[250px]">
                    <div className="flex-1 flex flex-col items-center p-3 bg-gray-50 dark:bg-slate-800/50 rounded-2xl">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">24</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Matches</span>
                    </div>
                    <div className="flex-1 flex flex-col items-center p-3 bg-gray-50 dark:bg-slate-800/50 rounded-2xl">
                        <span className="text-xl font-bold text-gray-900 dark:text-white">128</span>
                        <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Likes</span>
                    </div>
                </div>
            </div>

            <div className="p-4 space-y-6 mt-2">
                <section>
                    <h3 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2.5 px-3">Preferences</h3>
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800/60 overflow-hidden divide-y divide-gray-50 dark:divide-slate-800/50">
                        <ToggleRow
                            icon={<div className="bg-indigo-50 dark:bg-indigo-900/30 p-2 rounded-xl text-indigo-500"><Moon className="w-5 h-5"/></div>}
                            label="Dark Mode"
                            description="Comfortable viewing in low light"
                            checked={darkMode}
                            onChange={setDarkMode}
                        />
                        <ToggleRow
                            icon={<div className="bg-rose-50 dark:bg-rose-900/30 p-2 rounded-xl text-rose-500"><Bell className="w-5 h-5"/></div>}
                            label="Push Notifications"
                            description="Get alerted for new matches"
                            checked={true}
                            onChange={() => {}}
                        />
                    </div>
                </section>

                <section>
                    <h3 className="text-[11px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-2.5 px-3 flex items-center gap-1.5"><Shield className="w-3.5 h-3.5"/> Privacy & Safety</h3>
                    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-gray-100 dark:border-slate-800/60 overflow-hidden divide-y divide-gray-50 dark:divide-slate-800/50">
                         <ToggleRow
                            icon={<div className="bg-blue-50 dark:bg-blue-900/30 p-2 rounded-xl text-blue-500"><Eye className="w-5 h-5"/></div>}
                            label="Online Status"
                            description="Let matches see when you're active"
                            checked={privacy.showOnlineStatus}
                            onChange={(c) => setPrivacy({...privacy, showOnlineStatus: c})}
                        />
                         <ToggleRow
                            icon={<div className="bg-emerald-50 dark:bg-emerald-900/30 p-2 rounded-xl text-emerald-500"><Lock className="w-5 h-5"/></div>}
                            label="E2E Encryption"
                            description="Force end-to-end encryption"
                            checked={privacy.endToEndEncryption}
                            onChange={(c) => setPrivacy({...privacy, endToEndEncryption: c})}
                        />
                    </div>
                </section>
                
                <button className="w-full py-4 text-rose-500 font-bold text-[15px] bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-rose-100/50 dark:border-slate-800/60 flex items-center justify-center gap-2 active:scale-[0.98] transition-transform">
                    <LogOut className="w-5 h-5" /> Sign Out
                </button>
            </div>
       </div>
   )
}

function ToggleRow({ icon, label, description, checked, onChange }: any) {
    return (
        <div className="flex items-center justify-between p-4 px-5 cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/30 transition-colors" onClick={() => onChange(!checked)}>
            <div className="flex items-center gap-4">
                {icon}
                <div>
                    <div className="font-bold text-[15px] tracking-tight text-gray-900 dark:text-gray-100 leading-tight mb-0.5">{label}</div>
                    <div className="text-[12px] font-medium text-gray-400 dark:text-gray-500">{description}</div>
                </div>
            </div>
            <button
                className={`w-12 h-7 rounded-full transition-colors relative shadow-inner ${checked ? 'bg-rose-500' : 'bg-gray-200 dark:bg-slate-700'}`}
            >
                <div className={`absolute top-[3px] left-[3px] w-[22px] h-[22px] bg-white rounded-full transition-transform shadow-sm ${checked ? 'translate-x-[18px]' : 'translate-x-0'}`}></div>
            </button>
        </div>
    )
}
