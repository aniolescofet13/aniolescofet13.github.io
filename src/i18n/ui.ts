// Every piece of interface text, in the three languages the site speaks.
// English is the reference: the other two must have the same keys, which the
// type below enforces at build time. Project write-ups are not here; they live
// next to each project as <slug>.ca.mdx and <slug>.es.mdx.

export const LOCALES = ['en', 'ca', 'es'] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_NAMES: Record<Locale, string> = { en: 'English', ca: 'Català', es: 'Español' };

/** The same page in another language: "/" -> "/ca/", "/projects/x/" -> "/es/projects/x/". */
export function localePath(lang: Locale, path = '/'): string {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return lang === DEFAULT_LOCALE ? clean : `/${lang}${clean}`;
}

const en = {
  meta: {
    title: 'Aniol Escofet — Industrial Engineer',
    description: 'Automotive engineer working on vehicle dynamics, control systems and performance simulation.',
  },
  nav: {
    about: 'About', experience: 'Experience', projects: 'Projects', skills: 'Skills', contact: 'Contact',
    menu: 'Menu', language: 'Language',
    toDark: 'Switch to dark mode', toLight: 'Switch to light mode',
  },
  hero: {
    eyebrow: 'Industrial Engineer · Vehicle Dynamics · Control Systems',
    titleA: 'I design systems', titleB: 'that make vehicles', titleEm: 'faster',
    desc: 'Automotive engineer specializing in vehicle dynamics, control systems, and performance simulation. From Formula Student to professional motorsport, I build the algorithms that push machines to their limits.',
    stats: ['Years in Motorsport', 'Companies', "Master's Degrees", 'Laps Simulated'],
  },
  about: {
    title: 'About Me',
    paragraphs: [
      'Growing up in Catalonia, I was the kind of kid who genuinely could not sit still. Every tree was something to climb, every rooftop a challenge worth taking. Sports were a constant — anything physical, anything with a bit of edge. That energy never really went away. It just found better places to go.',
      'But alongside all of that, there was always a pull towards physics, maths and understanding how things work. Not as a school obligation, but as genuine curiosity. When I figured out that engineering was where those two worlds collide, and that motorsport was where engineering gets pushed to its absolute limit, the direction became clear.',
      'Today I am doing <strong>two Master\'s degrees at the same time</strong>, one at UPC Barcelona, one at Politecnico di Milano, while working at STARK Future on electric motorcycle simulation and powertrain development. Outside of that I train in some form every day: gym, running, padel, climbing, hiking. I travel whenever I can. And I keep personal engineering projects running on the side because building things out of pure curiosity is one of the best ways I know to stay sharp.',
      'What I am after is a motorsport or prototype project that genuinely puts me to the test. Something fast-paced, technically demanding, where the engineering work shows up directly in the results. The goal is not a title on a business card. It is the kind of project where you feel the weight of every decision you make.',
    ],
    interests: ['Motorsport', 'Travel', 'Climbing', 'Running', 'Padel', 'Hiking', 'Gym', 'Personal Projects', 'Photography'],
  },
  experience: {
    title: 'Experience',
    jobs: [
      {
        dates: 'Jan 2025 — Present', role: 'Junior Power Electronics R&D', company: 'STARK Future S.L. · Sant Boi de Llobregat',
        desc: 'Built and validated a full-vehicle 1D simulation tool (the "System Tool") covering battery, inverter, motor, gearbox, chassis and environment. This became the core engineering tool used to dimension and evaluate motorcycles across MX, Supermoto and street platforms. Performed system-level trade-off analysis on battery capacity, torque, gearing, and power output to maximize performance. Also contributed to traction control algorithm development for racing applications.',
        tags: ['MATLAB', 'Simulink', '1D Simulation', 'Traction Control', 'Powertrain'],
      },
      {
        dates: 'Sep 2023 — Dec 2024', role: 'Software & Electronic Engineer Intern', company: 'CUPRA Racing · Martorell',
        desc: 'Developed control systems and vehicle dynamics algorithms using MATLAB/Simulink. Built vehicle dynamics models for offline simulation and correlated them against measured track data. Worked extensively on the CUPRA Exponential Experience, programming and setting up software for CUPRA Leon TCR race cars. Created the control software for a prototype combining a CUPRA Born RWD platform with a Tavascan front motor to create an AWD concept. Supported race operations, optimized CAN/GPS/IMU communication systems, and led vehicle-level testing for performance and durability.',
        tags: ['MATLAB', 'Simulink', 'CAN Bus', 'Offline Simulation', 'WinTax', 'Vehicle Dynamics', 'Race Support'],
      },
      {
        dates: 'Sep 2021 — Sep 2024', role: 'Vehicle Controls Engineer', company: 'BCNeMotorsport (Formula Student) · UPC Barcelona',
        desc: 'Designed and implemented control systems for a 4WD electric Formula Student single-seater (CAT15x, CAT16x). Developed Torque Vectoring, Traction Control, and Regenerative Braking algorithms. Built dynamic and kinematic vehicle models for simulation using VI-Grade and IPG. Led test planning, execution and data analysis, serving as a bridge between driver feedback and engineering optimization. Managed test sessions, validated systems on track, and analyzed telemetry to improve performance. Won 1st place EV Class at Formula Student Spain 2023.',
        tags: ['Torque Vectoring', 'Traction Control', 'Regen Braking', 'VI-Grade', 'IPG', 'ROS', 'C++', 'Python'],
      },
    ],
  },
  projects: {
    title: 'Projects', all: 'All', tablist: 'Project categories',
    tabs: { personal: 'Personal', fs: 'Formula Student', pro: 'Professional', uni: 'University' },
    titles: { personal: 'Personal Projects', fs: 'Formula Student — BCNeMotorsport', pro: 'Professional Projects', uni: 'University Projects' },
    code: (title: string) => `Source code for ${title} on GitHub`,
    codeShort: 'Source code on GitHub',
    fallback: 'This project is written in English.',
  },
  skills: {
    title: 'Technical Skills',
    blocks: [
      { h: 'Languages', items: ['MATLAB', 'Python', 'C++', 'Simulink'] },
      { h: 'Simulation', items: ['VI-Grade', 'IPG CarMaker', 'Ecotrons', 'Simulink'] },
      { h: 'Tools', items: ['WinTax', 'GEMS Data Analysis', 'Git', 'SolidWorks', 'Excel'] },
      { h: 'Domains', items: ['Vehicle Dynamics', 'Control Systems', 'Powertrain Simulation', 'Data Acquisition', 'Race Engineering'] },
    ],
  },
  contact: {
    title: 'Contact', taglineA: "Let's build something", taglineEm: 'fast',
    sub: "Whether it's about an opportunity in motorsport engineering, a collaboration, or just talking about vehicles, I'd love to hear from you.",
    email: 'Email me', cv: 'Download CV',
  },
  footer: '© 2026 Aniol Escofet. Built with precision.',
  pdf: { download: '↓ Download PDF', read: 'Read the report here', hint: 'Opens in the page · or download it above', doc: 'Document' },
  slider: { prev: 'Previous', next: 'Next', video: 'YouTube video' },
  lightbox: { close: 'Close', prev: 'Previous image', next: 'Next image', alt: 'Enlarged photo' },
};

