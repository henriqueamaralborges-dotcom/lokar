/* ==========================================================================
   Lokar Audiovisual - Configurações Gerais da Loja (Filtros e Descontos)
   O banco de dados de produtos agora é carregado dinamicamente via lokar_db.json
   ========================================================================== */

const CATEGORIES = [
    { id: "todos", name: "Todos os Equipamentos", icon: "grid" },
    { id: "cameras", name: "Câmeras", icon: "camera" },
    { id: "lentes", name: "Lentes", icon: "aperture" },
    { id: "audio", name: "Áudio", icon: "mic" },
    { id: "iluminacao", name: "Iluminação", icon: "sun" },
    { id: "estabilizadores", name: "Drones e Estabilizadores", icon: "navigation" },
    { id: "acessorios", name: "Acessórios", icon: "sliders" }
];

const RENTAL_PERIOD_DISCOUNTS = [
    { days: 1, discount: 0, label: "1 Diária (Valor Normal)" },
    { days: 3, discount: 0.05, label: "3 Dias (5% de Desconto)" },
    { days: 7, discount: 0.15, label: "7 Dias (15% de Desconto - Pacote Semanal)" },
    { days: 15, discount: 0.25, label: "15 Dias (25% de Desconto)" },
    { days: 30, discount: 0.35, label: "30 Dias (35% de Desconto - Pacote Mensal)" }
];
