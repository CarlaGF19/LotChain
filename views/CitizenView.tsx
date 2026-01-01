
import React, { useState } from 'react';
import { 
  Search, AlertCircle, CheckCircle, Info, ExternalLink, ChevronLeft, 
  ShieldCheck, ShieldAlert, Shield, Calendar, MapPin, 
  Phone, AlertTriangle, FileText, History, Activity, ChevronDown, Map, MessageCircle
} from 'lucide-react';
import { MOCK_BATCHES } from '../constants';
import { MedicationBatch, BatchStatus } from '../types';

interface Props {
  onBack: () => void;
}

const CitizenView: React.FC<Props> = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [result, setResult] = useState<MedicationBatch | null>(null);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    // Simulate search logic
    const term = searchTerm.toLowerCase();
    const found = MOCK_BATCHES.find(b => 
      term.includes(b.batchNumber.toLowerCase()) || 
      b.batchNumber.toLowerCase().includes(term)
    );
    
    setResult(found || null);
    setHasSearched(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
               <button onClick={onBack} className="text-slate-400 hover:text-slate-600 transition-colors">
                 <ChevronLeft size={24} />
               </button>
               <div>
                 <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                   <span>Inicio</span>
                   <span>›</span>
                   <span>Consulta ciudadana</span>
                 </div>
                 <h1 className="text-2xl font-bold text-slate-900 leading-none">Verifica tu lote</h1>
               </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <p className="text-slate-500 mb-4">Consulta la seguridad de tus medicamentos en tiempo real.</p>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Fuente: DIGEMID
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
              <Calendar size={12} /> Actualizado: Oct 2025
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              <MapPin size={12} /> Cobertura: Piloto Lima
            </span>
          </div>

          <form onSubmit={handleSearch} className="relative max-w-3xl">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Paracetamol 500mg - Lote B402"
                className="w-full pl-12 pr-32 py-4 bg-white border border-slate-200 rounded-xl shadow-sm text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 rounded-lg transition-colors"
              >
                Buscar
              </button>
            </div>
            <p className="mt-3 text-xs text-slate-400">
              <span className="font-bold">EJEMPLOS:</span> Paracetamol • Ibuprofeno • Lote X1234
            </p>
          </form>
        </div>

        {/* Results Section */}
        {hasSearched && result ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Left Column (Main Content) */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Alert Card */}
              <div className={`rounded-2xl border p-6 ${result.status === BatchStatus.OBSERVED ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100'}`}>
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                  <div className="flex items-start gap-3">
                    <div className={`mt-1 p-2 rounded-lg ${result.status === BatchStatus.OBSERVED ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-600'}`}>
                      {result.status === BatchStatus.OBSERVED ? <AlertTriangle size={24} /> : <CheckCircle size={24} />}
                    </div>
                    <div>
                      <h2 className={`text-lg font-bold ${result.status === BatchStatus.OBSERVED ? 'text-red-700' : 'text-emerald-700'}`}>
                        {result.status === BatchStatus.OBSERVED ? 'MEDIDA SANITARIA ACTIVA' : 'LOTE VERIFICADO Y SEGURO'}
                      </h2>
                      <p className="text-sm text-slate-600">
                        {result.status === BatchStatus.OBSERVED 
                          ? 'Lote observado por autoridad sanitaria. Ver detalles abajo.' 
                          : 'Este lote cumple con todos los estándares de seguridad.'}
                      </p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${result.status === BatchStatus.OBSERVED ? 'bg-red-600 text-white' : 'bg-emerald-600 text-white'}`}>
                    {result.status === BatchStatus.OBSERVED ? 'OBSERVADO' : 'SEGURO'}
                  </span>
                </div>

                <div className="flex flex-col md:flex-row gap-6 bg-white rounded-xl p-5 border border-slate-100 shadow-sm">
                  <div className="flex-1 space-y-4">
                    <h3 className="text-sm font-bold text-slate-500 uppercase tracking-wide">Qué hacer ahora</h3>
                    <ul className="space-y-3">
                      {result.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                          {result.status === BatchStatus.OBSERVED ? (
                             <div className="mt-0.5 w-4 h-4 rounded-full bg-red-100 flex items-center justify-center shrink-0">
                               <div className="w-1.5 h-1.5 rounded-full bg-red-600"></div>
                             </div>
                          ) : (
                             <div className="mt-0.5 w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                               <CheckCircle size={10} className="text-emerald-600" />
                             </div>
                          )}
                          {rec}
                        </li>
                      ))}
                      {result.status === BatchStatus.OBSERVED && (
                        <li className="flex items-start gap-3 text-sm text-slate-700">
                          <div className="mt-0.5 w-4 h-4 rounded-full bg-slate-100 flex items-center justify-center shrink-0">
                            <Phone size={10} className="text-slate-600" />
                          </div>
                          Contacte a la farmacia donde lo adquirió para devolución o cambio.
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  {/* Medication Block */}
                  <div className="w-full md:w-64 bg-slate-50 rounded-xl p-4 flex items-center gap-4 border border-slate-100">
                     <div className={`w-12 h-12 rounded-full flex items-center justify-center shadow-inner ${result.status === BatchStatus.OBSERVED ? 'bg-red-200' : 'bg-emerald-200'}`}>
                        <div className={`w-8 h-8 rounded-full ${result.status === BatchStatus.OBSERVED ? 'bg-red-500' : 'bg-emerald-500'}`}></div>
                     </div>
                     <div>
                       <span className="text-[10px] font-bold text-slate-400 uppercase">MEDICAMENTO</span>
                       <p className="font-bold text-slate-900 leading-tight">{result.medicationName}</p>
                       <p className="text-xs text-slate-500 mt-0.5">Lab. {result.laboratory}</p>
                     </div>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <div className="flex items-center gap-6 border-b border-gray-200 text-sm font-medium overflow-x-auto">
                <button className="pb-3 text-slate-500 hover:text-slate-800 whitespace-nowrap">Resumen</button>
                <button className="pb-3 text-red-600 border-b-2 border-red-600 whitespace-nowrap flex items-center gap-2">
                  <ShieldAlert size={16} /> Medidas Sanitarias
                </button>
                <button className="pb-3 text-slate-500 hover:text-slate-800 whitespace-nowrap flex items-center gap-2">
                  <AlertTriangle size={16} /> Alertas DIGEMID
                </button>
                <button className="pb-3 text-slate-500 hover:text-slate-800 whitespace-nowrap flex items-center gap-2">
                  <History size={16} /> Historial
                </button>
                <button className="pb-3 text-slate-500 hover:text-slate-800 whitespace-nowrap flex items-center gap-2">
                  <ShieldCheck size={16} /> Evidencia verificable
                </button>
              </div>

              {/* Detailed Section */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">Detalle de Medida Sanitaria</h3>
                    <p className="text-sm text-slate-500">Información oficial proporcionada por la autoridad sanitaria competente.</p>
                  </div>
                  <button className="px-4 py-2 rounded-lg bg-emerald-50 text-emerald-700 text-sm font-bold hover:bg-emerald-100 transition-colors">
                    Recibir actualizaciones
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Left Sub-card */}
                  <div className="border border-slate-200 rounded-xl p-5 space-y-5">
                    <div className="flex items-center gap-2 text-xs font-bold text-red-600 uppercase tracking-wide">
                      <ShieldAlert size={14} /> MEDIDA APLICADA
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">TIPO DE MEDIDA</p>
                        <p className="text-sm font-bold text-slate-900">Cierre temporal de laboratorio</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">ESTADO</p>
                        <p className="text-sm font-bold text-red-600 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-600"></span> ACTIVA
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">MOTIVO</p>
                      <p className="text-sm text-slate-800 leading-relaxed">
                        {result.description}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-100">
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">AUTORIDAD</p>
                        <p className="text-sm font-bold text-slate-900">DIGEMID</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">FECHA DE EMISIÓN</p>
                        <p className="text-sm font-bold text-slate-900">12 Oct 2025</p>
                      </div>
                    </div>

                    <div>
                       <p className="text-[10px] font-bold text-slate-400 uppercase mb-2">NIVEL DE RIESGO</p>
                       <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden mb-1">
                         <div className="h-full w-3/4 bg-red-600 rounded-full"></div>
                       </div>
                       <p className="text-xs font-bold text-red-600 text-right">Crítico (Alta severidad)</p>
                    </div>
                  </div>

                  {/* Right Sub-card */}
                  <div className="flex flex-col gap-6">
                    <div className="border border-slate-200 rounded-xl p-5 space-y-4">
                       <p className="text-[10px] font-bold text-slate-400 uppercase">MEDICAMENTO RELACIONADO</p>
                       <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                         <div>
                           <p className="text-xs text-slate-500 mb-0.5">Producto</p>
                           <p className="text-sm font-bold text-slate-900">{result.medicationName}</p>
                         </div>
                         <div className="text-right">
                           <p className="text-xs text-slate-500 mb-0.5">Lote afectado</p>
                           <span className="inline-block px-2 py-0.5 bg-slate-100 rounded text-sm font-mono font-bold text-slate-900">
                             {result.batchNumber}
                           </span>
                         </div>
                       </div>
                       
                       <div className="bg-red-50 rounded-lg p-3">
                         <p className="text-[10px] font-bold text-slate-500 uppercase mb-1">ACCIÓN SOBRE EL LOTE</p>
                         <div className="flex items-center gap-2">
                           <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold shadow-sm">
                             Retiro total del mercado
                           </span>
                         </div>
                       </div>
                    </div>

                    <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 flex-1">
                      <h4 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-4">
                        <Info size={16} className="text-blue-600" />
                        ¿QUÉ SIGNIFICA ESTO PARA TI?
                      </h4>
                      <ul className="space-y-3">
                        {result.recommendations.map((rec, i) => (
                          <li key={i} className="flex items-start gap-3 text-xs text-slate-600 leading-relaxed">
                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0"></div>
                            {rec}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (Sidebar) */}
            <div className="space-y-6">
              
              {/* WhatsApp Alert Card */}
              <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl p-6 text-white shadow-lg shadow-emerald-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                     <MessageCircle size={24} className="text-white" />
                  </div>
                </div>
                <h3 className="text-lg font-bold mb-2">Alertas a tu celular</h3>
                <p className="text-sm text-emerald-100 mb-6 leading-relaxed">
                  Suscríbete para recibir alertas sanitarias sobre este medicamento directamente en tu WhatsApp.
                </p>
                <button className="w-full py-3 bg-white text-emerald-700 font-bold rounded-xl flex items-center justify-center gap-2 text-sm hover:bg-emerald-50 transition-colors shadow-md">
                   <MessageCircle size={16} /> Recibir alertas por WhatsApp
                </button>
                <p className="text-[10px] text-emerald-200 text-center mt-3">Personaliza por medicamento, lote o distrito.</p>
              </div>

              {/* Boticas Seguras Card */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-1">
                  <h3 className="font-bold text-slate-900">Boticas Seguras</h3>
                  <span className="px-2 py-0.5 bg-purple-100 text-purple-700 text-[10px] font-bold rounded-full">Piloto Lima</span>
                </div>
                <p className="text-[10px] text-slate-400 mb-4 italic">Indicador agregado. No muestra datos sensibles.</p>
                
                <div className="mb-4">
                  <label className="block text-xs font-bold text-slate-500 mb-1.5">Distrito</label>
                  <div className="relative">
                    <select className="w-full p-2.5 bg-white border border-slate-200 rounded-lg text-sm font-medium appearance-none focus:ring-2 focus:ring-blue-100 outline-none">
                      <option>Los Olivos</option>
                      <option>San Martín de Porres</option>
                      <option>Comas</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-3 text-slate-400 pointer-events-none" />
                  </div>
                </div>

                <div className="relative h-32 bg-slate-100 rounded-xl mb-4 overflow-hidden border border-slate-100 group">
                   {/* Mock Map Pattern */}
                   <div className="absolute inset-0 opacity-30" style={{backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '10px 10px'}}></div>
                   <button className="absolute inset-0 m-auto w-max h-max px-4 py-2 bg-white shadow-md rounded-lg text-xs font-bold text-slate-700 flex items-center gap-2 hover:scale-105 transition-transform">
                     <Map size={14} /> Ver mapa interactivo
                   </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                    <div className="mt-1 w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-xs">I</div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Inkafarma - Av. Antúnez</p>
                      <p className="text-xs text-emerald-600 font-bold">Cumplimiento: Alto (98%)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer">
                    <div className="mt-1 w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-xs">B</div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">Botica Salud Total</p>
                      <p className="text-xs text-amber-600 font-bold">Cumplimiento: Medio (85%)</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Alerts */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold text-slate-900">Alertas Recientes</h3>
                  <a href="#" className="text-xs font-bold text-blue-600 hover:text-blue-700">Ver todo</a>
                </div>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="mt-1 w-1.5 h-full min-h-[40px] rounded-full bg-slate-100 relative">
                       <div className="absolute top-0 w-full h-1/2 bg-red-500 rounded-full"></div>
                    </div>
                    <div>
                       <div className="flex items-center gap-2 mb-0.5">
                         <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-100 text-red-600">ALTA</span>
                         <span className="text-[10px] text-slate-400">Hace un día</span>
                       </div>
                       <p className="text-sm font-bold text-slate-900">Retiro de Naproxeno 550mg</p>
                       <p className="text-xs text-slate-500">Fuente: DIGEMID • Lote C901</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="mt-1 w-1.5 h-full min-h-[40px] rounded-full bg-slate-100 relative">
                       <div className="absolute top-0 w-full h-1/2 bg-amber-500 rounded-full"></div>
                    </div>
                    <div>
                       <div className="flex items-center gap-2 mb-0.5">
                         <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-600">MEDIA</span>
                         <span className="text-[10px] text-slate-400">Ayer</span>
                       </div>
                       <p className="text-sm font-bold text-slate-900">Observación Amoxicilina</p>
                       <p className="text-xs text-slate-500">Fuente: DIGEMID • Lote F442</p>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <div className="mt-1 w-1.5 h-full min-h-[40px] rounded-full bg-slate-100 relative">
                       <div className="absolute top-0 w-full h-1/2 bg-blue-500 rounded-full"></div>
                    </div>
                    <div>
                       <div className="flex items-center gap-2 mb-0.5">
                         <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-100 text-blue-600">BAJA</span>
                         <span className="text-[10px] text-slate-400">2 oct</span>
                       </div>
                       <p className="text-sm font-bold text-slate-900">Actualización Normativa</p>
                       <p className="text-xs text-slate-500">Fuente: DIGEMID</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        ) : (
          hasSearched && !result && (
            <div className="text-center py-20 animate-in fade-in zoom-in duration-300">
               <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                 <Search size={40} className="text-slate-300" />
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-2">No encontramos resultados</h3>
               <p className="text-slate-500 max-w-sm mx-auto">
                 Intenta buscar con otro número de lote o nombre de medicamento.
               </p>
            </div>
          )
        )}
      </main>

      <footer className="max-w-7xl mx-auto px-4 py-6 border-t border-slate-200 mt-auto">
        <p className="text-center text-xs text-slate-400">
          © 2024 Consulta Lote Perú. Plataforma de prueba con fines demostrativos.
        </p>
      </footer>
    </div>
  );
};

export default CitizenView;
