/**
 * Lokar Audiovisual - Core Application Logic
 * Standard Vanilla JS Application with LocalStorage state management and JSON DB fetch
 */

// Global App State
const state = {
  cart: [], // [{ id, quantity }]
  selectedCategory: 'todos',
  searchQuery: '',
  sortBy: 'featured',
  rentalDays: 1, // Default 1 day
  phoneNumber: '5511999999999', // WhatsApp contact number
  produtos: [] // Loaded from DB
};

// Initialize App
document.addEventListener('DOMContentLoaded', async () => {
  await loadDatabase();
  loadCartFromStorage();
  renderCategoryTabs();
  renderProducts();
  updateCartUI();
  setupEventListeners();
});

/* ==========================================================================
   DATABASE SEED & LOCAL STORAGE
   ========================================================================== */

async function loadDatabase() {
  try {
    let dbData = localStorage.getItem('produtos_lokar');

    // Se não tiver localmente, faz fetch do arquivo JSON
    if (!dbData) {
      console.info("Carregando banco de dados pela primeira vez...");
      const response = await fetch('./lokar_db.json');
      if (!response.ok) throw new Error('Não foi possível ler o arquivo lokar_db.json');

      const data = await response.json();
      // Salva array bruto original no localStorage
      localStorage.setItem('produtos_lokar', JSON.stringify(data.equipamentos));
      dbData = JSON.stringify(data.equipamentos);
    }

    const rawEquipamentos = JSON.parse(dbData);

    // Transforma o schema do DB no schema usado na UI da aplicação
    state.produtos = rawEquipamentos.map(item => {
      // Normaliza as strings da categoria ("Câmeras" -> "cameras") 
      // para combinar com os IDs definidos em CATEGORIES no products.js
      let catId = "acessorios";
      const catLabel = item.Categoria || "";
      if (catLabel.includes("Câmeras")) catId = "cameras";
      else if (catLabel.includes("Lentes")) catId = "lentes";
      else if (catLabel.includes("Áudio")) catId = "audio";
      else if (catLabel.includes("Iluminação")) catId = "iluminacao";
      else if (catLabel.includes("Estabilizadores") || catLabel.includes("Drone")) catId = "estabilizadores";

      return {
        id: item.ID,
        title: item.Equipamento,
        category: catId,
        categoryLabel: item.Categoria,
        price: item["Preço Diária (R$)"],
        rating: 4.9, // Mock default para produtos recém cadastrados
        reviewsCount: Math.floor(Math.random() * 50) + 5, // Mock gerado
        badge: item.Status === "Ativo" ? "Destaque" : "",
        badgeColor: "amber",
        image: item["URL Imagem"],
        shortDesc: "Equipamento profissional de alta confiabilidade. Revisado, testado e pronto para locação, acompanhando itens de uso básico.",
        description: "Seu kit será despachado em maletas rígidas no padrão cinema Pelican (quando aplicável). Equipamento submetido a rigoroso programa de manutenção preventiva da Lokar, assegurando durabilidade nas diárias do seu set de filmagem.",
        specs: [
          { label: "Categoria Padrão", value: item.Categoria },
          { label: "Código Interno (SKU)", value: item.ID },
          { label: "Unidades em Estoque", value: item.Estoque },
          { label: "Status Geral do Item", value: item.Status }
        ],
        includedItems: [
          `1x ${item.Equipamento} (Corpo/Unidade Principal)`,
          "Kit de Acessórios Originais Padrão de Fábrica",
          "Case/Bag de Proteção e Transporte",
          "Lacre de Segurança Lokar Quality Assurance"
        ]
      };
    });
  } catch (error) {
    console.error("Falha ao carregar banco de dados JSON:", error);
    showToast("Erro ao conectar base de produtos. Verifique sua rede.", "error");
    state.produtos = [];
  }
}

/* ==========================================================================
   LOCALSTORAGE CART MANAGEMENT
   ========================================================================== */

function loadCartFromStorage() {
  try {
    const savedCart = localStorage.getItem('lokar_cart_v1');
    const savedDays = localStorage.getItem('lokar_rental_days');
    if (savedCart) {
      state.cart = JSON.parse(savedCart);
    }
    if (savedDays) {
      state.rentalDays = parseInt(savedDays, 10) || 1;
    }
  } catch (e) {
    console.error('Erro ao carregar carrinho do LocalStorage:', e);
    state.cart = [];
  }
}

