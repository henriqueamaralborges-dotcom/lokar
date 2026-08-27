/**
 * Lokar Audiovisual - Admin Dashboard Logic
 * Gerencia a leitura e gravação no LocalStorage simulando um Backend (Admin Panel)
 * 
 * IMPORTANTE:
 * O index.html (frente de loja) lê a mesma chave 'produtos_lokar' do localStorage
 * definida aqui. Portanto, qualquer alteração de preço, nome ou imagem feita neste
 * painel refletirá imediatamente na loja para o cliente!
 */

// Estado Global do Admin
let adminState = {
  equipamentos: [],
  clientes: []
};

document.addEventListener('DOMContentLoaded', async () => {
  await initAdminData();
  renderDashboardStats();
  renderEquipmentsTable();
  renderCustomersTable();
  setupImagePreview();
});

/* ==========================================================================
   INICIALIZAÇÃO E SINCRONIZAÇÃO DE DADOS
   ========================================================================== */

async function initAdminData() {
  try {
    let dbEquipamentos = localStorage.getItem('produtos_lokar');
    let dbClientes = localStorage.getItem('clientes_lokar');

    // Se faltar algum dado no LocalStorage, fazemos o fetch do lokar_db.json
    if (!dbEquipamentos || !dbClientes) {
      console.info("Dados do Admin não encontrados no LocalStorage. Carregando JSON inicial...");
      const response = await fetch('./lokar_db.json');
      
      if (!response.ok) {
        throw new Error("Erro ao carregar o lokar_db.json. Certifique-se de que ele está na mesma pasta raiz do projeto.");
      }
      
      const data = await response.json();
      
      if (!dbEquipamentos) {
        localStorage.setItem('produtos_lokar', JSON.stringify(data.equipamentos));
        dbEquipamentos = JSON.stringify(data.equipamentos);
      }
      
      if (!dbClientes) {
        localStorage.setItem('clientes_lokar', JSON.stringify(data.usuarios));
        dbClientes = JSON.stringify(data.usuarios);
      }
    }

    adminState.equipamentos = JSON.parse(dbEquipamentos);
    adminState.clientes = JSON.parse(dbClientes);
    
  } catch (error) {
    console.error("Falha ao inicializar o banco de dados:", error);
    alert("Houve um erro ao carregar os dados. Verifique o console.");
  }
}

function saveEquipmentsToStorage() {
  localStorage.setItem('produtos_lokar', JSON.stringify(adminState.equipamentos));
}

/* ==========================================================================
   NAVEGAÇÃO (TABS)
   ========================================================================== */

function switchTab(tabId) {
  // Ocultar todas as tabs
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  
  // Mostrar a tab alvo
  document.getElementById(`tab-${tabId}`).classList.add('active');
  
  // Atualizar visual dos botões
  ['dashboard', 'equipments', 'customers'].forEach(id => {
    const btn = document.getElementById(`btn-${id}`);
    if (id === tabId) {
      btn.classList.add('bg-lokar-gold/10', 'text-lokar-gold');
      btn.classList.remove('text-gray-400', 'hover:bg-white/5', 'hover:text-white');
    } else {
      btn.classList.remove('bg-lokar-gold/10', 'text-lokar-gold');
      btn.classList.add('text-gray-400', 'hover:bg-white/5', 'hover:text-white');
    }
  });

  // Atualizar contadores caso voltemos pro dashboard
  if (tabId === 'dashboard') {
    renderDashboardStats();
  }
}

/* ==========================================================================
   PAINEL GERAL (DASHBOARD)
   ========================================================================== */

function renderDashboardStats() {
  document.getElementById('stat-equipments').textContent = adminState.equipamentos.length;
  document.getElementById('stat-customers').textContent = adminState.clientes.length;
  
  const totalValue = adminState.equipamentos.reduce((acc, eq) => {
    const price = parseFloat(eq['Preço Diária (R$)']) || 0;
    const stock = parseInt(eq['Estoque']) || 0;
    return acc + (price * stock);
  }, 0);
  
  document.getElementById('stat-value').textContent = `R$ ${totalValue.toFixed(2).replace('.', ',')}`;
}

/* ==========================================================================
   GERENCIAR EQUIPAMENTOS (CRUD)
   ========================================================================== */

