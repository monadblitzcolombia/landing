import Link from "next/link";

export const metadata = {
  title: "Política de Privacidad - Monad Tour Colombia",
};

export default function PrivacidadPage() {
  return (
    <div className="min-h-screen bg-monad-dark py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <Link
          href="/"
          className="inline-block text-sm text-white/50 hover:text-white font-mono mb-8 transition-colors"
        >
          &larr; Volver al inicio
        </Link>

        <h1 className="text-4xl font-bold text-white mb-2">Política de Privacidad</h1>
        <p className="text-white/50 text-sm font-mono mb-12">Última actualización: Mayo 2026</p>

        <div className="space-y-8 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Información que Recopilamos</h2>
            <p>
              Al registrarte o aplicar como mentor/jurado en los eventos MonadBlitz Hackathon,
              recopilamos la siguiente información:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Nombre completo</li>
              <li>Correo electrónico</li>
              <li>Número de teléfono (opcional)</li>
              <li>Perfiles de redes sociales: LinkedIn, Twitter/X, Instagram (opcionales)</li>
              <li>Ciudad de participación</li>
              <li>
                Información profesional relacionada con tu aplicación (habilidades, experiencia,
                bio)
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Uso de la Información</h2>
            <p>Utilizamos tu información personal para:</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Gestionar tu registro y participación en los eventos MonadBlitz</li>
              <li>Evaluar aplicaciones de mentores y jurados</li>
              <li>Comunicarnos contigo sobre el evento (logística, actualizaciones, resultados)</li>
              <li>Mejorar la organización de futuros eventos</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Compartir Información</h2>
            <p>
              No vendemos, alquilamos ni compartimos tu información personal con terceros con fines
              comerciales. Podemos compartir información con:
            </p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>
                Organizadores y patrocinadores del evento, solo lo necesario para la logística
              </li>
              <li>Proveedores de servicios que nos ayudan a operar el evento</li>
              <li>Autoridades cuando sea requerido por ley</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Almacenamiento y Seguridad</h2>
            <p>
              Tu información se almacena en servidores seguros. Implementamos medidas de seguridad
              técnicas y organizativas para proteger tus datos contra acceso no autorizado, pérdida
              o alteración.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Tus Derechos</h2>
            <p>Tienes derecho a:</p>
            <ul className="list-disc list-inside mt-3 space-y-1">
              <li>Acceder a tu información personal</li>
              <li>Solicitar la corrección de datos incorrectos</li>
              <li>Solicitar la eliminación de tus datos</li>
              <li>Retirar tu consentimiento en cualquier momento</li>
            </ul>
            <p className="mt-3">
              Para ejercer estos derechos, contacta al equipo organizador a través de nuestros
              canales oficiales.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Cookies</h2>
            <p>
              Este sitio puede utilizar cookies esenciales para su funcionamiento. No utilizamos
              cookies de seguimiento ni publicidad de terceros.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">
              7. Fotografía y Contenido del Evento
            </h2>
            <p>
              Durante los eventos MonadBlitz se pueden tomar fotografías y videos. Al asistir al
              evento, aceptas que tu imagen pueda aparecer en materiales promocionales y redes
              sociales del evento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Cambios a esta Política</h2>
            <p>
              Nos reservamos el derecho de actualizar esta política de privacidad. Los cambios serán
              publicados en esta página con la fecha de actualización correspondiente.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Contacto</h2>
            <p>
              Si tienes preguntas sobre esta política de privacidad, puedes contactarnos a través de
              nuestras redes sociales oficiales o en los canales de Discord de Monad.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
