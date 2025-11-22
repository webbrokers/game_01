// Логика админ-панели Zaymer2

// --- State Management ---
let currentOffers = getOffers();
let currentCodes = localStorage.getItem('zaymer_codes') || '';

// Ensure all offers have altLinks array (migration for old data)
currentOffers.forEach(offer => {
    if (!offer.altLinks) offer.altLinks = [];
});

// --- Mobile Sidebar Logic ---
const menuBtn = document.getElementById('menuBtn');
const overlay = document.getElementById('overlay');
const body = document.body;
const sidebar = document.getElementById('sidebar');

function toggleSidebar() {
    body.classList.toggle('sidebar-open');
}

function closeSidebar() {
    body.classList.remove('sidebar-open');
}

menuBtn.addEventListener('click', toggleSidebar);
overlay.addEventListener('click', closeSidebar);

// --- Navigation ---
const navLinks = document.querySelectorAll('.nav-link');
const tabs = document.querySelectorAll('.tab-content');
const pageTitle = document.getElementById('page-title');

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        // Remove active class from all
        navLinks.forEach(l => l.classList.remove('active'));
        tabs.forEach(t => t.classList.remove('active'));

        // Add active to current
        link.classList.add('active');
        const tabId = link.getAttribute('data-tab') + '-tab';
        document.getElementById(tabId).classList.add('active');

        // Update Title
        pageTitle.textContent = link.getAttribute('data-title');

        // Close sidebar on mobile
        closeSidebar();
    });
});

// --- Dirty State Logic ---
const saveBtn = document.getElementById('saveBtn');
let isDirty = false;

function markAsDirty() {
    if (!isDirty) {
        isDirty = true;
        saveBtn.classList.add('active');
        saveBtn.textContent = 'Сохранить изменения';
    }
}

function markAsClean() {
    isDirty = false;
    saveBtn.classList.remove('active');
    saveBtn.textContent = 'Сохранено';

    setTimeout(() => {
        if (!isDirty) saveBtn.textContent = 'Сохранить изменения';
    }, 2000);
}

// --- Renders ---

function renderAll() {
    renderPositions();
    renderDescriptions();
    renderLinks();
    renderCodes();
}

// 1. Positions Tab
function renderPositions() {
    const list = document.getElementById('positions-list');
    list.innerHTML = '';

    currentOffers.forEach((offer, index) => {
        const div = document.createElement('div');
        div.className = 'offer-item';
        div.draggable = true;
        div.dataset.index = index;

        div.innerHTML = `
                <div class="item-left-group">
                    <div class="position-number">${index + 1}</div>
                    <div class="handle">☰</div>
                    <div class="offer-controls">
                        <button class="btn-icon" onclick="moveItem(${index}, -1)" title="Вверх">↑</button>
                        <button class="btn-icon" onclick="moveItem(${index}, 1)" title="Вниз">↓</button>
                    </div>
                </div>
                <div class="offer-preview">
                    <img src="${offer.logo}" alt="logo">
                    <div>
                        <strong>${offer.amount}</strong><br>
                        <small>${offer.term}</small>
                    </div>
                </div>
                <button class="btn-edit-pos" onclick="openEditModal(${index})">
                    <span class="text">Редактировать</span>
                    <span class="icon">✏️</span>
                </button>
            `;
        addDragEvents(div);
        list.appendChild(div);
    });
}

// 2. Descriptions Tab
function renderDescriptions() {
    const list = document.getElementById('descriptions-list');
    list.innerHTML = '';

    currentOffers.forEach((offer, index) => {
        const div = document.createElement('div');
        div.className = 'card desc-card';
        div.innerHTML = `
                <div class="logo-section">
                    <img src="${offer.logo}" id="preview-${index}">
                    <input type="file" id="file-${index}" style="display:none" accept="image/*" onchange="handleFileUpload(${index}, this)">
                    <button class="btn-add" onclick="document.getElementById('file-${index}').click()" style="width:100%; margin-bottom:5px;">Загрузить лого</button>
                    <input type="text" value="${offer.logo}" oninput="updateField(${index}, 'logo', this.value)" placeholder="URL логотипа" style="width:100%; font-size:10px;">
                </div>
                <div class="fields-section">
                    <div class="form-group">
                        <label>Сумма</label>
                        <input type="text" value="${offer.amount}" oninput="updateField(${index}, 'amount', this.value)">
                    </div>
                    <div class="form-group">
                        <label>Срок</label>
                        <input type="text" value="${offer.term}" oninput="updateField(${index}, 'term', this.value)">
                    </div>
                    <div class="form-group full-width">
                        <label>Текст бейджа</label>
                        <input type="text" value="${offer.badgeText}" oninput="updateField(${index}, 'badgeText', this.value)">
                    </div>
                </div>
            `;
        list.appendChild(div);
    });
}

// 3. Links Tab
function renderLinks() {
    const list = document.getElementById('links-list');
    list.innerHTML = '';

    currentOffers.forEach((offer, index) => {
        const div = document.createElement('div');
        div.className = 'card link-card';

        let altLinksHtml = '';
        if (offer.altLinks && offer.altLinks.length > 0) {
            offer.altLinks.forEach((link, linkIndex) => {
                altLinksHtml += `
                        <div class="alt-link-item">
                            <input type="text" value="${link}" oninput="updateAltLink(${index}, ${linkIndex}, this.value)" placeholder="Альтернативная ссылка">
                            <button class="btn-remove" onclick="removeAltLink(${index}, ${linkIndex})">×</button>
                        </div>
                    `;
            });
        }

        div.innerHTML = `
                <div class="offer-preview" style="margin-bottom: 10px; border-bottom: 1px solid #eee; padding-bottom: 5px;">
                    <img src="${offer.logo}" style="width: 30px; margin: 0 10px;">
                    <strong>${offer.amount}</strong>
                </div>
                <div class="form-group">
                    <label>Основная ссылка</label>
                    <input type="text" value="${offer.link}" oninput="updateField(${index}, 'link', this.value)">
                </div>
                <div class="form-group">
                    <label>Альтернативные ссылки</label>
                    <div class="alt-links-list">
                        ${altLinksHtml}
                        <button class="btn-add" onclick="addAltLink(${index})">+ Добавить ссылку</button>
                    </div>
                </div>
            `;
        list.appendChild(div);
    });
}

