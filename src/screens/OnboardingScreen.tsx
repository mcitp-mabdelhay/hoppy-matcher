import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ArrowLeft, Camera, Check, Heart, Plus, Sparkles, MapPin, User, FileText } from 'lucide-react';

const ALL_HOBBIES = [
  'Hiking', 'Cooking', 'Photography', 'Coffee', 'Yoga', 'Reading', 
  'Gaming', 'Travel', 'Music', 'Movies', 'Art', 'Sports', 
  'Dancing', 'Tech', 'Pets', 'Fashion', 'Fitness', 'Foodie'
];

interface Props {
  onComplete: () => void;
}

export default function OnboardingScreen({ onComplete }: Props) {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    bio: '',
    hobbies: [] as string[],
    photos: [] as string[]
  });

  const nextStep = () => {
    if (step < 4) {
      setDirection(1);
      setStep(s => s + 1);
    } else {
      onComplete();
    }
  };

  const prevStep = () => {
    if (step > 1) {
      setDirection(-1);
      setStep(s => s - 1);
    }
  };

  const toggleHobby = (hobby: string) => {
    setFormData(prev => ({
      ...prev,
      hobbies: prev.hobbies.includes(hobby) 
        ? prev.hobbies.filter(h => h !== hobby)
        : [...prev.hobbies, hobby]
    }));
  };

  const addMockPhoto = () => {
    if (formData.photos.length >= 6) return;
    const mockUrls = [
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=400&q=80',
      'https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&w=400&q=80',
    ];
    setFormData(prev => ({
      ...prev,
      photos: [...prev.photos, mockUrls[prev.photos.length % mockUrls.length]]
    }));
  };

  const removePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const isStepValid = () => {
    if (step === 1) return formData.name.trim().length > 0 && formData.age.trim().length > 0;
    if (step === 2) return formData.location.trim().length > 0;
    if (step === 3) return formData.hobbies.length >= 3;
    if (step === 4) return formData.photos.length >= 1;
    return true;
  };

  const variants = {
    enter: (dir: number) => ({ x: dir > 0 ? 50 : -50, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 50 : -50, opacity: 0 })
  };

  return (
    <div className="absolute inset-0 flex flex-col bg-gray-50 dark:bg-slate-950 z-50">
      {/* Header & Progress */}
      <div className="px-6 py-4 pt-6 shrink-0 z-10 flex items-center gap-4">
        <button 
          onClick={prevStep}
          className={`p-2 -ml-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-slate-800 transition-colors ${step === 1 ? 'opacity-0 pointer-events-none' : 'text-gray-600 dark:text-gray-300'}`}
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <div className="w-full h-1.5 bg-gray-200 dark:bg-slate-800 rounded-full overflow-hidden flex">
            <motion.div 
              className="h-full bg-rose-500 rounded-full"
              initial={{ width: '25%' }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ ease: "easeInOut", duration: 0.3 }}
            />
          </div>
        </div>
        <div className="w-10" /> {/* Balancer */}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0 overflow-y-auto px-6 pb-24"
          >
            {step === 1 && (
              <div className="flex flex-col h-full pt-4">
                <div className="w-12 h-12 bg-rose-100 dark:bg-rose-900/30 rounded-2xl flex items-center justify-center text-rose-500 mb-6 shadow-sm">
                  <User className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Let's start with the basics</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">This will be shown on your profile.</p>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">First Name</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Alex"
                      value={formData.name}
                      onChange={e => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-gray-900 dark:text-white focus:outline-none focus:border-rose-400 dark:focus:border-rose-500 transition-colors shadow-sm text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">Age</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 25"
                      value={formData.age}
                      onChange={e => setFormData({...formData, age: e.target.value})}
                      className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-gray-900 dark:text-white focus:outline-none focus:border-rose-400 dark:focus:border-rose-500 transition-colors shadow-sm text-lg"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="flex flex-col h-full pt-4">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900/30 rounded-2xl flex items-center justify-center text-orange-500 mb-6 shadow-sm">
                  <MapPin className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Where are you?</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">We'll use this to find matches near you.</p>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1">City, State</label>
                    <input 
                      type="text" 
                      placeholder="e.g. San Francisco, CA"
                      value={formData.location}
                      onChange={e => setFormData({...formData, location: e.target.value})}
                      className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-gray-900 dark:text-white focus:outline-none focus:border-orange-400 dark:focus:border-orange-500 transition-colors shadow-sm text-lg"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-gray-700 dark:text-gray-300 ml-1 flex items-center justify-between">
                      <span>Short Bio</span>
                      <span className="text-gray-400 font-normal text-xs">Optional</span>
                    </label>
                    <textarea 
                      placeholder="Tell us a little about yourself..."
                      value={formData.bio}
                      onChange={e => setFormData({...formData, bio: e.target.value})}
                      rows={4}
                      className="w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl px-5 py-4 text-gray-900 dark:text-white focus:outline-none focus:border-orange-400 dark:focus:border-orange-500 transition-colors shadow-sm text-lg resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="flex flex-col h-full pt-4">
                <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-2xl flex items-center justify-center text-indigo-500 mb-6 shadow-sm">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">What are you into?</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-6">Select at least 3 hobbies to help us find your perfect match.</p>

                <div className="flex flex-wrap gap-3">
                  {ALL_HOBBIES.map(hobby => {
                    const isSelected = formData.hobbies.includes(hobby);
                    return (
                      <button
                        key={hobby}
                        onClick={() => toggleHobby(hobby)}
                        className={`px-5 py-3 rounded-full text-[15px] font-medium transition-all active:scale-95 border shadow-sm ${
                          isSelected 
                            ? 'bg-rose-500 border-rose-500 text-white shadow-rose-200 dark:shadow-none' 
                            : 'bg-white dark:bg-slate-900 border-gray-200 dark:border-slate-800 text-gray-700 dark:text-gray-300 hover:border-rose-200 dark:hover:border-rose-900/50'
                        }`}
                      >
                        {hobby}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="flex flex-col h-full pt-4">
                <div className="w-12 h-12 bg-pink-100 dark:bg-pink-900/30 rounded-2xl flex items-center justify-center text-pink-500 mb-6 shadow-sm">
                  <Camera className="w-6 h-6" />
                </div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight mb-2">Show your vibe</h1>
                <p className="text-gray-500 dark:text-gray-400 mb-8">Add at least 1 photo to complete your profile.</p>

                <div className="grid grid-cols-3 gap-3">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <div key={index} className="aspect-[3/4] relative rounded-2xl overflow-hidden bg-gray-100 dark:bg-slate-800 border-2 border-dashed border-gray-200 dark:border-slate-700 transition-colors hover:border-rose-300 dark:hover:border-rose-700/50">
                      {formData.photos[index] ? (
                        <>
                          <img src={formData.photos[index]} alt="" className="w-full h-full object-cover" />
                          <button 
                            onClick={() => removePhoto(index)}
                            className="absolute bottom-2 right-2 w-7 h-7 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-full flex items-center justify-center text-rose-500 shadow-sm border border-white/20"
                          >
                            <Plus className="w-4 h-4 rotate-45" />
                          </button>
                        </>
                      ) : (
                        <button 
                          onClick={addMockPhoto}
                          className="absolute inset-0 flex items-center justify-center text-gray-400 hover:text-rose-500 hover:bg-rose-50/50 dark:hover:bg-rose-900/20 transition-colors"
                        >
                          <Plus className="w-8 h-8" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating Bottom Action */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent dark:from-slate-950 dark:via-slate-950 z-20">
        <button
          onClick={nextStep}
          disabled={!isStepValid()}
          className="w-full h-[60px] bg-gradient-to-r from-rose-500 to-orange-400 text-white rounded-2xl font-bold text-[17px] shadow-lg shadow-rose-500/20 dark:shadow-rose-900/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-50 disabled:grayscale-[0.5] disabled:cursor-not-allowed"
        >
          {step === 4 ? (
            <>Complete Profile <Heart className="w-5 h-5 fill-white/20" /></>
          ) : (
            <>Continue <ArrowRight className="w-5 h-5" /></>
          )}
        </button>
      </div>
    </div>
  );
}
