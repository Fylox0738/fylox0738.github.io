// Sample modules data structure
let modulesData = {
    categories: [
        { id: 'performance', name: 'Performans', icon: '⚡', count: 0 },
        { id: 'battery', name: 'Pil Optimizasyonu', icon: '🔋', count: 0 },
        { id: 'audio', name: 'Ses Modülleri', icon: '🔊', count: 0 },
        { id: 'ui', name: 'Arayüz', icon: '🎨', count: 0 },
        { id: 'system', name: 'Sistem', icon: '⚙️', count: 0 },
        { id: 'security', name: 'Güvenlik', icon: '🔒', count: 0 },
        { id: 'network', name: 'Ağ', icon: '📡', count: 0 },
        { id: 'camera', name: 'Kamera', icon: '📷', count: 0 }
    ],
    modules: []
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    loadModulesFromJSON();
});

// Load modules from JSON file
async function loadModulesFromJSON() {
    try {
        const response = await fetch('modules.json');
        if (response.ok) {
            const data = await response.json();
            if (data.modules) {
                modulesData.modules = data.modules;
            }
            if (data.categories) {
                modulesData.categories = data.categories;
            }
            updateCategoryCounts();
            loadCategories();
            loadModules();
            setupFilterButtons();
            setupEventListeners();
        } else {
            // If JSON file doesn't exist, use default data
            updateCategoryCounts();
            loadCategories();
            loadModules();
            setupFilterButtons();
            setupEventListeners();
        }
    } catch (error) {
        console.log('modules.json dosyası bulunamadı. Varsayılan veriler kullanılıyor.');
        updateCategoryCounts();
        loadCategories();
        loadModules();
        setupFilterButtons();
        setupEventListeners();
    }
}

// Load categories
function loadCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (!categoriesGrid) return;
    
    categoriesGrid.innerHTML = '';

    modulesData.categories.forEach(category => {
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.onclick = () => filterByCategory(category.id);
        
        categoryCard.innerHTML = `
            <div class="category-icon">${category.icon}</div>
            <div class="category-name">${category.name}</div>
            <div class="category-count">${category.count} modül</div>
        `;
        
        categoriesGrid.appendChild(categoryCard);
    });
}

