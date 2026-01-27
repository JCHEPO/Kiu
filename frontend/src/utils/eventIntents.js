// Mapeo de palabras clave a intenciones y categorías
const INTENT_MAPPINGS = {
  deportivo: {
    keywords: ["partido", "rival", "vs", "torneo", "competencia", "liga", "campeonato", "match"],
    categories: ["Deportivo"]
  },
  clases: {
    keywords: ["clase", "curso", "taller", "workshop", "capacitación", "entrenamiento", "lección", "escuela"],
    categories: ["Clases"]
  },
  outdoor: {
    keywords: ["parque", "aire libre", "playa", "naturaleza", "senderismo", "excursión", "al aire", "exterior"],
    categories: ["Outdoor"]
  },
  artistico: {
    keywords: ["arte", "música", "danza", "pintura", "teatro", "cine", "concierto", "exposición", "show"],
    categories: ["Artístico"]
  },
  social: {
    keywords: ["café", "conversación", "reunión", "fiesta", "encuentro", "social", "charla", "networking"],
    categories: ["Social"]
  },
  juegos: {
    keywords: ["juego", "cartas", "ajedrez", "online", "videojuego", "board game", "gambling"],
    categories: ["Juegos"]
  }
};

// Categorías principales y transversales
const CATEGORIES = {
  deportivo: {
    label: "Deportivo",
    subcategories: ["Fútbol", "Basket", "Voley", "Tenis", "Natación"]
  },
  artistico: {
    label: "Artístico",
    subcategories: ["Tocata", "Baile", "Cerámica", "Pintura", "Teatro"]
  },
  juegos: {
    label: "Juegos",
    subcategories: ["Cartas", "Online", "Matanza", "Ajedrez", "Board Game"]
  },
  social: {
    label: "Social",
    subcategories: ["Café", "Conversatorio", "Trends", "Networking", "Fiesta"]
  },
  outdoor: {
    label: "Outdoor",
    subcategories: ["Parque", "Playa", "Montaña", "Senderismo", "Picnic"]
  },
  clases: {
    label: "Clases",
    subcategories: ["Taller", "Workshop", "Curso Online", "Capacitación", "Entrenamiento"]
  }
};

// Tags dinámicos sugeridos por subcategoría
const SUGGESTED_TAGS = {
  "Fútbol": ["5vs5", "7vs7", "11vs11", "Futsal", "Amistoso", "Competitivo"],
  "Basket": ["3vs3", "5vs5", "Amistoso", "Competitivo", "Pickup"],
  "Voley": ["3vs3", "6vs6", "Amistoso", "Competitivo"],
  "Tenis": ["Singles", "Dobles", "Amistoso", "Competitivo"],
  "Natación": ["Entrenamiento", "Competitivo", "Recreativo"],
  "Tocata": ["En vivo", "Acústico", "Ensayo", "Jam session"],
  "Baile": ["Taller", "Jam", "Ensayo", "Presentación"],
  "Cerámica": ["Taller", "Nivel básico", "Nivel avanzado"],
  "Pintura": ["Taller", "Nivel básico", "Nivel avanzado", "Tinta", "Óleo"],
  "Teatro": ["Ensayo", "Taller", "Presentación"],
  "Cartas": ["Casual", "Competitivo", "Torneo"],
  "Online": ["Casual", "Competitivo", "Torneo"],
  "Matanza": ["Casual", "Competitivo"],
  "Ajedrez": ["Blitz", "Rápido", "Clásico", "Casual"],
  "Board Game": ["Casual", "Competitivo"],
  "Café": ["Tertulia", "Networking", "Casual"],
  "Conversatorio": ["Debate", "Panel", "Charla"],
  "Trends": ["Actualidad", "Social", "Casual"],
  "Networking": ["Profesional", "Casual"],
  "Fiesta": ["Cumpleaños", "Despedida", "Casual"],
  "Parque": ["Picnic", "Recreativo", "Ejercicio"],
  "Playa": ["Picnic", "Recreativo", "Agua"],
  "Montaña": ["Senderismo", "Escalada", "Camping"],
  "Senderismo": ["Fácil", "Medio", "Difícil"],
  "Picnic": ["Familiar", "Casual", "Potluck"],
  "Taller": ["Presencial", "Online", "Híbrido"],
  "Workshop": ["Presencial", "Online", "Híbrido"],
  "Curso Online": ["Asincrónico", "Sincrónico"],
  "Capacitación": ["Profesional", "Personal"],
  "Entrenamiento": ["Físico", "Mental", "Técnico"]
};

