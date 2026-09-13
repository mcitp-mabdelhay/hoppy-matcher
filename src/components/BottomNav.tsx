import { Compass, MessageCircle, User } from 'lucide-react';

interface Props {
  currentTab: string;
  onTabChange: (tab: string) => void;
}

export default function BottomNav({ currentTab, onTabChange }: Props) {
  return (
    <div className="h-[68px] bg-white dark:bg-slate-900 border-t border-rose-100 dark:border-slate-800 flex items-center justify-around px-6 shrink-0 z-50">
       <NavButton icon={<Compass className="w-6 h-6" />} label="Discover" active={currentTab === 'discover'} onClick={() => onTabChange('discover')} />
       <NavButton icon={<MessageCircle className="w-6 h-6" />} label="Messages" active={currentTab === 'messages'} onClick={() => onTabChange('messages')} />
       <NavButton icon={<User className="w-6 h-6" />} label="Profile" active={currentTab === 'profile'} onClick={() => onTabChange('profile')} />
    </div>
  )
}

function NavButton({ icon, label, active, onClick }: any) {
    return (
        <button onClick={onClick} className={`flex flex-col items-center justify-center gap-1 transition-all duration-200 ${active ? 'text-rose-500 dark:text-rose-400 scale-110' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'}`}>
            <div className={`p-1.5 rounded-full ${active ? 'bg-rose-50 dark:bg-rose-900/30' : ''}`}>
                {icon}
            </div>
            <span className="text-[10px] font-medium tracking-wide">{label}</span>
        </button>
    )
}
