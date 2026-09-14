const storage = require('./storage');
const voiceCatalog = require('./voiceCatalog');

class TTSService {
  constructor() {
    this.queue = [];
    this.isProcessing = false;
    this.eventListeners = [];
  }

  onTTS(callback) {
    this.eventListeners.push(callback);
  }

  emitTTS(payload) {
    for (const listener of this.eventListeners) {
      try {
        listener(payload);
      } catch (err) {
        console.error('Error dispatching TTS listener:', err);
      }
    }
  }

  sanitizeText(text, config) {
    if (!text || typeof text !== 'string') return '';
    let cleaned = text.trim();

    // Limit length
    const maxLength = config.maxLength || 300;
    if (cleaned.length > maxLength) {
      cleaned = cleaned.substring(0, maxLength);
    }

    // Filter banned words
    const banned = config.bannedWords || [];
    for (const word of banned) {
      if (!word.trim()) continue;
      const regex = new RegExp(`\\b${word.trim()}\\b`, 'gi');
      cleaned = cleaned.replace(regex, '***');
    }

    // Clean dangerous characters / script tags
    cleaned = cleaned.replace(/[<>]/g, '');

    return cleaned;
  }

  normalizeVoice(voiceId) {
    if (!voiceId) return 'es_mx_mia';
    const v = voiceId.toString().toLowerCase().trim().replace(/^[-@/]/, '').replace(/^voice:/, '');
    const aliases = {
      // Voces Famosas / IA
      messi: 'es_ar_messi',
      lionel_messi: 'es_ar_messi',
      'lionel messi': 'es_ar_messi',
      'leo messi': 'es_ar_messi',
      'leo_messi': 'es_ar_messi',
      leomessi: 'es_ar_messi',
      es_ar_messi: 'es_ar_messi',

      maduro: 'es_ve_maduro',
      nicolas_maduro: 'es_ve_maduro',
      'nicolas maduro': 'es_ve_maduro',
      'nicolás maduro': 'es_ve_maduro',
      nicolasmaduro: 'es_ve_maduro',
      es_ve_maduro: 'es_ve_maduro',

      tiktok: 'es_tiktok',
      voz_tiktok: 'es_tiktok',
      'voz tiktok': 'es_tiktok',
      tiktok_voice: 'es_tiktok',
      es_tiktok: 'es_tiktok',

      homero: 'es_mx_homero',
      homer: 'es_mx_homero',
      homero_simpson: 'es_mx_homero',
      'homero simpson': 'es_mx_homero',
      'homer simpson': 'es_mx_homero',
      homerosimpson: 'es_mx_homero',
      es_mx_homero: 'es_mx_homero',

      dross: 'es_dross',
      drossrotzank: 'es_dross',
      'dross rotzank': 'es_dross',
      es_dross: 'es_dross',

      badbunny: 'es_badbunny',
      bad_bunny: 'es_badbunny',
      'bad bunny': 'es_badbunny',
      benito: 'es_badbunny',
      conejo_malo: 'es_badbunny',
      'conejo malo': 'es_badbunny',
      es_badbunny: 'es_badbunny',

      rubius: 'es_rubius',
      elrubius: 'es_rubius',
      el_rubius: 'es_rubius',
      'el rubius': 'es_rubius',
      rubiuh: 'es_rubius',
      es_rubius: 'es_rubius',

      // Voces del catálogo general y comandos
      anub: 'es_anub',
      anuel: 'es_anuel',
      ari: 'es_ari',
      arturito: 'es_arturito',
      babidi: 'es_babidi',
      balanar: 'es_balanar',
      bala: 'es_balanar',
      bart: 'es_bart',
      bart_simpson: 'es_bart',
      'bart simpson': 'es_bart',
      esponja: 'es_esponja',
      bob_esponja: 'es_esponja',
      'bob esponja': 'es_esponja',
      spongebob: 'en_us_spongebob',
      trump: 'en_us_trump',
      donald_trump: 'en_us_trump',
      'donald trump': 'en_us_trump',
      peter: 'en_us_peter',
      peter_griffin: 'en_us_peter',
      goku: 'es_mx_goku',
      goku_latino: 'es_mx_goku',
      melcochita: 'es_pe_melcochita',
      drphil: 'en_us_drphil',
      freeman: 'en_us_morgan',
      morgan_freeman: 'en_us_morgan',
      cholo: 'es_pe_cholo',
      cholojuanito: 'es_pe_cholo',
      tate: 'en_us_tate',
      andrew_tate: 'en_us_tate',
      biden: 'en_us_biden',
      joe_biden: 'en_us_biden',
      cr7: 'pt_br_cristiano',
      kermit: 'en_us_kermit',
      snoop: 'en_us_snoop',
      snoop_dogg: 'en_us_snoop',
      girl: 'es_mx_girl',
      vegeta: 'es_mx_vegeta',
      vegeta_latino: 'es_mx_vegeta',
      arnold: 'en_us_arnold',
      makanaky: 'es_pe_makanaky',
      thrall: 'en_us_thrall',
      drake: 'en_us_drake',
      adin: 'en_us_adin',
      adin_ross: 'en_us_adin',
      alexjones: 'en_us_alexjones',
      rogan: 'en_us_rogan',
      joe_rogan: 'en_us_rogan',
      kanye: 'en_us_kanye',
      kanye_west: 'en_us_kanye',
      faraon: 'es_pe_faraon',
      faraon_love_shady: 'es_pe_faraon',
      eddie: 'en_us_eddie',
      elon: 'en_us_musk',
      elon_musk: 'en_us_musk',
      musk: 'en_us_musk',
      orco: 'en_us_orco',

      // Direct names
      mia: 'es_mx_mia',
      miguel: 'es_us_miguel',
      lupe: 'es_us_lupe',
      penelope: 'es_us_penelope',
      penélope: 'es_us_penelope',
      enrique: 'es_es_enrique',
      conchita: 'es_es_conchita',
      lucia: 'es_es_lucia',
      lucía: 'es_es_lucia',
      brian: 'en_brian',
      emma: 'en_emma',
      joey: 'en_joey',
      matthew: 'en_matthew',
      kendra: 'en_kendra',
      justin: 'en_justin',
      russell: 'en_russell',
      cristiano: 'pt_cristiano',
      mathieu: 'fr_mathieu',
      giorgio: 'it_giorgio',
      hans: 'de_hans',
      takumi: 'ja_takumi',
      mizuki: 'ja_mizuki',

      // Legacy & IDs
      es_mx_mia: 'es_mx_mia',
      es_us_miguel: 'es_us_miguel',
      es_us_lupe: 'es_us_lupe',
      es_us_penelope: 'es_us_penelope',
      es_es_enrique: 'es_es_enrique',
      es_es_conchita: 'es_es_conchita',
      es_es_lucia: 'es_es_lucia',
      en_brian: 'en_brian',
      en_emma: 'en_emma',
      en_joey: 'en_joey',
      en_matthew: 'en_matthew',
      en_kendra: 'en_kendra',
      en_justin: 'en_justin',
      en_russell: 'en_russell',
      pt_cristiano: 'pt_cristiano',
      fr_mathieu: 'fr_mathieu',
      it_giorgio: 'it_giorgio',
      de_hans: 'de_hans',
      ja_takumi: 'ja_takumi',
      ja_mizuki: 'ja_mizuki',
      es_001: 'es_mx_mia',
      es_female: 'es_mx_mia',
      es_male: 'es_us_miguel',
      es_002: 'es_es_conchita',
      'es-es-standard-a': 'es_es_enrique',
      en_001: 'en_brian',
      en_002: 'en_emma'
    };
    return aliases[v] || v;
  }