function saveCartToStorage() {
  try {
    localStorage.setItem('lokar_cart_v1', JSON.stringify(state.cart));
    localStorage.setItem('lokar_rental_days', state.rentalDays.toString());
  } catch (e) {
    console.error('Erro ao salvar no LocalStorage:', e);
  }
}

function addToCart(productId) {
  const product = state.produtos.find(p => p.id === productId);
  if (!product) return;

  const existingItem = state.cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({ id: productId, quantity: 1 });
  }

  saveCartToStorage();
  updateCartUI();
  animateCartBadge();
  showToast(`"${product.title}" adicionado ao carrinho!`, 'success');
}

function removeFromCart(productId) {
  const product = state.produtos.find(p => p.id === productId);
  state.cart = state.cart.filter(item => item.id !== productId);
  saveCartToStorage();
  updateCartUI();
  if (product) {
    showToast(`"${product.title}" removido do carrinho.`, 'info');
  }
}

function updateQuantity(productId, delta) {
  const item = state.cart.find(item => item.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    removeFromCart(productId);
    return;
  }

  saveCartToStorage();
  updateCartUI();
}

function setRentalDays(days) {
  state.rentalDays = Math.max(1, parseInt(days, 10) || 1);
  saveCartToStorage();
  updateCartUI();
}

function clearCart() {
  state.cart = [];
  saveCartToStorage();
  updateCartUI();
  showToast('Carrinho limpo.', 'info');
}

/* ==========================================================================
   CART CALCULATIONS & UI RENDERING
   ========================================================================== */

function calculateCartTotals() {
  let dailySubtotal = 0;
  let itemCount = 0;

  state.cart.forEach(cartItem => {
    const product = state.produtos.find(p => p.id === cartItem.id);
    if (product) {
      dailySubtotal += product.price * cartItem.quantity;
      itemCount += cartItem.quantity;
    }
  });

  // Calculate Discount based on rental days
  const discountObj = RENTAL_PERIOD_DISCOUNTS.slice().reverse().find(d => state.rentalDays >= d.days) || { discount: 0, label: '' };
  const discountRate = discountObj.discount;

  const subtotalTotalDays = dailySubtotal * state.rentalDays;
  const discountAmount = subtotalTotalDays * discountRate;
  const grandTotal = subtotalTotalDays - discountAmount;

  return {
    dailySubtotal,
    itemCount,
    discountRate,
    discountAmount,
    subtotalTotalDays,
    grandTotal
  };
}

function updateCartUI() {
  const totals = calculateCartTotals();

  // Update Badge Count
  const badgeEl = document.getElementById('cart-badge');
  if (badgeEl) {
    badgeEl.textContent = totals.itemCount;
    if (totals.itemCount > 0) {
      badgeEl.classList.remove('hidden');
    } else {
      badgeEl.classList.add('hidden');
    }
  }

  // Update Cart Drawer Items Container
  const cartItemsContainer = document.getElementById('cart-drawer-items');
  const cartEmptyState = document.getElementById('cart-empty-state');
  const cartFooter = document.getElementById('cart-drawer-footer');

  if (state.cart.length === 0) {
    if (cartItemsContainer) cartItemsContainer.classList.add('hidden');
    if (cartEmptyState) cartEmptyState.classList.remove('hidden');
    if (cartFooter) cartFooter.classList.add('hidden');
  } else {
    if (cartItemsContainer) {
      cartItemsContainer.classList.remove('hidden');
      cartItemsContainer.innerHTML = state.cart.map(cartItem => {
        const product = state.produtos.find(p => p.id === cartItem.id);
        if (!product) return '';
        const itemTotalDaily = product.price * cartItem.quantity;

        // Fallback placeholder logic
        const fallbackSrc = "https://via.placeholder.com/150x150?text=Sem+Imagem";

        return `
          <div class="flex items-center gap-4 bg-[#141A26] p-3 rounded-xl border border-white/10 relative group">
            <img 
              src="${product.image}" 
              onerror="this.onerror=null;this.src='${fallbackSrc}';" 
              alt="${product.title}" 
              class="w-16 h-16 object-cover rounded-lg bg-black/40 flex-shrink-0" 
            />
            <div class="flex-1 min-w-0">
              <h4 class="text-sm font-semibold text-white truncate">${product.title}</h4>
              <p class="text-xs text-amber-400 font-medium">R$ ${product.price.toFixed(2).replace('.', ',')} / dia</p>
              <div class="flex items-center gap-2 mt-2">
                <div class="flex items-center bg-[#0B0F17] rounded-lg border border-white/10 px-2 py-0.5">
                  <button onclick="updateQuantity('${product.id}', -1)" class="text-gray-400 hover:text-white text-sm font-bold px-1 transition-colors">-</button>
                  <span class="text-xs font-semibold px-2 text-white">${cartItem.quantity}</span>
                  <button onclick="updateQuantity('${product.id}', 1)" class="text-gray-400 hover:text-white text-sm font-bold px-1 transition-colors">+</button>
                </div>
                <span class="text-xs text-gray-400">Total: R$ ${itemTotalDaily.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>
            <button onclick="removeFromCart('${product.id}')" class="text-gray-500 hover:text-red-400 p-1.5 transition-colors" title="Remover item">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
            </button>
          </div>
        `;
      }).join('');
    }
    if (cartEmptyState) cartEmptyState.classList.add('hidden');
    if (cartFooter) cartFooter.classList.remove('hidden');
  }

  // Update Rental Days Selector Buttons
  const daysSelect = document.getElementById('rental-days-select');
  if (daysSelect) {
    daysSelect.value = state.rentalDays;
  }

  // Update Price Breakdown Display
  const dailySubtotalEl = document.getElementById('cart-daily-subtotal');
  const discountRowEl = document.getElementById('cart-discount-row');
  const discountAmountEl = document.getElementById('cart-discount-amount');
  const grandTotalEl = document.getElementById('cart-grand-total');

  if (dailySubtotalEl) dailySubtotalEl.textContent = `R$ ${totals.dailySubtotal.toFixed(2).replace('.', ',')}`;

  if (discountRowEl && discountAmountEl) {
    if (totals.discountRate > 0) {
      discountRowEl.classList.remove('hidden');
      discountAmountEl.textContent = `- R$ ${totals.discountAmount.toFixed(2).replace('.', ',')} (${(totals.discountRate * 100)}% off)`;
    } else {
      discountRowEl.classList.add('hidden');
    }
  }

  if (grandTotalEl) {
    grandTotalEl.textContent = `R$ ${totals.grandTotal.toFixed(2).replace('.', ',')}`;
  }
}

