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
    const config = storage.getConfig().tts || {};
    const defaultVoice = config.voice || 'es_mx_mia';
    if (!voiceId) return defaultVoice;
    const v = voiceId.toString().toLowerCase().trim().replace(/^[-@/]/, '').replace(/^voice:/, '');

    // 1. Buscar coincidencia en el catálogo activo de la base de datos
    const dbVoice = voiceCatalog.getVoiceById(v);
    if (dbVoice) {
      return dbVoice.id;
    }

    // 2. Buscar en los comandos configurados por el streamer en la base de datos
    const commands = storage.getTtsCommands() || [];
    const matchedCmd = commands.find(c =>
      (c.command && (c.command.toLowerCase() === v || c.command.toLowerCase() === `!${v}`)) ||
      (c.voiceId && c.voiceId.toLowerCase() === v) ||
      (c.name && c.name.toLowerCase() === v)
    );
    if (matchedCmd && matchedCmd.voiceId) {
      return matchedCmd.voiceId;
    }

    // 3. Mapeo de alias comunes que apuntan a voces de la base de datos
    const aliases = {
      // Voces Famosas / IA
      messi: 'es_ar_messi',
      lionel_messi: 'es_ar_messi',
      'lionel messi': 'es_ar_messi',
      'leo messi': 'es_ar_messi',
      maduro: 'es_ve_maduro',
      tiktok: 'es_tiktok',
      homero: 'es_mx_homero',
      dross: 'es_dross',
      badbunny: 'es_badbunny',
      rubius: 'es_rubius',

      // Voces del catálogo general
      anub: 'es_anub',
      anuel: 'es_anuel',
      ari: 'es_ari',
      arturito: 'es_arturito',
      babidi: 'es_babidi',
      balanar: 'es_balanar',
      bala: 'es_balanar',
      bart: 'es_bart',
      esponja: 'es_esponja',
      trump: 'en_us_trump',
      peter: 'en_us_peter',
      goku: 'es_mx_goku',
      melcochita: 'es_pe_melcochita',
      drphil: 'en_us_drphil',
      freeman: 'en_us_morgan',
      cholo: 'es_pe_cholo',
      tate: 'en_us_tate',
      biden: 'en_us_biden',
      cr7: 'pt_br_cristiano',
      kermit: 'en_us_kermit',
      snoop: 'en_us_snoop',
      girl: 'es_mx_girl',
      vegeta: 'es_mx_vegeta',
      arnold: 'en_us_arnold',
      makanaky: 'es_pe_makanaky',
      thrall: 'en_us_thrall',
      drake: 'en_us_drake',
      adin: 'en_us_adin',
      alexjones: 'en_us_alexjones',
      rogan: 'en_us_rogan',
      kanye: 'en_us_kanye',
      faraon: 'es_pe_faraon',
      eddie: 'en_us_eddie',
      elon: 'en_us_musk',
      musk: 'en_us_musk',
      orco: 'en_us_orco'
    };

    const aliasTarget = aliases[v];
    if (aliasTarget) {
      const aliasVoice = voiceCatalog.getVoiceById(aliasTarget);
      if (aliasVoice) return aliasVoice.id;
    }

    // 4. Si no existe en la base de datos de voces, retornar voz predeterminada
    return defaultVoice;
  }

  isFishAudioVoice(voiceId) {
    const normalized = this.normalizeVoice(voiceId);
    const dbVoice = voiceCatalog.getVoiceById(normalized);
    if (dbVoice && dbVoice.isAI) return true;
    return ['es_ar_messi', 'es_ve_maduro', 'es_tiktok', 'es_mx_homero', 'es_dross', 'es_badbunny', 'es_rubius'].includes(normalized);
  }

  generateAudioUrl(text, voiceId = 'es_mx_mia') {
    const encoded = encodeURIComponent(text);
    const normalized = this.normalizeVoice(voiceId);
    if (this.isFishAudioVoice(normalized)) {
      return `/api/tts/audio?text=${encoded}&voice=${normalized}`;
    }
    const dbVoice = voiceCatalog.getVoiceById(normalized);
    const lang = dbVoice?.lang || (normalized.split('_')[0] || 'es').toLowerCase();
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