  isFishAudioVoice(voiceId) {
    const normalized = this.normalizeVoice(voiceId);
    return ['es_ar_messi', 'es_ve_maduro', 'es_tiktok', 'es_mx_homero', 'es_dross', 'es_badbunny', 'es_rubius'].includes(normalized);
  }

  generateAudioUrl(text, voiceId = 'es_mx_mia') {
    const encoded = encodeURIComponent(text);
    const normalized = this.normalizeVoice(voiceId);
    if (this.isFishAudioVoice(normalized)) {
      return `/api/tts/audio?text=${encoded}&voice=${normalized}`;
    }
    const lang = (normalized.split('_')[0] || 'es').toLowerCase();
    return `https://translate.google.com/translate_tts?ie=UTF-8&q=${encoded}&tl=${encodeURIComponent(lang)}&client=tw-ob`;
  }

  /**
   * Valida si un espectador tiene permiso para usar un comando de voz TTS.
   */
  hasPermission(cmdObj, userBadges = {}) {
    if (!cmdObj || !cmdObj.enabled) return false;
    const permissions = Array.isArray(cmdObj.permissions) && cmdObj.permissions.length ? cmdObj.permissions : ['todos'];

    if (permissions.includes('todos') || permissions.includes('all')) return true;

    const isMod = Boolean(userBadges.mod || userBadges.broadcaster || userBadges.isMod);
    const isSub = Boolean(userBadges.subscriber || userBadges.sub || userBadges.isSub || isMod);
    const isVip = Boolean(userBadges.vip || userBadges.isVip || isMod);

    if (permissions.includes('mod') && isMod) return true;
    if (permissions.includes('vip') && (isVip || isMod)) return true;
    if (permissions.includes('sub') && (isSub || isMod)) return true;

    return false;
  }

