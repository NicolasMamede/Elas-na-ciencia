document.querySelectorAll('img[data-fallback]').forEach(imagem => {
  imagem.onerror = () => {
    const reserva = imagem.dataset.fallback;
    if (!reserva) return;
    imagem.removeAttribute('data-fallback');
    imagem.src = reserva;

    const legenda = imagem.closest('figure')?.querySelector('figcaption');
    if (legenda) legenda.textContent = 'Imagem de apoio';
  };

  if (imagem.complete && !imagem.naturalWidth) imagem.onerror();
});
