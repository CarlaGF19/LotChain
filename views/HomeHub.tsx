
import React, { useState } from 'react';
import { 
  ShieldCheck, Search, CheckCircle2, AlertTriangle, 
  Wallet, ChevronRight, LayoutDashboard, History,
  Database, Zap, Globe, Copy, Info, PersonStanding, Store, ShieldAlert,
  Menu, X
} from 'lucide-react';

interface Props {
  onSelectRole: (role: 'citizen' | 'pharmacy' | 'auditor') => void;
}

const HomeHub: React.FC<Props> = ({ onSelectRole }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20">
                <Database size={24} />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-extrabold tracking-tight leading-none">LotChain</span>
                <span className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mt-0.5">Perú</span>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-8 text-sm font-semibold text-slate-600">
              <a href="#" className="hover:text-primary transition-colors">Inicio</a>
              <a href="#como-funciona" className="hover:text-primary transition-colors">Cómo funciona</a>
              <a href="#beneficios" className="hover:text-primary transition-colors">Beneficios</a>
              <a href="#tecnologia" className="hover:text-primary transition-colors">Tecnología</a>
            </div>

            <div className="hidden lg:flex items-center gap-3">
              <button className="px-4 py-2 text-sm font-bold text-slate-500 hover:text-primary transition-colors">Docs API</button>
              <button className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 flex items-center gap-2 transition-all">
                <Wallet size={18} />
                Conectar Billetera
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-slate-600 hover:text-primary transition-colors"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-100 bg-white">
            <div className="px-6 py-4 space-y-4 flex flex-col">
              <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-slate-600 hover:text-primary py-2">Inicio</a>
              <a href="#como-funciona" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-slate-600 hover:text-primary py-2">Cómo funciona</a>
              <a href="#beneficios" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-slate-600 hover:text-primary py-2">Beneficios</a>
              <a href="#tecnologia" onClick={() => setIsMobileMenuOpen(false)} className="text-sm font-bold text-slate-600 hover:text-primary py-2">Tecnología</a>
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <button className="w-full text-left text-sm font-bold text-slate-500 hover:text-primary py-2">Docs API</button>
                <button className="w-full bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2 transition-all">
                  <Wallet size={18} />
                  Conectar Billetera
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden hero-bg-pattern">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-blue-100 text-primary text-[10px] font-black uppercase tracking-widest mb-10 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-green"></span>
            </span>
            Red Nacional Conectada • Stellar Testnet
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-slate-900 mb-8 leading-tight">
            LotChain
          </h1>
          
          <p className="text-xl text-slate-500 max-w-3xl mb-12 leading-relaxed font-medium">
            Portal oficial para la trazabilidad y alertas sanitarias por lote de medicamentos. <br/>
            Una alianza tecnológica entre <span className="font-bold text-slate-900">boticas, droguerías</span> y <span className="font-bold text-slate-900">ciudadanía</span>.
          </p>

          <div className="w-full max-w-4xl mb-16">
            <div className="bg-white/80 backdrop-blur rounded-3xl border border-blue-50 p-6 shadow-xl shadow-blue-500/5 flex flex-col md:flex-row items-center justify-around gap-8">
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Alertas Referenciales</p>
                  <p className="text-xs text-slate-400 font-medium">Fuente oficial: DIGEMID</p>
                </div>
              </div>
              <div className="hidden md:block h-10 w-px bg-slate-100"></div>
              <div className="flex items-center gap-4 text-left">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-accent-green flex items-center justify-center">
                  <Database size={24} />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Evidencias Verificables</p>
                  <p className="text-xs text-slate-400 font-medium">Ledger: Stellar (Demo)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Access Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 text-left hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all">
                <Search size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Ciudadanos</h3>
              <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                Verifica la seguridad de tus medicamentos y consulta alertas vigentes.
              </p>
              <button 
                onClick={() => onSelectRole('citizen')}
                className="w-full py-3.5 rounded-2xl bg-primary text-white font-bold text-sm shadow-lg shadow-primary/30 flex items-center justify-center gap-2 hover:bg-primary-dark transition-all"
              >
                Acceder <ChevronRight size={18} />
              </button>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 text-left hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-accent-green flex items-center justify-center mb-6 group-hover:bg-accent-green group-hover:text-white transition-all">
                <Store size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Boticas</h3>
              <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                Gestiona inventario, reporta incidentes y mantén el cumplimiento.
              </p>
              <button 
                onClick={() => onSelectRole('pharmacy')}
                className="w-full py-3.5 rounded-2xl bg-slate-50 text-slate-900 font-bold text-sm border border-slate-100 flex items-center justify-center gap-2 hover:bg-white hover:shadow-lg transition-all"
              >
                Ingreso Boticas <LayoutDashboard size={18} />
              </button>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/50 text-left hover:-translate-y-1 transition-all group">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-600 flex items-center justify-center mb-6 group-hover:bg-slate-900 group-hover:text-white transition-all">
                <ShieldAlert size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Auditoría</h3>
              <p className="text-sm text-slate-400 mb-8 leading-relaxed">
                Monitoreo en tiempo real del ledger público y emisión de alertas masivas.
              </p>
              <button 
                onClick={() => onSelectRole('auditor')}
                className="w-full py-3.5 rounded-2xl bg-slate-50 text-slate-900 font-bold text-sm border border-slate-100 flex items-center justify-center gap-2 hover:bg-white hover:shadow-lg transition-all"
              >
                Panel Auditor <History size={18} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="como-funciona" className="py-24 bg-white border-t border-slate-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <span className="text-primary font-bold text-xs uppercase tracking-[0.2em] mb-4 block">Flujo de Trazabilidad</span>
          <h2 className="text-4xl font-black text-slate-900 mb-16">¿Cómo funciona LotChain?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-[2px] bg-gradient-to-r from-transparent via-blue-100 to-transparent"></div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-3xl bg-white border-2 border-slate-100 shadow-xl flex items-center justify-center text-primary mb-8 hover:scale-110 transition-transform">
                <Search size={40} />
              </div>
              <h3 className="text-xl font-bold mb-4">1. Búsqueda</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-[200px]">
                Ingreso del <span className="font-bold text-slate-900">número de lote</span> en el buscador público por parte de usuarios o boticas.
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-3xl bg-white border-2 border-slate-100 shadow-xl flex items-center justify-center text-accent-green mb-8 hover:scale-110 transition-transform">
                <CheckCircle2 size={40} />
              </div>
              <h3 className="text-xl font-bold mb-4">2. Verificación</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-[200px]">
                El sistema consulta la blockchain de Stellar para validar origen y estado sanitario en milisegundos.
              </p>
            </div>

            <div className="relative z-10 flex flex-col items-center">
              <div className="w-24 h-24 rounded-3xl bg-white border-2 border-slate-100 shadow-xl flex items-center justify-center text-accent-amber mb-8 hover:scale-110 transition-transform">
                <AlertTriangle size={40} />
              </div>
              <h3 className="text-xl font-bold mb-4">3. Acción</h3>
              <p className="text-slate-400 text-sm leading-relaxed max-w-[200px]">
                Notificación inmediata de alertas críticas (rojo) o advertencias (ámbar) para evitar el consumo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology - Why Stellar */}
      <section id="tecnologia" className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-12">
              <div>
                <span className="text-primary font-bold text-xs uppercase tracking-widest mb-4 block">Infraestructura</span>
                <h2 className="text-4xl font-black text-slate-900 mb-6">¿Por qué Stellar?</h2>
                <p className="text-slate-500 text-lg leading-relaxed">
                  La red blockchain elegida por su eficiencia, bajo coste y enfoque nativo en activos del mundo real.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: <ShieldCheck />, title: "Inmutabilidad Verificable", desc: "Cada lote registrado crea una huella digital única e inalterable en el ledger público." },
                  { icon: <Zap />, title: "Velocidad y Costo", desc: "Transacciones confirmadas en <5 segundos con costos fraccionarios ideales para trazabilidad masiva." },
                  { icon: <Globe />, title: "Transparencia Pública", desc: "Acceso democratizado a la información sanitaria sin intermediarios burocráticos." }
                ].map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-3xl border border-slate-200 flex items-start gap-6 hover:shadow-lg transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 text-primary flex items-center justify-center shrink-0">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-slate-500 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="bg-[#091e42] p-8 rounded-[40px] shadow-2xl border border-white/10 text-white relative z-10">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="font-bold flex items-center gap-2">
                    <Database size={20} className="text-primary" />
                    Integración Stellar
                  </h3>
                  <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-black tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    ONLINE
                  </div>
                </div>

                <div className="space-y-4 mb-10 font-mono">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] text-slate-400 uppercase mb-2">Network Status</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-bold">Stellar Testnet (Horizon)</p>
                      <Globe size={16} className="text-emerald-400" />
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-[10px] text-slate-400 uppercase mb-2">Soroban Contract ID</p>
                    <div className="flex justify-between items-center">
                      <p className="text-sm font-bold truncate">CCWZ...7L3P</p>
                      <Copy size={16} className="text-slate-500" />
                    </div>
                  </div>
                </div>

                <button className="w-full py-4 rounded-2xl bg-primary hover:bg-primary-dark font-bold text-sm shadow-xl shadow-primary/20 flex items-center justify-center gap-3 transition-all">
                  <Wallet size={18} />
                  Conectar Freighter (Demo)
                </button>
                <p className="text-center text-[10px] text-slate-500 mt-6 uppercase tracking-[0.2em]">Entorno de simulación Web3</p>
              </div>
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px]"></div>
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-[80px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Beneficios por Perfil</h2>
            <p className="text-slate-500 text-lg">Soluciones adaptadas a cada actor del ecosistema de salud.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                title: "Ciudadanía", 
                icon: <PersonStanding size={48} />,
                color: "bg-blue-500",
                benefits: ["Seguridad garantizada contra falsificaciones.", "Alertas instantáneas en dispositivos móviles."]
              },
              { 
                title: "Boticas y Farmacias", 
                icon: <Store size={48} />,
                color: "bg-emerald-500",
                benefits: ["Gestión automatizada de retiros de mercado.", "Cumplimiento normativo ágil con DIGEMID."]
              },
              { 
                title: "Autoridades", 
                icon: <ShieldCheck size={48} />,
                color: "bg-slate-800",
                benefits: ["Trazabilidad completa de la cadena.", "Emisión de alertas masivas en segundos."]
              }
            ].map((card, idx) => (
              <div key={idx} className="bg-slate-50 rounded-[32px] overflow-hidden border border-slate-100 group">
                <div className={`h-56 relative overflow-hidden ${card.color} flex items-center justify-center`}>
                  <div className="text-white/80 group-hover:scale-110 transition-transform duration-700">
                    {card.icon}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  <h3 className="absolute bottom-6 left-6 text-2xl font-black text-white">{card.title}</h3>
                </div>
                <div className="p-8 space-y-4">
                  {card.benefits.map((b, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 text-accent-green flex items-center justify-center shrink-0">
                        <CheckCircle2 size={12} />
                      </div>
                      <p className="text-sm text-slate-600 font-medium leading-relaxed">{b}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-100 pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div className="col-span-1 md:col-span-2 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white">
                  <Database size={18} />
                </div>
                <span className="text-2xl font-black text-slate-900">LotChain</span>
              </div>
              <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
                Infraestructura digital para la seguridad farmacéutica en el Perú. Tecnología blockchain aplicada para proteger la salud pública mediante transparencia radical.
              </p>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors cursor-pointer">
                  <Globe size={18} />
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:text-primary transition-colors cursor-pointer">
                  <Info size={18} />
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Plataforma</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-600">
                <li><a href="#" className="hover:text-primary transition-colors">Buscador de Lotes</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Panel de Boticas</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Dashboard de Alertas</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Explorador Stellar</a></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Legal & Perú</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-600">
                <li><a href="#" className="hover:text-primary transition-colors">Términos de Uso</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Política de Privacidad</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Normativa DIGEMID</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Libro de Reclamaciones</a></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-slate-100">
            <p className="text-xs text-slate-300 font-medium">© 2023 LotChain Perú. Todos los derechos reservados.</p>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 bg-slate-50 px-3 py-1.5 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Sistemas Operativos
              </div>
              <span className="text-[10px] font-bold text-slate-200">v.1.0.4-beta</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomeHub;
