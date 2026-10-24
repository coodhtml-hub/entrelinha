const people = [
  {
    id: 'luiza',
    name: 'Luiza Martins',
    username: '@luizamartins',
    initials: 'LM',
    avatar: 'avatar-luiza',
    bio: 'Sempre com um romance na bolsa. Leitora de finais felizes.',
    book: 'Tudo é rio',
    activity: 'Ativa há 2 h',
    cover: 'cover-coral',
    status: 'friend'
  },
  {
    id: 'caio',
    name: 'Caio Nunes',
    username: '@caionunes',
    initials: 'CN',
    avatar: 'avatar-caio',
    bio: 'Fantasia, ficção e qualquer livro que me tire do eixo.',
    book: 'O oceano no fim do caminho',
    activity: 'Ativo ontem',
    cover: 'cover-blue',
    status: 'friend'
  },
  {
    id: 'bia',
    name: 'Bia Ferreira',
    username: '@biaentrelinhas',
    initials: 'BF',
    avatar: 'avatar-bia',
    bio: 'Coleciono frases bonitas e indicações de amigas.',
    book: 'Pequena coreografia do adeus',
    activity: 'Ativa ontem',
    cover: 'cover-mustard',
    status: 'friend'
  },
  {
    id: 'ana',
    name: 'Ana Clara',
    username: '@anaclarale',
    initials: 'AC',
    avatar: 'avatar-ana',
    bio: 'Leitora de ônibus, café e domingos chuvosos.',
    book: 'A cabeça do santo',
    activity: 'Ativa hoje',
    cover: 'cover-green',
    status: 'suggestion'
  },
  {
    id: 'rafa',
    name: 'Rafa Oliveira',
    username: '@rafalendo',
    initials: 'RO',
    avatar: 'avatar-rafa',
    bio: 'Entre um clássico e outro, aceito toda recomendação.',
    book: 'Torto arado',
    activity: 'Ativo há 3 h',
    cover: 'cover-coral',
    status: 'suggestion'
  },
  {
    id: 'joao',
    name: 'João Pedro',
    username: '@joaopedrolivros',
    initials: 'JP',
    avatar: 'avatar-joao',
    bio: 'Gosto de conversar sobre livros depois da última página.',
    book: 'O avesso da pele',
    activity: 'Ativo esta semana',
    cover: 'cover-blue',
    status: 'suggestion'
  },
  {
    id: 'mari',
    name: 'Mariana Souza',
    username: '@maridepaginas',
    initials: 'MS',
    avatar: 'avatar-mari',
    bio: 'Uma leitora curiosa procurando sua próxima história.',
    book: 'A vida invisível de Addie LaRue',
    activity: 'Ativa hoje',
    cover: 'cover-mustard',
    status: 'request'
  }
];

const defaultFriends = ['luiza', 'caio', 'bia'];
const defaultRequests = ['mari', 'rafa'];
const storedFriends = JSON.parse(localStorage.getItem('entrelinhas-friends') || 'null');
const storedRequests = JSON.parse(localStorage.getItem('entrelinhas-requests') || 'null');
let followedIds = new Set(storedFriends || defaultFriends);
let requestIds = storedRequests || defaultRequests;
let dismissedIds = JSON.parse(localStorage.getItem('entrelinhas-dismissed') || '[]');
let activeTab = 'friends';
let sortRecent = true;

const grid = document.getElementById('peopleGrid');
const searchInput = document.getElementById('peopleSearch');
const emptyState = document.getElementById('emptyState');
const listTitle = document.getElementById('listTitle');
const resultSummary = document.getElementById('resultSummary');
const toastElement = document.getElementById('toast');

function saveState() {
  localStorage.setItem('entrelinhas-friends', JSON.stringify([...followedIds]));
  localStorage.setItem('entrelinhas-requests', JSON.stringify(requestIds));
  localStorage.setItem('entrelinhas-dismissed', JSON.stringify(dismissedIds));
}

function showToast(message) {
  toastElement.textContent = message;
  toastElement.classList.add('show');
  window.clearTimeout(showToast.timeoutId);
  showToast.timeoutId = window.setTimeout(() => {
    toastElement.classList.remove('show');
  }, 2600);
}

function updateCounts() {
  document.getElementById('friendsTabCount').textContent = followedIds.size;
  document.getElementById('requestsTabCount').textContent = requestIds.length;
  document.getElementById('navFriendCount').textContent = followedIds.size;
}

function getVisiblePeople() {
  const query = searchInput.value.trim().toLocaleLowerCase('pt-BR').replace(/^@/, '');
  let visible = [];

  if (activeTab === 'friends') {
    visible = people.filter((person) => followedIds.has(person.id));
  } else if (activeTab === 'requests') {
    visible = people.filter((person) => requestIds.includes(person.id));
  } else {
    visible = people.filter((person) => !followedIds.has(person.id) && !requestIds.includes(person.id) && !dismissedIds.includes(person.id));
  }

  if (query) {
    visible = visible.filter((person) =>
      `${person.name} ${person.username} ${person.book}`.toLocaleLowerCase('pt-BR').includes(query)
    );
  }

  return sortRecent ? visible : [...visible].reverse();
}

