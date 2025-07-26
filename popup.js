document.addEventListener('DOMContentLoaded', () => {
  const message = document.getElementById('message');
  const button = document.getElementById('analyze');

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const currentUrl = tabs[0].url;

    if (currentUrl.startsWith('https://pvp.giustizia.it/pvp/it/detail_annuncio.page') || currentUrl.startsWith('https://www.astegiudiziarie.it/vendita-asta')) {
      message.innerHTML = "Analizza l'immobile in pochi minuti. <br><strong>Ottieni subito un report dettagliato.</strong>";
      button.textContent = "Ottieni Report";
      button.classList.remove('hidden');
      

      button.addEventListener('click', () => {
        const destination = `https://app.asteincloud.it/report/create?url=${encodeURIComponent(currentUrl)}`;
        chrome.tabs.create({ url: destination });
      });
    } else if (currentUrl.startsWith('https://pvp.giustizia.it') || currentUrl.startsWith('https://www.astegiudiziarie.it')) {
      message.textContent = "Visita la pagina di un immobile per avviare l'analisi automatica.";
      message.classList.add('message-info');
    }
    else {
      message.innerHTML = `Questa estensione è compatibile solo con i portali <a href="https://pvp.giustizia.it/pvp/" target="_blank">PVP</a> e <a href="https://www.astegiudiziarie.it/" target="_blank">AsteGiudiziarie.it</a>.`;
      message.classList.add('message-warning');
    }
  });
});
