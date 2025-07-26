document.addEventListener('DOMContentLoaded', () => {
  const message = document.getElementById('message');
  const button = document.getElementById('analyze');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentUrl = tabs[0].url;

    if (currentUrl.startsWith('https://pvp.giustizia.it/pvp/it/detail_annuncio.page') || currentUrl.startsWith('https://www.astegiudiziarie.it/vendita-asta')) {
      message.textContent = "Vuoi analizzare questo immmobile?";
      button.classList.remove('hidden');

      button.addEventListener('click', () => {
        const destination = `https://app.asteincloud.it/report/create?url=${encodeURIComponent(currentUrl)}`;
        chrome.tabs.create({ url: destination });
      });
    } else {
      message.textContent = "Questa estensione funziona solo su annunci immobiliari di pvp.giustizia.it e astegiudiziarie.it";
    }
  });
});
