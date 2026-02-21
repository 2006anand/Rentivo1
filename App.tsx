import react
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import PropertyCard from './components/PropertyCard';
import PropertyForm from './components/PropertyForm';
import ProfileTab from './components/ProfileTab';
import { User, UserRole, Property, Inquiry } from './types';
import { MOCK_PROPERTIES, INDIA_STATES, STATE_DISTRICTS } from './constants';
import { playUISound } from './components/SoundFeedback';
import { 
  Search, Filter, MapPin, Check, Home, 
  PlusSquare, X, FileText, ArrowRight,
  MessageSquare, Send, Calendar, Users, Trash2, Mail, Lock, LifeBuoy, ChevronDown, Phone, Clock, Star, Heart, ShieldCheck, ChevronLeft,
  Building2
} from 'lucide-react';

const SupportSystem: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const contactEmail = "an91an99jha@gmail.com";
  const contactPhone = "8448327606";

  const handleLiveChat = () => {
    playUISound('tap');
    window.location.href = `mailto:${contactEmail}?subject=RENTIVO Support Request&body=Hi Support Team,`;
  };

  return (
    <div id="support-section" className="w-full max-w-5xl mx-auto py-8 md:py-20 px-4 space-y-12">
      <div className="text-center space-y-4 md:space-y-6">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-[0.3em] border border-amber-100 mx-auto">
          <LifeBuoy className="w-4 h-4" /> Concierge Terminal
        </div>
        <h2 className="text-3xl md:text-5xl font-black text-stone-900 tracking-tighter uppercase italic">Need <span className="text-amber-500">assistance?</span></h2>
        <p className="text-stone-500 text-sm md:text-lg font-medium max-w-lg mx-auto">Our systems are monitored 24/7. Connect with us via neural portal or traditional mail.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-3">
          {[
            { q: "How are properties verified?", a: "Every listing undergoes a 3-step verification involving document check, geo-tagging, and physical site visitation where possible." },
            { q: "Is Rentivo free for renters?", a: "Browsing and inquiring is completely free. We prioritize accessibility for those seeking a home." },
            { q: "What happens after I send an inquiry?", a: "The landlord is immediately notified. Once they accept your lead, a secure direct line is opened for coordinates and viewing." }
          ].map((faq, idx) => (
            <div key={idx} className="bg-white rounded-3xl border border-amber-50 shadow-sm overflow-hidden">
              <button 
                onClick={() => { playUISound('tap'); setOpenFaq(openFaq === idx ? null : idx); }}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-amber-50/50 transition-all"
              >
                <span className="font-black text-stone-800 tracking-tight text-sm">{faq.q}</span>
                <ChevronDown className={`w-4 h-4 text-amber-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-6 pb-6 text-stone-500 text-xs font-medium leading-relaxed animate-in slide-in-from-top-1 duration-200">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-stone-900 rounded-[2.5rem] p-8 md:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="space-y-6 relative z-10">
            <h4 className="text-2xl font-black tracking-tighter italic uppercase">Direct Access</h4>
            <div className="space-y-4">
              <a href={`mailto:${contactEmail}`} className="flex items-center gap-4 text-stone-400 hover:text-white transition-colors">
                <Mail className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-sm truncate">{contactEmail}</span>
              </a>
              <div className="flex items-center gap-4 text-stone-400">
                <Phone className="w-5 h-5 text-amber-500" />
                <span className="font-bold text-sm">+91 {contactPhone}</span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleLiveChat}
            className="mt-10 w-full py-4 bg-amber-500 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-amber-600 transition-all active:scale-95 shadow-xl text-xs"
          >
            Launch Neural Mail
          </button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('rentivo_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [activeTab, setActiveTab] = useState('explore');
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'LOGIN' | 'SIGNUP'>('LOGIN');
  const [authType, setAuthType] = useState<UserRole>('RENTER');
  
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES as Property[]);
  const [inquiries, setInquiries] = useState<Inquiry[]>(() => {
    const saved = localStorage.getItem('rentivo_inquiries');
    return saved ? JSON.parse(saved) : [];
  });

  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [isAddingProperty, setIsAddingProperty] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isInquiryFormOpen, setIsInquiryFormOpen] = useState(false);
  const [inquiryFormData, setInquiryFormData] = useState({
    message: '',
    moveInDate: '',
    occupancyCount: 1
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('rentivo_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('rentivo_user');
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('rentivo_inquiries', JSON.stringify(inquiries));
  }, [inquiries]);

  useEffect(() => {
    (window as any).triggerAuth = (mode: 'LOGIN' | 'SIGNUP') => {
      setAuthMode(mode);
      setAuthModalOpen(true);
    };
  }, []);

  const handleLogin = (role: UserRole) => {
    playUISound('success');
    const newUser: User = {
      id: role === 'LANDLORD' ? 'l1' : 'u_guest',
      name: role === 'LANDLORD' ? 'Arjun Sharma' : 'Anand Jha',
      email: 'an91an99jha@gmail.com',
      phone: '8448327606',
      role,
      avatar: `https://i.pravatar.cc/150?u=${role}`,
      rating: 4.8,
      reviewsCount: 12,
      joinedAt: Date.now(),
      bio: role === 'LANDLORD' ? "Experienced property owner in Delhi NCR." : "Professional seeking a premium long-term stay."
    };
    setUser(newUser);
    setAuthModalOpen(false);
    setActiveTab(role === 'LANDLORD' ? 'dashboard' : 'explore');
  };

  const handleLogout = () => {
    playUISound('pop');
    setUser(null);
    setActiveTab('explore');
  };

  const changeTab = (tab: string) => {
    playUISound('tap');
    setActiveTab(tab);
  };

  const handleSendInquiry = () => {
    if (!user || !selectedProperty) return;
    const newInquiry: Inquiry = {
      id: Math.random().toString(36).substr(2, 9),
      propertyId: selectedProperty.id,
      propertyTitle: selectedProperty.title,
      propertyPhoto: selectedProperty.photos[0],
      senderId: user.id,
      senderName: user.name,
      senderAvatar: user.avatar,
      receiverId: selectedProperty.landlordId,
      message: inquiryFormData.message || `Interested in ${selectedProperty.title}`,
      moveInDate: inquiryFormData.moveInDate,
      occupancyCount: inquiryFormData.occupancyCount,
      status: 'PENDING',
      timestamp: Date.now(),
    };
    setInquiries([newInquiry, ...inquiries]);
    setIsInquiryFormOpen(false);
    setSelectedProperty(null);
    playUISound('success');
  };

  const filteredProperties = properties.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.location.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.location.area.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState ? p.location.state === selectedState : true;
    const matchesDistrict = selectedDistrict ? p.location.district === selectedDistrict : true;
    return matchesSearch && matchesState && matchesDistrict;
  });

  const ExploreView = () => (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-stone-400 w-5 h-5" />
            <input 
              type="text" 
              placeholder="Search by city, area..." 
              className="w-full pl-14 pr-6 py-4.5 bg-white rounded-2xl border border-amber-100 focus:border-amber-400 outline-none transition-all font-bold text-stone-800 placeholder:text-stone-200 shadow-sm" 
              value={searchQuery} 
              onChange={(e) => setSearchQuery(e.target.value)} 
            />
          </div>
          <button 
            onClick={() => { playUISound('tap'); setIsFilterOpen(!isFilterOpen); }} 
            className={`flex items-center gap-3 px-8 py-4.5 rounded-2xl font-black text-xs uppercase tracking-widest transition-all shadow-sm ${isFilterOpen ? 'bg-amber-500 text-white' : 'bg-white border border-amber-100 text-stone-600'}`}
          >
            <Filter className="w-4 h-4" /> Filters
          </button>
        </div>
        
        {isFilterOpen && (
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-amber-100 grid grid-cols-1 md:grid-cols-2 gap-4 animate-in slide-in-from-top-4 duration-300">
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase text-stone-400 ml-1">Region/State</label>
              <select 
                className="w-full px-4 py-3 bg-amber-50/50 rounded-xl outline-none font-bold text-stone-700 border border-amber-100 text-sm" 
                value={selectedState} 
                onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(''); }}
              >
                <option value="">Select State</option>
                {INDIA_STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="text-[9px] font-black uppercase text-stone-400 ml-1">District Focus</label>
              <select 
                className="w-full px-4 py-3 bg-amber-50/50 rounded-xl outline-none font-bold text-stone-700 border border-amber-100 text-sm disabled:opacity-30" 
                value={selectedDistrict} 
                onChange={(e) => setSelectedDistrict(e.target.value)} 
                disabled={!selectedState}
              >
                <option value="">Select District</option>
                {selectedState && STATE_DISTRICTS[selectedState]?.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProperties.map(p => (
          <PropertyCard key={p.id} property={p} onViewDetails={() => setSelectedProperty(p)} />
        ))}
      </div>
      <SupportSystem />
    </div>
  );

  const RenterHubView = () => (
    <div className="py-20 text-center space-y-10 animate-in fade-in duration-700">
      <div className="w-24 h-24 bg-amber-50 rounded-[2rem] flex items-center justify-center mx-auto shadow-sm">
        <Users className="w-12 h-12 text-amber-500" />
      </div>
      <div className="space-y-4">
        <h2 className="text-5xl font-black text-stone-900 uppercase italic tracking-tighter">Renter Hub<span className="text-amber-500">.</span></h2>
        <p className="text-stone-500 max-w-lg mx-auto font-medium">Coming soon. Enhanced tools for searching, comparison, and verification of your next premium dwelling.</p>
      </div>
      <button onClick={() => changeTab('explore')} className="px-10 py-4 bg-stone-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-stone-800 transition-all active:scale-95 shadow-xl">Back to Explore</button>
    </div>
  );

  const LandlordHubView = () => (
    <div className="py-20 text-center space-y-10 animate-in fade-in duration-700">
      <div className="w-24 h-24 bg-amber-50 rounded-[2rem] flex items-center justify-center mx-auto shadow-sm">
        <Building2 className="w-12 h-12 text-amber-500" />
      </div>
      <div className="space-y-4">
        <h2 className="text-5xl font-black text-stone-900 uppercase italic tracking-tighter">Owner Hub<span className="text-amber-500">.</span></h2>
        <p className="text-stone-500 max-w-lg mx-auto font-medium">Coming soon. Advanced property analytics, yield management, and verified lead filtering for high-value landlords.</p>
      </div>
      <button onClick={() => changeTab('dashboard')} className="px-10 py-4 bg-stone-900 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-stone-800 transition-all active:scale-95 shadow-xl">Asset Dashboard</button>
    </div>
  );

  return (
    <Layout userRole={user?.role || null} user={user} onLogout={handleLogout} activeTab={activeTab} onTabChange={changeTab}>
      {activeTab === 'explore' && <ExploreView />}
      {activeTab === 'dashboard' && (user?.role === 'LANDLORD' ? <div className="py-10 text-center text-stone-400 font-black uppercase tracking-[0.5em] italic">Portfolio Analytics Terminal</div> : <ExploreView />)}
      {activeTab === 'support' && <SupportSystem />}
      {activeTab === 'renter-hub' && <RenterHubView />}
      {activeTab === 'landlord-hub' && <LandlordHubView />}
      {activeTab === 'profile' && user && (
        <ProfileTab 
          user={user} 
          inquiries={inquiries} 
          onUpdate={(updated) => setUser({ ...user, ...updated })} 
          onLogout={handleLogout} 
          onBack={() => changeTab('explore')} 
        />
      )}
      
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-xl" onClick={() => setAuthModalOpen(false)} />
          <div className="relative bg-[#FFFDF0] rounded-[3rem] w-full max-w-md p-10 shadow-2xl border border-amber-100 animate-in zoom-in-95 duration-500">
             <button onClick={() => setAuthModalOpen(false)} className="absolute top-8 right-8 p-2 text-stone-400"><X className="w-6 h-6" /></button>
             <h3 className="text-4xl font-black text-stone-900 tracking-tighter uppercase mb-10">Gateway<span className="text-amber-500">.</span></h3>
             <div className="space-y-4">
                <button onClick={() => handleLogin(authType)} className="w-full py-5 bg-amber-500 text-white rounded-3xl font-black text-lg hover:bg-amber-600 shadow-xl transition-all active:scale-95 flex items-center justify-center gap-4">
                  {authMode === 'LOGIN' ? 'Entry Portal' : 'Synchronize Identity'} <ArrowRight className="w-5 h-5" />
                </button>
                <button onClick={() => setAuthType(authType === 'RENTER' ? 'LANDLORD' : 'RENTER')} className="w-full py-4 text-[9px] font-black text-stone-400 uppercase tracking-widest">Switch to {authType === 'RENTER' ? 'Landlord' : 'Renter'}</button>
             </div>
          </div>
        </div>
      )}

      {selectedProperty && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-xl" onClick={() => setSelectedProperty(null)} />
          <div className="relative bg-[#FFFDF0] rounded-[3rem] w-full max-w-5xl max-h-[90vh] overflow-y-auto p-8 md:p-12 shadow-2xl border border-amber-100 scrollbar-hide">
            <button onClick={() => setSelectedProperty(null)} className="absolute top-6 right-6 p-3 bg-white border border-amber-100 rounded-2xl text-stone-400 hover:text-stone-900 z-10"><X className="w-6 h-6" /></button>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-lg">
                <img src={selectedProperty.photos[0]} className="w-full h-full object-cover" alt="" />
              </div>
              <div className="space-y-8">
                <h2 className="text-4xl md:text-5xl font-black text-stone-900 tracking-tighter leading-none">{selectedProperty.title}</h2>
                <div className="flex items-center gap-2 text-stone-500 font-bold text-lg"><MapPin className="w-5 h-5 text-amber-500" /> {selectedProperty.location.city}</div>
                <p className="text-xl text-stone-600 font-medium italic">"{selectedProperty.description}"</p>
                <button 
                  onClick={() => { if (!user) { setAuthModalOpen(true); return; } setIsInquiryFormOpen(true); }}
                  className="w-full py-6 bg-stone-900 text-white rounded-[2rem] font-black text-xl hover:bg-stone-800 shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3"
                >
                  <ShieldCheck className="w-6 h-6 text-amber-500" /> Inquire Securely
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {isInquiryFormOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-stone-900/50 backdrop-blur-md" onClick={() => setIsInquiryFormOpen(false)} />
          <div className="relative bg-[#FFFDF0] rounded-[3rem] w-full max-w-md p-10 shadow-2xl border border-amber-100">
            <h3 className="text-2xl font-black text-stone-900 tracking-tighter uppercase italic text-center mb-8">Transmit Message</h3>
            <div className="space-y-6">
              <textarea 
                rows={4} 
                className="w-full px-5 py-4 rounded-2xl bg-white border border-amber-100 outline-none font-medium text-stone-700 italic text-sm" 
                placeholder="State your intentions..."
                value={inquiryFormData.message}
                onChange={(e) => setInquiryFormData({...inquiryFormData, message: e.target.value})}
              />
              <button onClick={handleSendInquiry} className="w-full py-5 bg-amber-500 text-white rounded-[1.75rem] font-black text-base hover:bg-amber-600 shadow-xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                Send Data <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
