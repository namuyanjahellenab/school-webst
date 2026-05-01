// ========== SIMPLE RANDOM QUOTES ==========
const quotes = [
    { text: "Education is the most powerful weapon.", author: "Nelson Mandela" },
    { text: "Learning is fun!", author: "School director" },
    { text: "Believe in yourself.", author: "Kagoda Hamidu" },
    { text: "In Boston we share knowledge and grow together.", author: "HE. MUBIRU TECH" },
    { text: "dont procrastinate", author: "Hellena B" }
]

function showRandomQuote() {
    const quoteElement = document.getElementById('quote-display');
    
    // Check if element exists
    if (!quoteElement) {
        console.error('Quote display element not found');
        return;
    }
    
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteElement.innerHTML = `"${randomQuote.text}" <br>— ${randomQuote.author}`;
    
    // Trigger fade animation
    quoteElement.style.animation = 'none';
    setTimeout(() => {
        quoteElement.style.animation = 'fadeIn 0.5s ease-in';
    }, 10);
}

window.addEventListener('load', function() {
    setTimeout(showRandomQuote, 2000);
    
    // Add click listener to button if it exists
    const quoteBtn = document.getElementById('new-quote-btn');
    if (quoteBtn) {
        quoteBtn.addEventListener('click', showRandomQuote);
    }
});