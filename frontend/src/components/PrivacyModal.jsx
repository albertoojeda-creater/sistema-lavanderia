import { X } from 'lucide-react';

const PrivacyModal = ({ isOpen, onClose, documentType }) => {
    if (!isOpen) return null;

    const renderContent = () => {
        if (documentType === 'privacidad') {
            return (
                <div className="space-y-4 text-sm text-slate-600">
                    <h3 className="text-lg font-black text-slate-900">1. Responsable de la Protección de sus Datos Personales</h3>
                    <p>El "Sistema de Lavandería" es el responsable del tratamiento de sus datos personales, con el fin de proteger su información y garantizar sus derechos.</p>
                    
                    <h3 className="text-lg font-black text-slate-900 mt-4">2. Fines de la Información Recabada</h3>
                    <p>Los datos personales que recopilamos (Nombre y Número de Teléfono) son utilizados estrictamente para:
                        <ul className="list-disc pl-5 mt-2 space-y-1">
                            <li>La identificación del cliente y la asociación con sus pedidos de lavandería.</li>
                            <li>Permitir la consulta del estado de los servicios a través del portal de rastreo web.</li>
                            <li>Contactar al cliente en caso de incidencias.</li>
                        </ul>
                    </p>

                    <h3 className="text-lg font-black text-slate-900 mt-4">3. Minimización de Datos</h3>
                    <p>Solo recopilamos los datos estrictamente necesarios para la prestación del servicio. No recopilamos datos personales sensibles como origen étnico, estado de salud o información financiera.</p>

                    <h3 className="text-lg font-black text-slate-900 mt-4">4. No Transferencia a Terceros</h3>
                    <p>Le informamos que sus datos personales <strong>no serán compartidos ni transferidos</strong> a terceros, empresas de marketing o entidades ajenas al servicio de la lavandería, salvo cuando exista una orden judicial.</p>
                    
                    <h3 className="text-lg font-black text-slate-900 mt-4">5. Medidas de Seguridad</h3>
                    <p>Implementamos diversas medidas de seguridad tecnológicas y físicas para evitar accesos no autorizados, como cifrado en la transmisión de datos y protección contra vulnerabilidades web.</p>
                </div>
            );
        }

        if (documentType === 'proteccion') {
            return (
                <div className="space-y-4 text-sm text-slate-600">
                    <h3 className="text-lg font-black text-slate-900">1. Cumplimiento Normativo (LFPDPPP)</h3>
                    <p>Garantizamos que la recolección, uso y almacenamiento de sus datos personales se realiza bajo los principios de licitud, consentimiento, información, calidad, finalidad, lealtad, proporcionalidad y responsabilidad que marca la ley mexicana.</p>
                    
                    <h3 className="text-lg font-black text-slate-900 mt-4">2. Derechos ARCO</h3>
                    <p>Usted como titular de los datos personales cuenta con el derecho pleno de ejercer sus Derechos ARCO:</p>
                    <ul className="list-disc pl-5 space-y-2">
                        <li><strong>Acceso:</strong> Conocer qué datos personales tenemos y las condiciones del uso que les damos.</li>
                        <li><strong>Rectificación:</strong> Solicitar la corrección de su información personal.</li>
                        <li><strong>Cancelación:</strong> Solicitar que eliminemos su información de nuestros registros.</li>
                        <li><strong>Oposición:</strong> Oponerse al uso de sus datos personales para fines específicos.</li>
                    </ul>

                    <h3 className="text-lg font-black text-slate-900 mt-4">3. Retención y Depuración de Datos</h3>
                    <p>Sus datos personales serán retenidos en el sistema únicamente por el tiempo necesario para cumplir con la finalidad operativa (rastreo e histórico de pedidos). Periódicamente, el sistema realizará depuraciones seguras para eliminar información inactiva u obsoleta.</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
            
            <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
                    <h2 className="text-xl font-black text-[#1B9B9A] uppercase tracking-tight">
                        {documentType === 'privacidad' ? 'Política de Privacidad' : 'Protección de Datos Personales'}
                    </h2>
                    <button 
                        onClick={onClose}
                        className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>
                
                <div className="p-6 overflow-y-auto">
                    {renderContent()}
                </div>
                
                <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
                    <button 
                        onClick={onClose}
                        className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-wider text-sm hover:bg-[#1B9B9A] transition-all shadow-lg active:scale-95"
                    >
                        Entendido, cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PrivacyModal;
