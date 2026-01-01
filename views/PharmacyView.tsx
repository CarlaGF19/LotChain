
import React, { useState } from 'react';
import { 
  Bell, CheckCircle2, AlertTriangle, FileCheck, 
  History, LayoutDashboard, ChevronLeft, Send,
  ClipboardList, ExternalLink, ShieldCheck, X, Search,
  Printer, Share2, Box, Info, Settings, LogOut,
  Mail, Eye, EyeOff, Lock
} from 'lucide-react';
import { MOCK_ALERTS } from '../constants';
import { stellarService } from '../services/stellarService';

interface Props {
  onBack: () => void;
}

// Tipos para Evidencias
interface Evidence {
  id: string;
  medication: string;
  batch: string;
  alertType: 'Retirado' | 'Observado' | 'Inmovilizado';
  action: string;
  quantity: string;
  date: string;
  responsible: string;
  status: 'verified';
  txId: string;
  laboratory: string;
  location: string;
}

const MOCK_EVIDENCES: Evidence[] = [
  {
    id: 'e1',
    medication: 'Paracetamol 500mg',
    batch: 'B402',
    alertType: 'Retirado',
    action: 'Retiro Total',
    quantity: '45 Unidades',
    date: '12 Oct 2025, 14:30',
    responsible: 'Q.F. Maria Lopez (C.Q.F. 12938)',
    status: 'verified',
    txId: '0x39281a9c82d73e91b82736c9d8e7f1a2b3c4d5e6f92',
    laboratory: 'Farmindustria S.A.',
    location: 'Almacén de Bajas (Zona C)'
  },
  {
    id: 'e2',
    medication: 'Ibuprofeno 400mg',
    batch: 'B45-882',
    alertType: 'Observado',
    action: 'Cuarentena',
    quantity: '120 Unidades',
    date: '10 Oct 2025, 09:15',
    responsible: 'Q.F. Juan Perez (C.Q.F. 44521)',
    status: 'verified',
    txId: '0x882...e21',
    laboratory: 'Genfar Peru',
    location: 'Área de Cuarentena'
  },
  {
    id: 'e3',
    medication: 'Amoxicilina 500mg',
    batch: 'Q200-X',
    alertType: 'Inmovilizado',
    action: 'Revisión Lote',
    quantity: '300 Unidades',
    date: '08 Oct 2025, 11:45',
    responsible: 'Q.F. Ana Torres (C.Q.F. 33211)',
    status: 'verified',
    txId: '0x771...a11',
    laboratory: 'Medifarma S.A.',
    location: 'Estantería Principal'
  }
];

