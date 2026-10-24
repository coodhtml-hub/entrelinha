const profiles = {
  luiza: { name: 'Luiza Martins', username: '@luizamartins', initials: 'LM', avatar: 'avatar-luiza', bio: 'Sempre com um romance na bolsa. Leitora de finais felizes.', joined: 'Por aqui desde março de 2025', reads: 24, reviews: 18, friends: 36, current: 'Tudo é rio', author: 'Carla Madeira · começou há 4 dias', progress: 68, coverText: 'TUDO<br>É RIO', books: [
    { title: 'Torto arado', author: 'Itamar Vieira Junior', cover: 'green', rating: '★★★★★', started: '12 mai. 2026', finished: '28 mai. 2026', comment: 'Uma história que fica ecoando depois da última página. A escrita me atravessou de um jeito muito bonito.' },
    { title: 'Tudo é rio', author: 'Carla Madeira', cover: 'coral', status: 'Lendo agora', started: '20 out. 2026', comment: 'Ainda estou no começo, mas já sinto que vou pensar muito nessa história.' },
    { title: 'A biblioteca da meia-noite', author: 'Matt Haig', cover: 'blue', rating: '★★★★☆', started: '03 abr. 2026', finished: '15 abr. 2026', comment: 'Me fez pensar nas vidas que a gente imagina e nas escolhas que realmente faz.' },
    { title: 'A paciente silenciosa', author: 'Alex Michaelides', cover: 'plum', rating: '★★★★☆', started: '02 mar. 2026', finished: '11 mar. 2026', spoiler: true, comment: 'A revelação perto do final mudou completamente como eu entendi a narradora. Precisei voltar algumas páginas!' }
  ]},
  caio: { name: 'Caio Nunes', username: '@caionunes', initials: 'CN', avatar: 'avatar-caio', bio: 'Fantasia, ficção e qualquer livro que me tire do eixo.', joined: 'Por aqui desde julho de 2025', reads: 19, reviews: 11, friends: 28, current: 'O oceano no fim do caminho', author: 'Neil Gaiman · começou ontem', progress: 22, coverText: 'O<br>OCEANO', books: [
    { title: 'O nome do vento', author: 'Patrick Rothfuss', cover: 'plum', rating: '★★★★★', started: '09 jun. 2026', finished: '01 jul. 2026', comment: 'O tipo de fantasia que dá vontade de morar dentro. Já quero começar o próximo.' },
    { title: 'O oceano no fim do caminho', author: 'Neil Gaiman', cover: 'blue', status: 'Lendo agora', started: '23 out. 2026', comment: 'Uma nova aventura começou.' },
    { title: 'Kindred: laços de sangue', author: 'Octavia E. Butler', cover: 'coral', rating: '★★★★★', started: '17 abr. 2026', finished: '02 mai. 2026', comment: 'Intenso, necessário e impossível de largar. Uma das minhas leituras favoritas do ano.' }
  ]},
  bia: { name: 'Bia Ferreira', username: '@biaentrelinhas', initials: 'BF', avatar: 'avatar-bia', bio: 'Coleciono frases bonitas e indicações de amigas.', joined: 'Por aqui desde janeiro de 2025', reads: 31, reviews: 26, friends: 42, current: 'Pequena coreografia do adeus', author: 'Aline Bei · começou há 8 dias', progress: 54, coverText: 'PEQUENA<br>COREOGRAFIA', books: [
    { title: 'O peso do pássaro morto', author: 'Aline Bei', cover: 'plum', rating: '★★★★★', started: '04 set. 2026', finished: '07 set. 2026', comment: 'Pequeno no tamanho e imenso no que provoca. Fiquei em silêncio quando terminei.' },
    { title: 'Pequena coreografia do adeus', author: 'Aline Bei', cover: 'mustard', status: 'Lendo agora', started: '16 out. 2026', comment: 'A linguagem é linda. Estou lendo devagar para aproveitar cada frase.' },
    { title: 'Tudo é rio', author: 'Carla Madeira', cover: 'coral', rating: '★★★★☆', started: '19 mai. 2026', finished: '25 mai. 2026', spoiler: true, comment: 'O desfecho me surpreendeu e deixou várias perguntas para conversar depois.' }
  ]},
  ana: { name: 'Ana Clara', username: '@anaclarale', initials: 'AC', avatar: 'avatar-ana', bio: 'Leitora de ônibus, café e domingos chuvosos.', joined: 'Por aqui desde fevereiro de 2026', reads: 8, reviews: 6, friends: 17, current: 'A cabeça do santo', author: 'Socorro Acioli · começou há 2 dias', progress: 31, coverText: 'A CABEÇA<br>DO SANTO', books: [
    { title: 'A cabeça do santo', author: 'Socorro Acioli', cover: 'green', status: 'Lendo agora', started: '22 out. 2026', comment: 'Comecei por indicação e já estou encantada com o realismo mágico.' },
    { title: 'O sol é para todos', author: 'Harper Lee', cover: 'mustard', rating: '★★★★★', started: '01 ago. 2026', finished: '18 ago. 2026', comment: 'Um clássico que merece ser lido e conversado em qualquer época.' }
  ]},
  rafa: { name: 'Rafa Oliveira', username: '@rafalendo', initials: 'RO', avatar: 'avatar-rafa', bio: 'Entre um clássico e outro, aceito toda recomendação.', joined: 'Por aqui desde outubro de 2025', reads: 16, reviews: 12, friends: 23, current: 'Torto arado', author: 'Itamar Vieira Junior · começou há 6 dias', progress: 47, coverText: 'TORTO<br>ARADO', books: [
    { title: 'Torto arado', author: 'Itamar Vieira Junior', cover: 'green', status: 'Lendo agora', started: '18 out. 2026', comment: 'Uma narrativa que já me prendeu desde as primeiras páginas.' },
    { title: 'Ensaio sobre a cegueira', author: 'José Saramago', cover: 'plum', rating: '★★★★★', started: '06 ago. 2026', finished: '29 ago. 2026', comment: 'Uma leitura difícil, mas daquelas que mudam o jeito de olhar ao redor.' }
  ]},
  joao: { name: 'João Pedro', username: '@joaopedrolivros', initials: 'JP', avatar: 'avatar-joao', bio: 'Gosto de conversar sobre livros depois da última página.', joined: 'Por aqui desde maio de 2025', reads: 21, reviews: 15, friends: 31, current: 'O avesso da pele', author: 'Jeferson Tenório · começou há 3 dias', progress: 39, coverText: 'O AVESSO<br>DA PELE', books: [
    { title: 'O avesso da pele', author: 'Jeferson Tenório', cover: 'blue', status: 'Lendo agora', started: '21 out. 2026', comment: 'A voz do narrador me pegou logo no início. Ansioso para continuar.' },
    { title: 'Capitães da Areia', author: 'Jorge Amado', cover: 'mustard', rating: '★★★★★', started: '03 jul. 2026', finished: '18 jul. 2026', comment: 'Personagens inesquecíveis. Foi uma leitura cheia de emoção.' }
  ]},
  mari: { name: 'Mariana Souza', username: '@maridepaginas', initials: 'MS', avatar: 'avatar-mari', bio: 'Uma leitora curiosa procurando sua próxima história.', joined: 'Por aqui desde agosto de 2026', reads: 5, reviews: 4, friends: 12, current: 'A vida invisível de Addie LaRue', author: 'V. E. Schwab · começou há 9 dias', progress: 62, coverText: 'ADDIE<br>LARUE', books: [
    { title: 'A vida invisível de Addie LaRue', author: 'V. E. Schwab', cover: 'plum', status: 'Lendo agora', started: '15 out. 2026', comment: 'Uma ideia fascinante. Quero saber onde essa história vai chegar.' },
    { title: 'Pessoas normais', author: 'Sally Rooney', cover: 'blue', rating: '★★★★☆', started: '12 set. 2026', finished: '21 set. 2026', comment: 'Uma história sobre as coisas que a gente não consegue dizer.' }
  ]}
};