function renderEquipmentsTable() {
  const tbody = document.getElementById('equipments-table-body');
  if (!tbody) return;

  const fallbackSrc = "https://via.placeholder.com/150x150?text=Sem+Imagem";

  tbody.innerHTML = adminState.equipamentos.map(eq => `
    <tr class="hover:bg-white/5 transition-colors group">
      <td class="p-4">
        <div class="w-12 h-12 rounded-lg bg-black/40 overflow-hidden border border-lokar-border">
          <img src="${eq['URL Imagem']}" onerror="this.onerror=null;this.src='${fallbackSrc}';" class="w-full h-full object-cover" alt="Thumb">
        </div>
      </td>
      <td class="p-4">
        <p class="font-semibold text-white">${eq['Equipamento']}</p>
        <p class="text-xs text-gray-500 font-mono mt-0.5">${eq['ID']}</p>
      </td>
      <td class="p-4">
        <span class="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-white/5 text-gray-300 border border-white/10">
          ${eq['Categoria']}
        </span>
      </td>
      <td class="p-4 text-center">
        <span class="${eq['Estoque'] > 0 ? 'text-emerald-400' : 'text-red-400'} font-bold">
          ${eq['Estoque']} un.
        </span>
      </td>
      <td class="p-4 text-right">
        <span class="font-bold text-lokar-gold">R$ ${parseFloat(eq['Preço Diária (R$)']).toFixed(2).replace('.', ',')}</span>
      </td>
      <td class="p-4">
        <div class="flex items-center justify-center gap-2">
          <button onclick="editEquipment('${eq['ID']}')" class="p-2 rounded-lg bg-white/5 text-blue-400 hover:bg-blue-500/20 transition-colors" title="Editar">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/></svg>
          </button>
          <button onclick="deleteEquipment('${eq['ID']}')" class="p-2 rounded-lg bg-white/5 text-red-400 hover:bg-red-500/20 transition-colors" title="Excluir">
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
          </button>
        </div>
      </td>
    </tr>
  `).join('');
}

function deleteEquipment(id) {
  if (confirm(`Tem certeza que deseja excluir o equipamento ID: ${id}?`)) {
    adminState.equipamentos = adminState.equipamentos.filter(eq => eq['ID'] !== id);
    saveEquipmentsToStorage();
    renderEquipmentsTable();
    renderDashboardStats();
  }
}

/* ==========================================================================
   MODAL DE EDIÇÃO / CRIAÇÃO
   ========================================================================== */

function openEquipmentModal() {
  document.getElementById('equipment-form').reset();
  document.getElementById('form-id').value = '';
  document.getElementById('modal-title').textContent = 'Novo Equipamento';
  document.getElementById('form-image-preview').src = '';
  document.getElementById('equipment-modal').classList.remove('hidden');
}

function closeEquipmentModal() {
  document.getElementById('equipment-modal').classList.add('hidden');
}

function editEquipment(id) {
  const eq = adminState.equipamentos.find(item => item['ID'] === id);
  if (!eq) return;

  document.getElementById('modal-title').textContent = 'Editar Equipamento';
  document.getElementById('form-id').value = eq['ID'];
  document.getElementById('form-title').value = eq['Equipamento'];
  document.getElementById('form-category').value = eq['Categoria'];
  document.getElementById('form-price').value = eq['Preço Diária (R$)'];
  document.getElementById('form-stock').value = eq['Estoque'];
  document.getElementById('form-status').value = eq['Status'];
  document.getElementById('form-image').value = eq['URL Imagem'];
  
  document.getElementById('form-image-preview').src = eq['URL Imagem'];

  document.getElementById('equipment-modal').classList.remove('hidden');
}

function saveEquipment() {
  const idInput = document.getElementById('form-id').value;
  
  const newEq = {
    "ID": idInput || `NEW-${Date.now().toString().slice(-4)}`,
    "Categoria": document.getElementById('form-category').value,
    "Equipamento": document.getElementById('form-title').value,
    "Preço Diária (R$)": parseFloat(document.getElementById('form-price').value),
    "Estoque": parseInt(document.getElementById('form-stock').value, 10),
    "Status": document.getElementById('form-status').value,
    "URL Imagem": document.getElementById('form-image').value
  };

  if (idInput) {
    // Atualizar existente
    const index = adminState.equipamentos.findIndex(item => item['ID'] === idInput);
    if (index !== -1) {
      adminState.equipamentos[index] = newEq;
    }
  } else {
    // Criar novo
    adminState.equipamentos.unshift(newEq);
  }

  saveEquipmentsToStorage();
  renderEquipmentsTable();
  renderDashboardStats();
  closeEquipmentModal();
}

function setupImagePreview() {
  const imageInput = document.getElementById('form-image');
  const preview = document.getElementById('form-image-preview');
  
  imageInput.addEventListener('input', (e) => {
    preview.src = e.target.value;
  });
}

/* ==========================================================================
   CLIENTES CADASTRADOS
   ========================================================================== */

function renderCustomersTable() {
  const tbody = document.getElementById('customers-table-body');
  if (!tbody) return;

  tbody.innerHTML = adminState.clientes.map(cli => `
    <tr class="hover:bg-white/5 transition-colors">
      <td class="p-4 font-mono text-xs text-gray-500">${cli['ID Cliente']}</td>
      <td class="p-4 font-semibold text-white">${cli['Nome']}</td>
      <td class="p-4 text-gray-400">${cli['Email']}</td>
      <td class="p-4 text-lokar-gold">${cli['Telefone']}</td>
      <td class="p-4 text-gray-400">${cli['Data Cadastro']}</td>
    </tr>
  `).join('');
}