// Definición de grupos de tags exclusivos (solo uno por grupo)
const EXCLUSIVE_TAG_GROUPS = {
  formato_futbol: ["5vs5", "7vs7", "11vs11"],
  formato_basket: ["3vs3", "5vs5"],
  formato_voley: ["3vs3", "6vs6"],
  formato_tenis: ["Singles", "Dobles"],
  modo_competitivo: ["Amistoso", "Competitivo"],
  nivel_clase: ["Nivel básico", "Nivel avanzado"],
  formato_ajedrez: ["Blitz", "Rápido", "Clásico"],
  tipo_presentacion: ["Ensayo", "Presentación"],
  dificultad_senderismo: ["Fácil", "Medio", "Difícil"]
};

/**
 * Analiza el input del usuario y retorna sugerencias de categorías
 * @param {string} input - Texto ingresado por el usuario
 * @returns {Array<string>} Array de categorías sugeridas
 */
export function getSuggestedCategories(input) {
  if (!input || input.length < 2) return [];

  const lowerInput = input.toLowerCase().trim();
  const suggestedCategories = new Set();

  // Buscar coincidencias de palabras clave
  Object.entries(INTENT_MAPPINGS).forEach(([key, { keywords }]) => {
    keywords.forEach(keyword => {
      if (lowerInput.includes(keyword)) {
        INTENT_MAPPINGS[key].categories.forEach(cat => suggestedCategories.add(cat));
      }
    });
  });

  return Array.from(suggestedCategories);
}

/**
 * Retorna las categorías disponibles en formato normalizado
 * @returns {Object} Objeto con estructura de categorías
 */
export function getCategoriesData() {
  return CATEGORIES;
}

/**
 * Obtiene subcategorías basadas en una categoría principal
 * @param {string} categoryLabel - Etiqueta de categoría (ej: "Deportivo")
 * @returns {Array<string>} Array de subcategorías
 */
export function getSubcategoriesByLabel(categoryLabel) {
  const key = Object.keys(CATEGORIES).find(
    k => CATEGORIES[k].label === categoryLabel
  );
  return key ? CATEGORIES[key].subcategories : [];
}

/**
 * Obtiene la clave interna de una categoría por su etiqueta
 * @param {string} label - Etiqueta visible (ej: "Deportivo")
 * @returns {string|null} Clave interna o null
 */
export function getCategoryKeyByLabel(label) {
  return Object.keys(CATEGORIES).find(k => CATEGORIES[k].label === label) || null;
}

/**
 * Obtiene tags sugeridos para una subcategoría específica
 * @param {string} subcategory - Nombre de subcategoría (ej: "Fútbol")
 * @returns {Array<string>} Array de tags sugeridos
 */
export function getSuggestedTagsBySubcategory(subcategory) {
  return SUGGESTED_TAGS[subcategory] || [];
}

/**
 * Comprueba si un tag es exclusivo y retorna su grupo
 * @param {string} tag - Nombre del tag
 * @returns {string|null} Clave del grupo exclusivo o null
 */
export function getExclusiveGroupForTag(tag) {
  for (const [groupKey, tags] of Object.entries(EXCLUSIVE_TAG_GROUPS)) {
    if (tags.includes(tag)) {
      return groupKey;
    }
  }
  return null;
}

/**
 * Obtiene todos los tags de un grupo exclusivo
 * @param {string} groupKey - Clave del grupo exclusivo
 * @returns {Array<string>} Array de tags en ese grupo
 */
export function getTagsInExclusiveGroup(groupKey) {
  return EXCLUSIVE_TAG_GROUPS[groupKey] || [];
}

export default {
  getSuggestedCategories,
  getCategoriesData,
  getSubcategoriesByLabel,
  getCategoryKeyByLabel,
  getSuggestedTagsBySubcategory,
  getExclusiveGroupForTag,
  getTagsInExclusiveGroup
};
