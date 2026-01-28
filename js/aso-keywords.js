// Store keywords with their counts and order
const keywords = new Map(); // keyword -> { count: number, order: number }
let entryOrder = 0;
let totalEntries = 0;
let duplicateCount = 0;
let currentSort = 'order';

// DOM Elements
const input = document.getElementById('keyword-input');
const container = document.getElementById('keywords-container');
const notification = document.getElementById('notification');
const clearBtn = document.getElementById('clear-btn');
const sortBtns = document.querySelectorAll('.sort-btn');
const wordList = document.getElementById('word-list');
const minCountSelect = document.getElementById('min-count');

// Handle input
input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        processInput();
    }
});

input.addEventListener('input', (e) => {
    const value = e.target.value;
    if (value.includes(',')) {
        processInput();
    }
});

// Sort buttons
sortBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        sortBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentSort = btn.dataset.sort;
        renderKeywords();
    });
});

// Min count filter
minCountSelect.addEventListener('change', () => {
    renderWordFrequency();
});

// Clear all
clearBtn.addEventListener('click', () => {
    keywords.clear();
    entryOrder = 0;
    totalEntries = 0;
    duplicateCount = 0;
    renderKeywords();
    renderWordFrequency();
    updateStats();
    showNotification('All keywords cleared');
});

function processInput() {
    const value = input.value;
    const parts = value.split(',');
    
    parts.forEach(part => {
        const keyword = part.trim().toLowerCase();
        if (keyword) {
            addKeyword(keyword);
        }
    });
    
    input.value = '';
}

function addKeyword(keyword) {
    totalEntries++;
    
    if (keywords.has(keyword)) {
        // Duplicate found
        const data = keywords.get(keyword);
        data.count++;
        duplicateCount++;
        showNotification(`"${keyword}" count increased to ${data.count}`, true);
        
        // Flash the existing tag
        const existingTag = document.querySelector(`[data-keyword="${CSS.escape(keyword)}"]`);
        if (existingTag) {
            existingTag.classList.remove('duplicate-flash');
            void existingTag.offsetWidth; // Trigger reflow
            existingTag.classList.add('duplicate-flash');
        }
    } else {
        // New keyword
        keywords.set(keyword, { count: 1, order: entryOrder++ });
        showNotification(`Added "${keyword}"`);
    }
    
    renderKeywords();
    renderWordFrequency();
    updateStats();
}

function removeKeyword(keyword) {
    const data = keywords.get(keyword);
    if (data) {
        totalEntries -= data.count;
        duplicateCount -= (data.count - 1);
        keywords.delete(keyword);
        renderKeywords();
        renderWordFrequency();
        updateStats();
        showNotification(`Removed "${keyword}"`);
    }
}

function getSortedKeywords() {
    const entries = Array.from(keywords.entries());
    
    switch (currentSort) {
        case 'alpha':
            return entries.sort((a, b) => a[0].localeCompare(b[0]));
        case 'count':
            return entries.sort((a, b) => b[1].count - a[1].count);
        case 'order':
        default:
            return entries.sort((a, b) => a[1].order - b[1].order);
    }
}

function renderKeywords() {
    if (keywords.size === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <div class="empty-state-icon">🏷️</div>
                <p>No keywords yet. Start typing above!</p>
            </div>
        `;
        return;
    }

    const sorted = getSortedKeywords();
    container.innerHTML = sorted.map(([keyword, data]) => `
        <div class="keyword-tag" data-keyword="${keyword}">
            <span class="keyword-text">${escapeHtml(keyword)}</span>
            ${data.count > 1 ? `<span class="keyword-count">×${data.count}</span>` : ''}
            <button class="remove-btn" onclick="removeKeyword('${escapeJs(keyword)}')" title="Remove keyword">×</button>
        </div>
    `).join('');
}

function getWordFrequencies() {
    const wordCounts = new Map();
    
    // Go through each keyword and count individual words
    for (const [keyword, data] of keywords) {
        // Split keyword into words (handles multi-word keywords)
        const words = keyword.split(/\s+/).filter(w => w.length > 0);
        
        for (const word of words) {
            // Multiply by keyword count to account for duplicate keywords
            const currentCount = wordCounts.get(word) || 0;
            wordCounts.set(word, currentCount + data.count);
        }
    }
    
    // Convert to array and sort by count (descending)
    return Array.from(wordCounts.entries())
        .sort((a, b) => b[1] - a[1]);
}

function renderWordFrequency() {
    const minCount = parseInt(minCountSelect.value, 10);
    const frequencies = getWordFrequencies().filter(([word, count]) => count >= minCount);
    
    if (keywords.size === 0) {
        wordList.innerHTML = '<p class="word-frequency-empty">Add keywords to see word frequency analysis</p>';
        return;
    }
    
    if (frequencies.length === 0) {
        wordList.innerHTML = `<p class="word-frequency-empty">No words appear ${minCount}+ times. Try lowering the filter.</p>`;
        return;
    }
    
    const maxCount = frequencies[0][1]; // Highest count for bar scaling
    
    wordList.innerHTML = frequencies.map(([word, count]) => {
        const percentage = (count / maxCount) * 100;
        return `
            <div class="word-item">
                <span class="word-item-text">${escapeHtml(word)}</span>
                <div class="word-item-bar">
                    <div class="word-item-bar-fill" style="width: ${percentage}%"></div>
                </div>
                <span class="word-item-count">${count} ${count === 1 ? 'use' : 'uses'}</span>
            </div>
        `;
    }).join('');
}

function updateStats() {
    document.getElementById('unique-count').textContent = keywords.size;
    document.getElementById('total-count').textContent = totalEntries;
    document.getElementById('duplicate-count').textContent = duplicateCount;
}

function showNotification(message, isDuplicate = false) {
    notification.textContent = message;
    notification.className = 'notification' + (isDuplicate ? ' duplicate' : '');
    notification.classList.add('show');
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function escapeJs(text) {
    return text.replace(/'/g, "\\'").replace(/"/g, '\\"');
}