// Load modules
function loadModules() {
    const modulesGrid = document.getElementById('modulesGrid');
    if (!modulesGrid) return;
    
    modulesGrid.innerHTML = '';

    if (modulesData.modules.length === 0) {
        modulesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                <p style="font-size: 1.2rem; margin-bottom: 1rem;">Henüz modül eklenmemiş</p>
                <p>Modülleri modules.json dosyasına ekleyerek siteyi güncelleyebilirsiniz.</p>
            </div>
        `;
        return;
    }

    modulesData.modules.forEach(module => {
        const moduleCard = document.createElement('div');
        moduleCard.className = 'module-card';
        moduleCard.onclick = () => showModuleDetails(module);
        
        const category = modulesData.categories.find(cat => cat.id === module.category);
        
        moduleCard.innerHTML = `
            <div class="module-header">
                <div>
                    <div class="module-name">${escapeHtml(module.name)}</div>
                    <span class="module-category">${category ? category.name : module.category}</span>
                </div>
            </div>
            <div class="module-description">${escapeHtml(module.description || 'Açıklama bulunmuyor')}</div>
            <div class="module-footer">
                <span class="module-author">👤 ${escapeHtml(module.author || 'Bilinmiyor')}</span>
                <span class="module-version">v${escapeHtml(module.version || '1.0.0')}</span>
            </div>
        `;
        
        modulesGrid.appendChild(moduleCard);
    });
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Filter modules by category
function filterByCategory(categoryId) {
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => btn.classList.remove('active'));
    
    const activeBtn = Array.from(filterButtons).find(btn => btn.dataset.category === categoryId);
    if (activeBtn) {
        activeBtn.classList.add('active');
    }

    const modulesGrid = document.getElementById('modulesGrid');
    if (!modulesGrid) return;
    
    modulesGrid.innerHTML = '';

    const filteredModules = categoryId === 'all' 
        ? modulesData.modules 
        : modulesData.modules.filter(module => module.category === categoryId);

    if (filteredModules.length === 0) {
        modulesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                <p>Bu kategoride modül bulunamadı.</p>
            </div>
        `;
        return;
    }

    filteredModules.forEach(module => {
        const moduleCard = document.createElement('div');
        moduleCard.className = 'module-card';
        moduleCard.onclick = () => showModuleDetails(module);
        
        const category = modulesData.categories.find(cat => cat.id === module.category);
        
        moduleCard.innerHTML = `
            <div class="module-header">
                <div>
                    <div class="module-name">${escapeHtml(module.name)}</div>
                    <span class="module-category">${category ? category.name : module.category}</span>
                </div>
            </div>
            <div class="module-description">${escapeHtml(module.description || 'Açıklama bulunmuyor')}</div>
            <div class="module-footer">
                <span class="module-author">👤 ${escapeHtml(module.author || 'Bilinmiyor')}</span>
                <span class="module-version">v${escapeHtml(module.version || '1.0.0')}</span>
            </div>
        `;
        
        modulesGrid.appendChild(moduleCard);
    });

    // Scroll to modules section
    const modulesSection = document.getElementById('modules');
    if (modulesSection) {
        modulesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Search functionality
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;
    
    const searchTerm = searchInput.value.toLowerCase().trim();

    if (!searchTerm) {
        loadModules();
        return;
    }

    const modulesGrid = document.getElementById('modulesGrid');
    if (!modulesGrid) return;
    
    modulesGrid.innerHTML = '';

    const filteredModules = modulesData.modules.filter(module => {
        const nameMatch = module.name.toLowerCase().includes(searchTerm);
        const descMatch = module.description && module.description.toLowerCase().includes(searchTerm);
        const authorMatch = module.author && module.author.toLowerCase().includes(searchTerm);
        const categoryMatch = module.category.toLowerCase().includes(searchTerm);
        
        return nameMatch || descMatch || authorMatch || categoryMatch;
    });

    if (filteredModules.length === 0) {
        modulesGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-secondary);">
                <p style="font-size: 1.2rem; margin-bottom: 1rem;">Arama sonucu bulunamadı</p>
                <p>"${escapeHtml(searchTerm)}" için eşleşen modül yok.</p>
            </div>
        `;
        return;
    }

    filteredModules.forEach(module => {
        const moduleCard = document.createElement('div');
        moduleCard.className = 'module-card';
        moduleCard.onclick = () => showModuleDetails(module);
        
        const category = modulesData.categories.find(cat => cat.id === module.category);
        
        moduleCard.innerHTML = `
            <div class="module-header">
                <div>
                    <div class="module-name">${highlightSearchTerm(module.name, searchTerm)}</div>
                    <span class="module-category">${category ? category.name : module.category}</span>
                </div>
            </div>
            <div class="module-description">${highlightSearchTerm(module.description || 'Açıklama bulunmuyor', searchTerm)}</div>
            <div class="module-footer">
                <span class="module-author">👤 ${escapeHtml(module.author || 'Bilinmiyor')}</span>
                <span class="module-version">v${escapeHtml(module.version || '1.0.0')}</span>
            </div>
        `;
        
        modulesGrid.appendChild(moduleCard);
    });

    const modulesSection = document.getElementById('modules');
    if (modulesSection) {
        modulesSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Highlight search term
function highlightSearchTerm(text, term) {
    if (!term) return escapeHtml(text);
    const escapedText = escapeHtml(text);
    const regex = new RegExp(`(${escapeHtml(term)})`, 'gi');
    return escapedText.replace(regex, '<mark style="background: rgba(99, 102, 241, 0.3); padding: 2px 4px; border-radius: 3px;">$1</mark>');
}

// Show module details in modal
function showModuleDetails(module) {
    const modal = document.getElementById('moduleModal');
    const modalBody = document.getElementById('modalBody');
    
    if (!modal || !modalBody) return;
    
    const category = modulesData.categories.find(cat => cat.id === module.category);
    
    modalBody.innerHTML = `
        <h2 style="font-size: 2rem; margin-bottom: 1rem; background: var(--gradient-1); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">${escapeHtml(module.name)}</h2>
        <div style="margin-bottom: 1.5rem;">
            <span class="module-category" style="font-size: 0.9rem;">${category ? category.name : module.category}</span>
            <span class="module-version" style="margin-left: 1rem;">v${escapeHtml(module.version || '1.0.0')}</span>
        </div>
        <div style="margin-bottom: 1.5rem; color: var(--text-secondary);">
            <strong style="color: var(--text-primary);">Açıklama:</strong>
            <p style="margin-top: 0.5rem; line-height: 1.6;">${escapeHtml(module.description || 'Açıklama bulunmuyor')}</p>
        </div>
        <div style="margin-bottom: 1.5rem;">
            <strong style="color: var(--text-primary);">Yazar:</strong>
            <span style="color: var(--text-secondary); margin-left: 0.5rem;">${escapeHtml(module.author || 'Bilinmiyor')}</span>
        </div>
        ${module.downloadUrl ? `
            <div style="margin-top: 2rem; display: flex; gap: 1rem; flex-wrap: wrap;">
                <a href="${escapeHtml(module.downloadUrl)}" target="_blank" style="background: var(--gradient-1); color: white; padding: 0.75rem 2rem; border-radius: 25px; text-decoration: none; font-weight: 600; transition: transform 0.3s; display: inline-block;">
                    📥 İndir
                </a>
                ${module.githubUrl ? `<a href="${escapeHtml(module.githubUrl)}" target="_blank" style="background: var(--bg-dark); color: var(--text-primary); padding: 0.75rem 2rem; border-radius: 25px; text-decoration: none; font-weight: 600; border: 1px solid var(--border-color); transition: transform 0.3s; display: inline-block;">
                    🔗 GitHub
                </a>` : ''}
            </div>
        ` : ''}
    `;
    
    modal.style.display = 'block';
}

// Setup event listeners
function setupEventListeners() {
    // Search on Enter key
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }

    // Close modal
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.onclick = function() {
            const modal = document.getElementById('moduleModal');
            if (modal) {
                modal.style.display = 'none';
            }
        };
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        const modal = document.getElementById('moduleModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Smooth scroll for nav links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
}

// Update category counts
function updateCategoryCounts() {
    modulesData.categories.forEach(category => {
        category.count = modulesData.modules.filter(module => module.category === category.id).length;
    });
}

// Setup filter buttons dynamically
function setupFilterButtons() {
    const filterButtons = document.querySelector('.filter-buttons');
    if (!filterButtons) return;
    
    filterButtons.innerHTML = '<button class="filter-btn active" data-category="all">Tümü</button>';
    
    modulesData.categories.forEach(category => {
        if (category.count > 0) {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.dataset.category = category.id;
            btn.textContent = category.name;
            btn.addEventListener('click', function() {
                document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                filterByCategory(this.dataset.category);
            });
            filterButtons.appendChild(btn);
        }
    });
}

