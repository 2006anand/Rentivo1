
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
      <header className="sticky top-0 z-[120] bg-[#FFFDF0]/90 backdrop-blur-2xl border-b border-amber-100/50 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between shadow-sm">
        <div 
          className="flex items-center gap-3 cursor-pointer group flex-shrink-0" 
          onClick={() => onTabChange(userRole === 'LANDLORD' ? 'dashboard' : 'explore')}
        >
          <div className="bg-amber-500 p-2 rounded-xl shadow-[0_4px_12px_rgba(245,158,11,0.2)] group-hover:scale-105 transition-all duration-300">
            <Home className="text-white w-4 h-4 md:w-5 md:h-5" />
          </div>
          <h1 className="text-lg md:text-xl font-black text-stone-900 tracking-tighter uppercase">RENTIVO<span className="text-amber-500">.</span></h1>
        </div>

        {/* Navigation Links - Centered on Desktop */}
        <div className="hidden lg:flex items-center gap-6 xl:gap-10 mx-auto">
           <button 
            onClick={() => onTabChange('explore')} 
            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === 'explore' ? 'text-amber-600 bg-amber-50/50 px-4 py-2 rounded-xl' : 'text-stone-400 hover:text-stone-900'}`}
           >
            Explore
           </button>
           <button 
            onClick={() => onTabChange('renter-hub')} 
            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === 'renter-hub' ? 'text-amber-600 bg-amber-50/50 px-4 py-2 rounded-xl' : 'text-stone-400 hover:text-stone-900'}`}
           >
            Renter Hub
           </button>
           <button 
            onClick={() => onTabChange('landlord-hub')} 
            className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${activeTab === 'landlord-hub' ? 'text-amber-600 bg-amber-50/50 px-4 py-2 rounded-xl' : 'text-stone-400 hover:text-stone-900'}`}
           >
            Landlord Hub
           </button>
           <button 
            onClick={() => onTabChange('support')} 
            className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-2 transition-all duration-300 ${activeTab === 'support' ? 'text-amber-600 bg-amber-50/50 px-4 py-2 rounded-xl' : 'text-stone-400 hover:text-stone-900'}`}
           >
            <LifeBuoy className="w-3.5 h-3.5" /> Support
           </button>
        </div>

        {userRole ? (
          <div className="flex items-center gap-2 md:gap-4">
            <button className="hidden sm:block p-2 text-stone-400 hover:text-amber-600 rounded-xl transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <div className="hidden sm:block h-6 w-px bg-amber-100"></div>
            
            <button 
              onClick={() => onTabChange('profile')}
              className={`flex items-center gap-2 md:gap-3 p-1 pr-1.5 md:pr-2 rounded-2xl border transition-all duration-300 ${activeTab === 'profile' ? 'bg-stone-900 border-stone-800 text-white' : 'bg-white border-amber-100 hover:border-amber-200 shadow-sm'}`}
            >
              <div className="hidden sm:flex flex-col items-end leading-none ml-2">
                <span className={`text-[8px] font-black uppercase tracking-tighter ${activeTab === 'profile' ? 'text-stone-400' : 'text-stone-400'}`}>Session</span>
                <span className="text-[10px] font-bold">Profile</span>
              </div>
              <div className="w-7 h-7 md:w-8 md:h-8 rounded-lg overflow-hidden border border-amber-50 bg-amber-50 flex items-center justify-center">
                {user?.avatar ? (
                  <img src={user.avatar} className="w-full h-full object-cover" alt="Avatar" />
                ) : (
                  <UserIcon className={`w-3.5 h-3.5 ${activeTab === 'profile' ? 'text-amber-500' : 'text-stone-400'}`} />
                )}
              </div>
            </button>

            <button 
              onClick={() => { playUISound('pop'); onLogout(); }}
              className="p-2 md:p-2.5 text-stone-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all group"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 md:gap-4">
             <button 
               onClick={() => (window as any).triggerAuth?.('LOGIN')} 
               className="text-[10px] font-black text-stone-400 uppercase tracking-widest hover:text-stone-900 transition-colors"
             >
               Login
             </button>
             <button 
               onClick={() => (window as any).triggerAuth?.('SIGNUP')} 
               className="px-4 py-2.5 bg-stone-900 text-white rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-stone-800 transition-all active:scale-95 shadow-md"
             >
               Join Now
             </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-24 lg:pb-0 overflow-y-auto scrollbar-hide">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-6 md:py-10">
          {children}
        </div>
      </main>

      {/* Mobile Navigation */}
      {userRole && (activeTab !== 'profile') && (
        <nav className="lg:hidden fixed bottom-6 left-6 right-6 bg-stone-900/90 backdrop-blur-xl border border-white/10 rounded-3xl flex justify-around items-center py-3.5 px-4 z-[120] shadow-2xl">
          <NavButton active={activeTab === 'explore'} icon={<Search />} label="Explore" onClick={() => onTabChange('explore')} />
          <NavButton active={activeTab === 'renter-hub' || activeTab === 'landlord-hub'} icon={<PlusSquare />} label="Hubs" onClick={() => onTabChange(userRole === 'LANDLORD' ? 'landlord-hub' : 'renter-hub')} />
          <NavButton active={activeTab === 'profile'} icon={<UserIcon />} label="Profile" onClick={() => onTabChange('profile')} />
          <NavButton active={false} icon={<LogOut />} label="Exit" onClick={onLogout} danger />
        </nav>
      )}
    </div>
  );
};

const NavButton = ({ active, icon, label, onClick, danger }: { active: boolean, icon: React.ReactNode, label: string, onClick: () => void, danger?: boolean }) => (
  <button 
    onClick={() => { playUISound('tap'); onClick(); }}
    className={`flex flex-col items-center gap-1 transition-all active:scale-90 ${active ? 'text-amber-500' : danger ? 'text-rose-400' : 'text-stone-400'}`}
  >
    <div className={`p-1.5 rounded-xl transition-all ${active ? 'bg-amber-500/10' : ''}`}>
      {React.cloneElement(icon as React.ReactElement<{ className?: string }>, { className: 'w-5 h-5' })}
    </div>
    <span className="text-[8px] font-black uppercase tracking-tighter">{label}</span>
  </button>
);

export default Layout;