const PharmacyView: React.FC<Props> = ({ onBack }) => {
  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // Dashboard State
  const [currentView, setCurrentView] = useState<'alerts' | 'evidence' | 'inventory' | 'settings'>('alerts');
  const [selectedEvidence, setSelectedEvidence] = useState<Evidence | null>(null);
  const [selectedAlert, setSelectedAlert] = useState<typeof MOCK_ALERTS[0] | null>(null);
  const [confirmed, setConfirmed] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastTx, setLastTx] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setIsAuthLoading(true);

    // Simulate API call
    setTimeout(() => {
      if (email === 'farmacia@perufarma.pe' && password === 'farma123') {
        setIsAuthenticated(true);
      } else {
        setAuthError('Credenciales incorrectas. Intente nuevamente.');
      }
      setIsAuthLoading(false);
    }, 1000);
  };

  const handleDemoLogin = () => {
    setEmail('farmacia@perufarma.pe');
    setPassword('farma123');
  };

  const handleAction = async (alertId: string) => {
    setLoading(true);
    const tx = await stellarService.recordEvent('PharmacyConfirmation', {
      alertId,
      action: 'STOCK_SEGREGATED',
      pharmacyId: 'p2'
    });
    setConfirmed([...confirmed, alertId]);
    setLastTx(tx);
    setLoading(false);
    setTimeout(() => setLastTx(null), 5000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Retirado': return 'bg-red-100 text-red-700';
      case 'Observado': return 'bg-amber-100 text-amber-700';
      case 'Inmovilizado': return 'bg-blue-100 text-blue-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const getActionIcon = (action: string) => {
    if (action.includes('Retiro')) return <X size={14} />;
    if (action.includes('Cuarentena')) return <Box size={14} />;
    return <CheckCircle2 size={14} />;
  };

  // --- Login View ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 font-sans">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-2 bg-white rounded-[32px] shadow-2xl overflow-hidden min-h-[600px]">
          
          {/* Left Column: Branding */}
          <div className="bg-blue-600 p-12 flex flex-col justify-between text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-50"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-white/20 p-2.5 rounded-xl backdrop-blur-sm">
                  <FileCheck size={28} className="text-white" />
                </div>
                <h1 className="text-2xl font-black tracking-tight">Panel Botica</h1>
              </div>
              <h2 className="text-4xl font-bold mb-4 leading-tight">Gestión segura de alertas sanitarias</h2>
              <p className="text-blue-100 text-lg leading-relaxed">
                Acceda al sistema de trazabilidad y cumplimiento normativo. Registre evidencias inmutables en blockchain.
              </p>
            </div>

            <div className="relative z-10 space-y-6">
              <div className="flex gap-3">
                <div className="px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10 text-sm font-bold flex items-center gap-2">
                  <ShieldCheck size={16} /> Acceso Seguro
                </div>
                <div className="px-4 py-2 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10 text-sm font-bold flex items-center gap-2">
                  <CheckCircle2 size={16} /> Verificado
                </div>
              </div>
              <p className="text-xs text-blue-200 font-medium">© 2024 LotChain. Todos los derechos reservados.</p>
            </div>
          </div>

          {/* Right Column: Login Form */}
          <div className="p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">Bienvenido de nuevo</h3>
              <p className="text-slate-500">Ingrese sus credenciales para acceder al panel.</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Correo electrónico</label>
                <div className="relative">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="farmacia@empresa.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Contraseña</label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                  />
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {authError && (
                <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm font-medium flex items-center gap-2 border border-red-100">
                  <AlertTriangle size={16} />
                  {authError}
                </div>
              )}

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 text-slate-600 cursor-pointer select-none">
                  <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                  Recordar sesión
                </label>
                <a href="#" className="text-blue-600 hover:text-blue-700 font-bold hover:underline">¿Olvidaste tu contraseña?</a>
              </div>

              <div className="space-y-3 pt-2">
                <button 
                  type="submit"
                  disabled={isAuthLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-200 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isAuthLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    'Iniciar Sesión'
                  )}
                </button>
                <button 
                  type="button"
                  onClick={handleDemoLogin}
                  className="w-full bg-slate-50 hover:bg-slate-100 text-slate-600 font-bold py-3.5 rounded-xl transition-all border border-slate-200"
                >
                  Usar credenciales de demo
                </button>
              </div>
            </form>

            <div className="mt-8 pt-6 border-t border-slate-100 text-center">
               <button onClick={onBack} className="text-sm font-medium text-slate-400 hover:text-slate-600 flex items-center justify-center gap-2 transition-colors mx-auto">
                 <ChevronLeft size={16} /> Volver al inicio
               </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // --- Main Dashboard View ---
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col sticky top-0 h-screen z-20">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <FileCheck size={20} />
            </div>
            <div>
              <span className="block text-lg font-bold text-slate-900 leading-none">Panel Botica</span>
              <span className="text-xs text-slate-500 font-medium">PeruFarma - Central</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          <button 
            onClick={() => setCurrentView('alerts')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors ${currentView === 'alerts' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <Bell size={18} />
            <span>Alertas</span>
          </button>
          <button 
            onClick={() => setCurrentView('evidence')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors ${currentView === 'evidence' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <History size={18} />
            <span>Evidencias</span>
          </button>
          <button 
            onClick={() => setCurrentView('inventory')}
            className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors ${currentView === 'inventory' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
          >
            <LayoutDashboard size={18} />
            <span>Inventario</span>
          </button>
          
          <div className="pt-4 mt-4 border-t border-slate-100">
            <p className="px-4 text-xs font-bold text-slate-400 uppercase mb-2">Sistema</p>
            <button 
              onClick={() => setCurrentView('settings')}
              className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium transition-colors ${currentView === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-50'}`}
            >
              <Settings size={18} />
              <span>Configuración</span>
            </button>
          </div>
        </nav>

        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
              PF
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold text-slate-900 truncate">Farmacia Admin</p>
              <p className="text-xs text-slate-500 truncate">admin@perufarma.pe</p>
            </div>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)} 
            className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:text-red-600 hover:bg-red-50 hover:border-red-100 transition-colors"
          >
            <LogOut size={14} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 relative overflow-hidden flex flex-col">
        {currentView === 'evidence' && (
          <div className="flex-1 flex relative animate-in fade-in duration-300">
            {/* Evidence List Area */}
            <div className={`flex-1 p-8 overflow-y-auto transition-all duration-300 ${selectedEvidence ? 'mr-[450px] opacity-40 pointer-events-none blur-[1px]' : ''}`}>
              <div className="mb-8">
                <h1 className="text-3xl font-black text-slate-900 mb-2">Registro de Evidencias</h1>
                <p className="text-slate-500">Detalle y trazabilidad de acciones ante alertas sanitarias con respaldo en blockchain.</p>
              </div>

              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
                    <tr>
                      <th className="px-6 py-4">MEDICAMENTO</th>
                      <th className="px-6 py-4">LOTE / ESTADO</th>
                      <th className="px-6 py-4">ACCIÓN TOMADA</th>
                      <th className="px-6 py-4">RESPONSABLE</th>
                      <th className="px-6 py-4 text-center">VERIFICACIÓN</th>
                      <th className="px-6 py-4">TX ID</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {MOCK_EVIDENCES.map((item) => (
                      <tr 
                        key={item.id} 
                        className="hover:bg-slate-50 transition-colors cursor-pointer group"
                        onClick={() => setSelectedEvidence(item)}
                      >
                        <td className="px-6 py-4 font-bold text-slate-900">{item.medication}</td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                             <span className="font-mono font-bold text-slate-700">{item.batch}</span>
                             <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-bold uppercase w-fit ${getStatusColor(item.alertType)}`}>
                               {item.alertType}
                             </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-bold ${
                            item.alertType === 'Retirado' ? 'bg-red-50 text-red-700 border-red-100' : 
                            item.alertType === 'Observado' ? 'bg-amber-50 text-amber-700 border-amber-100' : 
                            'bg-blue-50 text-blue-700 border-blue-100'
                          }`}>
                            {getActionIcon(item.action)}
                            {item.action}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-500">
                          <div className="flex flex-col">
                            <span className="font-medium text-slate-900">Q.F. {item.responsible.split('(')[0].replace('Q.F. ', '')}</span>
                            <span className="text-[10px]">{item.date}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100 text-emerald-600">
                            <CheckCircle2 size={16} />
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <code className="text-xs text-blue-600 font-mono hover:underline truncate max-w-[100px] block">
                            {item.txId}
                          </code>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="px-6 py-4 border-t border-slate-100 text-xs text-slate-400 font-medium">
                  Mostrando {MOCK_EVIDENCES.length} de {MOCK_EVIDENCES.length} evidencias
                </div>
              </div>
            </div>

            {/* Evidence Detail Modal (Right Sidebar) */}
            <div 
              className={`fixed top-0 right-0 w-[450px] h-full bg-white shadow-2xl border-l border-slate-200 transform transition-transform duration-300 z-30 flex flex-col ${
                selectedEvidence ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              {selectedEvidence && (
                <>
                  {/* Modal Header */}
                  <div className="px-8 py-6 border-b border-slate-100 flex items-start justify-between bg-white">
                    <div className="flex items-start gap-4">
                      <div className="mt-1 p-2 bg-blue-50 text-blue-600 rounded-xl">
                        <ShieldCheck size={24} />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-900 leading-tight">Comprobante Digital de Cumplimiento</h2>
                        <p className="text-xs text-slate-500 mt-1">Evidencia criptográfica de acción sanitaria</p>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedEvidence(null)}
                      className="text-slate-400 hover:text-slate-600 transition-colors p-1 hover:bg-slate-100 rounded-full"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="flex-1 overflow-y-auto p-8 space-y-8">
                    
                    {/* Validation Card */}
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 flex gap-4">
                      <div className="mt-0.5 text-emerald-600">
                        <ShieldCheck size={20} />
                      </div>
                      <div>
                        <h4 className="text-xs font-black text-emerald-800 uppercase tracking-wide mb-1">EVIDENCIA VÁLIDA Y PROTEGIDA</h4>
                        <p className="text-xs text-emerald-700 leading-relaxed">
                          Este comprobante certifica que su botica ha cumplido con la normativa vigente ante la alerta sanitaria. La información está inmutablemente registrada en la blockchain.
                        </p>
                      </div>
                    </div>

                    {/* Sanitary Info */}
                    <section className="space-y-4">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">INFORMACIÓN SANITARIA</h3>
                      <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Medicamento</label>
                          <p className="text-sm font-bold text-slate-900">{selectedEvidence.medication}</p>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Laboratorio</label>
                          <p className="text-sm font-bold text-slate-900">{selectedEvidence.laboratory}</p>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Lote Afectado</label>
                          <span className="inline-block px-2 py-0.5 bg-slate-100 rounded text-xs font-mono font-bold text-slate-900">
                            {selectedEvidence.batch}
                          </span>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Estado del Lote</label>
                          <div className="flex items-center gap-1.5">
                            <div className={`w-1.5 h-1.5 rounded-full ${selectedEvidence.alertType === 'Retirado' ? 'bg-red-600' : 'bg-amber-500'}`}></div>
                            <span className={`text-sm font-bold ${selectedEvidence.alertType === 'Retirado' ? 'text-red-600' : 'text-amber-600'}`}>
                              {selectedEvidence.alertType}
                            </span>
                          </div>
                        </div>
                        <div className="col-span-2">
                          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Autoridad Emisora</label>
                          <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                             <div className="text-slate-400"><Box size={14} /></div> DIGEMID
                          </div>
                        </div>
                      </div>
                    </section>

                    <hr className="border-slate-100" />

                    {/* Pharmacy Action */}
                    <section className="space-y-4">
                      <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">ACCIÓN DE LA BOTICA</h3>
                      <div className="bg-slate-50 rounded-xl p-5 space-y-5 border border-slate-100">
                         <div>
                            <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1.5">Acción Tomada</label>
                            <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                               <div className="p-1 bg-red-100 text-red-600 rounded">
                                 <X size={14} />
                               </div>
                               {selectedEvidence.action}
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Cantidad Afectada</label>
                              <p className="text-sm font-bold text-slate-900">{selectedEvidence.quantity}</p>
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Ubicación Actual</label>
                              <p className="text-sm font-bold text-slate-900">{selectedEvidence.location}</p>
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Fecha de Ejecución</label>
                              <p className="text-sm font-bold text-slate-900">{selectedEvidence.date}</p>
                            </div>
                            <div>
                              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Responsable</label>
                              <p className="text-sm font-bold text-slate-900">{selectedEvidence.responsible}</p>
                            </div>
                         </div>
                      </div>
                    </section>

                    {/* Blockchain Evidence */}
                    <section className="bg-purple-50/50 rounded-2xl p-5 border border-purple-100 relative overflow-hidden">
                      <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-purple-100 rounded-full blur-2xl opacity-50"></div>
                      
                      <div className="flex items-center gap-2 mb-4 relative z-10">
                        <Box size={16} className="text-purple-600" />
                        <h4 className="text-xs font-black text-purple-700 uppercase tracking-wide">EVIDENCIA BLOCKCHAIN</h4>
                      </div>

                      <div className="space-y-3 relative z-10">
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Red</label>
                          <p className="text-sm font-bold text-slate-900">Stellar Mainnet</p>
                        </div>
                        <div>
                          <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Transaction Hash (TX ID)</label>
                          <div className="flex items-center gap-2">
                             <code className="text-[10px] bg-white border border-purple-100 px-2 py-1.5 rounded font-mono text-slate-600 break-all">
                               {selectedEvidence.txId}
                             </code>
                             <button className="text-slate-400 hover:text-purple-600"><ClipboardList size={14} /></button>
                          </div>
                          <p className="text-[10px] text-slate-400 mt-1 italic">(hash criptográfico del reporte)</p>
                        </div>
                      </div>
                    </section>

                    <div className="flex items-start gap-2 text-[10px] text-slate-400 bg-slate-50 p-3 rounded-lg">
                      <Info size={14} className="shrink-0 mt-0.5" />
                      <p>
                        Este documento digital tiene valor probatorio según la normativa vigente de trazabilidad farmacéutica. <a href="#" className="text-blue-600 hover:underline">Leer términos legales</a>
                      </p>
                    </div>

                  </div>

                  {/* Modal Footer (Actions) */}
                  <div className="p-6 border-t border-slate-100 bg-white flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <button className="flex-1 py-3 px-4 rounded-xl border border-slate-200 text-slate-700 font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors">
                      <Printer size={18} />
                      Imprimir PDF
                    </button>
                    <button className="flex-1 py-3 px-4 rounded-xl bg-blue-600 text-white font-bold text-sm flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200">
                      <Share2 size={18} />
                      Compartir
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {currentView === 'alerts' && (
          /* Alerts View Code Block */
          <div className="p-10 overflow-y-auto animate-in fade-in duration-300">
            <header className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Centro de Control de Alertas</h1>
                <p className="text-slate-500">Botica Salud Total • RUC 20601234567</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase">Estado BMP</p>
                  <p className="text-emerald-600 font-bold">VIGENTE</p>
                </div>
                <div className="bg-emerald-100 text-emerald-600 px-4 py-2 rounded-xl font-bold flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  Cumplimiento: 85%
                </div>
              </div>
            </header>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
              {/* Alerts List */}
              <div className="xl:col-span-2 space-y-6">
                <h2 className="text-xl font-bold flex items-center gap-2">
                  <ClipboardList className="text-blue-600" />
                  Alertas Sanitarias Recientes
                </h2>
                
                {MOCK_ALERTS.map(alert => (
                  <div 
                    key={alert.id}
                    onClick={() => setSelectedAlert(alert)}
                    className={`bg-white p-6 rounded-3xl shadow-sm border-2 transition-all cursor-pointer ${selectedAlert?.id === alert.id ? 'border-blue-500 shadow-lg' : 'border-transparent hover:border-slate-200'}`}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-1">
                          <span className={`px-2 py-1 rounded text-[10px] font-black uppercase ${alert.urgency === 'URGENT' ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
                            {alert.urgency}
                          </span>
                          <h3 className="text-lg font-black text-slate-900">{alert.alertNumber}</h3>
                        </div>
                        <p className="text-slate-600 font-medium">{alert.medicationName} - Lotes: {alert.affectedBatches.join(', ')}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-400 uppercase font-bold">{alert.date}</p>
                        {confirmed.includes(alert.id) ? (
                          <span className="text-emerald-600 font-bold flex items-center gap-1 text-sm mt-1">
                            <CheckCircle2 size={14} /> CUMPLIDO
                          </span>
                        ) : (
                          <span className="text-rose-600 font-bold flex items-center gap-1 text-sm mt-1">
                            <AlertTriangle size={14} /> PENDIENTE
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-2">{alert.reason}</p>
                  </div>
                ))}
              </div>

              {/* Action Panel */}
              <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 h-fit sticky top-10">
                {selectedAlert ? (
                  <div className="space-y-8 animate-in fade-in duration-300">
                    <div>
                      <h3 className="text-xl font-bold mb-2">Protocolo de Acción</h3>
                      <p className="text-slate-500 text-sm">Alerta: {selectedAlert.alertNumber}</p>
                    </div>

                    <div className="space-y-4">
                      <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                        <div className="bg-slate-200 p-2 rounded-lg text-slate-600">1</div>
                        <p className="text-sm font-medium">Confirmar recepción de alerta oficial.</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                        <div className="bg-slate-200 p-2 rounded-lg text-slate-600">2</div>
                        <p className="text-sm font-medium">Inmovilizar stock de lote afectado.</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl flex items-center gap-4">
                        <div className="bg-slate-200 p-2 rounded-lg text-slate-600">3</div>
                        <p className="text-sm font-medium">Registrar evidencia en Stellar.</p>
                      </div>
                    </div>

                    <div className="pt-6 border-t">
                      <button 
                        disabled={confirmed.includes(selectedAlert.id) || loading}
                        onClick={() => handleAction(selectedAlert.id)}
                        className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                          confirmed.includes(selectedAlert.id) 
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-200 cursor-default' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-blue-200'
                        }`}
                      >
                        {loading ? (
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        ) : confirmed.includes(selectedAlert.id) ? (
                          <>
                            <CheckCircle2 size={18} />
                            Acción Registrada
                          </>
                        ) : (
                          <>
                            <Send size={18} />
                            Registrar Cumplimiento
                          </>
                        )}
                      </button>
                      <p className="text-[10px] text-center text-slate-400 mt-4 uppercase tracking-widest font-bold">
                        Genera comprobante digital inmutable
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-20">
                    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                      <Bell size={32} />
                    </div>
                    <h3 className="font-bold text-slate-400">Selecciona una alerta para gestionar</h3>
                  </div>
                )}
              </div>
            </div>

            {lastTx && (
              <div className="fixed bottom-10 right-10 bg-slate-900 text-white p-6 rounded-3xl shadow-2xl border border-slate-700 max-w-md animate-in slide-in-from-right-10 duration-500 z-50">
                <h4 className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                  <CheckCircle2 size={18} />
                  Evidencia Registrada en Stellar
                </h4>
                <p className="text-xs text-slate-400 mb-3">La acción ha sido anclada al ledger de forma permanente.</p>
                <code className="text-[10px] bg-black/50 p-2 rounded block break-all font-mono mb-4 text-blue-300">
                  {lastTx}
                </code>
                <button className="text-xs font-bold text-blue-400 hover:underline flex items-center gap-1">
                  Ver en Stellar Explorer <ExternalLink size={12} />
                </button>
              </div>
            )}
          </div>
        )}

        {(currentView === 'inventory' || currentView === 'settings') && (
           <div className="flex-1 flex items-center justify-center bg-slate-50 p-10 animate-in fade-in zoom-in duration-300">
              <div className="text-center max-w-md">
                 <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                    {currentView === 'inventory' ? <LayoutDashboard size={40} /> : <Settings size={40} />}
                 </div>
                 <h2 className="text-2xl font-black text-slate-900 mb-3">
                    {currentView === 'inventory' ? 'Módulo de Inventario' : 'Configuración del Sistema'}
                 </h2>
                 <p className="text-slate-500 mb-8">
                    Esta sección está en desarrollo. Pronto podrás gestionar {currentView === 'inventory' ? 'tu stock y lotes' : 'tus preferencias y usuarios'} desde aquí.
                 </p>
                 <button 
                   onClick={() => setCurrentView('alerts')}
                   className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                 >
                   Volver al Dashboard
                 </button>
              </div>
           </div>
        )}

      </main>
    </div>
  );
};

export default PharmacyView;
