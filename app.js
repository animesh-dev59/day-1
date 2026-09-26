const quoteGrid = document.getElementById('quoteGrid');
const searchInput = document.getElementById('searchInput');
const categoryContainer = document.getElementById('categoryContainer');
const noResults = document.getElementById('noResults');
const randomBtn = document.getElementById('randomBtn');

const authorModal = document.getElementById('authorModal');
const modalContentBox = document.getElementById('modalContentBox');
const modalAuthorName = document.getElementById('modalAuthorName');
const modalAuthorBio = document.getElementById('modalAuthorBio');
const closeModal = document.getElementById('closeModal');

let currentCategory = 'all';
let currentSearch = '';

// Render Cards Function
function renderQuotes(data) {
    quoteGrid.innerHTML = '';
    if (data.length === 0) {
        noResults.classList.remove('hidden');
        return;
    }
    noResults.classList.add('hidden');

    data.forEach(q => {
        const card = document.createElement('div');
        card.className = "bg-slate-800/60 border border-slate-700/80 rounded-2xl p-6 flex flex-col justify-between cursor-pointer relative group hover:-translate-y-1 hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-500/5 transition-all duration-300";
        card.innerHTML = `
            <div>
                <div class="flex items-center justify-between mb-4">
                    <span class="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-slate-700/50 text-amber-400 font-semibold border border-amber-500/10">
                        ${getCategoryName(q.category)}
                    </span>
                    <span class="text-xs text-slate-500">#${q.id}</span>
                </div>
                <p class="text-slate-200 text-base md:text-lg leading-relaxed mb-6">
                    "${q.text}"
                </p>
            </div>
            <div class="flex items-center justify-between border-t border-slate-700/50 pt-4 mt-2">
                <span class="text-xs text-slate-400 italic group-hover:text-amber-400 transition">
                    👉 প্রবক্তা দেখতে ক্লিক করুন
                </span>
                <span class="text-amber-400 text-sm font-semibold opacity-0 group-hover:opacity-100 transition transform translate-x-2 group-hover:translate-x-0">
                    রিভিল &rarr;
                </span>
            </div>
        `;

        // Click event to open Modal with Author Info
        card.addEventListener('click', () => {
            modalAuthorName.textContent = q.author;
            modalAuthorBio.textContent = q.bio;
            authorModal.classList.remove('hidden');
            setTimeout(() => {
                authorModal.classList.remove('opacity-0');
                modalContentBox.classList.remove('scale-95');
                modalContentBox.classList.add('scale-100');
            }, 10);
        });

        quoteGrid.appendChild(card);
    });
}

function getCategoryName(cat) {
    switch(cat) {
        case 'success': return 'সাফল্য';
        case 'hardwork': return 'কঠোর পরিশ্রম';
        case 'failure': return 'ব্যর্থতা ও ঘুরে দাঁড়ানো';
        case 'mindset': return 'মানসিক শক্তি';
        default: return 'সাধারণ';
    }
}

// Filter Logic
function filterAndRender() {
    let filtered = quotes.filter(q => {
        const matchesCat = currentCategory === 'all' || q.category === currentCategory;
        const matchesSearch = q.text.toLowerCase().includes(currentSearch.toLowerCase()) || 
                              q.author.toLowerCase().includes(currentSearch.toLowerCase());
        return matchesCat && matchesSearch;
    });
    renderQuotes(filtered.slice(0, 50));
}

// Search Event
searchInput.addEventListener('input', (e) => {
    currentSearch = e.target.value.trim();
    filterAndRender();
});

// Category Click Events
categoryContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('cat-btn')) {
        document.querySelectorAll('.cat-btn').forEach(btn => {
            btn.classList.remove('bg-amber-500', 'text-slate-950', 'shadow-md');
            btn.classList.add('bg-slate-800/80', 'text-slate-300', 'border', 'border-slate-700/50');
        });
        e.target.classList.remove('bg-slate-800/80', 'text-slate-300', 'border', 'border-slate-700/50');
        e.target.classList.add('bg-amber-500', 'text-slate-950', 'shadow-md');

        currentCategory = e.target.getAttribute('data-cat');
        filterAndRender();
    }
});

// Random Quote Generator
randomBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const q = quotes[randomIndex];
    modalAuthorName.textContent = q.author;
    modalAuthorBio.textContent = `${q.bio} — উক্তি: "${q.text}"`;
    authorModal.classList.remove('hidden');
    setTimeout(() => {
        authorModal.classList.remove('opacity-0');
        modalContentBox.classList.remove('scale-95');
        modalContentBox.classList.add('scale-100');
    }, 10);
});

// Close Modal Events
function closeModalFn() {
    authorModal.classList.add('opacity-0');
    modalContentBox.classList.remove('scale-100');
    modalContentBox.classList.add('scale-95');
    setTimeout(() => {
        authorModal.classList.add('hidden');
    }, 300);
}

closeModal.addEventListener('click', closeModalFn);
authorModal.addEventListener('click', (e) => {
    if (e.target === authorModal) closeModalFn();
});

// Initial Render
renderQuotes(quotes.slice(0, 50));