// 4. Codes Tab
function renderCodes() {
    document.getElementById('custom-code').value = currentCodes;
}

// --- Modal Logic ---
const modal = document.getElementById('editModal');
let modalAltLinks = []; // Temp storage for alt links in modal

function openEditModal(index) {
    const offer = currentOffers[index];
    document.getElementById('modal-index').value = index;
    document.getElementById('modal-logo-url').value = offer.logo;
    document.getElementById('modal-logo-preview').src = offer.logo;
    document.getElementById('modal-amount').value = offer.amount;
    document.getElementById('modal-term').value = offer.term;
    document.getElementById('modal-badge').value = offer.badgeText;
    document.getElementById('modal-link').value = offer.link;

    // Handle file input reset
    document.getElementById('modal-logo-file').value = '';

    // Handle Alt Links
    modalAltLinks = [...(offer.altLinks || [])];
    renderModalAltLinks();

    modal.classList.add('active');
}

function closeModal() {
    modal.classList.remove('active');
}

function renderModalAltLinks() {
    const container = document.getElementById('modal-alt-links');
    container.innerHTML = '';
    modalAltLinks.forEach((link, i) => {
        container.innerHTML += `
                <div class="alt-link-item">
                    <input type="text" value="${link}" oninput="updateModalAltLink(${i}, this.value)">
                    <button class="btn-remove" onclick="removeModalAltLink(${i})">×</button>
                </div>
            `;
    });
}

function addModalAltLink() {
    modalAltLinks.push('');
    renderModalAltLinks();
}

function updateModalAltLink(i, val) {
    modalAltLinks[i] = val;
}

function removeModalAltLink(i) {
    modalAltLinks.splice(i, 1);
    renderModalAltLinks();
}

// Handle Modal File Upload
document.getElementById('modal-logo-file').addEventListener('change', function (e) {
    if (this.files && this.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            document.getElementById('modal-logo-url').value = e.target.result;
            document.getElementById('modal-logo-preview').src = e.target.result;
        };
        reader.readAsDataURL(this.files[0]);
    }
});

function saveModal() {
    const index = document.getElementById('modal-index').value;
    currentOffers[index] = {
        ...currentOffers[index],
        logo: document.getElementById('modal-logo-url').value,
        amount: document.getElementById('modal-amount').value,
        term: document.getElementById('modal-term').value,
        badgeText: document.getElementById('modal-badge').value,
        link: document.getElementById('modal-link').value,
        altLinks: [...modalAltLinks]
    };
    markAsDirty();
    renderAll();
    closeModal();
}

// --- Actions ---

function updateField(index, field, value) {
    currentOffers[index][field] = value;
    markAsDirty();
}

function updateAltLink(offerIndex, linkIndex, value) {
    currentOffers[offerIndex].altLinks[linkIndex] = value;
    markAsDirty();
}

function addAltLink(index) {
    currentOffers[index].altLinks.push('');
    markAsDirty();
    renderLinks();
}

function removeAltLink(offerIndex, linkIndex) {
    currentOffers[offerIndex].altLinks.splice(linkIndex, 1);
    markAsDirty();
    renderLinks();
}

function handleFileUpload(index, input) {
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
            currentOffers[index].logo = e.target.result;
            markAsDirty();
            renderAll();
        };
        reader.readAsDataURL(input.files[0]);
    }
}

// --- Drag and Drop ---
let dragStartIndex;

function addDragEvents(item) {
    const handle = item.querySelector('.handle');

    handle.addEventListener('mousedown', () => {
        item.setAttribute('draggable', 'true');
    });

    item.addEventListener('dragstart', () => {
        dragStartIndex = +item.getAttribute('data-index');
        item.classList.add('dragging');
    });

    item.addEventListener('dragover', (e) => e.preventDefault());

    item.addEventListener('drop', () => {
        const dragEndIndex = +item.getAttribute('data-index');
        swapItems(dragStartIndex, dragEndIndex);
        item.classList.remove('dragging');
    });

    item.addEventListener('dragenter', () => item.classList.add('over'));
    item.addEventListener('dragleave', () => item.classList.remove('over'));

    item.addEventListener('dragend', () => {
        item.classList.remove('dragging');
        document.querySelectorAll('.offer-item').forEach(i => i.classList.remove('over'));
    });
}

function swapItems(fromIndex, toIndex) {
    const itemOne = currentOffers[fromIndex];
    const itemTwo = currentOffers[toIndex];
    currentOffers[fromIndex] = itemTwo;
    currentOffers[toIndex] = itemOne;
    markAsDirty();
    renderAll();
}

function moveItem(index, direction) {
    const newIndex = index + direction;
    if (newIndex >= 0 && newIndex < currentOffers.length) {
        swapItems(index, newIndex);
    }
}

// --- Save ---
saveBtn.addEventListener('click', () => {
    // Save Offers
    saveOffers(currentOffers);

    // Save Codes
    const codes = document.getElementById('custom-code').value;
    localStorage.setItem('zaymer_codes', codes);
    currentCodes = codes;

    markAsClean();
    renderAll(); // Refresh to ensure clean state
});

// Initial Render
renderAll();