const profileId = new URLSearchParams(location.search).get('perfil') || 'luiza';
const profile = profiles[profileId] || profiles.luiza;
const bookList = document.getElementById('bookList');
const emptyBooks = document.getElementById('emptyBooks');
const followButton = document.getElementById('followButton');
const defaultFriends = ['luiza', 'caio', 'bia'];
let followedIds = new Set(JSON.parse(localStorage.getItem('entrelinhas-friends') || JSON.stringify(defaultFriends)));
let activeFilter = 'all';

function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast.timeoutId);
  showToast.timeoutId = setTimeout(() => toast.classList.remove('show'), 2600);
}

function updateFollowButton() {
  const following = followedIds.has(profileId);
  followButton.classList.toggle('following', following);
  followButton.innerHTML = `<span class="material-symbols-outlined">${following ? 'check' : 'person_add'}</span><span>${following ? 'Seguindo' : 'Seguir'}</span>`;
}

function fillProfile() {
  document.title = `${profile.name} — Entrelinhas`;
  document.getElementById('profileName').textContent = profile.name;
  document.getElementById('profileUsername').textContent = profile.username;
  const avatar = document.getElementById('profileAvatar');
  avatar.textContent = profile.initials;
  avatar.classList.add(profile.avatar);
  document.getElementById('profileBio').textContent = profile.bio;
  document.getElementById('joinedDate').textContent = profile.joined;
  document.getElementById('readCount').textContent = profile.reads;
  document.getElementById('reviewCount').textContent = profile.reviews;
  document.getElementById('friendCount').textContent = profile.friends;
  document.getElementById('currentBook').textContent = profile.current;
  document.getElementById('currentAuthor').textContent = profile.author;
  document.getElementById('currentProgressText').textContent = `${profile.progress}%`;
  document.getElementById('currentProgress').style.width = `${profile.progress}%`;
  document.getElementById('currentCover').innerHTML = profile.coverText;
  document.getElementById('libraryTotal').textContent = `${profile.reads} livros`;
  updateFollowButton();
  renderBooks();
}
function renderBooks() {
  const visibleBooks = profile.books.filter((book) => {
    if (activeFilter === 'read') return book.status !== 'Lendo agora';
    if (activeFilter === 'reviewed') return Boolean(book.comment);
    return true;
  });

  bookList.innerHTML = visibleBooks.map((book, index) => {
    const status = book.status || 'Já leu';
    const rating = book.rating ? `<div class="rating" aria-label="Nota ${book.rating}">${book.rating}</div>` : '';
    const dates = `<div class="book-dates"><span><span class="material-symbols-outlined">play_arrow</span>Começou ${book.started}</span>${book.finished ? `<span><span class="material-symbols-outlined">check</span>Terminou ${book.finished}</span>` : ''}</div>`;
    const review = book.comment
      ? book.spoiler
        ? `<div class="review spoiler" data-spoiler="${index}"><span class="material-symbols-outlined">visibility_off</span><p>${book.comment}</p><button class="spoiler-button" data-action="spoiler" data-id="${index}"><span class="material-symbols-outlined">visibility</span>Revelar spoiler</button></div>`
        : `<p class="review">“${book.comment}”</p>`
      : '';

    return `<article class="book-entry">
      <div class="book-cover ${book.cover}">${book.title}</div>
      <div class="book-details">
        <div class="book-title-line"><h3>${book.title}</h3>${book.spoiler ? '<span class="material-symbols-outlined" title="Comentário com spoiler">warning</span>' : ''}</div>
        <div class="book-author">${book.author}</div>${rating}${dates}${review}
      </div>
      <span class="book-status ${status === 'Já leu' ? 'finished' : ''}">${status}</span>
    </article>`;
  }).join('');

  bookList.hidden = visibleBooks.length === 0;
  emptyBooks.hidden = visibleBooks.length > 0;
}

document.querySelectorAll('.library-tab').forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    document.querySelectorAll('.library-tab').forEach((tab) => {
      const selected = tab === button;
      tab.classList.toggle('active', selected);
      tab.setAttribute('aria-selected', String(selected));
    });
    renderBooks();
  });
});

followButton.addEventListener('click', () => {
  if (followedIds.has(profileId)) {
    followedIds.delete(profileId);
    showToast(`Você deixou de seguir ${profile.name}.`);
  } else {
    followedIds.add(profileId);
    showToast(`Agora você está seguindo ${profile.name} ✨`);
  }
  localStorage.setItem('entrelinhas-friends', JSON.stringify([...followedIds]));
  updateFollowButton();
});

document.getElementById('messageButton').addEventListener('click', () => {
  showToast('A troca de mensagens ficará para uma próxima etapa.');
});

bookList.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action="spoiler"]');
  if (!button) return;
  const spoiler = bookList.querySelector(`[data-spoiler="${button.dataset.id}"]`);
  spoiler.classList.add('revealed');
  button.remove();
  spoiler.querySelector('.material-symbols-outlined').textContent = 'visibility';
});

fillProfile();
