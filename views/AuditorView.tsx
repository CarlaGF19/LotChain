
import React, { useState } from 'react';
import { 
  BarChart3, Users, Store, ShieldAlert,
  Search, Download, Filter, ChevronLeft,
  Mail, Eye, EyeOff, ShieldCheck, CheckCircle2, ArrowLeft,
  LayoutDashboard, Package, FileText, ChevronDown, Box, ExternalLink, X,
  LogOut, AlertTriangle, Activity
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { MOCK_PHARMACIES } from '../constants';

interface Props {
  onBack: () => void;
}

const AuditorView: React.FC<Props> = ({ onBack }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Navigation State
  const [activeView, setActiveView] = useState<'overview' | 'pharmacies' | 'batches' | 'alerts' | 'evidence' | 'reports'>('overview');
  
  // Pharmacy View State
  const [selectedPharmacy, setSelectedPharmacy] = useState<any | null>(null);
  const [pharmacySearch, setPharmacySearch] = useState('');
  const [districtFilter, setDistrictFilter] = useState('Todos los distritos');

  // Chart Data State
  const [chartData, setChartData] = useState<any[]>([]);
  const [isLoadingChart, setIsLoadingChart] = useState(true);

  // Simulate Chart Data Loading
  React.useEffect(() => {
    // Force immediate load for debugging
    if (activeView === 'overview') {
        setChartData([
          { name: 'Ene', cumplimiento: 94 },
          { name: 'Feb', cumplimiento: 92 },
          { name: 'Mar', cumplimiento: 95 },
          { name: 'Abr', cumplimiento: 88 },
          { name: 'May', cumplimiento: 91 },
          { name: 'Jun', cumplimiento: 96 },
        ]);
        setIsLoadingChart(false);
    }
  }, [activeView]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (email === 'usuario@digemid.gob.pe' && password === 'admin123') {
        setIsAuthenticated(true);
      } else {
        setError('Credenciales incorrectas. Intente nuevamente.');
      }
      setIsLoading(false);
    }, 1000);
  };

  const handleDemoLogin = () => {
    setEmail('usuario@digemid.gob.pe');
    setPassword('admin123');
  };

  // --- Login Screen ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0f111a] flex items-center justify-center p-6 font-sans">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Column: Branding */}
          <div className="space-y-8 animate-in slide-in-from-left-8 duration-700">
            <div>
              <h1 className="text-6xl font-black text-white mb-2 tracking-tight">LotChain</h1>
              <p className="text-xl text-slate-400 font-medium">Acceso Auditor / DIGEMID</p>
            </div>
            <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
              Plataforma de trazabilidad segura para la regulación farmacéutica en Perú. Supervise lotes, valide certificados y asegure la calidad sanitaria.
            </p>
            <div className="flex gap-4">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-bold">
                <CheckCircle2 size={16} /> Sistema operativo
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-bold">
                <ShieldCheck size={16} /> Conexión Segura
              </span>
            </div>
            <div className="pt-12 space-y-4">
              <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">POWERED BY HYPERLEDGER FABRIC</p>
              <p className="text-[10px] text-slate-700">© 2024 Ministerio de Salud del Perú - DIGEMID</p>
            </div>
          </div>

          {/* Right Column: Login Card */}
          <div className="bg-[#1a1d2d] p-10 rounded-[32px] border border-slate-800 shadow-2xl animate-in slide-in-from-right-8 duration-700">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-white mb-1">Iniciar sesión</h2>
              <p className="text-slate-400 text-sm">Acceso exclusivo para personal autorizado.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400">Usuario institucional</label>
                <div className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usuario@digemid.gob.pe"
                    className="w-full bg-[#0f111a] border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                  />
                  <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600" size={18} />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-400">Contraseña</label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-[#0f111a] border border-slate-700 rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none transition-all"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-400 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium flex items-center gap-2">
                  <ShieldAlert size={16} />
                  {error}
                </div>
              )}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-400 cursor-pointer">
                  <input type="checkbox" className="rounded bg-[#0f111a] border-slate-700 text-purple-600 focus:ring-purple-500" />
                  Recordar sesión
                </label>
                <a href="#" className="text-purple-400 hover:text-purple-300 font-medium transition-colors">¿Olvidaste tu contraseña?</a>
              </div>
              <div className="space-y-3 pt-2">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-purple-900/20 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    'Ingresar'
                  )}
                </button>
                <button 
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full bg-transparent border border-slate-700 hover:border-slate-600 text-slate-400 font-bold py-4 rounded-xl transition-all active:scale-[0.98]"
                >
                  Usar credenciales de demo
                </button>
              </div>
            </form>
            <div className="mt-8 pt-8 border-t border-slate-800">
              <div className="bg-[#0f111a] rounded-xl p-4 flex items-center gap-4 border border-slate-800">
                <div className="bg-purple-500/10 p-2 rounded-lg text-purple-400">
                  <ShieldCheck size={20} />
                </div>
                <div>
                  <p className="text-white font-bold text-xs uppercase tracking-wide">BLOCKCHAIN VERIFIED</p>
                  <p className="text-slate-500 text-xs mt-0.5">Evidencias y alertas con respaldo verificable.</p>
                </div>
              </div>
              <button onClick={onBack} className="w-full mt-6 flex items-center justify-center gap-2 text-slate-500 hover:text-white transition-colors text-sm font-medium">
                <ArrowLeft size={16} /> Volver al Hub
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Dashboard Layout ---
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* Top Navigation Bar */}
      <header className="bg-white border-b border-slate-200 h-16 sticky top-0 z-30">
        <div className="h-full px-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <div className="bg-gradient-to-br from-blue-600 to-indigo-600 text-white p-1.5 rounded-lg shadow-sm">
                <Box size={20} />
             </div>
             <div>
                <h1 className="font-bold text-slate-900 text-lg leading-none">LotChain · Panel Auditor / DIGEMID</h1>
                <span className="text-xs text-slate-400 font-medium">Auditor DIGEMID</span>
             </div>
          </div>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-full border border-slate-100">
               <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">Estado del sistema:</span>
               <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                  <CheckCircle2 size={12} className="fill-emerald-700 text-emerald-100" /> Operativo
               </span>
            </div>

            <div className="flex items-center gap-6 pl-6 border-l border-slate-100">
               <div className="text-right hidden md:block">
                  <p className="text-xs font-bold text-slate-900">Usuario: Auditor DIGEMID</p>
                  <p className="text-[10px] text-slate-500 font-medium">Rol: Fiscalización Sanitaria</p>
               </div>
               <button 
                 onClick={() => setIsAuthenticated(false)}
                 className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-2 shadow-sm shadow-indigo-200"
               >
                 Cerrar sesión
               </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Navigation */}
        <aside className="w-64 bg-white border-r border-slate-200 flex flex-col z-20">
           <div className="p-6">
              <h2 className="text-xs font-black text-slate-900 uppercase tracking-wide mb-1">Auditor DIGEMID</h2>
              <p className="text-[10px] text-slate-400 font-medium">Fiscalización Sanitaria</p>
           </div>

           <nav className="flex-1 px-3 space-y-6 overflow-y-auto">
              <div>
                 <p className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Supervisión</p>
                 <div className="space-y-0.5">
                    <button 
                      onClick={() => setActiveView('overview')}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${activeView === 'overview' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      <LayoutDashboard size={18} /> Resumen general
                    </button>
                    <button 
                      onClick={() => setActiveView('pharmacies')}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${activeView === 'pharmacies' ? 'bg-blue-50 text-blue-700 shadow-sm' : 'text-slate-600 hover:bg-slate-50'}`}
                    >
                      <Store size={18} /> Boticas
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                      <Package size={18} /> Lotes
                    </button>
                 </div>
              </div>

              <div>
                 <p className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Gestión</p>
                 <div className="space-y-0.5">
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                      <ShieldAlert size={18} /> Alertas críticas
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                      <ShieldCheck size={18} /> Evidencias
                    </button>
                    <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-50 rounded-xl transition-colors">
                      <BarChart3 size={18} /> Reportes
                    </button>
                 </div>
              </div>
           </nav>

           {/* Blockchain Node Widget */}
           <div className="p-4 mt-auto">
              <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
                 <div className="flex items-center gap-2 mb-2 text-blue-700 font-bold text-xs">
                    <Box size={14} /> Blockchain Node
                 </div>
                 <div className="space-y-1">
                    <div className="flex justify-between text-[10px]">
                       <span className="text-slate-500">Status:</span>
                       <span className="text-emerald-600 font-bold">Connected</span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                       <span className="text-slate-500">Block:</span>
                       <span className="text-blue-600 font-mono">#18,245,102</span>
                    </div>
                 </div>
              </div>
           </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-8">
           
           {/* OVERVIEW VIEW */}
           {activeView === 'overview' && (
             <div className="max-w-[1600px] mx-auto space-y-8 animate-in fade-in duration-300">
               <div className="flex justify-between items-end">
                 <div>
                   <h2 className="text-2xl font-black text-slate-900 mb-1">Resumen general (Control Macro)</h2>
                   <p className="text-slate-500">KPIs principales y métricas de cumplimiento a nivel nacional.</p>
                 </div>
               </div>

               {/* KPI Cards Row */}
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                 {[
                   { title: 'Boticas en Riesgo', value: '12', delta: '+2%', isPositive: false, color: 'text-slate-900' },
                   { title: 'Cumplimiento General', value: '98.5%', delta: '-0.5%', isPositive: false, color: 'text-slate-900' }, // Delta negative is bad
                   { title: 'Alertas Activas', value: '7', delta: '+3%', isPositive: true, color: 'text-slate-900' }, // More alerts bad? Image implies specific color
                   { title: 'Tiempo Prom. Respuesta', value: '2.5 hrs', delta: '-0.2 hrs', isPositive: true, color: 'text-slate-900' }
                 ].map((kpi, idx) => (
                   <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
                     <h3 className="text-sm font-bold text-slate-500 mb-2">{kpi.title}</h3>
                     <div className="flex items-end gap-3">
                       <span className={`text-4xl font-black ${kpi.color}`}>{kpi.value}</span>
                       <span className={`text-xs font-bold mb-1.5 ${kpi.title.includes('Cumplimiento') ? 'text-rose-500' : kpi.title.includes('Riesgo') ? 'text-rose-500' : 'text-emerald-600'}`}>
                         {kpi.delta}
                       </span>
                     </div>
                   </div>
                 ))}
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Chart Section */}
                  <div className="lg:col-span-2 bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                     <div className="mb-6">
                        <h3 className="text-lg font-bold text-slate-900">Cumplimiento Sanitario Mensual</h3>
                        <div className="flex items-end gap-2 mt-1">
                           <span className="text-3xl font-black text-slate-900">98.5%</span>
                           <span className="text-sm font-bold text-emerald-600 mb-1">Últimos 6 Meses +1.2%</span>
                        </div>
                     </div>
                     <div className="h-[300px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                           <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                              <YAxis domain={[80, 100]} axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                              <Tooltip 
                                contentStyle={{borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}}
                              />
                              <Line 
                                type="monotone" 
                                dataKey="cumplimiento" 
                                stroke="#2563eb" 
                                strokeWidth={4} 
                                dot={false} 
                                activeDot={{ r: 6, fill: '#2563eb' }}
                              />
                           </LineChart>
                        </ResponsiveContainer>
                     </div>
                  </div>

                  {/* Risk List */}
                  <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
                     <h3 className="text-lg font-bold text-slate-900 mb-6">Boticas en Riesgo</h3>
                     <div className="space-y-6">
                        {[
                          { name: 'Botica FarmaSalud', dist: 'San Isidro', alerts: '3 Alertas', risk: 'high' },
                          { name: 'MiFarma Central', dist: 'Miraflores', alerts: '2 Alertas', risk: 'medium' },
                          { name: 'InkaFarma Principal', dist: 'Cercado de Lima', alerts: '2 Alertas', risk: 'medium' },
                          { name: 'Boticas y Salud', dist: 'La Victoria', alerts: '1 Alerta', risk: 'low' }
                        ].map((item, i) => (
                           <div key={i} className="flex items-center justify-between group cursor-pointer">
                              <div>
                                 <p className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors">{item.name}</p>
                                 <p className="text-xs text-slate-400">{item.dist}</p>
                              </div>
                              <span className={`text-xs font-bold ${item.risk === 'high' ? 'text-rose-600' : item.risk === 'medium' ? 'text-amber-600' : 'text-amber-500'}`}>
                                 {item.alerts}
                              </span>
                           </div>
                        ))}
                     </div>
                     <button className="w-full mt-8 text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors">
                        Ver todas las boticas
                     </button>
                  </div>
               </div>
             </div>
           )}

           {/* PHARMACIES VIEW */}
           {activeView === 'pharmacies' && (
             <div className="max-w-[1600px] mx-auto animate-in fade-in duration-300">
               <div className="mb-8">
                 <h2 className="text-2xl font-black text-slate-900 mb-1">Boticas</h2>
                 <p className="text-slate-500">Supervisión y fiscalización de establecimientos farmacéuticos a nivel nacional.</p>
               </div>

               <div className="flex gap-6 items-start">
                  {/* Left Table Section */}
                  <div className={`flex-1 transition-all duration-300 ${selectedPharmacy ? 'mr-[400px]' : ''}`}>
                     
                     {/* Filters */}
                     <div className="bg-white p-4 rounded-t-2xl border border-slate-200 border-b-0 flex gap-4">
                        <div className="relative flex-1 max-w-md">
                           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                           <input 
                              type="text"
                              value={pharmacySearch}
                              onChange={(e) => setPharmacySearch(e.target.value)}
                              placeholder="Buscar por nombre, RUC"
                              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                           />
                        </div>
                        <div className="relative w-48">
                           <select 
                             className="w-full pl-3 pr-8 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium appearance-none focus:ring-2 focus:ring-blue-500 outline-none text-slate-600"
                             value={districtFilter}
                             onChange={(e) => setDistrictFilter(e.target.value)}
                           >
                              <option>Todos los distritos</option>
                              <option>San Isidro</option>
                              <option>Miraflores</option>
                              <option>Cercado de Lima</option>
                           </select>
                           <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={14} />
                        </div>
                     </div>

                     {/* Table */}
                     <div className="bg-white border border-slate-200 rounded-b-2xl shadow-sm overflow-hidden">
                        <table className="w-full text-left">
                           <thead className="bg-slate-50 border-b border-slate-200">
                              <tr>
                                 <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">BOTICA</th>
                                 <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">DISTRITO</th>
                                 <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">VERIFICACIÓN BLOCKCHAIN</th>
                                 <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">ALERTAS</th>
                                 <th className="w-2"></th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-slate-100">
                              {[
                                { id: 1, name: 'Botica FarmaSalud', ruc: '20100123456', district: 'San Isidro', status: 'none', alerts: 3 },
                                { id: 2, name: 'MiFarma Central', ruc: '20512004011', district: 'Miraflores', status: 'partial', alerts: 2 },
                                { id: 3, name: 'InkaFarma Principal', ruc: '20456789012', district: 'Cercado de Lima', status: 'verified', alerts: 0 },
                                { id: 4, name: 'Boticas y Salud', ruc: '20102394857', district: 'La Victoria', status: 'verified', alerts: 1 },
                                { id: 5, name: 'Farmacia Universal', ruc: '20100293847', district: 'Jesús María', status: 'verified', alerts: 0 }
                              ].map((p) => (
                                 <tr 
                                   key={p.id} 
                                   onClick={() => setSelectedPharmacy(p)}
                                   className={`group hover:bg-blue-50/50 cursor-pointer transition-colors ${selectedPharmacy?.id === p.id ? 'bg-blue-50' : ''}`}
                                 >
                                    <td className="px-6 py-5">
                                       <p className={`font-bold text-sm ${selectedPharmacy?.id === p.id ? 'text-blue-700' : 'text-slate-900'}`}>{p.name}</p>
                                       <p className="text-xs text-slate-400 mt-0.5">RUC: {p.ruc}</p>
                                    </td>
                                    <td className="px-6 py-5 text-sm font-medium text-slate-600">{p.district}</td>
                                    <td className="px-6 py-5 text-center">
                                       {p.status === 'none' && (
                                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-bold">
                                             <div className="w-1.5 h-1.5 rounded-full bg-rose-600"></div> Sin registros
                                          </span>
                                       )}
                                       {p.status === 'partial' && (
                                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold">
                                             <div className="w-1.5 h-1.5 rounded-full bg-amber-600"></div> Parcial
                                          </span>
                                       )}
                                       {p.status === 'verified' && (
                                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                                             <CheckCircle2 size={12} className="text-emerald-700" /> Verificado
                                          </span>
                                       )}
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                       {p.alerts > 0 ? (
                                          <div className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold ${p.alerts > 2 ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                                             {p.alerts}
                                          </div>
                                       ) : (
                                          <span className="text-slate-300">-</span>
                                       )}
                                    </td>
                                    <td className="p-0 relative">
                                       {selectedPharmacy?.id === p.id && (
                                          <div className="absolute right-0 top-0 bottom-0 w-1 bg-blue-600"></div>
                                       )}
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
                           <p className="text-xs text-slate-400 font-medium">Mostrando 5 de 156 boticas</p>
                           <div className="flex gap-2">
                              <button className="px-3 py-1.5 border border-slate-200 rounded text-xs font-medium text-slate-500 hover:bg-slate-50">Anterior</button>
                              <button className="px-3 py-1.5 border border-slate-200 rounded text-xs font-medium text-slate-500 hover:bg-slate-50">Siguiente</button>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Detail Panel (Right Sidebar) */}
                  <div className={`fixed top-16 right-0 bottom-0 w-[400px] bg-white border-l border-slate-200 shadow-2xl transform transition-transform duration-300 overflow-y-auto ${selectedPharmacy ? 'translate-x-0' : 'translate-x-full'}`}>
                     {selectedPharmacy && (
                        <div className="p-8 space-y-8">
                           {/* Header */}
                           <div>
                              <div className="flex justify-between items-start mb-2">
                                 <h2 className="text-xl font-bold text-blue-700">{selectedPharmacy.name}</h2>
                                 <button onClick={() => setSelectedPharmacy(null)} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
                              </div>
                              <p className="text-sm text-slate-500 flex items-center gap-1.5 mb-1"><Store size={14} /> Av. Larco 743, {selectedPharmacy.district}, Lima</p>
                              <p className="text-sm text-slate-400 flex items-center gap-1.5"><FileText size={14} /> RUC: {selectedPharmacy.ruc}</p>
                           </div>

                           {/* KPIs Grid */}
                           <div className="space-y-3">
                              <h3 className="text-xs font-bold text-slate-900 uppercase">KPIs Operativos</h3>
                              <div className="grid grid-cols-2 gap-3">
                                 <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Cumplimiento</p>
                                    <p className="text-xl font-black text-slate-900">92%</p>
                                 </div>
                                 <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Resp. Promedio</p>
                                    <p className="text-xl font-black text-slate-900">3.1h</p>
                                 </div>
                                 <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Alertas</p>
                                    <p className="text-xl font-black text-amber-600">2 Activas</p>
                                 </div>
                                 <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                                    <p className="text-[10px] text-slate-500 font-bold uppercase mb-1">Auditorías</p>
                                    <p className="text-xl font-black text-slate-900">12<span className="text-xs text-slate-400 font-medium">/año</span></p>
                                 </div>
                              </div>
                              <button className="w-full flex items-center justify-between px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-xs font-bold hover:bg-blue-100 transition-colors">
                                 <span className="flex items-center gap-2"><Box size={14} /> Evidencias en blockchain</span>
                                 <span className="bg-white px-2 py-0.5 rounded-full text-[10px] shadow-sm">15</span>
                              </button>
                           </div>

                           {/* Blockchain Traceability */}
                           <div className="space-y-4">
                              <h3 className="text-xs font-bold text-slate-900 flex items-center gap-2 uppercase">
                                 <LogOut size={14} className="rotate-90 text-blue-600" /> Trazabilidad Blockchain
                              </h3>
                              <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
                                 <div className="space-y-3 mb-4">
                                    <div className="flex justify-between items-center text-sm">
                                       <span className="text-slate-600 font-medium">Alertas registradas</span>
                                       <span className="font-bold text-slate-900">2</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                       <span className="text-slate-600 font-medium">Acciones confirmadas</span>
                                       <span className="font-bold text-slate-900">5</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                       <span className="text-slate-600 font-medium">Evidencias selladas</span>
                                       <span className="font-bold text-slate-900">12</span>
                                    </div>
                                 </div>
                                 <div className="bg-emerald-50 rounded-lg p-2 flex items-center gap-2 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                                    <p className="text-[10px] font-mono text-emerald-800">Red: Blockchain pública (demo)</p>
                                 </div>
                                 <button className="w-full py-2.5 bg-slate-100 text-slate-600 text-xs font-bold rounded-lg uppercase hover:bg-slate-200 transition-colors flex items-center justify-center gap-2">
                                    Ver registros blockchain <ExternalLink size={12} />
                                 </button>
                              </div>
                           </div>

                           {/* Pending Alerts */}
                           <div className="space-y-4">
                              <h3 className="text-xs font-bold text-slate-900 uppercase">Alertas Pendientes (2)</h3>
                              <div className="space-y-3">
                                 <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-lg">
                                    <div className="flex items-start gap-2">
                                       <AlertTriangle size={16} className="text-amber-600 mt-0.5" />
                                       <div>
                                          <p className="text-sm font-bold text-slate-900">Retiro de Lote AB-456</p>
                                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">Paracetamol 500mg. Pendiente de evidencia de retiro total.</p>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="bg-amber-50 border-l-4 border-amber-500 p-3 rounded-r-lg">
                                    <div className="flex items-start gap-2">
                                       <AlertTriangle size={16} className="text-amber-600 mt-0.5" />
                                       <div>
                                          <p className="text-sm font-bold text-slate-900">Observación Amoxicilina</p>
                                          <p className="text-xs text-slate-500 mt-1 leading-relaxed">Pendiente de confirmación de cuarentena.</p>
                                       </div>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
             </div>
           )}

        </main>
      </div>
    </div>
  );
};

export default AuditorView;
