
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
  MessageSquare, Send, Calendar, Users, Trash2, Mail, Lock, LifeBuoy, ChevronDown, Phone, Clock, Star, Heart
} from 'lucide-react';

const SupportSystem: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  return (
    <div id="support-section" className="w-full max-w-5xl mx-auto py-24 px-4 space-y-16">
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-[0.4em] border border-amber-100 mx-auto">
          <LifeBuoy className="w-4 h-4" /> Concierge & Support
        </div>
        <h2 className="text-5xl font-black text-stone-900 tracking-tighter uppercase italic">How can we help <span className="text-amber-500">you?</span></h2>
        <p className="text-stone-500 text-lg font-medium max-w-xl mx-auto">Our support architecture is designed for speed and reliability. Explore FAQs or reach out directly.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h3 className="text-xs font-black text-stone-400 uppercase tracking-[0.3em] mb-6 ml-2">Frequently Asked</h3>
          {[
            { q: "How are properties verified?", a: "Every listing undergoes a 3-step verification involving document check, geo-tagging, and physical site visitation where possible." },
            { q: "Is Rentivo free for renters?", a: "Browsing and inquiring is completely free. We prioritize accessibility for those seeking a home." },
            { q: "What happens after I send an inquiry?", a: "The landlord is immediately notified. Once they accept your lead, a secure direct line is opened for coordinates and viewing." },
            { q: "Can I cancel a viewing request?", a: "Yes, you can manage and revoke your sent inquiries directly from your profile dashboard under 'Sent Requests'." },
            { q: "How do I report a listing?", a: "If you find any discrepancy, use the 'Report' button in the property details or contact support directly." }
          ].map((faq, idx) => (
            <div key={idx} className="bg-white rounded-[2rem] border border-amber-50 shadow-sm overflow-hidden">
              <button 
                onClick={() => { playUISound('tap'); setOpenFaq(openFaq === idx ? null : idx); }}
                className="w-full flex items-center justify-between p-8 text-left hover:bg-amber-50 transition-colors"
              >
                <span className="font-black text-stone-800 tracking-tight">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-amber-500 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
              </button>
              {openFaq === idx && (
                <div className="px-8 pb-8 text-stone-500 text-sm font-medium leading-relaxed animate-in slide-in-from-top-2 duration-300">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-stone-900 rounded-[3rem] p-12 text-white flex flex-col justify-between relative overflow-hidden group">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-amber-500/20 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
          <div className="space-y-8 relative z-10">
            <h4 className="text-3xl font-black tracking-tighter italic uppercase">Still have questions?</h4>
            <p className="text-stone-400 font-medium leading-relaxed">Our premium support team is available 24/7 to assist with your rental journey.</p>
            
            <div className="space-y-4 pt-4">
              <a href="mailto:support@rentivo.in" className="flex items-center gap-4 text-stone-200 hover:text-amber-500 transition-colors group/link">
                <div className="p-3 bg-white/5 rounded-2xl group-hover/link:bg-amber-500/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-bold">support@rentivo.in</span>
              </a>
              <div className="flex items-center gap-4 text-stone-200">
                <div className="p-3 bg-white/5 rounded-2xl">
                  <Phone className="w-5 h-5" />
                </div>
                <span className="font-bold">+91 99887 76655</span>
              </div>
            </div>
          </div>
          
          <button className="mt-12 w-full py-5 bg-amber-500 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-amber-600 transition-all shadow-xl active:scale-95">
            Live Chat Now
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
  
  // Use casting to ensure the initial properties array matches the Property[] type.
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
      name: role === 'LANDLORD' ? 'Arjun Sharma' : 'Rajesh Kumar',
      email: role === 'LANDLORD' ? 'arjun@landlord.com' : 'rajesh@renter.com',
      phone: '9988776655',
      role,
      avatar: `https://i.pravatar.cc/150?u=${role}`,
      rating: 4.8,
      reviewsCount: 12,
      joinedAt: Date.now(),
      bio: role === 'LANDLORD' ? "Experienced property owner in Delhi NCR." : "Quiet professional in tech."
    };
    setUser(newUser);
    setAuthModalOpen(false);
    setActiveTab(role === 'LANDLORD' ? 'dashboard' : 'explore');
  };

  const openAuth = (mode: 'LOGIN' | 'SIGNUP', role: UserRole = 'RENTER') => {
    playUISound('tap');
    setAuthMode(mode);
    setAuthType(role);
    setAuthModalOpen(true);
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

  const handleSendInquiry = (inquiryData: Partial<Inquiry>) => {
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
      message: inquiryData.message || '',
      moveInDate: inquiryData.moveInDate,
      occupancyCount: inquiryData.occupancyCount,
      status: 'PENDING',
      timestamp: Date.now(),
    };
    setInquiries([newInquiry, ...inquiries]);
    setIsInquiryFormOpen(false);
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

  const LandingView = () => (
    <div className="flex flex-col items-center py-20 space-y-32 animate-in fade-in duration-1000">
      <div className="text-center max-w-5xl space-y-12 px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-400/10 blur-[120px] rounded-full -z-10"></div>
        <div className="inline-flex items-center gap-3 px-5 py-2.5 bg-white border border-amber-100 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-amber-600 shadow-sm">
          <span className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse shadow-[0_0_15px_rgba(245,158,11,0.5)]"></span>
          Premium Rental Network India
        </div>
        <h2 className="text-8xl sm:text-[12rem] font-black text-stone-900 tracking-tighter leading-[0.75] flex flex-col items-center italic">
          <span>LEASE.</span>
          <span className="text-amber-500 -mt-4">BELIEVE.</span>
        </h2>
        <p className="text-2xl text-stone-500 font-medium max-w-2xl mx-auto leading-relaxed">
          The future of curated renting. Verified listings, secure connections, and the seamless RENTIVO experience.
        </p>
        <div className="flex flex-wrap justify-center gap-8 pt-8">
          <button onClick={() => openAuth('SIGNUP', 'RENTER')} className="px-12 py-6 bg-amber-500 text-white rounded-[2rem] font-black text-xl hover:bg-amber-600 shadow-lg transition-all active:scale-95 flex items-center gap-3">
            Find a Home <ArrowRight className="w-6 h-6" />
          </button>
          <button onClick={() => openAuth('SIGNUP', 'LANDLORD')} className="px-12 py-6 bg-white text-stone-900 border border-amber-100 rounded-[2rem] font-black text-xl hover:bg-amber-50 transition-all active:scale-95 shadow-sm">
            List a Space
          </button>
        </div>
      </div>
    </div>
  );

  const ExploreView = () => (
    <div className="space-y-16 py-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-7 top-1/2 -translate-y-1/2 text-stone-400 w-6 h-6" />
            <input type="text" placeholder="Search by city, area or landmark..." className="w-full pl-16 pr-8 py-7 bg-white rounded-[2.5rem] border border-amber-100 focus:border-amber-400 outline-none transition-all font-bold text-xl text-stone-800 placeholder:text-stone-200 shadow-sm" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <button onClick={() => { playUISound('tap'); setIsFilterOpen(!isFilterOpen); }} className={`flex items-center gap-3 px-10 py-7 rounded-[2.5rem] font-black text-lg transition-all active:scale-95 shadow-sm ${isFilterOpen ? 'bg-amber-500 text-white' : 'bg-white border border-amber-100 text-stone-600 hover:bg-amber-50'}`}>
            <Filter className="w-5 h-5" /> Filters
          </button>
        </div>
        {isFilterOpen && (
          <div className="bg-white/80 backdrop-blur-3xl p-10 rounded-[3rem] shadow-xl border border-amber-100 grid grid-cols-1 md:grid-cols-3 gap-8 animate-in slide-in-from-top-6 duration-500">
            <select className="w-full px-5 py-4 bg-amber-50/50 rounded-2xl outline-none font-bold text-stone-700 border border-amber-100" value={selectedState} onChange={(e) => { setSelectedState(e.target.value); setSelectedDistrict(''); }}>
              <option value="">All States</option>
              {INDIA_STATES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
            <select className="w-full px-5 py-4 bg-amber-50/50 rounded-2xl outline-none font-bold text-stone-700 border border-amber-100 disabled:opacity-30" value={selectedDistrict} onChange={(e) => setSelectedDistrict(e.target.value)} disabled={!selectedState}>
              <option value="">All Districts</option>
              {selectedState && STATE_DISTRICTS[selectedState]?.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
            <div className="md:col-span-1 flex justify-end gap-5">
              <button onClick={() => { setSelectedState(''); setSelectedDistrict(''); setSearchQuery(''); }} className="px-8 py-3 text-stone-400 font-black uppercase text-[10px]">Reset</button>
              <button onClick={() => setIsFilterOpen(false)} className="px-10 py-4 bg-amber-500 text-white rounded-[1.5rem] font-black shadow-lg">Update</button>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {filteredProperties.map(p => (
          <PropertyCard key={p.id} property={p} onViewDetails={() => { playUISound('pop'); setSelectedProperty(p); }} />
        ))}
      </div>
      <SupportSystem />
    </div>
  );

  const DashboardView = () => {
    const userInquiries = inquiries.filter(iq => iq.receiverId === user?.id);
    const userProperties = properties.filter(p => p.landlordId === user?.id || p.landlordId === 'l1');
    return (
      <div className="space-y-16 py-10 animate-in fade-in duration-700">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-10">
          <div className="space-y-4">
            <h2 className="text-6xl font-black text-stone-900 tracking-tighter">Asset Hub.</h2>
            <p className="text-stone-500 text-xl font-medium">Monitoring {userProperties.length} active assets & {userInquiries.length} inquiries.</p>
          </div>
          <button onClick={() => { playUISound('tap'); setIsAddingProperty(true); }} className="px-12 py-6 bg-amber-500 text-white rounded-[2rem] font-black text-xl hover:bg-amber-600 shadow-xl transition-all active:scale-95 flex items-center gap-3">
            <PlusSquare className="w-6 h-6" /> List New Asset
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-8">
            <h3 className="text-2xl font-black uppercase tracking-tighter text-stone-800 italic">Active Portfolio</h3>
            <div className="grid grid-cols-1 gap-8">
              {userProperties.map(p => (
                <div key={p.id} className="bg-white p-8 rounded-[3.5rem] border border-amber-100 flex flex-col md:flex-row gap-8 hover:border-amber-200 transition-all group overflow-hidden relative shadow-sm">
                  <div className="w-full md:w-48 h-48 overflow-hidden rounded-[2.5rem] flex-shrink-0">
                    <img src={p.photos[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]" alt={p.title} />
                  </div>
                  <div className="flex-1 py-2">
                    <h3 className="text-3xl font-black text-stone-900 leading-tight">{p.title}</h3>
                    <div className="flex gap-3 mt-8">
                      <button className="flex-1 py-4 rounded-2xl bg-white border border-amber-100 text-stone-500 font-black text-xs uppercase tracking-widest">Edit</button>
                      <button className="flex-[2] py-4 rounded-2xl bg-stone-900 text-white font-black text-xs uppercase tracking-widest shadow-lg">Analytics</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="lg:col-span-4 space-y-8">
            <h3 className="text-2xl font-black uppercase tracking-tighter text-stone-800 italic">Incoming Leads</h3>
            <div className="space-y-6">
              {userInquiries.length > 0 ? userInquiries.map(iq => (
                <div key={iq.id} className="bg-white p-6 rounded-[2.5rem] border border-amber-100 shadow-sm group hover:border-amber-400 transition-all">
                  <div className="flex items-start gap-4 mb-4">
                    <img src={iq.senderAvatar} className="w-12 h-12 rounded-2xl object-cover" alt={iq.senderName} />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-black text-stone-900 truncate uppercase tracking-tighter">{iq.senderName}</h4>
                      <p className="text-[10px] font-bold text-amber-600 truncate uppercase tracking-widest">{iq.propertyTitle}</p>
                    </div>
                  </div>
                  <p className="text-stone-600 text-sm italic mb-6">"{iq.message}"</p>
                  <div className="flex gap-2">
                    <button className="flex-1 py-3 bg-amber-500 text-white rounded-xl text-[10px] font-black uppercase">Accept</button>
                    <button className="flex-1 py-3 bg-white border border-amber-100 text-stone-400 rounded-xl text-[10px] font-black uppercase">Ignore</button>
                  </div>
                </div>
              )) : (
                <div className="text-center py-20 bg-amber-50/30 rounded-[3rem] border border-dashed border-amber-100 text-stone-400 font-bold uppercase text-[10px]">No Leads Yet</div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AuthModal = () => {
    const [identifier, setIdentifier] = useState('');
    const [pass, setPass] = useState('');
    const [name, setName] = useState('');
    return (
      <div className="fixed inset-0 z-[250] flex items-center justify-center p-0 sm:p-6 animate-in fade-in duration-500">
        <div className="absolute inset-0 bg-stone-900/80 backdrop-blur-2xl" onClick={() => setAuthModalOpen(false)} />
        <div className="relative bg-[#FFFDF0] rounded-none sm:rounded-[4rem] w-full h-full sm:h-auto sm:max-w-xl p-8 sm:p-20 shadow-2xl border border-amber-100 flex flex-col justify-center animate-in zoom-in-95 duration-500 overflow-y-auto scrollbar-hide">
          <button onClick={() => setAuthModalOpen(false)} className="absolute top-8 sm:top-12 right-8 sm:right-12 p-3 text-stone-300 hover:text-stone-900"><X className="w-8 h-8" /></button>
          <div className="text-center mb-10 sm:mb-16">
            <div className="w-20 h-20 sm:w-28 sm:h-28 bg-amber-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6 sm:mb-10 shadow-lg -rotate-6"><Home className="text-white w-10 h-10 sm:w-14 sm:h-14" /></div>
            <h3 className="text-4xl sm:text-6xl font-black text-stone-900 tracking-tighter uppercase">RENTIVO<span className="text-amber-500">.</span></h3>
            <div className="flex justify-center gap-6 mt-8 border-b border-amber-100 pb-2">
              <button onClick={() => setAuthMode('LOGIN')} className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all pb-3 relative ${authMode === 'LOGIN' ? 'text-stone-900' : 'text-stone-300'}`}>Access {authMode === 'LOGIN' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 rounded-full" />}</button>
              <button onClick={() => setAuthMode('SIGNUP')} className={`text-[10px] font-black uppercase tracking-[0.4em] transition-all pb-3 relative ${authMode === 'SIGNUP' ? 'text-stone-900' : 'text-stone-300'}`}>Join {authMode === 'SIGNUP' && <div className="absolute bottom-0 left-0 right-0 h-1 bg-amber-500 rounded-full" />}</button>
            </div>
          </div>
          <div className="space-y-6">
            {authMode === 'SIGNUP' && (
              <div className="space-y-2">
                <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Full Identity</label>
                <input type="text" placeholder="Arjun Sharma" className="w-full px-6 py-4 rounded-2xl bg-amber-50/40 border border-amber-100 focus:border-amber-400 outline-none font-bold text-stone-800" value={name} onChange={e => setName(e.target.value)} />
              </div>
            )}
            <div className="space-y-2">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Email or Mobile</label>
              <input type="text" placeholder="arjun@rentivo.in" className="w-full px-6 py-4 rounded-2xl bg-amber-50/40 border border-amber-100 focus:border-amber-400 outline-none font-bold text-stone-800" value={identifier} onChange={e => setIdentifier(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-stone-400 uppercase tracking-widest ml-1">Security Key</label>
              <input type="password" placeholder="••••••••" className="w-full px-6 py-4 rounded-2xl bg-amber-50/40 border border-amber-100 focus:border-amber-400 outline-none font-bold text-stone-800" value={pass} onChange={e => setPass(e.target.value)} />
            </div>
            <div className="pt-4">
              <button onClick={() => handleLogin(authType)} className="w-full py-5 bg-amber-500 text-white rounded-3xl font-black text-lg sm:text-2xl hover:bg-amber-600 shadow-xl transition-all active:scale-95 flex items-center justify-center gap-5">
                {authMode === 'LOGIN' ? 'Entry Portal' : 'Create Account'} <ArrowRight className="w-6 h-6" />
              </button>
            </div>
            <button onClick={() => setAuthType(authType === 'RENTER' ? 'LANDLORD' : 'RENTER')} className="w-full py-4 text-[10px] font-black text-stone-400 uppercase tracking-widest">Switch to {authType === 'RENTER' ? 'Landlord' : 'Renter'}</button>
          </div>
        </div>
      </div>
    );
  };

  const PropertyDetailView = ({ property }: { property: Property }) => (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animate-in fade-in duration-500">
      <div className="absolute inset-0 bg-stone-900/60 backdrop-blur-xl" onClick={() => setSelectedProperty(null)} />
      <div className="relative bg-[#FFFDF0] rounded-[4rem] w-full max-w-6xl max-h-[90vh] overflow-y-auto p-16 shadow-2xl border border-amber-100 animate-in zoom-in-95 scrollbar-hide">
        <button onClick={() => setSelectedProperty(null)} className="absolute top-12 right-12 p-4 text-stone-400 hover:text-stone-900 bg-white border border-amber-100 rounded-3xl"><X className="w-8 h-8" /></button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-10">
             <div className="aspect-[4/3] rounded-[3rem] overflow-hidden shadow-lg border border-amber-50">
                <img src={property.photos[0]} className="w-full h-full object-cover" alt={property.title} />
             </div>
             <div className="grid grid-cols-3 gap-6">
               {property.photos.slice(1, 4).map((photo, i) => (
                 <div key={i} className="aspect-square rounded-[2rem] overflow-hidden border border-amber-50 shadow-sm"><img src={photo} className="w-full h-full object-cover" alt="" /></div>
               ))}
             </div>
          </div>
          <div className="space-y-12">
            <h2 className="text-7xl font-black text-stone-900 tracking-tighter leading-[0.85]">{property.title}</h2>
            <div className="flex items-center gap-2 text-stone-500 font-bold text-xl"><MapPin className="w-6 h-6 text-amber-500" /> {property.location.area}, {property.location.city}</div>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-white p-10 rounded-[2.5rem] border border-amber-100"><p className="text-[10px] font-black uppercase text-stone-400">Rate/Mo</p><p className="text-5xl font-black text-stone-900 tracking-tighter">₹{property.rent.toLocaleString('en-IN')}</p></div>
              <div className="bg-white p-10 rounded-[2.5rem] border border-amber-100"><p className="text-[10px] font-black uppercase text-stone-400">Deposit</p><p className="text-5xl font-black text-stone-900 tracking-tighter">₹{property.deposit.toLocaleString('en-IN')}</p></div>
            </div>
            <p className="text-2xl text-stone-600 font-medium leading-relaxed italic">"{property.description}"</p>
            <button onClick={() => { if (!user) { openAuth('LOGIN'); return; } setIsInquiryFormOpen(true); playUISound('tap'); }} className="w-full py-7 bg-stone-900 text-white rounded-[2.5rem] font-black text-2xl hover:bg-stone-800 shadow-xl transition-all active:scale-95 flex items-center justify-center gap-4 group">
              <MessageSquare className="w-7 h-7" /> Inquire Securely
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Layout userRole={user?.role || null} onLogout={handleLogout} activeTab={activeTab} onTabChange={changeTab}>
      {!user && activeTab !== 'explore' && activeTab !== 'support' ? <LandingView /> : (
        activeTab === 'explore' ? <ExploreView /> :
        activeTab === 'dashboard' ? <DashboardView /> :
        activeTab === 'support' ? <div className="py-10 animate-in fade-in duration-700"><SupportSystem /></div> :
        activeTab === 'profile' && user ? <ProfileTab user={user} onUpdate={(updated) => setUser({ ...user, ...updated })} /> : <ExploreView />
      )}
      {isAuthModalOpen && <AuthModal />}
      {isAddingProperty && (
        <div className="fixed inset-0 z-[250] bg-stone-900/40 backdrop-blur-3xl flex items-center justify-center p-6 overflow-y-auto animate-in fade-in duration-500">
          <div className="w-full max-w-4xl my-10">
            <PropertyForm 
              onCancel={() => setIsAddingProperty(false)} 
              onSubmit={(data) => { 
                const newProperty: Property = {
                  ...data,
                  id: Date.now().toString(),
                  landlordId: user?.id || 'l1',
                  createdAt: Date.now(),
                  interestedCount: 0,
                  reviews: [],
                  photos: data.photos && data.photos.length > 0 ? data.photos : ['https://images.unsplash.com/photo-1560448204-61dc36dc98c8?auto=format&fit=crop&w=800&q=80'],
                  videos: [],
                  location: { 
                    ...data, 
                    country: data.country || 'India',
                    state: data.state,
                    district: data.district,
                    city: data.city,
                    area: data.area || data.city,
                    address: data.address || '',
                    landmark: '',
                    houseNumber: '',
                    coordinates: { lat: 28.5355, lng: 77.3910 } 
                  }
                };
                setProperties([newProperty, ...properties]); 
                setIsAddingProperty(false); 
                playUISound('success'); 
              }} 
            />
          </div>
        </div>
      )}
      {selectedProperty && <PropertyDetailView property={selectedProperty} />}
      {isInquiryFormOpen && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center p-6 animate-in fade-in duration-300">
          <div className="absolute inset-0 bg-stone-900/40 backdrop-blur-md" onClick={() => setIsInquiryFormOpen(false)} />
          <div className="relative bg-[#FFFDF0] rounded-[3.5rem] w-full max-w-lg p-12 shadow-2xl border border-amber-100 animate-in zoom-in-95 duration-500">
            <h3 className="text-3xl font-black text-stone-900 tracking-tighter uppercase italic text-center mb-10">Secure Message</h3>
            <textarea rows={4} className="w-full px-6 py-4 rounded-3xl bg-white border border-amber-100 focus:border-amber-400 outline-none font-medium text-stone-700 italic mb-8" defaultValue={`Interested in ${selectedProperty?.title}`} />
            <button onClick={() => handleSendInquiry({ message: 'Request sent.' })} className="w-full py-5 bg-amber-500 text-white rounded-[2rem] font-black text-lg hover:bg-amber-600 shadow-xl flex items-center justify-center gap-3">Dispatch <Send className="w-5 h-5" /></button>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default App;