type Dict = typeof en;

const ca: Dict = {
  meta: {
    title: 'Aniol Escofet · Enginyer Industrial',
    description: 'Enginyer d\'automoció especialitzat en dinàmica vehicular, sistemes de control i simulació de prestacions.',
  },
  nav: {
    about: 'Sobre mi', experience: 'Experiència', projects: 'Projectes', skills: 'Competències', contact: 'Contacte',
    menu: 'Menú', language: 'Idioma',
    toDark: 'Canvia al mode fosc', toLight: 'Canvia al mode clar',
  },
  hero: {
    eyebrow: 'Enginyer Industrial · Dinàmica Vehicular · Sistemes de Control',
    titleA: 'Dissenyo sistemes', titleB: 'que fan els vehicles', titleEm: 'més ràpids',
    desc: 'Enginyer d\'automoció especialitzat en dinàmica vehicular, sistemes de control i simulació de prestacions. Des de la Formula Student fins al motorsport professional, construeixo els algoritmes que porten les màquines al límit.',
    stats: ['Anys en motorsport', 'Empreses', 'Màsters', 'Voltes simulades'],
  },
  about: {
    title: 'Sobre mi',
    paragraphs: [
      'Vaig créixer a Catalunya i era el típic nen que no podia estar quiet. Cada arbre era per enfilar-s\'hi, cada teulada un repte que valia la pena. L\'esport hi era sempre: qualsevol cosa física, qualsevol cosa amb una mica d\'emoció. Aquella energia no se\'n va anar mai. Simplement va trobar millors llocs on anar.',
      'Però al costat de tot això sempre hi havia una atracció per la física, les matemàtiques i entendre com funcionen les coses. No com una obligació de l\'escola, sinó per pura curiositat. Quan vaig entendre que l\'enginyeria era on es troben aquests dos mons, i que el motorsport era on l\'enginyeria arriba al seu límit absolut, el camí va quedar clar.',
      'Avui estic fent <strong>dos màsters alhora</strong>, un a la UPC Barcelona i un al Politecnico di Milano, mentre treballo a STARK Future en simulació de motos elèctriques i desenvolupament del grup motopropulsor. A part d\'això, entreno cada dia d\'alguna manera: gimnàs, córrer, pàdel, escalada, muntanya. Viatjo sempre que puc. I mantinc projectes d\'enginyeria personals en paral·lel, perquè construir coses per pura curiositat és una de les millors maneres que conec de mantenir-me en forma.',
      'El que busco és un projecte de motorsport o de prototip que em posi a prova de veritat. Alguna cosa ràpida, tècnicament exigent, on la feina d\'enginyeria es vegi directament en els resultats. L\'objectiu no és un càrrec en una targeta. És el tipus de projecte on sents el pes de cada decisió que prens.',
    ],
    interests: ['Motorsport', 'Viatjar', 'Escalada', 'Córrer', 'Pàdel', 'Muntanya', 'Gimnàs', 'Projectes personals', 'Fotografia'],
  },
  experience: {
    title: 'Experiència',
    jobs: [
      {
        dates: 'Gen. 2025 – Actualitat', role: 'Junior Power Electronics R&D', company: 'STARK Future S.L. · Sant Boi de Llobregat',
        desc: 'He construït i validat una eina de simulació 1D de vehicle complet (el "System Tool") que cobreix bateria, inversor, motor, caixa de canvis, xassís i entorn. S\'ha convertit en l\'eina d\'enginyeria principal per dimensionar i avaluar motos de les plataformes MX, Supermoto i carretera. He fet anàlisis de compromís a nivell de sistema sobre capacitat de bateria, parell, relacions de transmissió i potència per maximitzar les prestacions. També he contribuït al desenvolupament d\'algoritmes de control de tracció per a competició.',
        tags: ['MATLAB', 'Simulink', 'Simulació 1D', 'Control de tracció', 'Grup motopropulsor'],
      },
      {
        dates: 'Set. 2023 – Des. 2024', role: 'Software & Electronic Engineer Intern', company: 'CUPRA Racing · Martorell',
        desc: 'Vaig desenvolupar sistemes de control i algoritmes de dinàmica vehicular amb MATLAB/Simulink. Vaig construir models de dinàmica vehicular per a simulació offline i els vaig correlacionar amb dades mesurades a pista. Vaig treballar a fons en la CUPRA Exponential Experience, programant i configurant el software dels cotxes de competició CUPRA Leon TCR. Vaig crear el software de control d\'un prototip que combinava una plataforma CUPRA Born de tracció posterior amb un motor davanter de Tavascan per obtenir un concepte de tracció integral. Vaig donar suport a les operacions de cursa, optimitzar els sistemes de comunicació CAN/GPS/IMU i liderar proves a nivell de vehicle de prestacions i durabilitat.',
        tags: ['MATLAB', 'Simulink', 'CAN Bus', 'Simulació offline', 'WinTax', 'Dinàmica vehicular', 'Suport a cursa'],
      },
      {
        dates: 'Set. 2021 – Set. 2024', role: 'Vehicle Controls Engineer', company: 'BCNeMotorsport (Formula Student) · UPC Barcelona',
        desc: 'Vaig dissenyar i implementar els sistemes de control d\'un monoplaça elèctric de Formula Student amb tracció 4x4 (CAT15x, CAT16x). Vaig desenvolupar els algoritmes de torque vectoring, control de tracció i frenada regenerativa. Vaig construir models dinàmics i cinemàtics del vehicle per a simulació amb VI-Grade i IPG. Vaig liderar la planificació, l\'execució i l\'anàlisi de dades de les proves, fent de pont entre les sensacions del pilot i l\'optimització d\'enginyeria. Vaig gestionar sessions de proves, validar sistemes a pista i analitzar telemetria per millorar les prestacions. 1r lloc a la classe EV de la Formula Student Spain 2023.',
        tags: ['Torque vectoring', 'Control de tracció', 'Frenada regenerativa', 'VI-Grade', 'IPG', 'ROS', 'C++', 'Python'],
      },
    ],
  },
  projects: {
    title: 'Projectes', all: 'Tots', tablist: 'Categories de projectes',
    tabs: { personal: 'Personals', fs: 'Formula Student', pro: 'Professionals', uni: 'Universitat' },
    titles: { personal: 'Projectes personals', fs: 'Formula Student · BCNeMotorsport', pro: 'Projectes professionals', uni: 'Projectes universitaris' },
    code: (title: string) => `Codi font de ${title} a GitHub`,
    codeShort: 'Codi font a GitHub',
    fallback: 'Aquest projecte només està escrit en anglès.',
  },
  skills: {
    title: 'Competències tècniques',
    blocks: [
      { h: 'Llenguatges', items: ['MATLAB', 'Python', 'C++', 'Simulink'] },
      { h: 'Simulació', items: ['VI-Grade', 'IPG CarMaker', 'Ecotrons', 'Simulink'] },
      { h: 'Eines', items: ['WinTax', 'GEMS Data Analysis', 'Git', 'SolidWorks', 'Excel'] },
      { h: 'Àmbits', items: ['Dinàmica vehicular', 'Sistemes de control', 'Simulació del grup motopropulsor', 'Adquisició de dades', 'Enginyeria de pista'] },
    ],
  },
  contact: {
    title: 'Contacte', taglineA: 'Construïm alguna cosa', taglineEm: 'ràpida',
    sub: 'Tant si és per una oportunitat en enginyeria de motorsport, una col·laboració o simplement per parlar de vehicles, m\'encantarà saber-ne de tu.',
    email: 'Escriu-me', cv: 'Descarrega el CV',
  },
  footer: '© 2026 Aniol Escofet. Fet amb precisió.',
  pdf: { download: '↓ Descarrega el PDF', read: 'Llegeix l\'informe aquí', hint: 'S\'obre a la pàgina · o descarrega\'l a dalt', doc: 'Document' },
  slider: { prev: 'Anterior', next: 'Següent', video: 'Vídeo de YouTube' },
  lightbox: { close: 'Tanca', prev: 'Imatge anterior', next: 'Imatge següent', alt: 'Foto ampliada' },
};

