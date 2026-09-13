import { useState } from 'react';
import { POTENTIAL_MATCHES } from '../mockData';
import { Lock, ArrowLeft, Send } from 'lucide-react';
import { motion } from 'motion/react';

export default function MessagesScreen() {
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState<{text: string, sender: 'me' | 'them'}[]>([
      { text: "Hey! I saw we both love hiking. Have you been to the trails up north recently?", sender: 'them' },
      { text: "Hi! Yes, I was actually there last weekend. It was beautiful!", sender: 'me' }
  ]);

  const handleSend = () => {
      if (!inputText.trim()) return;
      setMessages([...messages, { text: inputText, sender: 'me' }]);
      setInputText('');
  }

  if (activeChat) {
      const user = POTENTIAL_MATCHES.find(u => u.id === activeChat);
      return (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', bounce: 0, duration: 0.4 }} className="absolute inset-0 z-20 flex flex-col bg-gray-50 dark:bg-slate-950">
              {/* Chat Header */}
              <div className="h-[72px] bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-rose-100 dark:border-slate-800 flex items-center px-4 gap-3 shrink-0 shadow-sm z-10 pt-2">
                  <button onClick={() => setActiveChat(null)} className="p-2 -ml-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors rounded-full hover:bg-gray-100 dark:hover:bg-slate-800">
                      <ArrowLeft className="w-5 h-5" />
                  </button>
                  <img src={user?.photos[0]} alt="" className="w-10 h-10 rounded-full object-cover border border-rose-100 dark:border-slate-700" />
                  <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100 leading-tight tracking-tight">{user?.name}</h3>
                      {user?.isOnline ? (
                          <p className="text-[11px] text-emerald-500 font-medium">Online now</p>
                      ) : (
                          <p className="text-[11px] text-gray-400">Offline</p>
                      )}
                  </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                  <div className="flex justify-center mb-4 mt-2">
                      <div className="bg-amber-100/60 dark:bg-amber-900/20 text-amber-800 dark:text-amber-200/80 text-[10px] px-4 py-2 rounded-2xl flex items-start gap-2 backdrop-blur-sm border border-amber-200/50 dark:border-amber-800/30 max-w-[90%] text-center leading-relaxed">
                          <Lock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                          <span>Messages are <strong>end-to-end encrypted</strong>. No one outside of this chat can read or listen to them.</span>
                      </div>
                  </div>
                  {messages.map((msg, idx) => (
                      <div key={idx} className={`max-w-[80%] p-3.5 shadow-sm text-[15px] leading-relaxed ${msg.sender === 'me' ? 'self-end bg-gradient-to-br from-rose-500 to-rose-400 text-white rounded-3xl rounded-tr-sm' : 'self-start bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 text-gray-800 dark:text-gray-200 rounded-3xl rounded-tl-sm'}`}>
                          {msg.text}
                      </div>
                  ))}
              </div>

              {/* Input */}
              <div className="p-4 bg-white dark:bg-slate-900 border-t border-rose-100 dark:border-slate-800 shrink-0 pb-6">
                  <div className="flex items-center gap-2 bg-gray-100/80 dark:bg-slate-800/80 rounded-full pl-5 pr-1.5 py-1.5 border border-transparent focus-within:border-rose-200 dark:focus-within:border-slate-700 transition-colors">
                      <input 
                          type="text" 
                          placeholder="Message..." 
                          className="flex-1 bg-transparent border-none focus:outline-none text-[15px] dark:text-white placeholder-gray-400" 
                          value={inputText}
                          onChange={(e) => setInputText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                      />
                      <button onClick={handleSend} className="w-9 h-9 rounded-full bg-rose-500 flex items-center justify-center text-white shrink-0 hover:bg-rose-600 transition-colors shadow-sm active:scale-95">
                          <Send className="w-[18px] h-[18px] ml-0.5" />
                      </button>
                  </div>
              </div>
          </motion.div>
      )
  }

  return (
      <div className="flex-1 flex flex-col overflow-hidden bg-rose-50/30 dark:bg-slate-950">
          <div className="px-6 py-4 pt-6 shrink-0 z-10">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">Messages</h2>
          </div>
          <div className="flex-1 overflow-y-auto px-4 pb-4">
              {POTENTIAL_MATCHES.map(user => (
                  <button key={user.id} onClick={() => setActiveChat(user.id)} className="w-full flex items-center gap-4 p-3 rounded-2xl hover:bg-white dark:hover:bg-slate-800/50 transition-colors text-left group border border-transparent active:scale-[0.98] mb-1">
                      <div className="relative shrink-0">
                          <img src={user.photos[0]} alt="" className="w-14 h-14 rounded-full object-cover shadow-sm group-hover:shadow-md transition-shadow" />
                          {user.isOnline && (
                              <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
                          )}
                      </div>
                      <div className="flex-1 min-w-0 border-b border-gray-100 dark:border-slate-800/50 group-last:border-none pb-4 pt-1">
                          <div className="flex justify-between items-baseline mb-1">
                              <h4 className="font-bold text-[15px] text-gray-900 dark:text-gray-100 truncate tracking-tight">{user.name}</h4>
                              <span className="text-[11px] text-gray-400 shrink-0 font-medium">2m</span>
                          </div>
                          <p className="text-[14px] text-gray-500 dark:text-gray-400 truncate tracking-tight">Hey! I saw we both love hiking...</p>
                      </div>
                  </button>
              ))}
          </div>
      </div>
  )
}
