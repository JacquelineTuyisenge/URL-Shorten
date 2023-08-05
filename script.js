// JavaScript for URL Shortening App

document.addEventListener('DOMContentLoaded', () => {
  const urlForm = document.getElementById('url-form');
  const linkInput = document.getElementById('link');
  const errorMessage = document.getElementById('error-message');
  const shortenedLinksList = document.getElementById('shortened-links');
  const shortUrlContainer = document.getElementById('shortened-url');
  const shortUrlText = document.getElementById('short-url');
  const copyShortUrlButton = document.getElementById('copy-short-url');

  urlForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const url = linkInput.value.trim();

    if (url === '') {
      errorMessage.textContent = 'Please enter a URL.';
      return;
    }

    try {
      const response = await fetch(`https://api.tinyurl.com/dev/api?url=${encodeURIComponent(url)}`);
      const data = await response.json();

      if (response.ok) {
        const shortUrl = data.tiny_url;
        shortUrlText.textContent = shortUrl;
        shortUrlContainer.style.display = 'block';
      } else {
        errorMessage.textContent = 'Error shortening the URL.';
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

    const shortenedUrl = shortenUrl(url);
    addShortenedLink(url, shortenedUrl);

    linkInput.value = '';
    errorMessage.textContent = '';
  });

  copyShortUrlButton.addEventListener('click', () => {
    const shortUrl = shortUrlText.textContent;
    copyToClipboard(shortUrl);
  });

  loadShortenedLinks();
});

function shortenUrl(url) {
  // Replace this with your actual URL shortening logic
  return 'shortened-link';
}

function addShortenedLink(originalUrl, shortenedUrl) {
  const shortenedLinksList = document.getElementById('shortened-links');
  const li = document.createElement('li');
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
