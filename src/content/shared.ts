// Data that is the same in both languages: links, images, logos.
import entrevistas from '../assets/shots/entrevistas.png';
import resenas from '../assets/shots/resenas.png';
import bitacoraGlobo from '../assets/phone/bitacora-globo.jpg';
import bitacoraLugares from '../assets/phone/bitacora-lugares.jpg';
import bitacoraMapa from '../assets/phone/bitacora-mapa.jpg';
import bitacoraNuevoLugar from '../assets/phone/bitacora-nuevo-lugar.jpg';
import bitacoraStats from '../assets/phone/bitacora-stats.jpg';
import bitacoraLogin from '../assets/phone/bitacora-login.jpg';
import resenasBusqueda from '../assets/evidence/resenas-busqueda.jpg';
import resenasAppElegida from '../assets/evidence/resenas-app-elegida.jpg';
import entrevistasFeedback from '../assets/evidence/entrevistas-feedback.jpg';
import entrevistasSimulacion from '../assets/evidence/entrevistas-simulacion.png';
import resenasSheet from '../assets/evidence/resenas-sheet.png';
import agenteGoldenSet from '../assets/evidence/agente-golden-set.png';
import agenteJira from '../assets/evidence/agente-jira.png';
import agenteEvalRuns from '../assets/evidence/agente-eval-runs.png';
import informeN8n from '../assets/evidence/informe-n8n.png';
import informeMail from '../assets/evidence/informe-mail.png';
import agenteN8n from '../assets/evidence/agente-n8n.png';
import agenteMail from '../assets/evidence/agente-mail.png';

export const shots = { entrevistas, resenas };
export const evidence = {
  resenasBusqueda,
  resenasAppElegida,
  entrevistasFeedback,
  entrevistasSimulacion,
  informeN8n,
  informeMail,
  agenteN8n,
  agenteMail,
  resenasSheet,
  agenteGoldenSet,
  agenteJira,
  agenteEvalRuns,
};
export const phone = {
  globo: bitacoraGlobo,
  lugares: bitacoraLugares,
  mapa: bitacoraMapa,
  nuevoLugar: bitacoraNuevoLugar,
  stats: bitacoraStats,
  login: bitacoraLogin,
};

export const links = {
  bitacora: 'https://mentoriaittude-bitacoradeviajes.mepzhl.easypanel.host',
  entrevistas: 'https://mentoriaittude-entrevistas-pm.mepzhl.easypanel.host/',
  resenas: 'https://mentoriaittude-buscadordecalificaciones.mepzhl.easypanel.host/',
  linkedin: 'https://www.linkedin.com/in/germandarioveron/',
  email: 'germandarioveron@gmail.com',
  phone: '+49 179 1687531',
  cvEs: '/cv/CV-German-Veron-ES.pdf',
  cvEn: '/cv/CV-German-Veron-EN.pdf',
};

/**
 * Company logos for the moving banner (files in /public/logos). Without `file`,
 * the name is shown as a wordmark until the real logo is added.
 * `anchor` is the experience entry each logo scrolls to.
 */
export const logos: { name: string; file?: string; anchor: string; height?: number }[] = [
  { name: 'Personal Pay', file: '/logos/personal-pay.png', anchor: 'personal-pay', height: 50 },
  { name: 'Mercado Libre', file: '/logos/mercado-libre.png', anchor: 'mercado-libre', height: 62 },
  { name: 'Gire', file: '/logos/gire.png', anchor: 'gire', height: 44 },
  { name: 'Sullair', file: '/logos/sullair.svg', anchor: 'earlier', height: 34 },
  { name: 'Copicyn', file: '/logos/copicyn.png', anchor: 'earlier', height: 40 },
  { name: 'General Motors', file: '/logos/general-motors.svg', anchor: 'earlier', height: 48 },
];