  /**
   * Parser Multi-Voz en Chat: Detecta comandos de voz individuales o múltiples voces en un mensaje.
   * Ejemplo: "!messi Hola amigos !homero qué onda !dross perturbador"
   */
  parseMultiVoiceText(rawText, userBadges = {}) {
    if (!rawText || typeof rawText !== 'string') return [];
    const commands = storage.getTtsCommands();
    const config = storage.getConfig().tts || {};
    const defaultVoice = config.voice || 'es_mx_mia';

    // Mapeo rápido de prefijos a comandos
    const triggerMap = new Map();
    for (const cmd of commands) {
      if (cmd.enabled !== false && cmd.command) {
        const cleanTrigger = cmd.command.toLowerCase().trim();
        triggerMap.set(cleanTrigger, cmd);
        // Soporte sin signo de exclamación si viene con prefijo
        triggerMap.set(cleanTrigger.replace(/^!/, ''), cmd);
      }
    }

    // Buscar tokens como !comando o [nombre_voz]
    const words = rawText.trim().split(/\s+/);
    const segments = [];
    let currentVoiceCmd = null;
    let currentVoiceId = null;
    let currentVoiceName = null;
    let currentTextWords = [];

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      const cleanWord = word.toLowerCase().replace(/^[\[\(]/, '').replace(/[\]\)]$/, '');
      const matchedCmd = triggerMap.get(cleanWord) || triggerMap.get(cleanWord.startsWith('!') ? cleanWord : `!${cleanWord}`);

      if (matchedCmd) {
        // Si ya teníamos texto acumulado, guardar segmento anterior
        if (currentTextWords.length > 0) {
          segments.push({
            voice: currentVoiceId || defaultVoice,
            voiceName: currentVoiceName || (voiceCatalog.getVoiceById(currentVoiceId)?.name || 'Voz'),
            text: currentTextWords.join(' ')
          });
          currentTextWords = [];
        }

        // Validar permisos del nuevo comando
        if (this.hasPermission(matchedCmd, userBadges)) {
          currentVoiceCmd = matchedCmd;
          currentVoiceId = matchedCmd.voiceId || this.normalizeVoice(matchedCmd.command);
          currentVoiceName = matchedCmd.name;
        } else {
          // Si no tiene permiso, usar voz por defecto
          currentVoiceCmd = null;
          currentVoiceId = defaultVoice;
          currentVoiceName = 'Voz Estándar';
        }
      } else {
        currentTextWords.push(word);
      }
    }

