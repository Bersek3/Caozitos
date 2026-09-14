/**
 * Catálogo General de Voces para OrbiBot
 * Contiene la biblioteca completa de voces con metadatos, categorías, estadísticas e IDs de síntesis.
 */

const VOICE_CATALOG = [
  // --- Voces de la imagen 1 y 2 (Populares, Celebridades, Memes y Streamers) ---
  {
    id: 'es_anub',
    name: 'Anub',
    category: 'gaming',
    tags: ['popular', 'gaming', 'dota', 'warcraft'],
    avatar: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=120&auto=format&fit=crop&q=80',
    lang: 'es-ES',
    defaultCommand: '!anub',
    stats: { uses: '340k', downloads: '1.2k' },
    previewText: 'Soy Anub Arak, señor de las profundidades.',
    gender: 'male',
    pitch: 0.6,
    rate: 0.95
  },
  {
    id: 'es_anuel',
    name: 'Anuel',
    category: 'celebrity',
    tags: ['popular', 'trending', 'musica', 'trap'],
    avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120&auto=format&fit=crop&q=80',
    lang: 'es-PR',
    defaultCommand: '!anuel',
    stats: { uses: '890k', downloads: '4.5k' },
    previewText: 'Real hasta la muerte baby, ¿oíste?',
    gender: 'male',
    pitch: 0.75,
    rate: 1.05
  },
  {
    id: 'es_ari',
    name: 'Ari',
    category: 'streamer',
    tags: ['popular', 'streamer', 'femenino'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    lang: 'es-MX',
    defaultCommand: '!ari',
    stats: { uses: '520k', downloads: '2.8k' },
    previewText: '¡Hola a todos en el stream! Bienvenidos.',
    gender: 'female',
    pitch: 1.25,
    rate: 1.05
  },
  {
    id: 'es_arturito',
    name: 'Arturito',
    category: 'memes',
    tags: ['popular', 'memes', 'latino', 'comedia'],
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    lang: 'es-MX',
    defaultCommand: '!arturito',
    stats: { uses: '410k', downloads: '1.9k' },
    previewText: '¡Qué onda muchachos, ya llegué!',
    gender: 'male',
    pitch: 1.1,
    rate: 1.1
  },
  {
    id: 'es_babidi',
    name: 'Babidi',
    category: 'anime',
    tags: ['popular', 'anime', 'dragonball'],
    avatar: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=120&auto=format&fit=crop&q=80',
    lang: 'es-MX',
    defaultCommand: '!babidi',
    stats: { uses: '290k', downloads: '1.1k' },
    previewText: '¡Paparapapa! ¡Despierta Majin Buu!',
    gender: 'male',
    pitch: 1.35,
    rate: 1.15
  },
  {
    id: 'es_balanar',
    name: 'Balanar',
    category: 'gaming',
    tags: ['popular', 'gaming', 'dota'],
    avatar: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=120&auto=format&fit=crop&q=80',
    lang: 'es-ES',
    defaultCommand: '!bala',
    stats: { uses: '180k', downloads: '950' },
    previewText: 'La noche es mi reino.',
    gender: 'male',
    pitch: 0.55,
    rate: 0.9
  },
  {
    id: 'es_bart',
    name: 'Bart Simpson',
    category: 'tv',
    tags: ['popular', 'trending', 'simpsons', 'caricatura'],
    avatar: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=120&auto=format&fit=crop&q=80',
    lang: 'es-MX',
    defaultCommand: '!bart',
    stats: { uses: '980k', downloads: '5.2k' },
    previewText: '¡Ay caramba! No te rindas viejo.',
    gender: 'male',
    pitch: 1.3,
    rate: 1.05
  },
  {
    id: 'es_esponja',
    name: 'Bob Esponja',
    category: 'tv',
    tags: ['popular', 'trending', 'caricatura', 'bob'],
    avatar: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=120&auto=format&fit=crop&q=80',
    lang: 'es-MX',
    defaultCommand: '!esponja',
    stats: { uses: '1.4M', downloads: '6.8k' },
    previewText: '¡Estoy listo! ¡Estoy listo! ¡A trabajar!',
    gender: 'male',
    pitch: 1.35,
    rate: 1.1
  },

  // --- Biblioteca de Voces (Imagen 2: Trump, Spongebob, Peter Griffin, Goku, etc.) ---
  {
    id: 'en_us_trump',
    name: 'Donald Trump',
    category: 'celebrity',
    tags: ['popular', 'trending', 'celebrity', 'politica', 'usa'],
    avatar: 'https://images.unsplash.com/photo-1580128660010-fd027e1e587a?w=120&auto=format&fit=crop&q=80',
    lang: 'en-US',
    defaultCommand: '!trump',
    stats: { uses: '1M', downloads: '3k' },
    previewText: 'We are going to make this stream great again, believe me.',
    gender: 'male',
    pitch: 0.85,
    rate: 0.95
  },
  {
    id: 'en_us_spongebob',
    name: 'Spongebob (Inglés)',
    category: 'tv',
    tags: ['popular', 'caricatura', 'english'],
    avatar: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?w=120&auto=format&fit=crop&q=80',
    lang: 'en-US',
    defaultCommand: '!spongebob',
    stats: { uses: '740k', downloads: '3k' },
    previewText: 'I am ready! Best day ever in the stream!',
    gender: 'male',
    pitch: 1.35,
    rate: 1.1
  },
  {
    id: 'en_us_peter',
    name: 'Peter Griffin',
    category: 'tv',
    tags: ['popular', 'trending', 'caricatura', 'familyguy'],
    avatar: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=120&auto=format&fit=crop&q=80',
    lang: 'en-US',
    defaultCommand: '!peter',
    stats: { uses: '347k', downloads: '2k' },
    previewText: 'Hehehehe, hey Lois, look at this awesome stream!',
    gender: 'male',
    pitch: 0.95,
    rate: 1.0
  },
  {
    id: 'es_mx_goku',
    name: 'Goku Latino',
    category: 'anime',
    tags: ['popular', 'trending', 'anime', 'dragonball', 'latino'],
    avatar: 'https://images.unsplash.com/photo-1569701813229-33284b643e3c?w=120&auto=format&fit=crop&q=80',
    lang: 'es-MX',
    defaultCommand: '!goku',
    stats: { uses: '428k', downloads: '2k' },
    previewText: '¡Hola, soy Goku! ¡Vamos a darlo todo!',
    gender: 'male',
    pitch: 1.05,
    rate: 1.0
  },
  {
    id: 'es_pe_melcochita',
    name: 'Melcochita',
    category: 'memes',
    tags: ['popular', 'latino', 'comedia', 'peru'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    lang: 'es-PE',
    defaultCommand: '!melcochita',
    stats: { uses: '778k', downloads: '2k' },
    previewText: '¡No vayan! ¡Imbécil! ¡Sigue disfrutando del directo!',
    gender: 'male',
    pitch: 1.15,
    rate: 1.1
  },
  {
    id: 'en_us_drphil',
    name: 'Dr Phil',
    category: 'celebrity',
    tags: ['popular', 'trending', 'tv', 'celebrity'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    lang: 'en-US',
    defaultCommand: '!drphil',
    stats: { uses: '2M', downloads: '1k' },
    previewText: 'We need to talk about your life choices right now.',
    gender: 'male',
    pitch: 0.8,
    rate: 0.95
  },
  {
    id: 'en_us_morgan',
    name: 'Morgan Freeman',
    category: 'celebrity',
    tags: ['popular', 'trending', 'cine', 'narrador'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    lang: 'en-US',
    defaultCommand: '!freeman',
    stats: { uses: '30k', downloads: '1k' },
    previewText: 'And at that exact moment, the streamer knew he had won.',
    gender: 'male',
    pitch: 0.6,
    rate: 0.9
  },
  {
    id: 'es_pe_cholo',
    name: 'El Cholo Juanito',
    category: 'memes',
    tags: ['popular', 'latino', 'comedia'],
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=120&auto=format&fit=crop&q=80',
    lang: 'es-PE',
    defaultCommand: '!cholojuanito',
    stats: { uses: '713k', downloads: '1k' },
    previewText: '¡Ay caray! ¡Saludos a toda la linda gentita!',
    gender: 'male',
    pitch: 1.1,
    rate: 1.05
  },
  {
    id: 'en_us_tate',
    name: 'Andrew Tate',
    category: 'celebrity',
    tags: ['popular', 'trending', 'streamer'],
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    lang: 'en-US',
    defaultCommand: '!tate',
    stats: { uses: '233k', downloads: '1k' },
    previewText: 'What color is your Bugatti? Top G in the stream.',
    gender: 'male',
    pitch: 0.8,
    rate: 1.05
  },
  {
    id: 'en_us_biden',
    name: 'Joe Biden',
    category: 'celebrity',
    tags: ['popular', 'politica', 'usa'],
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80',
    lang: 'en-US',
    defaultCommand: '!biden',
    stats: { uses: '110k', downloads: '1k' },
    previewText: 'Look folks, here is the deal. Enjoy the stream.',
    gender: 'male',
    pitch: 0.9,
    rate: 0.85
  },
  {
    id: 'pt_br_cristiano',
    name: 'Cristiano Ronaldo',
    category: 'celebrity',
    tags: ['popular', 'trending', 'futbol', 'siuuu'],
    avatar: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=120&auto=format&fit=crop&q=80',
    lang: 'pt-BR',
    defaultCommand: '!cr7',
    stats: { uses: '157k', downloads: '1k' },
    previewText: 'Siiiiuuu! O melhor do mundo está aqui!',
    gender: 'male',
    pitch: 0.7,
    rate: 1.0
  },
  {
    id: 'en_us_kermit',
    name: 'Kermit la Rana',
    category: 'tv',
    tags: ['popular', 'memes', 'caricatura'],
    avatar: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=120&auto=format&fit=crop&q=80',
    lang: 'en-US',
    defaultCommand: '!kermit',
    stats: { uses: '91k', downloads: '1k' },
    previewText: 'Hi-ho, Kermit the frog here!',
    gender: 'male',
    pitch: 1.25,
    rate: 1.0
  },
  {
    id: 'en_us_snoop',
    name: 'Snoop Dogg',
    category: 'celebrity',
    tags: ['popular', 'musica', 'rap'],
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    lang: 'en-US',
    defaultCommand: '!snoop',
    stats: { uses: '62k', downloads: '1k' },
    previewText: 'La-da-da-da-dah, it is the one and only D-O-double-G.',
    gender: 'male',
    pitch: 0.7,
    rate: 0.92
  },
  {
    id: 'es_mx_girl',
    name: 'Girl Anime',
    category: 'anime',
    tags: ['popular', 'femenino', 'anime'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    lang: 'es-MX',
    defaultCommand: '!girl',
    stats: { uses: '382k', downloads: '1k' },
    previewText: '¡Konnichiwa! Muchísimas gracias por el apoyo.',
    gender: 'female',
    pitch: 1.3,
    rate: 1.05
  },
  {
    id: 'es_mx_vegeta',
    name: 'Vegeta Latino',
    category: 'anime',
    tags: ['popular', 'trending', 'anime', 'dragonball'],
    avatar: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=120&auto=format&fit=crop&q=80',
    lang: 'es-MX',
    defaultCommand: '!vegeta',
    stats: { uses: '193k', downloads: '1k' },
    previewText: '¡Insecto! ¡Soy el príncipe de todos los Saiyajin!',
    gender: 'male',
    pitch: 0.8,
    rate: 1.05
  },
  {
    id: 'en_us_arnold',
    name: 'Arnold Schwarzenegger',
    category: 'celebrity',
    tags: ['popular', 'cine', 'terminator'],
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    lang: 'en-US',
    defaultCommand: '!arnold',
    stats: { uses: '189k', downloads: '1k' },
    previewText: 'Hasta la vista, baby. I will be back.',
    gender: 'male',
    pitch: 0.65,
    rate: 0.95
  },
  {
    id: 'es_pe_makanaky',
    name: 'Makanaky',
    category: 'memes',
    tags: ['popular', 'trending', 'memes', 'peru'],
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    lang: 'es-PE',
    defaultCommand: '!makanaky',
    stats: { uses: '100k', downloads: '1k' },
    previewText: '¡Gaaaa! ¡El rey del stream Makanaky!',
    gender: 'male',
    pitch: 1.2,
    rate: 1.15
  },
  {
    id: 'en_us_thrall',
    name: 'Thrall',
    category: 'gaming',
    tags: ['popular', 'gaming', 'warcraft'],
    avatar: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=120&auto=format&fit=crop&q=80',
    lang: 'en-US',
    defaultCommand: '!thrall',
    stats: { uses: '362k', downloads: '1k' },
    previewText: 'For the Horde! The spirits guide our blade.',
    gender: 'male',
    pitch: 0.58,
    rate: 0.9
  },
  {
    id: 'en_us_drake',
    name: 'Drake',
    category: 'celebrity',
    tags: ['popular', 'musica', 'hiphop'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    lang: 'en-US',
    defaultCommand: '!drake',
    stats: { uses: '42k', downloads: '1k' },
    previewText: 'Started from the bottom, now we are here.',
    gender: 'male',
    pitch: 0.78,
    rate: 0.95
  },
  {
    id: 'en_us_adin',
    name: 'Adin Ross',
    category: 'streamer',
    tags: ['popular', 'trending', 'streamer', 'kick'],
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    lang: 'en-US',
    defaultCommand: '!adin',
    stats: { uses: '277k', downloads: '1k' },
    previewText: 'No cap bro, this stream is actually insane!',
    gender: 'male',
    pitch: 1.1,
    rate: 1.1
  },
  {
    id: 'en_us_alexjones',
    name: 'Alex Jones',
    category: 'celebrity',
    tags: ['popular', 'memes', 'conspiracy'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    lang: 'en-US',
    defaultCommand: '!alexjones',
    stats: { uses: '153k', downloads: '1k' },
    previewText: 'They are turning the freaking frogs gay!',
    gender: 'male',
    pitch: 0.85,
    rate: 1.15
  },
  {
    id: 'en_us_rogan',
    name: 'Joe Rogan',
    category: 'celebrity',
    tags: ['popular', 'podcast', 'celebrity'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    lang: 'en-US',
    defaultCommand: '!rogan',
    stats: { uses: '160k', downloads: '1k' },
    previewText: 'Have you ever tried DMT? Look at this stream Jamie pull that up.',
    gender: 'male',
    pitch: 0.75,
    rate: 0.98
  },
  {
    id: 'en_us_kanye',
    name: 'Kanye West',
    category: 'celebrity',
    tags: ['popular', 'musica', 'celebrity'],
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&auto=format&fit=crop&q=80',
    lang: 'en-US',
    defaultCommand: '!kanye',
    stats: { uses: '20k', downloads: '1k' },
    previewText: 'I am a visionary, and this is the greatest stream of all time.',
    gender: 'male',
    pitch: 0.8,
    rate: 1.0
  },
  {
    id: 'es_pe_faraon',
    name: 'Faraón Love Shady',
    category: 'memes',
    tags: ['popular', 'trending', 'musica', 'peru'],
    avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120&auto=format&fit=crop&q=80',
    lang: 'es-PE',
    defaultCommand: '!faraon',
    stats: { uses: '154k', downloads: '1k' },
    previewText: '¡Raa! ¡Soy guapo lo sé, las mujeres se calientan cuando me ven!',
    gender: 'male',
    pitch: 0.9,
    rate: 1.05
  },
  {
    id: 'en_us_eddie',
    name: 'Eddie',
    category: 'streamer',
    tags: ['recent', 'streamer', 'kick'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    lang: 'en-US',
    defaultCommand: '!eddie',
    stats: { uses: '65k', downloads: '1k' },
    previewText: 'Welcome to the platform, best stream of the day.',
    gender: 'male',
    pitch: 0.9,
    rate: 1.0
  },
  {
    id: 'en_us_musk',
    name: 'Elon Musk',
    category: 'celebrity',
    tags: ['popular', 'trending', 'tech', 'tesla'],
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=120&auto=format&fit=crop&q=80',
    lang: 'en-US',
    defaultCommand: '!elon',
    stats: { uses: '21k', downloads: '1k' },
    previewText: 'To Mars and beyond. Next we buy Twitch.',
    gender: 'male',
    pitch: 0.88,
    rate: 0.95
  },
  {
    id: 'en_us_orco',
    name: 'Orco Guerrero',
    category: 'gaming',
    tags: ['popular', 'gaming', 'warcraft', 'monstruo'],
    avatar: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=120&auto=format&fit=crop&q=80',
    lang: 'es-ES',
    defaultCommand: '!orco',
    stats: { uses: '1M', downloads: '1k' },
    previewText: '¡Sangre y truenos! ¡Por la gloria de la horda!',
    gender: 'male',
    pitch: 0.5,
    rate: 0.88
  },

  // --- Voces IA Fish Audio y Clásicas ya existentes ---
  {
    id: 'es_ar_messi',
    name: 'Lionel Messi',
    category: 'celebrity',
    tags: ['popular', 'trending', 'ia', 'futbol', 'argentina'],
    avatar: 'https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=120&auto=format&fit=crop&q=80',
    lang: 'es-AR',
    defaultCommand: '!messi',
    stats: { uses: '2.5M', downloads: '15k' },
    previewText: '¿Qué mirás bobo? Andá pa allá bobo.',
    isAI: true,
    referenceId: 'e3ded66586764591a457fcdaba8a268b',
    gender: 'male',
    pitch: 0.78,
    rate: 0.98
  },
  {
    id: 'es_mx_homero',
    name: 'Homero Simpson',
    category: 'tv',
    tags: ['popular', 'trending', 'ia', 'simpsons', 'caricatura'],
    avatar: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?w=120&auto=format&fit=crop&q=80',
    lang: 'es-MX',
    defaultCommand: '!homero',
    stats: { uses: '1.8M', downloads: '9.4k' },
    previewText: '¡Me quiero volver chango! ¡Rosquillas!',
    isAI: true,
    referenceId: '134d19eda4c64cb0b2a84d93e327be3b',
    gender: 'male',
    pitch: 0.85,
    rate: 0.92
  },
  {
    id: 'es_dross',
    name: 'Dross Rotzank',
    category: 'streamer',
    tags: ['popular', 'trending', 'ia', 'terror', 'youtube'],
    avatar: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=120&auto=format&fit=crop&q=80',
    lang: 'es-VE',
    defaultCommand: '!dross',
    stats: { uses: '1.2M', downloads: '8.1k' },
    previewText: 'Mi libro Luna de Plutón ya está disponible. Les ha hablado Dross y les deseo buenas noches.',
    isAI: true,
    referenceId: 'd9f0d3d3fe734af6acb5ecc9129bc49a',
    gender: 'male',
    pitch: 0.70,
    rate: 0.95
  },
  {
    id: 'es_badbunny',
    name: 'Bad Bunny',
    category: 'celebrity',
    tags: ['popular', 'trending', 'ia', 'musica', 'reggaeton'],
    avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120&auto=format&fit=crop&q=80',
    lang: 'es-PR',
    defaultCommand: '!badbunny',
    stats: { uses: '940k', downloads: '5.8k' },
    previewText: 'Ey ey, Benito Martínez en la casa, qué lo que.',
    isAI: true,
    referenceId: '9b30f7190dbe49acb731345e70366cf7',
    gender: 'male',
    pitch: 0.75,
    rate: 0.95
  },
  {
    id: 'es_rubius',
    name: 'ElRubius',
    category: 'streamer',
    tags: ['popular', 'trending', 'ia', 'streamer', 'espana'],
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    lang: 'es-ES',
    defaultCommand: '!rubius',
    stats: { uses: '1.1M', downloads: '7.3k' },
    previewText: '¡Muy buenas criaturitas del señor! ¡Bienvenidos a un nuevo directo!',
    isAI: true,
    referenceId: '39382efbc7584d428f0f789d882cd3b8',
    gender: 'male',
    pitch: 1.05,
    rate: 1.05
  },
  {
    id: 'es_ve_maduro',
    name: 'Nicolás Maduro',
    category: 'celebrity',
    tags: ['popular', 'ia', 'memes'],
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    lang: 'es-VE',
    defaultCommand: '!maduro',
    stats: { uses: '450k', downloads: '2.1k' },
    previewText: '¡Pajarito chiquitico! Saludos a toda Venezuela y al stream.',
    isAI: true,
    referenceId: 'b011ad1198284358b766a597f6fdd171',
    gender: 'male',
    pitch: 0.72,
    rate: 0.95
  },
  {
    id: 'es_tiktok',
    name: 'Voz TikTok',
    category: 'memes',
    tags: ['popular', 'ia', 'tiktok', 'viral'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    lang: 'es-MX',
    defaultCommand: '!tiktok',
    stats: { uses: '1.6M', downloads: '11k' },
    previewText: 'Pov: Cuando estás viendo el mejor directo de Twitch.',
    isAI: true,
    referenceId: '1505e291ec504760a285fd163a78b5eb',
    gender: 'female',
    pitch: 1.2,
    rate: 1.05
  },

  // --- Voces Estándar Clásicas (Español, Inglés, Internacionales) ---
  {
    id: 'es_mx_mia',
    name: 'Mia (Español Latino)',
    category: 'standard',
    tags: ['recent', 'latino', 'femenino'],
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
    lang: 'es-MX',
    defaultCommand: '!mia',
    stats: { uses: '3.1M', downloads: '25k' },
    previewText: 'Hola, soy la voz predeterminada en español latino.',
    gender: 'female',
    pitch: 1.15,
    rate: 1.0
  },
  {
    id: 'es_us_miguel',
    name: 'Miguel (Español Latino Masculino)',
    category: 'standard',
    tags: ['recent', 'latino', 'masculino'],
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    lang: 'es-US',
    defaultCommand: '!miguel',
    stats: { uses: '1.2M', downloads: '8k' },
    previewText: 'Hola streamer, transmitiendo voz masculina latina.',
    gender: 'male',
    pitch: 0.65,
    rate: 1.0
  },
  {
    id: 'es_es_enrique',
    name: 'Enrique (Castellano Masculino)',
    category: 'standard',
    tags: ['recent', 'espana', 'masculino'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=120&auto=format&fit=crop&q=80',
    lang: 'es-ES',
    defaultCommand: '!enrique',
    stats: { uses: '890k', downloads: '5k' },
    previewText: 'Saludos desde España para todos los espectadores.',
    gender: 'male',
    pitch: 0.62,
    rate: 1.05
  },
  {
    id: 'es_es_conchita',
    name: 'Conchita (Castellano Femenino)',
    category: 'standard',
    tags: ['recent', 'espana', 'femenino'],
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
    lang: 'es-ES',
    defaultCommand: '!conchita',
    stats: { uses: '720k', downloads: '4k' },
    previewText: 'Hola a todos, voz femenina natural de España.',
    gender: 'female',
    pitch: 1.1,
    rate: 1.0
  },
  {
    id: 'en_brian',
    name: 'Brian (English UK Meme Classic)',
    category: 'standard',
    tags: ['popular', 'english', 'meme'],
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80',
    lang: 'en-GB',
    defaultCommand: '!brian',
    stats: { uses: '4.2M', downloads: '32k' },
    previewText: 'Hello chat, classic British streamer TTS at your service.',
    gender: 'male',
    pitch: 0.7,
    rate: 0.95
  },
  {
    id: 'ja_takumi',
    name: 'Takumi (Japonés Anime)',
    category: 'international',
    tags: ['recent', 'anime', 'japones'],
    avatar: 'https://images.unsplash.com/photo-1569701813229-33284b643e3c?w=120&auto=format&fit=crop&q=80',
    lang: 'ja-JP',
    defaultCommand: '!takumi',
    stats: { uses: '410k', downloads: '3k' },
    previewText: 'Konbanwa minna-san, stream e youkoso!',
    gender: 'male',
    pitch: 0.8,
    rate: 1.1
  }
];

class VoiceCatalogService {
  constructor() {
    this.voices = [...VOICE_CATALOG];
  }

  getAllVoices() {
    return this.voices;
  }

  getVoiceById(id) {
    if (!id) return null;
    const cleanId = id.toString().toLowerCase().trim().replace(/^[-@/]/, '').replace(/^voice:/, '');
    return this.voices.find(v => v.id.toLowerCase() === cleanId || v.name.toLowerCase() === cleanId) || null;
  }

  searchVoices(query = '', category = 'all') {
    let result = this.voices;

    if (category && category !== 'all') {
      if (category === 'popular' || category === 'populares') {
        result = result.filter(v => (v.tags && v.tags.includes('popular')) || (v.stats && v.stats.uses && (v.stats.uses.includes('M') || parseInt(v.stats.uses) >= 300)));
      } else if (category === 'recent' || category === 'recientes') {
        result = result.filter(v => (v.tags && v.tags.includes('recent')) || (v.category === 'standard'));
      } else if (category === 'trending' || category === 'tendencia') {
        result = result.filter(v => (v.tags && v.tags.includes('trending')) || v.isAI);
      } else {
        result = result.filter(v => v.category === category || (v.tags && v.tags.includes(category)));
      }
    }

    if (query && query.trim()) {
      const q = query.trim().toLowerCase();
      result = result.filter(v =>
        v.name.toLowerCase().includes(q) ||
        v.id.toLowerCase().includes(q) ||
        (v.defaultCommand && v.defaultCommand.toLowerCase().includes(q)) ||
        (v.tags && v.tags.some(t => t.toLowerCase().includes(q))) ||
        (v.previewText && v.previewText.toLowerCase().includes(q))
      );
    }

    return result;
  }

  addVoiceToCatalog(voiceData) {
    if (!voiceData || !voiceData.id) return false;
    const existingIdx = this.voices.findIndex(v => v.id.toLowerCase() === voiceData.id.toLowerCase());
    if (existingIdx >= 0) {
      this.voices[existingIdx] = { ...this.voices[existingIdx], ...voiceData };
    } else {
      this.voices.push(voiceData);
    }
    return true;
  }
}

module.exports = new VoiceCatalogService();