const es: Dict = {
  meta: {
    title: 'Aniol Escofet · Ingeniero Industrial',
    description: 'Ingeniero de automoción especializado en dinámica vehicular, sistemas de control y simulación de prestaciones.',
  },
  nav: {
    about: 'Sobre mí', experience: 'Experiencia', projects: 'Proyectos', skills: 'Competencias', contact: 'Contacto',
    menu: 'Menú', language: 'Idioma',
    toDark: 'Cambiar a modo oscuro', toLight: 'Cambiar a modo claro',
  },
  hero: {
    eyebrow: 'Ingeniero Industrial · Dinámica Vehicular · Sistemas de Control',
    titleA: 'Diseño sistemas', titleB: 'que hacen los vehículos', titleEm: 'más rápidos',
    desc: 'Ingeniero de automoción especializado en dinámica vehicular, sistemas de control y simulación de prestaciones. Desde la Formula Student hasta el motorsport profesional, construyo los algoritmos que llevan las máquinas al límite.',
    stats: ['Años en motorsport', 'Empresas', 'Másteres', 'Vueltas simuladas'],
  },
  about: {
    title: 'Sobre mí',
    paragraphs: [
      'Crecí en Cataluña y era el típico niño que no podía estarse quieto. Cada árbol era para trepar, cada tejado un reto que valía la pena. El deporte estaba siempre: cualquier cosa física, cualquier cosa con un poco de emoción. Esa energía nunca se fue. Simplemente encontró mejores sitios a los que ir.',
      'Pero junto a todo eso siempre hubo una atracción por la física, las matemáticas y entender cómo funcionan las cosas. No como una obligación del colegio, sino por pura curiosidad. Cuando entendí que la ingeniería era donde se encuentran esos dos mundos, y que el motorsport era donde la ingeniería llega a su límite absoluto, el camino quedó claro.',
      'Hoy estoy haciendo <strong>dos másteres a la vez</strong>, uno en la UPC Barcelona y otro en el Politecnico di Milano, mientras trabajo en STARK Future en simulación de motos eléctricas y desarrollo del grupo motopropulsor. Aparte de eso, entreno cada día de alguna forma: gimnasio, correr, pádel, escalada, montaña. Viajo siempre que puedo. Y mantengo proyectos de ingeniería personales en paralelo, porque construir cosas por pura curiosidad es una de las mejores formas que conozco de mantenerme en forma.',
      'Lo que busco es un proyecto de motorsport o de prototipo que me ponga a prueba de verdad. Algo rápido, técnicamente exigente, donde el trabajo de ingeniería se vea directamente en los resultados. El objetivo no es un cargo en una tarjeta. Es el tipo de proyecto donde sientes el peso de cada decisión que tomas.',
    ],
    interests: ['Motorsport', 'Viajar', 'Escalada', 'Correr', 'Pádel', 'Montaña', 'Gimnasio', 'Proyectos personales', 'Fotografía'],
  },
  experience: {
    title: 'Experiencia',
    jobs: [
      {
        dates: 'Ene. 2025 – Actualidad', role: 'Junior Power Electronics R&D', company: 'STARK Future S.L. · Sant Boi de Llobregat',
        desc: 'He construido y validado una herramienta de simulación 1D de vehículo completo (el "System Tool") que cubre batería, inversor, motor, caja de cambios, chasis y entorno. Se ha convertido en la herramienta de ingeniería principal para dimensionar y evaluar motos de las plataformas MX, Supermoto y calle. He realizado análisis de compromiso a nivel de sistema sobre capacidad de batería, par, relaciones de transmisión y potencia para maximizar las prestaciones. También he contribuido al desarrollo de algoritmos de control de tracción para competición.',
        tags: ['MATLAB', 'Simulink', 'Simulación 1D', 'Control de tracción', 'Grupo motopropulsor'],
      },
      {
        dates: 'Sep. 2023 – Dic. 2024', role: 'Software & Electronic Engineer Intern', company: 'CUPRA Racing · Martorell',
        desc: 'Desarrollé sistemas de control y algoritmos de dinámica vehicular con MATLAB/Simulink. Construí modelos de dinámica vehicular para simulación offline y los correlacioné con datos medidos en pista. Trabajé a fondo en la CUPRA Exponential Experience, programando y configurando el software de los coches de competición CUPRA Leon TCR. Creé el software de control de un prototipo que combinaba una plataforma CUPRA Born de propulsión trasera con un motor delantero de Tavascan para obtener un concepto de tracción total. Di soporte a las operaciones de carrera, optimicé los sistemas de comunicación CAN/GPS/IMU y lideré pruebas a nivel de vehículo de prestaciones y durabilidad.',
        tags: ['MATLAB', 'Simulink', 'CAN Bus', 'Simulación offline', 'WinTax', 'Dinámica vehicular', 'Soporte en carrera'],
      },
      {
        dates: 'Sep. 2021 – Sep. 2024', role: 'Vehicle Controls Engineer', company: 'BCNeMotorsport (Formula Student) · UPC Barcelona',
        desc: 'Diseñé e implementé los sistemas de control de un monoplaza eléctrico de Formula Student con tracción 4x4 (CAT15x, CAT16x). Desarrollé los algoritmos de torque vectoring, control de tracción y frenado regenerativo. Construí modelos dinámicos y cinemáticos del vehículo para simulación con VI-Grade e IPG. Lideré la planificación, la ejecución y el análisis de datos de las pruebas, haciendo de puente entre las sensaciones del piloto y la optimización de ingeniería. Gestioné sesiones de pruebas, validé sistemas en pista y analicé telemetría para mejorar las prestaciones. 1.er puesto en la clase EV de la Formula Student Spain 2023.',
        tags: ['Torque vectoring', 'Control de tracción', 'Frenado regenerativo', 'VI-Grade', 'IPG', 'ROS', 'C++', 'Python'],
      },
    ],
  },
  projects: {
    title: 'Proyectos', all: 'Todos', tablist: 'Categorías de proyectos',
    tabs: { personal: 'Personales', fs: 'Formula Student', pro: 'Profesionales', uni: 'Universidad' },
    titles: { personal: 'Proyectos personales', fs: 'Formula Student · BCNeMotorsport', pro: 'Proyectos profesionales', uni: 'Proyectos universitarios' },
    code: (title: string) => `Código fuente de ${title} en GitHub`,
    codeShort: 'Código fuente en GitHub',
    fallback: 'Este proyecto solo está escrito en inglés.',
  },
  skills: {
    title: 'Competencias técnicas',
    blocks: [
      { h: 'Lenguajes', items: ['MATLAB', 'Python', 'C++', 'Simulink'] },
      { h: 'Simulación', items: ['VI-Grade', 'IPG CarMaker', 'Ecotrons', 'Simulink'] },
      { h: 'Herramientas', items: ['WinTax', 'GEMS Data Analysis', 'Git', 'SolidWorks', 'Excel'] },
      { h: 'Ámbitos', items: ['Dinámica vehicular', 'Sistemas de control', 'Simulación del grupo motopropulsor', 'Adquisición de datos', 'Ingeniería de pista'] },
    ],
  },
  contact: {
    title: 'Contacto', taglineA: 'Construyamos algo', taglineEm: 'rápido',
    sub: 'Tanto si es por una oportunidad en ingeniería de motorsport, una colaboración o simplemente para hablar de vehículos, me encantará saber de ti.',
    email: 'Escríbeme', cv: 'Descargar el CV',
  },
  footer: '© 2026 Aniol Escofet. Hecho con precisión.',
  pdf: { download: '↓ Descargar el PDF', read: 'Lee el informe aquí', hint: 'Se abre en la página · o descárgalo arriba', doc: 'Documento' },
  slider: { prev: 'Anterior', next: 'Siguiente', video: 'Vídeo de YouTube' },
  lightbox: { close: 'Cerrar', prev: 'Imagen anterior', next: 'Imagen siguiente', alt: 'Foto ampliada' },
};

const DICTS: Record<Locale, Dict> = { en, ca, es };

export function useT(lang: Locale): Dict {
  return DICTS[lang] ?? en;
}