    if (currentTextWords.length > 0) {
      segments.push({
        voice: currentVoiceId || defaultVoice,
        voiceName: currentVoiceName || (voiceCatalog.getVoiceById(currentVoiceId)?.name || 'Voz'),
        text: currentTextWords.join(' ')
      });
    }

    return segments;
  }

  processRequest({ user, text, source = 'chat', bits = 0, voiceOverride = null, channel = null, userBadges = {} }) {
    const config = storage.getConfig().tts;
    if (!config.enabled) {
      return { success: false, reason: 'TTS está deshabilitado en la configuración' };
    }

    // Verification for chat commands
    if (source === 'chat' && !config.allowChatCommand) {
      return { success: false, reason: 'El comando de chat para TTS está desactivado' };
    }

    // Verification for bits
    if (source === 'bits' && bits < (config.minBits || 0)) {
      return { success: false, reason: `Bits insuficientes para TTS (mínimo: ${config.minBits})` };
    }

    let rawText = (text || '').trim();
    if (!rawText) {
      return { success: false, reason: 'Texto vacío o inválido' };
    }

    // 1. Detección y procesamiento Multi-Voz
    const multiSegments = this.parseMultiVoiceText(rawText, userBadges);
    let selectedVoice = voiceOverride ? this.normalizeVoice(voiceOverride) : (this.normalizeVoice(config.voice) || 'es_mx_mia');

    if (multiSegments.length > 0 && !voiceOverride) {
      selectedVoice = multiSegments[0].voice || selectedVoice;
    }

    const cleanText = this.sanitizeText(rawText, config);
    if (!cleanText || cleanText.length < 2) {
      return { success: false, reason: 'Texto vacío o inválido tras sanitización' };
    }

    // Preparar segmentos procesados
    const processedSegments = (multiSegments.length > 0 ? multiSegments : [{ voice: selectedVoice, text: cleanText }])
      .map(seg => {
        const cleanSegText = this.sanitizeText(seg.text, config);
        const normVoice = this.normalizeVoice(seg.voice);
        const isFish = this.isFishAudioVoice(normVoice);
        return {
          voice: normVoice,
          voiceName: seg.voiceName || (voiceCatalog.getVoiceById(normVoice)?.name || 'Voz'),
          text: cleanSegText,
          engine: isFish ? 'fish_audio' : 'audio_stream',
          audioUrl: this.generateAudioUrl(cleanSegText, normVoice)
        };
      })
      .filter(s => s.text && s.text.length > 0);

    if (processedSegments.length === 0) {
      return { success: false, reason: 'No hay texto válido para reproducir' };
    }

    const isFish = this.isFishAudioVoice(selectedVoice);
    const primaryAudioUrl = processedSegments[0]?.audioUrl || this.generateAudioUrl(cleanText, selectedVoice);
    const fallbackUrl = isFish
      ? `https://translate.google.com/translate_tts?ie=UTF-8&q=${encodeURIComponent(cleanText)}&tl=es-ES&client=tw-ob`
      : primaryAudioUrl;

    const cleanChannel = channel ? channel.toLowerCase().replace(/^#/, '').trim() : null;
    const ttsItem = {
      id: 'tts-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
      channel: cleanChannel,
      room: cleanChannel,
      user: user || 'Anónimo',
      text: cleanText,
      source,
      bits,
      engine: isFish ? 'fish_audio' : 'audio_stream',
      voice: selectedVoice,
      segments: processedSegments,
      volume: (config.volume || 90) / 100,
      rate: config.rate || 1.0,
      pitch: config.pitch || 1.0,
      audioUrl: primaryAudioUrl,
      fallbackUrl,
      timestamp: Date.now()
    };

    this.queue.push(ttsItem);
    this.emitTTS(ttsItem);

    return {
      success: true,
      item: ttsItem
    };
  }

  getVoices() {
    return voiceCatalog.getAllVoices();
  }
}

module.exports = new TTSService();