function animateCartBadge() {
  const badgeEl = document.getElementById('cart-badge');
  if (badgeEl) {
    badgeEl.classList.remove('badge-pulse');
    void badgeEl.offsetWidth; // Trigger reflow
    badgeEl.classList.add('badge-pulse');
  }
}

/* ==========================================================================
   WHATSAPP INTEGRATION & QUOTE GENERATOR
   ========================================================================== */

function generateWhatsAppQuote() {
  if (state.cart.length === 0) {
    showToast('Adicione equipamentos ao carrinho antes de solicitar orçamento.', 'error');
    return;
  }

  const totals = calculateCartTotals();
  const days = state.rentalDays;

  let message = `🎬 *ORÇAMENTO DE LOCAÇÃO - LOKAR AUDIOVISUAL*\n`;
  message += `==================================\n\n`;
  message += `📅 *Duração da Locação:* ${days} ${days === 1 ? 'diária' : 'dias'}\n\n`;
  message += `📦 *EQUIPAMENTOS SELECIONADOS:*\n`;

  state.cart.forEach((cartItem, idx) => {
    const product = state.produtos.find(p => p.id === cartItem.id);
    if (product) {
      const itemDaily = product.price * cartItem.quantity;
      message += `${idx + 1}. *${cartItem.quantity}x ${product.title}*\n`;
      message += `   • Diária un.: R$ ${product.price.toFixed(2).replace('.', ',')}\n`;
      message += `   • Subtotal/dia: R$ ${itemDaily.toFixed(2).replace('.', ',')}\n\n`;
    }
  });

  message += `----------------------------------\n`;
  message += `💵 *Soma das Diárias:* R$ ${totals.dailySubtotal.toFixed(2).replace('.', ',')} / dia\n`;
  message += `🗓️ *Subtotal (${days} dias):* R$ ${totals.subtotalTotalDays.toFixed(2).replace('.', ',')}\n`;

  if (totals.discountRate > 0) {
    message += `🏷️ *Desconto Especial (${totals.discountRate * 100}% off):* -R$ ${totals.discountAmount.toFixed(2).replace('.', ',')}\n`;
  }

  message += `💰 *VALOR TOTAL ESTIMADO:* *R$ ${totals.grandTotal.toFixed(2).replace('.', ',')}*\n`;
  message += `==================================\n\n`;
  message += `Olá equipe Lokar! Gostaria de verificar a disponibilidade dos itens acima para as minhas datas de produção.`;

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${state.phoneNumber}?text=${encodedMessage}`;

  window.open(whatsappUrl, '_blank');
}

/* ==========================================================================
   PRODUCT CATALOG RENDERING & FILTERING
   ========================================================================== */

function renderCategoryTabs() {
  const container = document.getElementById('category-tabs');
  if (!container) return;

  container.innerHTML = CATEGORIES.map(cat => {
    const isActive = state.selectedCategory === cat.id;
    return `
      <button 
        onclick="setCategory('${cat.id}')"
        class="category-tab px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all duration-200 border border-white/10 ${isActive
        ? 'active bg-amber-500 text-black shadow-lg shadow-amber-500/20'
        : 'bg-[#141A26] text-gray-300 hover:bg-[#1A2333] hover:text-white'
      }"
      >
        ${cat.name}
      </button>
    `;
  }).join('');
}

function setCategory(catId) {
  state.selectedCategory = catId;
  renderCategoryTabs();
  renderProducts();
}

function getFilteredProducts() {
  let list = state.produtos.slice();

  // Filter Category
  if (state.selectedCategory !== 'todos') {
    list = list.filter(p => p.category === state.selectedCategory);
  }

  // Filter Search Query
  if (state.searchQuery.trim() !== '') {
    const q = state.searchQuery.toLowerCase();
    list = list.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.categoryLabel.toLowerCase().includes(q) ||
      p.shortDesc.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.id.toLowerCase().includes(q)
    );
  }

  // Sort Filter
  if (state.sortBy === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (state.sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  }

  return list;
}

function renderProducts() {
  const grid = document.getElementById('products-grid');
  const emptyMessage = document.getElementById('no-products-message');
  if (!grid) return;

  const filtered = getFilteredProducts();

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyMessage) emptyMessage.classList.remove('hidden');
    return;
  }

  if (emptyMessage) emptyMessage.classList.add('hidden');

  // Fallback para caso imagem falhe ou suma do Unsplash
  const fallbackSrc = "https://via.placeholder.com/500x300?text=Sem+Imagem";

  grid.innerHTML = filtered.map(product => {
    return `
      <div class="glass-card rounded-2xl overflow-hidden flex flex-col group">
        <!-- Image & Badge Container -->
        <div class="relative h-60 overflow-hidden bg-black/50 cursor-pointer" onclick="openProductModal('${product.id}')">
          <img 
            src="${product.image}" 
            onerror="this.onerror=null;this.src='${fallbackSrc}';"
            alt="${product.title}" 
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-[#131A26] via-transparent to-transparent opacity-80"></div>
          
          <!-- Category Badge -->
          <span class="absolute top-3 left-3 text-xs font-semibold px-3 py-1 rounded-full badge-${product.badgeColor}">
            ${product.badge || product.categoryLabel}
          </span>

          <!-- Rating -->
          <div class="absolute top-3 right-3 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-1 rounded-full flex items-center gap-1 text-xs text-amber-400 font-semibold">
            <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <span>${product.rating}</span>
            <span class="text-gray-400 font-normal">(${product.reviewsCount})</span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <h3 
              onclick="openProductModal('${product.id}')"
              class="text-lg font-bold text-white group-hover:text-amber-400 transition-colors cursor-pointer line-clamp-1"
            >
              ${product.title}
            </h3>
            <p class="text-xs text-gray-400 mt-1.5 line-clamp-2 leading-relaxed">
              ${product.shortDesc}
            </p>
          </div>

          <!-- Price & CTA -->
          <div class="mt-6 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
            <div>
              <span class="text-xs text-gray-400 block uppercase tracking-wider font-semibold">Valor Diária</span>
              <span class="text-xl font-extrabold text-white">
                R$ ${product.price.toFixed(2).replace('.', ',')}
                <span class="text-xs font-normal text-amber-400">/dia</span>
              </span>
            </div>

            <div class="flex items-center gap-2">
              <button 
                onclick="openProductModal('${product.id}')"
                class="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors border border-white/10"
                title="Ver Detalhes Técinicos"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
              </button>

              <button 
                onclick="addToCart('${product.id}')"
                class="px-4 py-2.5 rounded-xl btn-gold-glow text-black font-extrabold text-sm flex items-center gap-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/></svg>
                Alugar
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/* ==========================================================================
   PRODUCT DETAILS MODAL
   ========================================================================== */

function openProductModal(productId) {
  const product = state.produtos.find(p => p.id === productId);
  if (!product) return;

  const modal = document.getElementById('product-modal');
  const modalContent = document.getElementById('modal-content-container');
  if (!modal || !modalContent) return;

  const fallbackSrc = "https://via.placeholder.com/500x300?text=Sem+Imagem";

  modalContent.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <!-- Image Showcase -->
      <div class="space-y-4">
        <div class="relative h-80 rounded-2xl overflow-hidden bg-black/60 border border-white/10">
          <img 
            src="${product.image}" 
            onerror="this.onerror=null;this.src='${fallbackSrc}';"
            alt="${product.title}" 
            class="w-full h-full object-cover" 
          />
          <span class="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full badge-${product.badgeColor}">
            ${product.badge || product.categoryLabel}
          </span>
        </div>

        <div class="bg-[#141A26] p-4 rounded-2xl border border-white/10">
          <h4 class="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-2">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            Itens Inclusos na Maleta / Kit
          </h4>
          <ul class="space-y-1.5 text-xs text-gray-300">
            ${product.includedItems.map(item => `
              <li class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-amber-400"></span>
                ${item}
              </li>
            `).join('')}
          </ul>
        </div>
      </div>

      <!-- Specs & Rental Info -->
      <div class="flex flex-col justify-between">
        <div>
          <div class="flex items-center gap-2 text-xs text-amber-400 font-semibold mb-1">
            <span>${product.categoryLabel.toUpperCase()}</span>
            <span>•</span>
            <div class="flex items-center gap-1">
              <svg class="w-3.5 h-3.5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
              <span>${product.rating} (${product.reviewsCount} avaliações)</span>
            </div>
          </div>

          <h2 class="text-2xl font-extrabold text-white">${product.title}</h2>
          <p class="text-sm text-gray-300 mt-3 leading-relaxed">${product.description}</p>

          <!-- Specifications Table -->
          <div class="mt-6">
            <h4 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Especificações Técnicas</h4>
            <div class="bg-[#141A26] rounded-xl border border-white/10 divide-y divide-white/5">
              ${product.specs.map(s => `
                <div class="flex justify-between items-center px-4 py-2.5 text-xs">
                  <span class="text-gray-400 font-medium">${s.label}</span>
                  <span class="text-white font-semibold text-right">${s.value}</span>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Action Footer -->
        <div class="mt-8 pt-4 border-t border-white/10 flex items-center justify-between gap-4">
          <div>
            <span class="text-xs text-gray-400 block uppercase">Valor por diária</span>
            <span class="text-2xl font-black text-white">R$ ${product.price.toFixed(2).replace('.', ',')}</span>
          </div>

          <button 
            onclick="addToCart('${product.id}'); closeModal();"
            class="px-6 py-3 rounded-xl btn-gold-glow text-black font-extrabold text-sm flex items-center gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            Adicionar ao Carrinho
          </button>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  const modal = document.getElementById('product-modal');
  if (modal) modal.classList.add('hidden');
  document.body.style.overflow = '';
}

/* ==========================================================================
   TOAST SYSTEM & UI INTERACTIVITY
   ========================================================================== */

function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'border-red-500' : ''}`;

  const icon = type === 'error'
    ? `<svg class="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`
    : `<svg class="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/></svg>`;

  toast.innerHTML = `
    ${icon}
    <span class="text-sm font-semibold text-white">${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-out');
    toast.addEventListener('animationend', () => toast.remove());
  }, 3500);
}

function setupEventListeners() {
  // Search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderProducts();
    });
  }

  // Sort selector
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderProducts();
    });
  }

  // Rental Days selector in Cart
  const daysSelect = document.getElementById('rental-days-select');
  if (daysSelect) {
    daysSelect.addEventListener('change', (e) => {
      setRentalDays(e.target.value);
    });
  }

  // Cart Drawer Toggles
  const openCartBtn = document.getElementById('open-cart-btn');
  const closeCartBtn = document.getElementById('close-cart-btn');
  const cartBackdrop = document.getElementById('cart-backdrop');
  const cartDrawer = document.getElementById('cart-drawer');

  function openCart() {
    if (cartDrawer && cartBackdrop) {
      cartBackdrop.classList.remove('hidden');
      cartDrawer.classList.remove('translate-x-full');
      cartDrawer.classList.add('translate-x-0');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeCart() {
    if (cartDrawer && cartBackdrop) {
      cartDrawer.classList.remove('translate-x-0');
      cartDrawer.classList.add('translate-x-full');
      cartBackdrop.classList.add('hidden');
      document.body.style.overflow = '';
    }
  }

  if (openCartBtn) openCartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartBackdrop) cartBackdrop.addEventListener('click', closeCart);

  // Close Modal Keydown ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeModal();
      closeCart();
    }
  });

  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileNav.classList.toggle('hidden');
    });
  }
}
