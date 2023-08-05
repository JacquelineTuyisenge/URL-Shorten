document.addEventListener('DOMContentLoaded', () => {
    const urlForm = document.getElementById('url-form');
    const linkInput = document.getElementById('link');
    const errorMessage = document.getElementById('error-message');
    const shortenedLinksList = document.getElementById('shortened-links');

    urlForm.addEventListener('submit', (event) => {
	event.preventDefault();

	const url = linkInput.value.trim();

	if (url === '') {
	    errorMessage.textContent = 'please enter a URL';
	    return;
	}

	const shortenedUrl = shortenUrl(url);

	addShortenedLink(url, shortenedUrl);

	linkInput.value = '';
	errorMessage.textContent = '';
      });

      shortenedLinksLists.addEventListener('click', (event) => {
           if (event.target.classList.contains('copy-button')) {
	       const shortenedLink = event.target.getAttribute('data-link');
	       copyToClipboard(shortenedLink);
	   }
   });


    loadShortenedLinks();
});

function shortenUrl(url) {
    return 'shortened-link';
}

function addShortenedLink(originalUrl, shortenedUrl) {
    const shortenedLinksList = document.getElementById('shortened-links');

    li.innerHTML = `
    <p><strong>Original URL:</strong> ${originalUrl}</p>
    <p><strong>Shortened URL:</strong> ${shortenedUrl}</p>
    <button class="copy-button" data-link="${shortenedUrl}">Copy</button>
  `;

    shortenedLinksList.appendChild(li);

    const savedLinks = JSON.parse(localStorage.getItem('shortenedLinks')) || [];
    savedLinks.push({ originalUrl, shortenedUrl });
    localStorage.setItem('shortenedLinks', JSON.stringify(savedLinks));
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert('Link copied to clipboard!');
      })
      .catch((error) => {
        console.error('Failed to copy text: ', error);
      });
}

function loadShortenedLinks() {
    const savedLinks = JSON.parse(localStorage.getItem('shortenedLinks')) || [];
    const shortenedLinksList = document.getElementById('shortened-links');

    savedLinks.forEach((link) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <p><strong>Original URL:</strong> ${link.originalUrl}</p>
        <p><strong>Shortened URL:</strong> ${link.shortenedUrl}</p>
        <button class="copy-button" data-link="${link.shortenedUrl}">Copy</button>
      `;
      shortenedLinksList.appendChild(li);
    });
}
