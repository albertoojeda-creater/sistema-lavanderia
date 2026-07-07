import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api';
import PrivacyModal from '../components/PrivacyModal';
import { CheckCircle2, ShieldCheck, UserPlus, ArrowLeft } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        phone: ''
    });
    
    // Checkboxes de privacidad
    const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
    const [acceptedProtection, setAcceptedProtection] = useState(false);

    // Modal state
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(''); // 'privacidad' | 'proteccion'

    const openModal = (type, e) => {
        e.preventDefault();
        setModalType(type);
        setModalOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let finalValue = value;
        
        if (name === 'name') {
            if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/.test(value)) return;
        }
        if (name === 'phone') {
            finalValue = value.replace(/\D/g, '');
            if (finalValue.length > 10) return;
        }

        setFormData({ ...formData, [name]: finalValue });
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!acceptedPrivacy || !acceptedProtection) {
            setError('Debes leer y aceptar los documentos de privacidad para registrarte.');
            return;
        }

        if (formData.phone.length < 10) {
            setError('El teléfono debe tener 10 dígitos.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            await api.post('/customers', {
                name: formData.name,
                phone: formData.phone
            });
            
            setSuccess(true);
            setTimeout(() => {
                navigate('/tracking');
            }, 3000);
            
        } catch (err) {
            console.error(err);
            setError('Ocurrió un error al registrarte. Verifica si el teléfono ya está en uso.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50 font-display">
                <div className="bg-white p-10 rounded-[3rem] shadow-2xl text-center max-w-md animate-in zoom-in-95 duration-500">
                    <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center text-green-500 mx-auto mb-6">
                        <CheckCircle2 size={48} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight mb-2">¡Registro Exitoso!</h2>
                    <p className="text-slate-500 font-medium mb-8">Tu cuenta ha sido creada correctamente. Ahora puedes realizar y rastrear tus pedidos de lavandería.</p>
                    <p className="text-xs text-slate-400 uppercase tracking-widest font-black animate-pulse">Redirigiendo al portal...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen flex items-center justify-center px-6 py-12 overflow-hidden bg-slate-50 font-display">
            {/* Animación de fondo (burbujas) */}
            <style>{`
                @keyframes floatUp {
                    0% { transform: translateY(0vh) scale(0.5) rotate(0deg); opacity: 0; }
                    10% { opacity: 1; }
                    90% { opacity: 0.8; }
                    100% { transform: translateY(-120vh) scale(1.5) rotate(360deg); opacity: 0; }
                }
                .bubble {
                    position: absolute;
                    bottom: -10vh;
                    background: radial-gradient(circle at 30% 30%, rgba(27, 155, 154, 0.15), rgba(27, 155, 154, 0.02) 70%);
                    border: 1px solid rgba(27, 155, 154, 0.2);
                    border-radius: 50%;
                    animation: floatUp 15s infinite ease-in;
                    pointer-events: none;
                    backdrop-filter: blur(2px);
                }
            `}</style>
            
            <div className="absolute inset-0 -z-10 bg-slate-50 overflow-hidden">
                <div className="absolute -top-20 -left-20 w-[40rem] h-[40rem] bg-[#1B9B9A]/20 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute -bottom-20 -right-20 w-[35rem] h-[35rem] bg-[#94273E]/10 rounded-full blur-[100px]"></div>
                {[...Array(10)].map((_, i) => (
                    <div key={i} className="bubble" style={{
                        left: `${Math.random() * 100}%`,
                        width: `${Math.random() * 40 + 20}px`,
                        height: `${Math.random() * 40 + 20}px`,
                        animationDuration: `${Math.random() * 15 + 15}s`,
                        animationDelay: `-${Math.random() * 30}s`,
                    }}></div>
                ))}
            </div>

            <div className="w-full max-w-md bg-white/80 backdrop-blur-2xl p-8 sm:p-10 rounded-[3rem] border border-white shadow-[0_20px_60px_-15px_rgba(27,155,154,0.15)] animate-in slide-in-from-bottom-10 duration-700">
                <Link to="/tracking" className="inline-flex items-center text-xs font-black uppercase tracking-wider text-slate-400 hover:text-[#1B9B9A] transition-colors mb-8">
                    <ArrowLeft size={14} className="mr-2" />
                    Volver al Rastreo
                </Link>

                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-[#E8F8F8] text-[#1B9B9A] rounded-2xl shadow-inner mb-6">
                        <UserPlus size={32} strokeWidth={2.5} />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Crea tu cuenta</h2>
                    <p className="text-slate-500 font-medium text-sm mt-2">Registra tus datos para comenzar a usar nuestro servicio de lavandería.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 text-red-600 rounded-2xl text-sm font-bold text-center flex items-center justify-center gap-2">
                        <ShieldCheck size={18} />
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <input
                            required
                            type="text"
                            name="name"
                            className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-[#1B9B9A] font-bold text-slate-700 focus:ring-4 focus:ring-[#1B9B9A]/10 transition-all placeholder:text-slate-300 placeholder:font-semibold"
                            placeholder="Nombre completo"
                            value={formData.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <input
                            required
                            type="tel"
                            name="phone"
                            className="w-full px-6 py-4 bg-white border-2 border-slate-100 rounded-2xl outline-none focus:border-[#1B9B9A] font-bold text-slate-700 focus:ring-4 focus:ring-[#1B9B9A]/10 transition-all placeholder:text-slate-300 placeholder:font-semibold"
                            placeholder="Teléfono (10 dígitos)"
                            value={formData.phone}
                            onChange={handleChange}
                        />
                    </div>

                    {/* LFPDPPP Compliance Section */}
                    <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
                        <p className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4">Avisos Legales (Requerido)</p>
                        
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center mt-0.5">
                                <input 
                                    type="checkbox" 
                                    className="peer sr-only"
                                    checked={acceptedProtection}
                                    onChange={(e) => setAcceptedProtection(e.target.checked)}
                                />
                                <div className="w-5 h-5 border-2 border-slate-300 rounded-md peer-checked:bg-[#1B9B9A] peer-checked:border-[#1B9B9A] transition-all flex items-center justify-center">
                                    <CheckCircle2 size={14} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                                </div>
                            </div>
                            <span className="text-sm font-medium text-slate-600 leading-snug">
                                He leído y acepto el <a href="#" onClick={(e) => openModal('proteccion', e)} className="text-[#1B9B9A] font-bold hover:underline underline-offset-2">Documento de Protección de Datos Personales</a>.
                            </span>
                        </label>

                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center mt-0.5">
                                <input 
                                    type="checkbox" 
                                    className="peer sr-only"
                                    checked={acceptedPrivacy}
                                    onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                                />
                                <div className="w-5 h-5 border-2 border-slate-300 rounded-md peer-checked:bg-[#1B9B9A] peer-checked:border-[#1B9B9A] transition-all flex items-center justify-center">
                                    <CheckCircle2 size={14} className="text-white opacity-0 peer-checked:opacity-100 transition-opacity" />
                                </div>
                            </div>
                            <span className="text-sm font-medium text-slate-600 leading-snug">
                                He leído y acepto la <a href="#" onClick={(e) => openModal('privacidad', e)} className="text-[#1B9B9A] font-bold hover:underline underline-offset-2">Política de Privacidad</a> de la lavandería.
                            </span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full h-14 mt-6 flex items-center justify-center rounded-2xl font-black tracking-wider text-sm uppercase transition-all duration-300 shadow-xl
                            ${loading ? 'bg-[#1B9B9A] text-white opacity-80 cursor-wait' : 'bg-slate-900 text-white hover:bg-[#1B9B9A] hover:-translate-y-1 hover:shadow-[#1B9B9A]/30 active:scale-95'}`}
                    >
                        {loading ? 'Registrando...' : 'Completar Registro'}
                    </button>
                </form>
            </div>

            <PrivacyModal 
                isOpen={modalOpen} 
                onClose={() => setModalOpen(false)} 
                documentType={modalType} 
            />
        </div>
    );
};

export default Register;
