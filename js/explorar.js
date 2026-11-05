const botoes = document.querySelectorAll('.explore-option');
const imagem = document.querySelector('#coreImage');

botoes.forEach(botao => {
  botao.addEventListener('click', () => {
    botoes.forEach(item => {
      const ativo = item === botao;
      item.classList.toggle('is-active', ativo);
      item.setAttribute('aria-pressed', ativo);
    });

    document.querySelector('#coreTitle').textContent = botao.dataset.title;
    document.querySelector('#coreText').textContent = botao.dataset.text;
    document.querySelector('#coreCount').textContent = botao.dataset.count;
    document.querySelector('#coreLink').href = botao.dataset.link;
    imagem.src = botao.dataset.image;
    imagem.alt = botao.dataset.alt;

  });
});
