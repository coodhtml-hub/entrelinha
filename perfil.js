const db = window.entrelinhasSupabase;
let currentUser = null;
let viewerProfile = null;

function initials(name = 'Leitor') {
  return name.split(/\s+/).slice(0, 2).map(part => part[0] || '').join('').toUpperCase();
}
function esc(value = '') {
  return String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
}
function setViewerIdentity(profile) {
  if (!profile) return;
  const name = profile.full_name || 'Leitor';
  const handle = '@' + (profile.username || 'leitor');
  document.getElementById('nameTop').textContent = name;
  document.getElementById('usernameTop').textContent = handle;
  document.getElementById('avatarTop').textContent = initials(name);
  document.getElementById('nameBottom').textContent = name;
  document.getElementById('avatarBottom').textContent = initials(name);
}

async function loadProfile() {
  const { data, error } = await db.auth.getSession();
  if (error || !data.session) {
    location.replace('acesso.html');
    return;
  }
  currentUser = data.session.user;
  const viewedId = new URLSearchParams(location.search).get('id') || currentUser.id;
  const own = viewedId === currentUser.id;

  const [{ data: viewer }, { data: profile, error: profileError }] = await Promise.all([
    db.from('profiles').select('id,username,full_name,bio').eq('id', currentUser.id).maybeSingle(),
    own
      ? Promise.resolve({ data: null, error: null })
      : db.from('profiles').select('id,username,full_name,bio').eq('id', viewedId).maybeSingle()
  ]);
  viewerProfile = own ? (viewer || null) : viewer;
  setViewerIdentity(viewerProfile);
  document.getElementById('ownProfile').hidden = !own;
  document.getElementById('friendProfile').hidden = own;

  const shownProfile = own ? viewer : profile;
  if (profileError || !shownProfile) {
    document.getElementById('profileHeading').textContent = 'Perfil indisponível';
    document.getElementById('profileEyebrow').textContent = 'PERFIL DA COMUNIDADE';
    return;
  }

  const name = shownProfile.full_name || 'Leitor';
  const handle = '@' + (shownProfile.username || 'leitor');
  document.title = `${name} — Entrelinhas`;
  document.getElementById('profileHeading').textContent = name;
  document.getElementById('profileHandle').textContent = handle;
  document.getElementById('breadcrumbName').textContent = own ? 'Meu perfil' : name;
  document.getElementById('profileAvatar').textContent = initials(name);
  document.getElementById('profileEyebrow').textContent = own ? 'SEU CANTINHO' : 'PERFIL DA COMUNIDADE';

  if (own) {
    document.getElementById('fullName').value = shownProfile.full_name || '';
    document.getElementById('username').value = shownProfile.username || '';
    document.getElementById('bio').value = shownProfile.bio || '';
  } else {
    await loadFriendBooks(viewedId);
  }
}

async function loadFriendBooks(id) {
  const host = document.getElementById('friendBooks');
  const [{ data: following }, { data: followedBy }] = await Promise.all([
    db.from('follows').select('follower_id').eq('follower_id', currentUser.id).eq('followed_id', id),
    db.from('follows').select('follower_id').eq('follower_id', id).eq('followed_id', currentUser.id)
  ]);
  if (!following?.length || !followedBy?.length) {
    host.innerHTML = '<div class="profile-private">Os livros e comentários aparecem quando vocês se seguem mutuamente. Você pode encontrar essa pessoa na área Amigos.</div>';
    return;
  }
  const { data, error } = await db.from('books').select('id,title,author,status,format,total_pages,current_page,rating,comment,has_spoiler').eq('owner_id', id).order('created_at', { ascending: false });
  if (error) {
    host.innerHTML = '<div class="profile-private">Não consegui carregar os livros desta pessoa agora.</div>';
    return;
  }
  if (!data?.length) {
    host.innerHTML = '<div class="profile-private">Esta pessoa ainda não adicionou livros à estante.</div>';
    return;
  }
  const statusLabels = { reading: 'Lendo agora', read: 'Já li', want: 'Quero ler' };
  host.innerHTML = data.map(book => {
    const progress = book.total_pages ? Math.min(100, Math.round((Number(book.current_page) || 0) / book.total_pages * 100)) : 0;
    const readingProgress = book.status === 'reading' && book.total_pages ? `<span class="friend-book-status">${progress}% da leitura</span>` : '';
    const rating = book.rating ? `<span class="friend-book-status">Nota ${book.rating}/5</span>` : '';
    const comment = book.comment ? `<p>${book.has_spoiler ? '<strong>Comentário com spoiler: </strong>' : ''}“${esc(book.comment)}”</p>` : '';
    const format = book.format === 'digital' ? 'Digital / e-book' : 'Físico';
    return `<article class="friend-book-card" id="livro-${esc(book.id)}"><h3>${esc(book.title)}</h3><small>${esc(book.author)} · ${format}</small><div><span class="friend-book-status">${statusLabels[book.status] || 'Na estante'}</span>${readingProgress}${rating}</div>${comment}</article>`;
  }).join('');
  if (location.hash.startsWith('#livro-')) {
    window.setTimeout(() => document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 80);
  }
}

document.getElementById('profileForm').addEventListener('submit', async event => {
  event.preventDefault();
  const message = document.getElementById('profileMessage');
  message.classList.remove('error');
  message.textContent = 'Salvando…';
  const update = {
    full_name: document.getElementById('fullName').value.trim(),
    username: document.getElementById('username').value.trim().toLowerCase(),
    bio: document.getElementById('bio').value.trim()
  };
  const { error } = await db.from('profiles').update(update).eq('id', currentUser.id);
  if (error) {
    message.textContent = error.message;
    message.classList.add('error');
    return;
  }
  message.textContent = 'Perfil atualizado.';
  viewerProfile = { ...viewerProfile, ...update };
  setViewerIdentity(viewerProfile);
  document.getElementById('profileHeading').textContent = update.full_name;
  document.getElementById('profileHandle').textContent = '@' + update.username;
  document.getElementById('breadcrumbName').textContent = 'Meu perfil';
  document.getElementById('profileAvatar').textContent = initials(update.full_name);
});

document.getElementById('logoutButton').addEventListener('click', async () => {
  await db.auth.signOut();
  location.href = 'acesso.html';
});
loadProfile();

