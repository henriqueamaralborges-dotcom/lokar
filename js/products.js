/**
 * Lokar Audiovisual Equipment Catalog Database
 */
const PRODUCTS = [
    {
        id: "sony-fx3",
        title: "Câmera Sony FX3 Cinema Line",
        category: "cameras",
        categoryLabel: "Câmeras",
        price: 380.00,
        rating: 4.9,
        reviewsCount: 38,
        badge: "Mais Alugada",
        badgeColor: "gold",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=800&auto=format&fit=crop",
        shortDesc: "Full Frame 4K 120fps, S-Cinetone, ISO Dual Nativo 800/12800.",
        description: "A Sony FX3 reúne o melhor da série Cinema Line em um corpo compacto e ergonomicamente projetado para produções solo e de alta performance. Equipada com sensor Full Frame de 12.1 MP retroiluminado, permite gravação em 4K até 120fps e 10-bit 4:2:2 interno.",
        specs: [
            { label: "Sensor", value: "Full Frame Exmor R CMOS 12.1 MP" },
            { label: "Resolução", value: "4K UHD até 120fps / FHD até 240fps" },
            { label: "Perfis de Cor", value: "S-Cinetone, S-Log3, HLG" },
            { label: "ISO", value: "Dual Base ISO 800 / 12800" },
            { label: "Encaixe", value: "Sony E-Mount" }
        ],
        includedItems: [
            "1x Corpo de Câmera Sony FX3",
            "1x Handle Superior XLR com Áudio Profissional",
            "3x Baterias Sony NP-FZ100",
            "1x Carregador Duplo Inteligente",
            "1x Cartão CFexpress Type A 160GB Ultra Speed",
            "1x Leitor de Cartões USB-C",
            "1x Maleta Rígida Tipo Pelican à Prova de Choque"
        ]
    },
    {
        id: "sony-fx30",
        title: "Câmera Sony FX30 Super 35",
        category: "cameras",
        categoryLabel: "Câmeras",
        price: 250.00,
        rating: 4.8,
        reviewsCount: 45,
        badge: "Excelente Custo-Benefício",
        badgeColor: "cyan",
        image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?q=80&w=800&auto=format&fit=crop",
        shortDesc: "Super 35 4K 120fps, Dual Base ISO 800/2500, 10-bit 4:2:2.",
        description: "A Sony FX30 oferece o consagrado visual cinematográfico da família Cinema Line em formato Super 35 (APS-C). Conta com novo sensor de 26 MP, foco automático híbrido com rastreamento em tempo real e excelente estabilização no corpo (IBIS).",
        specs: [
            { label: "Sensor", value: "Super 35 APS-C 26.1 MP" },
            { label: "Resolução", value: "4K DCI/UHD até 120fps" },
            { label: "Estabilização", value: "IBIS 5 eixos + Active Mode" },
            { label: "ISO", value: "Dual Base ISO 800 / 2500" },
            { label: "Encaixe", value: "Sony E-Mount" }
        ],
        includedItems: [
            "1x Corpo Sony FX30",
            "1x Handle XLR com Entradas P3/XLR",
            "3x Baterias NP-FZ100",
            "1x Carregador Duplo",
            "1x Cartão SDXC V90 128GB (300MB/s)",
            "1x Cage SmallRig Pro de Proteção"
        ]
    },
    {
        id: "red-komodo-6k",
        title: "RED Komodo 6K Cinema Camera",
        category: "cameras",
        categoryLabel: "Câmeras",
        price: 750.00,
        rating: 5.0,
        reviewsCount: 19,
        badge: "Cinema Pro",
        badgeColor: "amber",
        image: "https://images.unsplash.com/photo-1500462895327-4272329d46f7?q=80&w=800&auto=format&fit=crop",
        shortDesc: "Sensor 6K Global Shutter, REDCODE RAW, RF Mount.",
        description: "A RED Komodo 6K redefiniu o mercado de câmeras de cinema compactas. Com sensor Super 35 e tecnologia Global Shutter, elimina totalmente o efeito rolling shutter em cenas de movimento rápido. Produz arquivos REDCODE RAW com incrível latitude e alcance dinâmico de 16+ stops.",
        specs: [
            { label: "Sensor", value: "Super 35 19.9 MP Global Shutter" },
            { label: "Resolução", value: "6K 40fps / 4K 60fps REDCODE RAW" },
            { label: "Alcance Dinâmico", value: "16+ Stops" },
            { label: "Montagem", value: "Canon RF (Adaptável PL/EF)" },
            { label: "Saídas", value: "12G-SDI 4K 60p" }
        ],
        includedItems: [
            "1x Corpo RED Komodo 6K",
            "1x Adaptador RED Canon RF to EF com Filtro Drop-in ND",
            "1x Monitor SmallHD / Portkeys 5.5\" Touchscreen",
            "2x Cartões RED CFast 2.0 512GB",
            "1x Leitor de Cartões RED CFast USB-C",
            "2x Baterias V-Mount Nano 150Wh com Carregador Duplo",
            "1x Outrigger Handle + Baseplate SmallRig"
        ]
    },
    {
        id: "canon-c70",
        title: "Câmera Canon EOS C70 Cinema",
        category: "cameras",
        categoryLabel: "Câmeras",
        price: 420.00,
        rating: 4.9,
        reviewsCount: 27,
        badge: "DGO Sensor",
        badgeColor: "red",
        image: "https://images.unsplash.com/photo-1512790182412-b19e6d61b397?q=80&w=800&auto=format&fit=crop",
        shortDesc: "Super 35mm DGO 4K 120fps, ND Interno 2 a 10 stops, RF Mount.",
        description: "A Canon EOS C70 conecta a linha de câmeras Cinema EOS ao sistema RF. Apresenta o revolucionário sensor Super 35mm DGO (Dual Gain Output) que oferece mais de 16 stops de alcance dinâmico com ruído extremamente baixo e cores vivas da ciência Canon.",
        specs: [
            { label: "Sensor", value: "Super 35mm DGO CMOS" },
            { label: "ND Interno", value: "Motorizado de 2, 4, 6, 8 e 10 Stops" },
            { label: "Resolução", value: "4K DCI 120fps / 2K 180fps" },
            { label: "Autofocus", value: "Dual Pixel CMOS AF II com EOS iTR AF X" },
            { label: "Áudio", value: "2x Entradas Mini-XLR" }
        ],
        includedItems: [
            "1x Corpo Canon EOS C70",
            "1x Adaptador EF-EOS R 0.71x Speedbooster Original",
            "3x Baterias Canon BP-A30",
            "1x Carregador Duplo Canon",
            "2x Cartões SDXC V90 128GB",
            "1x Top Handle com Suporte de Mic"
        ]
    },
    {
        id: "sony-24-70-gm2",
        title: "Lente Sony FE 24-70mm f/2.8 GM II",
        category: "lentes",
        categoryLabel: "Lentes",
        price: 180.00,
        rating: 5.0,
        reviewsCount: 52,
        badge: "G Master flagship",
        badgeColor: "gold",
        image: "https://images.unsplash.com/photo-1607462109225-6b64ae2dd3cb?q=80&w=800&auto=format&fit=crop",
        shortDesc: "Zoom Standard G Master, Abertura f/2.8 constante, E-Mount.",
        description: "A segunda geração da 24-70mm f/2.8 G Master é a menor e mais leve lente zoom padrão f/2.8 da categoria. Oferece nitidez absurda de ponta a ponta, autofoco ultra-rápido com 4 motores lineares XD e respiração de foco praticamente nula.",
        specs: [
            { label: "Abertura Max/Min", value: "f/2.8 - f/22" },
            { label: "Distância Focal", value: "24 - 70mm" },
            { label: "Diâmetro Filtro", value: "82mm" },
            { label: "Construção", value: "20 elementos em 15 grupos" },
            { label: "Peso", value: "695 gramas" }
        ],
        includedItems: [
            "1x Lente Sony FE 24-70mm f/2.8 GM II",
            "1x Parassol Original com Janela de Filtro",
            "1x Tampas Frontal e Traseira",
            "1x Filtro UV Pro B+W 82mm",
            "1x Estojo Rígido de Transporte"
        ]
    },
    {
        id: "canon-24-70-l2",
        title: "Lente Canon EF 24-70mm f/2.8L II USM",
        category: "lentes",
        categoryLabel: "Lentes",
        price: 150.00,
        rating: 4.9,
        reviewsCount: 64,
        badge: "Série L",
        badgeColor: "red",
        image: "https://images.unsplash.com/photo-1617005082133-548c4dd27f35?q=80&w=800&auto=format&fit=crop",
        shortDesc: "Lente Zoom Profissional Série L Canon, Bokeh suave f/2.8.",
        description: "Referência absoluta para produções comerciais, documentários e eventos. A 24-70mm f/2.8L II entrega contraste fabuloso, tratamento óptico de fluorita para reduzir aberrações cromáticas e vedação completa contra poeira e respingos.",
        specs: [
            { label: "Abertura", value: "f/2.8 constante" },
            { label: "Montagem", value: "Canon EF (Adaptável RF / Sony E)" },
            { label: "Diâmetro Filtro", value: "82mm" },
            { label: "Motor de Foco", value: "Ring USM Ultra-sônico" },
            { label: "Lâminas Diafragma", value: "9 lâminas circulares" }
        ],
        includedItems: [
            "1x Lente Canon EF 24-70mm f/2.8L II USM",
            "1x Parassol EW-88C",
            "1x Filtro UV Pro",
            "1x Adaptador (EF-RF ou EF-E inclusos caso solicitado no pedido)",
            "1x Bag de Proteção Velour"
        ]
    },
    {
        id: "kit-anamorfico-sirui",
        title: "Kit Lentes Anamórficas Sirui 24/35/50mm T2.9",
        category: "lentes",
        categoryLabel: "Lentes",
        price: 450.00,
        rating: 5.0,
        reviewsCount: 14,
        badge: "Anamórfico 1.6x",
        badgeColor: "cyan",
        image: "https://images.unsplash.com/photo-1512790182412-b19e6d61b397?q=80&w=800&auto=format&fit=crop",
        shortDesc: "Squeeze Anamórfico 1.6x Full Frame, Flare Azul Cinema, E-Mount.",
        description: "Kit composto pelas lentes 24mm, 35mm e 50mm T2.9 1.6x Full Frame da Sirui. Produz o formato ultra-wide 2.4:1 ou 2.8:1 com bokeh ovalizado característico e marcantes flares azuis horizontais em fontes de luz intensa.",
        specs: [
            { label: "Fator Squeeze", value: "1.6x Anamórfico Full Frame" },
            { label: "Abertura T-Stop", value: "T2.9 até T16" },
            { label: "Montagem", value: "Sony E-Mount (Nativo)" },
            { label: "Engrenagens", value: "Módulos 0.8 M mod para Follow Focus" },
            { label: "Rotatividade Foco", value: "95.5° a 120°" }
        ],
        includedItems: [
            "1x Lente Sirui 24mm T2.9 1.6x Anamorphic",
            "1x Lente Sirui 35mm T2.9 1.6x Anamorphic",
            "1x Lente Sirui 50mm T2.9 1.6x Anamorphic",
            "3x Parassóis de Alumínio",
            "1x Hard Case Pelican sob medida com Espuma Recortada"
        ]
    },
    {
        id: "hollyland-lark-m2",
        title: "Microfone Lapela Sem Fio Hollyland Lark M2",
        category: "audio",
        categoryLabel: "Áudio",
        price: 90.00,
        rating: 4.9,
        reviewsCount: 88,
        badge: "Ultra Leve (9g)",
        badgeColor: "amber",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop",
        shortDesc: "Alcance 300m, 48kHz/24-bit, Cancelamento de ruído ENC inteligente.",
        description: "O Hollyland Lark M2 é um sistema de microfone sem fio botão incrivelmente leve (apenas 9g por transmissor). Oferece som Hi-Fi de 48kHz / 24-bit, tecnologia de cancelamento ambiental de ruído (ENC) e bateria total para até 40 horas com o case de carregamento.",
        specs: [
            { label: "Conectividade", value: "2.4GHz Digital Frequência Dupla" },
            { label: "Alcance", value: "Até 300 metros sem barreira" },
            { label: "Qualidade Áudio", value: "48kHz / 24-bit Hi-Fi" },
            { label: "Autonomia", value: "10h por TX / 40h total com case" },
            { label: "Compatibilidade", value: "Câmeras, Celulares iOS/Android, PC" }
        ],
        includedItems: [
            "2x Transmissores de Lapela Botão (TX)",
            "1x Receptor para Câmera (RX-TRS)",
            "1x Receptor Lightning / USB-C para Smartphones",
            "2x Ventas de Vento (Deadcat)",
            "1x Case de Carregamento sem Fio",
            "1x Kit Imãs e Clipes Magnéticos de Fixação"
        ]
    },
    {
        id: "rode-wireless-pro",
        title: "Kit Microfone Sem Fio Rode Wireless PRO",
        category: "audio",
        categoryLabel: "Áudio",
        price: 140.00,
        rating: 5.0,
        reviewsCount: 41,
        badge: "32-Bit Float",
        badgeColor: "gold",
        image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=800&auto=format&fit=crop",
        shortDesc: "Gravação interna 32-bit Float, Código de Tempo (Timecode) integrado.",
        description: "O sistema sem fio mais avançado do mercado. O Rode Wireless PRO conta com gravação interna em 32-bit Float com 32GB de memória por transmissor, garantindo que o seu áudio NUNCA estoure ou clipe, mesmo em momentos de grito ou sussurro imprevistos.",
        specs: [
            { label: "Gravação Interna", value: "32-bit Float / 32GB (40+ horas áudio)" },
            { label: "Timecode", value: "Gerador de Timecode interno sincronizado" },
            { label: "Tecnologia", value: "GainAssist Inteligente" },
            { label: "Alcance", value: "260 metros em linha de visada" },
            { label: "Conexão", value: "TRS 3.5mm travável + USB-C Digital" }
        ],
        includedItems: [
            "2x Transmissores Rode Wireless PRO",
            "1x Receptor com Tela Brilhante",
            "2x Microfones Lapela Rode Lavalier II de Alta Fidelidade",
            "2x Deadcats com Trava de Giro",
            "1x Case Carregador Rígido Inteligente",
            "1x Kit Completo de Cabos (TRS, TRRS, Lightning, USB-C)"
        ]
    },
    {
        id: "zoom-f6-sennheiser",
        title: "Kit Gravador Zoom F6 + Shotgun Sennheiser MKE 600",
        category: "audio",
        categoryLabel: "Áudio",
        price: 220.00,
        rating: 4.9,
        reviewsCount: 31,
        badge: "Gravação de Cinema",
        badgeColor: "red",
        image: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=800&auto=format&fit=crop",
        shortDesc: "Gravador 6 Canais 32-bit Float + Microfone Shotgun Profissional.",
        description: "Combo profissional completo para captação direta de áudio em sets de filmagem, entrevistas e curtas-metragens. O Zoom F6 possui pré-amplificadores ultra-limpos com piso de ruído de -127 dBu e gravação simultânea de 6 faixas em 32-bit Float.",
        specs: [
            { label: "Pré-amps", value: "6 Entradas XLR com phantom power +48V" },
            { label: "Profundidade de Bit", value: "32-Bit Float Dual ADC" },
            { label: "Microfone", value: "Sennheiser MKE 600 Supercardióide" },
            { label: "Timecode", value: "In/Out BNC com precisão de 0.2 ppm" },
            { label: "Alimentação", value: "Bateria Sony NP-F ou Pilhas AA ou USB-C" }
        ],
        includedItems: [
            "1x Gravador de Áudio Campo Zoom F6",
            "1x Microfone Direcional Shotgun Sennheiser MKE 600",
            "1x Vara de Boom de Fibra de Carbono 3 metros",
            "1x Dirigível/Blimp Rycote com Deadcat",
            "1x Cabo XLR Canare/Neutrik de 5 metros",
            "2x Baterias NP-F970 + Cartão SD 128GB"
        ]
    },
    {
        id: "apature-300d-2",
        title: "Iluminador LED Aputure LS 300d II COB",
        category: "iluminacao",
        categoryLabel: "Iluminação",
        price: 280.00,
        rating: 4.9,
        reviewsCount: 47,
        badge: "300W Daylight",
        badgeColor: "gold",
        image: "https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?q=80&w=800&auto=format&fit=crop",
        shortDesc: "300W Daylight 5500K, CRI/TLCI 96+, Encaixe Bowens universal.",
        description: "O Aputure LS 300d Mark II é uma luz de alta potência capaz de substituir refletores tradicionais HMI de 575W consumindo fração da energia. Compatível com todo o ecossistema Bowens (Softboxes, Fresnel, Lanternas). Controle total por aplicativo Sidus Link via Bluetooth.",
        specs: [
            { label: "Potência", value: "300 Watts de saída LED COB" },
            { label: "Temperatura de Cor", value: "5500K ±200K (Daylight)" },
            { label: "Precisão de Cor", value: "CRI 96+ / TLCI 97+" },
            { label: "Encaixe", value: "Bowens Mount" },
            { label: "Alimentação", value: "Rede 110V/220V ou 2x Baterias V-Mount" }
        ],
        includedItems: [
            "1x Cabeça Iluminadora Aputure LS 300d II",
            "1x Caixa de Controle (Control Box) All-in-one",
            "1x Refletor Hi-Hyper 55°",
            "1x Softbox Octogonal Light Dome II 90cm com Grid Honeycomb",
            "1x Tripé C-Stand Reforçado de Aço Inox com Braço de Extensão",
            "1x Bag Rígida de Transporte Aputure"
        ]
    },
    {
        id: "nanlite-pavotube-30c",
        title: "Kit Duo Bastão LED RGBWW Nanlite Pavotube II 30C",
        category: "iluminacao",
        categoryLabel: "Iluminação",
        price: 210.00,
        rating: 4.8,
        reviewsCount: 33,
        badge: "RGB Ambient",
        badgeColor: "cyan",
        image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=800&auto=format&fit=crop",
        shortDesc: "Tubo LED RGB de 120cm, Bateria interna, Efeitos pré-programados.",
        description: "Os bastões Nanlite Pavotube II 30C são ideais para luz de fundo, preenchimento criativo, luz de cabelo e efeitos luminosos como viatura policial, relâmpago, fogueira e estroboscópio. Ajuste de cor completo HSI 36.000 cores e temperatura CCT de 2700K a 7500K com ajuste G/M.",
        specs: [
            { label: "Tamanho", value: "120 cm (4 pés de comprimento)" },
            { label: "Gama CCT", value: "2700K a 7500K com Controle Green/Magenta" },
            { label: "Modos", value: "CCT, HSI RGB, Efeitos de Cena FX, Pixel FX" },
            { label: "Bateria Interna", value: "Até 2h em 100% de brilho" },
            { label: "Controle", value: "Display traseiro, Wireless 2.4G e App NANLINK" }
        ],
        includedItems: [
            "2x Tubos LED Nanlite Pavotube II 30C 120cm",
            "2x Clipes de Montagem Transparente com Rosca 1/4\"",
            "2x Cabos de Aço para Pendurar",
            "1x Fonte de Alimentação Dupla",
            "1x Bolsa de Transporte Acolchoada Duo"
        ]
    },
    {
        id: "dji-rs3-pro",
        title: "Gimbal Estabilizador DJI RS 3 Pro Combo",
        category: "estabilizadores",
        categoryLabel: "Estabilizadores",
        price: 220.00,
        rating: 4.9,
        reviewsCount: 56,
        badge: "Carga 4.5kg",
        badgeColor: "gold",
        image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?q=80&w=800&auto=format&fit=crop",
        shortDesc: "Suporta 4.5kg, Travas automáticas de eixo, Transmissão RavenEye.",
        description: "O DJI RS 3 Pro estende os recursos avançados da série Ronin, apresentando braços em fibra de carbono estendidos para acomodar câmeras de cinema como Sony FX6, RED Komodo e Canon C70 com lentes pesadas. Conta com trava automática de eixos em 1 segundo e tela OLED colorida de 1.8\".",
        specs: [
            { label: "Carga Útil", value: "Até 4.5 kg (10 lbs)" },
            { label: "Material", value: "Braços em Fibra de Carbono Monocoque" },
            { label: "Autonomia", value: "Até 12 horas de uso contínuo" },
            { label: "Recursos", value: "LiDAR Focus Autofocus + Algoritmo RS de 3ª Geração" },
            { label: "Peso do Gimbal", value: "1.14 kg" }
        ],
        includedItems: [
            "1x Estabilizador DJI RS 3 Pro",
            "1x Grip de Bateria BG30",
            "1x Motor de Foco Ronin Focus Motor (2022)",
            "1x Transmissor de Imagem sem fio Ronin RavenEye",
            "1x Manopla Briefcase Handle para tomadas baixas",
            "1x Suporte de Celular + Kit de Cabos de Controle",
            "1x Case Rígido de Transporte DJI"
        ]
    },
    {
        id: "dji-mavic-3-cine",
        title: "Drone DJI Mavic 3 Cine Premium Combo",
        category: "estabilizadores",
        categoryLabel: "Estabilizadores",
        price: 680.00,
        rating: 5.0,
        reviewsCount: 22,
        badge: "ProRes 422 HQ",
        badgeColor: "amber",
        image: "https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=800&auto=format&fit=crop",
        shortDesc: "Sensor Hasselblad 4/3 CMOS, Apple ProRes 422 HQ, SSD 1TB interno.",
        description: "A ferramenta definitiva para imagens aéreas cinematográficas. O Mavic 3 Cine grava em Apple ProRes 422 HQ em 5.1K e possui um SSD de 1TB integrado. A câmera dupla Hasselblad oferece 12.8 stops de alcance dinâmico e tecnologia Natural Colour Solution.",
        specs: [
            { label: "Câmera Principal", value: "Hasselblad 4/3 CMOS 20 MP" },
            { label: "Codecs", value: "Apple ProRes 422 HQ, H.264, H.265" },
            { label: "Resolução Vídeo", value: "5.1K a 50fps / 4K a 120fps DCI" },
            { label: "Armazenamento", value: "SSD 1TB Integrado de Ultra Velocidade" },
            { label: "Tempo de Voo", value: "Até 46 minutos por bateria" }
        ],
        includedItems: [
            "1x Drone DJI Mavic 3 Cine",
            "1x Controle Remoto DJI RC Pro com Tela de 1000 nits",
            "3x Baterias de Voo Inteligente",
            "1x Hub de Carregamento de Baterias 65W",
            "1x Kit Filtros ND Profissionais (ND4/8/16/32/64/128/256/512)",
            "1x Cabo de Dados LIGHTSPEED 10Gbps",
            "1x Bag Conversível de Transporte"
        ]
    },
    {
        id: "atomos-ninja-v-plus",
        title: "Monitor & Gravador Atomos Ninja V+ 5.2\" 8K",
        category: "acessorios",
        categoryLabel: "Acessórios",
        price: 160.00,
        rating: 4.8,
        reviewsCount: 39,
        badge: "Gravação 8K RAW",
        badgeColor: "red",
        image: "https://images.unsplash.com/photo-1563245372-f21724e3856d?q=80&w=800&auto=format&fit=crop",
        shortDesc: "Tela HDR 1000 nits, Gravação ProRes RAW 8K/4K 120fps via HDMI.",
        description: "O Ninja V+ eleva a capacidade da sua câmera gravando ProRes RAW de até 8K 30p e 4K 120p diretamente da saída HDMI de câmeras compatíveis como Sony FX3, FX30, Canon R5, Nikon Z9. Tela de alta nitidez com 1000 nits visível sob luz solar direta.",
        specs: [
            { label: "Tela", value: "5.2\" IPS Touchscreen 1920x1080 (1000 nits)" },
            { label: "Gravação", value: "ProRes RAW, ProRes HQ, DNxHR" },
            { label: "Conexões", value: "HDMI 2.0 In/Out + P2 Audio In/Out" },
            { label: "Recursos Monitor", value: "False Color, Waveform, Vectorscope, LUTs 3D" },
            { label: "Mídia", value: "SSD Master Caddy II / AtomX SSDmini" }
        ],
        includedItems: [
            "1x Monitor Gravador Atomos Ninja V+",
            "2x SSDs Angelbird AtomX 1TB em Master Caddy",
            "1x Leitor de SSD USB-C 3.1",
            "3x Baterias Sony NP-F970 + Carregador",
            "1x Cabo HDMI 8K High Speed Reforçado",
            "1x Parasol Sunhood de Proteção Solar",
            "1x Case Pelican Rígido Padrão Atomos"
        ]
    },
    {
        id: "hollyland-mars-400s-pro",
        title: "Transmissor de Vídeo Sem Fio Hollyland Mars 400S Pro",
        category: "acessorios",
        categoryLabel: "Acessórios",
        price: 140.00,
        rating: 4.9,
        reviewsCount: 42,
        badge: "Zero Latência",
        badgeColor: "cyan",
        image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=800&auto=format&fit=crop",
        shortDesc: "SDI & HDMI In/Out, Alcance 120m, Monitoramento em até 4 Celulares.",
        description: "O Hollyland Mars 400S Pro utiliza a mais recente tecnologia de codificação e decodificação 5G com latência ultra baixa de 0.08s. Oferece conexões duplas SDI e HDMI e permite enviar o sinal de vídeo simultaneamente para o receptor e até 4 tablets ou smartphones pelo App HollyView.",
        specs: [
            { label: "Alcance", value: "Até 120 metros (400 pés) sem barreiras" },
            { label: "Latência", value: "Apenas 0.08 segundos (imperceptível)" },
            { label: "Entradas/Saídas", value: "SDI 3G + HDMI no Transmissor e Receptor" },
            { label: "Taxa de Dados", value: "12 Mbps para imagens de alta fidelidade" },
            { label: "Alimentação", value: "Bateria NP-F, USB-C ou Fonte DC 6-16V" }
        ],
        includedItems: [
            "1x Transmissor Mars 400S Pro (TX)",
            "1x Receptor Mars 400S Pro (RX)",
            "5x Antenas Ganho Elevado 2.4G/5G",
            "2x Baterias NP-F750 + Carregador Duplo",
            "1x Cabo SDI Canare 50cm + Cabo HDMI Slim 50cm",
            "1x Adaptador de Sapata Articulado de Metal",
            "1x Case de Transporte com Proteção EVA"
        ]
    }
];

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
