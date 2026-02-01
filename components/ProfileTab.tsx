
import React, { useState } from 'react';
import { Camera, Calendar, Clock, Star, Building2, Mail, Phone, Info, Check } from 'lucide-react';
import { User as UserType } from '../types';
import { playUISound } from './SoundFeedback';

interface ProfileTabProps {
  user: UserType;
  onUpdate: (updatedUser: Partial<UserType>) => void;
}

const ProfileTab: React.FC<ProfileTabProps> = ({ user, onUpdate }) => {
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = () => {
    setIsSaving(true);
    playUISound('success');
    // The actual update happens on each change via onUpdate, 
    // but this gives the user confirmation that the data is persisted.
    setTimeout(() => setIsSaving(false), 1200);
  };

  return (
    <div className="max-w-4xl mx-auto py-12 animate-in fade-in slide-in-from-bottom-10 duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Card: Summary */}
        <div className="lg:col-span-4 space-y-8">
          <div className="bg-white rounded-[3rem] p-10 shadow-sm border border-amber-100/60 backdrop-blur-xl">
            <div className="relative group mx-auto w-48 h-48">
              <img 
                src={user.avatar} 
                className="w-full h-full rounded-[2.5rem] object-cover border-4 border-white shadow-lg group-hover:scale-[1.02] transition-all duration-700"
                alt={user.name}
              />
              <button 
                onClick={() => playUISound('tap')}
                className="absolute -bottom-2 -right-2 p-4 bg-amber-500 text-white rounded-2xl shadow-lg hover:scale-110 transition-transform active:scale-95 border-4 border-white"
              >
                <Camera className="w-5 h-5" />
              </button>
            </div>
            
            <div className="text-center mt-10">
              <h2 className="text-3xl font-black text-stone-900 leading-tight tracking-tighter uppercase italic">{user.name}</h2>
              <p className="text-amber-600 font-black text-[10px] mt-3 uppercase tracking-[0.4em]">{user.role}</p>
              
              <div className="flex justify-center items-center gap-2 mt-6 px-5 py-2.5 bg-amber-50 rounded-2xl inline-flex border border-amber-100 shadow-inner">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                <span className="font-black text-stone-700 text-sm">{user.rating.toFixed(1)}</span>
                <span className="text-stone-400 text-[10px] font-black ml-1 uppercase tracking-widest">Score</span>
              </div>
            </div>

            <div className="mt-12 space-y-6 pt-10 border-t border-amber-50">
              <div className="flex items-center gap-4 text-stone-500 group cursor-default">
                <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold tracking-tight truncate max-w-full">{user.email}</span>
              </div>
              <div className="flex items-center gap-4 text-stone-500 group cursor-default">
                <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold tracking-tight">{user.phone}</span>
              </div>
              <div className="flex items-center gap-4 text-stone-500 group cursor-default">
                <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-500 group-hover:text-white transition-colors">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold tracking-tight uppercase tracking-widest text-[10px]">Active Since {new Date(user.joinedAt).getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Details Form */}
        <div className="lg:col-span-8 space-y-8">
          <div className="bg-white rounded-[3rem] p-12 shadow-sm border border-amber-100/60 backdrop-blur-xl">
            <div className="flex items-center gap-5 mb-12">
              <div className="w-14 h-14 rounded-[1.25rem] bg-amber-50 border border-amber-100 flex items-center justify-center shadow-sm">
                <Info className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-2xl font-black text-stone-900 uppercase italic tracking-tighter">Core Profile Data</h3>
            </div>

            <div className="space-y-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] ml-2">Public Identity</label>
                  <input 
                    type="text" 
                    className="w-full px-8 py-5 rounded-2xl bg-amber-50/20 border-2 border-amber-100 focus:bg-white focus:border-amber-400 outline-none transition-all font-bold text-stone-800"
                    placeholder="Your display name"
                    value={user.name}
                    onChange={(e) => onUpdate({ name: e.target.value })}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] ml-2">Contact Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-7 top-1/2 -translate-y-1/2 text-amber-500 w-5 h-5" />
                    <input 
                      type="text" 
                      className="w-full pl-16 pr-8 py-5 rounded-2xl bg-amber-50/20 border-2 border-amber-100 focus:bg-white focus:border-amber-400 outline-none transition-all font-bold text-stone-800"
                      placeholder="Mobile number"
                      value={user.phone}
                      onChange={(e) => onUpdate({ phone: e.target.value })}
                    />
                  </div>
                </div>
                
                {user.role === 'LANDLORD' ? (
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] ml-2">Corporate Entity</label>
                    <div className="relative">
                      <Building2 className="absolute left-7 top-1/2 -translate-y-1/2 text-amber-500 w-5 h-5" />
                      <input 
                        type="text" 
                        placeholder="e.g. Skyline Living"
                        className="w-full pl-16 pr-8 py-5 rounded-2xl bg-amber-50/20 border-2 border-amber-100 focus:bg-white focus:border-amber-400 outline-none transition-all font-bold text-stone-800"
                        value={user.businessName || ''}
                        onChange={(e) => onUpdate({ businessName: e.target.value })}
                      />
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] ml-2">Target Move-in</label>
                      <div className="relative">
                        <Calendar className="absolute left-7 top-1/2 -translate-y-1/2 text-amber-500 w-5 h-5 pointer-events-none" />
                        <input 
                          type="date" 
                          className="w-full pl-16 pr-8 py-5 rounded-2xl bg-amber-50/20 border-2 border-amber-100 focus:bg-white focus:border-amber-400 outline-none transition-all font-bold text-stone-800"
                          value={user.moveInDate || ''}
                          onChange={(e) => onUpdate({ moveInDate: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] ml-2">Lease Duration</label>
                      <div className="relative">
                        <Clock className="absolute left-7 top-1/2 -translate-y-1/2 text-amber-500 w-5 h-5 pointer-events-none" />
                        <select 
                          className="w-full pl-16 pr-8 py-5 rounded-2xl bg-amber-50/20 border-2 border-amber-100 focus:bg-white focus:border-amber-400 outline-none transition-all font-bold text-stone-800 appearance-none"
                          value={user.duration || ''}
                          onChange={(e) => onUpdate({ duration: e.target.value })}
                        >
                          <option value="">Select horizon</option>
                          <option value="6 months">06 Months</option>
                          <option value="1 year">12 Months</option>
                          <option value="2 years+">Long Term (24m+)</option>
                        </select>
                      </div>
                    </div>
                  </>
                )}
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-[0.3em] ml-2">Professional Brief</label>
                <textarea 
                  rows={5}
                  className="w-full px-8 py-6 rounded-[2rem] bg-amber-50/20 border-2 border-amber-100 focus:bg-white focus:border-amber-400 outline-none transition-all font-bold text-stone-800 resize-none shadow-sm"
                  placeholder="The narrative of your housing requirements..."
                  value={user.bio || ''}
                  onChange={(e) => onUpdate({ bio: e.target.value })}
                />
              </div>

              <div className="pt-8">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className={`w-full sm:w-auto px-16 py-6 rounded-[2rem] font-black text-xl transition-all active:scale-95 flex items-center justify-center gap-3 shadow-lg ${isSaving ? 'bg-emerald-500 text-white shadow-emerald-200' : 'bg-amber-500 text-white hover:bg-amber-600 shadow-amber-200'}`}
                >
                  {isSaving ? (
                    <>
                      <Check className="w-6 h-6 animate-bounce" />
                      Changes Saved
                    </>
                  ) : (
                    <>
                      Synchronize Profile
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileTab;