function personCard(person) {
  const isFollowed = followedIds.has(person.id);
  const action = activeTab === 'requests'
    ? `<div class="request-actions"><button class="request-button accept" data-action="accept" data-id="${person.id}" aria-label="Aceitar solicitação de ${person.name}"><span class="material-symbols-outlined">check</span>Aceitar</button><button class="request-button dismiss" data-action="dismiss" data-id="${person.id}" aria-label="Recusar solicitação de ${person.name}"><span class="material-symbols-outlined">close</span></button></div>`
    : activeTab === 'friends'
      ? `<button class="follow-button following" data-action="unfollow" data-id="${person.id}"><span class="material-symbols-outlined">check</span>Seguindo</button>`
      : `<button class="follow-button ${isFollowed ? 'following' : ''}" data-action="follow" data-id="${person.id}"><span class="material-symbols-outlined">${isFollowed ? 'check' : 'person_add'}</span>${isFollowed ? 'Seguindo' : 'Seguir'}</button>`;

  return `
    <article class="person-card">
      <div class="person-top">
        <a class="person-link" href="@usuário protótipo 1.html?perfil=${person.id}" aria-label="Abrir perfil de ${person.name}">
          <div class="person-avatar ${person.avatar}">${person.initials}</div>
          <div class="person-name"><strong>${person.name}</strong><small>${person.username}</small></div>
        </a>
      </div>
      <p class="person-bio">${person.bio}</p>
      <div class="reading-now">
        <div class="book-thumb ${person.cover}">${person.book}</div>
        <div><small>LENDO AGORA</small><b>${person.book}</b></div>
      </div>
      <div class="card-footer">
        <span class="activity"><span class="material-symbols-outlined">schedule</span>${person.activity}</span>
        ${action}
      </div>
    </article>`;
}

function render() {
  const visible = getVisiblePeople();
  grid.innerHTML = visible.map(personCard).join('');
  emptyState.hidden = visible.length > 0;
  grid.hidden = visible.length === 0;
  updateCounts();

  if (activeTab === 'friends') {
    listTitle.textContent = 'Seus amigos';
    resultSummary.textContent = `${visible.length} ${visible.length === 1 ? 'pessoa faz' : 'pessoas fazem'} parte da sua jornada de leitura.`;
  } else if (activeTab === 'requests') {
    listTitle.textContent = 'Solicitações de amizade';
    resultSummary.textContent = 'Escolha quem você quer acompanhar de volta.';
  } else {
    listTitle.textContent = 'Pessoas para descobrir';
    resultSummary.textContent = 'Leitores que talvez gostem das mesmas histórias que você.';
  }
}

function setTab(tab) {
  activeTab = tab;
  document.querySelectorAll('.tab').forEach((button) => {
    const isActive = button.dataset.tab === tab;
    button.classList.toggle('active', isActive);
    button.setAttribute('aria-selected', String(isActive));
  });
  render();
}

document.querySelectorAll('.tab').forEach((button) => {
  button.addEventListener('click', () => setTab(button.dataset.tab));
});

searchInput.addEventListener('input', render);
document.addEventListener('keydown', (event) => {
  if (event.key === '/' && !['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

grid.addEventListener('click', (event) => {
  const button = event.target.closest('[data-action]');
  if (!button) return;

  const { action, id } = button.dataset;
  const person = people.find((entry) => entry.id === id);

  if (action === 'follow') {
    if (followedIds.has(id)) {
      followedIds.delete(id);
      showToast(`Você deixou de seguir ${person.name}.`);
    } else {
      followedIds.add(id);
      showToast(`Agora você está seguindo ${person.name} ✨`);
    }
  } else if (action === 'unfollow') {
    followedIds.delete(id);
    showToast(`${person.name} saiu da sua lista de amigos.`);
  } else if (action === 'accept') {
    requestIds = requestIds.filter((requestId) => requestId !== id);
    followedIds.add(id);
    showToast(`Solicitação de ${person.name} aceita!`);
  } else if (action === 'dismiss') {
    requestIds = requestIds.filter((requestId) => requestId !== id);
    dismissedIds.push(id);
    showToast('Solicitação removida.');
  }

  saveState();
  render();
});

document.getElementById('sortButton').addEventListener('click', (event) => {
  sortRecent = !sortRecent;
  event.currentTarget.innerHTML = `<span class="material-symbols-outlined">sort</span>${sortRecent ? 'Mais recentes' : 'Ordem inversa'}`;
  render();
});

document.getElementById('inviteButton').addEventListener('click', () => {
  showToast('Convide sua galerinha compartilhando o link do Entrelinhas 💌');
});

render();

