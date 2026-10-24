const signup = document.getElementById('signup');
const signupForm = document.getElementById('signupForm');
const toast = document.getElementById('toast');

function openSignup() {
  signup.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSignup() {
  signup.classList.remove('open');
  document.body.style.overflow = '';
}

signup.addEventListener('click', (event) => {
  if (event.target === signup) {
    closeSignup();
  }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeSignup();
  }
});

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  closeSignup();

  toast.textContent =
    'Formulário pronto — a conexão com o banco de dados fica para a próxima etapa.';
  toast.classList.add('show');

  window.setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);

  signupForm.reset();
});

