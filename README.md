# 🎬 Lokar - Locação de Equipamentos Audiovisuais

Este repositório contém a aplicação web completa e estática para a **Lokar Audiovisual**, um e-commerce interativo de locação de equipamentos de cinema, vídeo e broadcast.

---

## 🚀 Funcionalidades do Projeto

- **Design Cinematográfico Premium**: Interface moderníssima desenvolvida em Modo Escuro com acentos dourados (`Amber/Gold`), efeito Glassmorphic, sombras radiantes e tipografia Google Fonts (`Outfit` + `Plus Jakarta Sans`).
- **Navegação & Filtros em Tempo Real**:
  - Busca instantânea por palavra-chave (câmera, marca, modelo, especificações).
  - Filtros por Categorias: *Câmeras, Lentes, Áudio, Iluminação, Drones & Estabilizadores, Acessórios*.
  - Ordenação por relevância, menor/maior preço de diária e avaliação.
- **Modal de Detalhes Técnicos**: Exibe especificações completas (sensor, suporte a codecs, ISO, montagem) e checklist de itens inclusos no kit/maleta.
- **Carrinho de Locação com LocalStorage**:
  - Adição/remoção de itens com feedback visual (Toast Notifications & badge pulsante).
  - Seletor de período de locação (1 a 30 dias).
  - Cálculo automático de subtotal e descontos progressivos (até 35% de desconto para locações estendidas).
- **Checkout via WhatsApp (Orçamento Instantâneo)**:
  - Botão *"Solicitar Orçamento via WhatsApp"* que compõe uma mensagem rica e formatada com a lista de equipamentos, dias de locação, subtotal, descontos e link direto para o atendimento via `wa.me`.

---

## 🛠️ Tecnologias Utilizadas

- **HTML5 Semântico**: Estruturação acessível com SEO otimizado.
- **Tailwind CSS (via CDN)**: Estilização utilitária rápida e responsiva.
- **Vanilla JavaScript ES6+**: Arquitetura leve e desacoplada sem necessidade de compiladores ou Node.js.
- **LocalStorage API**: Persistência de carrinho no navegador do usuário.

---

## 📋 Guia de Deploy Passo a Passo no GitHub Pages

Para publicar este site e deixá-lo **online instantaneamente e gratuitamente** no link `https://henriqueamaralborges-dotcom.github.io/lokar/`, siga as etapas abaixo:

### Passo 1: Inicializar o Repositório Git Local (caso ainda não tenha feito)

Abra o terminal na pasta do projeto e execute os comandos:

```bash
git init
git add .
git commit -m "feat: site de locação Lokar completo com carrinho e WhatsApp"
git branch -M main
```

### Passo 2: Vincular ao Repositório do GitHub

Conecte ao seu repositório no GitHub:

```bash
git remote add origin https://github.com/henriqueamaralborges-dotcom/lokar.git
git push -u origin main --force
```

*(Se preferir utilizar a interface gráfica do **GitHub Desktop** ou **VS Code**, basta abrir a pasta do projeto, publicar na branch `main` do repositório `henriqueamaralborges-dotcom/lokar`).*

---

### Passo 3: Ativar o GitHub Pages

1. Acesse o seu repositório no navegador: [https://github.com/henriqueamaralborges-dotcom/lokar](https://github.com/henriqueamaralborges-dotcom/lokar)
2. No menu superior do repositório, clique em **Settings** (Configurações ⚙️).
3. No menu lateral esquerdo (seção *Code and automation*), clique em **Pages**.
4. Em **Build and deployment**:
   - **Source**: Selecione **Deploy from a branch**.
   - **Branch**: Selecione a branch `main` e a pasta `/ (root)`.
   - Clique em **Save** (Salvar).

---

### ⏱️ Pronto!
Em cerca de 1 a 2 minutos, o GitHub Pages concluirá a publicação e seu site estará no ar no endereço:

👉 **[https://henriqueamaralborges-dotcom.github.io/lokar/](https://henriqueamaralborges-dotcom.github.io/lokar/)**

---

## 📞 Contato Lokar Audiovisual

- **WhatsApp / Telefone**: (11) 99999-9999
- **E-mail**: contato@lokaraudiovisual.com.br
- **Endereço**: Av. Paulista, 1000 - Bela Vista, São Paulo - SP
