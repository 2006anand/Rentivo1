
import React from 'react';
import { Home, Search, PlusSquare, User as UserIcon, Bell, LifeBuoy, LogOut, ChevronRight } from 'lucide-react';
import { UserRole, User } from '../types';
import { playUISound } from './SoundFeedback';

interface LayoutProps {
  children: React.ReactNode;
  userRole: UserRole | null;
  user?: User | null;
  onLogout: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, userRole, user, onLogout, activeTab, onTabChange }) => {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF0] text-stone-900">
      {/* Header */}
      <header className="sticky top-0 z-[120] bg-[#FFFDF0]/80 backdrop-blur-2xl border-b border-amber-100/50 px-4 md:px-8 py-4 md:py-5 flex items-center justify-between shadow-sm">
        <div 
          className="flex items-center gap-3 cursor-pointer group flex-shrink-0" 
          onClick={() => onTabChange(userRole === 'LANDLORD' ? 'dashboard' : 'explore')}
        >
          <div className="bg-amber-500 p-2 md:p-2.5 rounded-xl shadow-[0_4px_12px_rgba(245,158,11,0.2)] group-hover:scale-110 transition-transform duration-500">
            <Home className="text-white w-4 h-4 md:w-5 md:h-5" />
          </div>
          <h1 className="text-xl md:text-2xl font-black text-stone-900 tracking-tighter uppercase">RENTIVO<span className="text-amber-500">.</span></h1>
        </div>

        <div className="hidden lg:flex items-center gap-8 mr-auto ml-12">
           <button 
            onClick={() => onTabChange('explore')} 
            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === 'explore' ? 'text-amber-600' : 'text-stone-400 hover:text-stone-600'}`}
           >
            Explore
           </button>
           <button 
            onClick={() => onTabChange('renter-hub')} 
            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === 'renter-hub' ? 'text-amber-600' : 'text-stone-400 hover:text-stone-600'}`}
           >
            Renter Hub
           </button>
           <button 
            onClick={() => onTabChange('landlord-hub')} 
            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === 'landlord-hub' ? 'text-amber-600' : 'text-stone-400 hover:text-stone-600'}`}
           >
            Landlord Hub
           </button>
           <button 
            onClick={() => onTabChange('support')} 
            className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all duration-300 ${activeTab === 'support' ? 'text-amber-600' : 'text-stone-400 hover:text-stone-600'}`}
           >
            <LifeBuoy className="w-4 h-4" /> Support
           </button>
        </div>

        {userRole ? (
          <div className="flex items-center gap-3 md:gap-6">
            <button className="hidden sm:block p-3 text-stone-400 hover:text-amber-600 hover:bg-amber-50 rounded-2xl transition-all relative group">
              <Bell className="w-5 h-5" />
              <span className="absolute top-3.5 right-3.5 w-1.5 h-1.5 bg-amber-500 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.6)]"></span>
            </button>
            <div className="hidden sm:block h-8 w-px bg-amber-100"></div>
            <button 
              onClick={() => onTabChange('profile')}
              className={`flex items-center gap-3 p-1.5 pl-3 md:pl-4 rounded-2xl border transition-all duration-500 ${activeTab === 'profile' ? 'bg-amber-500 border-amber-400 text-white shadow-[0_8px_20px_rgba(245,158,11,0.15)]' : 'bg-white border-amber-100 hover:border-amber-200 shadow-sm'}`}
            >
              <div className="flex flex-col items-end leading-none mr-1">
                <span className={`text-[9px] font-black uppercase tracking-tighter ${activeTab === 'profile' ? 'text-amber-100' : 'text-stone-400'}`}>Session</span>
                <span className={`text-[11px] font-bold ${activeTab === 'profile' ? 'text-white' : 'text-stone-700'}`}>Profile</span>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl bg-amber-50/50 flex items-center justify-center overflow-hidden border border-amber-100">
                {user?.avatar ? (
                  <img src={user.avatar} className="w-full h-full object-cover" alt="Profile" />
                ) : (
                  <UserIcon className={`w-4 h-4 md:w-5 md:h-5 ${activeTab === 'profile' ? 'text-amber-600' : 'text-stone-400'}`} />
                )}
              </div>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4 md:gap-6">
             <button 
               onClick={() => (window as any).triggerAuth?.('LOGIN')} 
               className="text-[10px] font-black text-stone-400 uppercase tracking-widest hover:text-stone-900 transition-colors"
             >
               Login
             </button>
             <button 
               onClick={() => (window as any).triggerAuth?.('SIGNUP')} 
               className="px-4 md:px-6 py-2.5 md:py-3 bg-stone-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all active:scale-95 shadow-lg"
             >
               Sign Up
             </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 md:pb-0 overflow-y-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-10">
          {children}
        </div>
      </main>

      {/* Mobile Navigation */}
      {userRole && (
        <nav className="lg:hidden fixed bottom-6 left-6 right-6 bg-white/90 backdrop-blur-2xl border border-amber-100 rounded-[2rem] flex justify-around items-center py-4 px-4 z-[120] shadow-[0_20px_40px_rgba(245,158,11,0.1)]">
          <NavButton active={activeTab === 'explore'} icon={<Search />} label="Explore" onClick={() => onTabChange('explore')} />
          <NavButton active={activeTab === 'support'} icon={<LifeBuoy />} label="Help" onClick={() => onTabChange('support')} />
          {userRole === 'LANDLORD' && <NavButton active={activeTab === 'dashboard'} icon={<PlusSquare />} label="Lease" onClick={() => onTabChange('dashboard')} />}
          <NavButton active={activeTab === 'profile'} icon={<UserIcon />} label="Account" onClick={() => onTabChange('profile')} />
        </nav>
      )}
    </div>
  );
};

const NavButton = ({ active, icon, label, onClick }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void }) => (
  <button 
    onClick={() => { playUISound('tap'); onClick(); }}
    className={`flex flex-col items-center gap-1.5 transition-all active:scale-90 ${active ? 'text-amber-600' : 'text-stone-400 hover:text-stone-600'}`}
  >
    <div className={`p-2 rounded-xl transition-all ${active ? 'bg-amber-100/50' : ''}`}>
      {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'w-6 h-6' })}
    </div>
    <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
  </button>
);

export default Layout;
