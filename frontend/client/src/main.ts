import './style.css'
import Phaser from 'phaser'
import { gameConfig } from './game/config'
import { authService } from './services/authService'

// Configurar HTML inicial
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="game-container">
    <header>
      <h1>🎓 Guardião do Conhecimento</h1>
      <div class="auth-buttons" id="auth-buttons">
        <button id="quick-login-btn" class="btn btn-primary">🚀 Entrar Direto</button>
        <button id="login-btn" class="btn">Entrar</button>
        <button id="register-btn" class="btn">Registrar</button>
      </div>
      <div class="user-info" id="user-info" style="display: none;">
        <span id="username"></span>
        <button id="logout-btn" class="btn">Sair</button>
      </div>
    </header>
    <div id="game-canvas"></div>
    <div class="controls">
      <p>🎮 Use as setas do teclado para mover o jogador</p>
      <p>🎯 Colete artefatos e responda questões educativas!</p>
    </div>
  </div>
`

// Verificar se usuário está logado
function updateAuthUI() {
  const user = authService.getCurrentUser()
  const authButtons = document.getElementById('auth-buttons')!
  const userInfo = document.getElementById('user-info')!
  const username = document.getElementById('username')!
  
  if (user) {
    authButtons.style.display = 'none'
    userInfo.style.display = 'block'
    let modeText = ''
    if (authService.isQuickMode()) {
      modeText = ' (Entrada Rápida)'
    } else if (authService.isDemoMode()) {
      modeText = ' (Modo Demo)'
    }
    username.textContent = `Olá, ${user.username}!${modeText}`
  } else {
    authButtons.style.display = 'block'
    userInfo.style.display = 'none'
  }
}

// Auto-login se não estiver logado (para facilitar demo)
function checkAutoLogin() {
  if (!authService.isAuthenticated()) {
    // Fazer auto-login após 2 segundos se não houver interação
    setTimeout(() => {
      if (!authService.isAuthenticated()) {
        console.log('Fazendo auto-login para demo...')
        try {
          const response = authService.quickLogin()
          updateAuthUI()
          // Mostrar mensagem discreta
          const msg = document.createElement('div')
          msg.innerHTML = `✅ ${response.message}<br>👋 Bem-vindo(a), ${response.user.username}! 🎮`
          msg.style.cssText = 'position:fixed;top:20px;right:20px;background:#27ae60;color:white;padding:1rem;border-radius:8px;z-index:1000;font-size:0.9rem;box-shadow:0 4px 12px rgba(0,0,0,0.3)'
          document.body.appendChild(msg)
          setTimeout(() => msg.remove(), 4000)
        } catch (error) {
          console.error('Erro no auto-login:', error)
        }
      }
    }, 2000)
  }
}

// Configurar eventos
document.getElementById('quick-login-btn')?.addEventListener('click', () => {
  try {
    const response = authService.quickLogin()
    updateAuthUI()
    alert(`${response.message}\nBem-vindo(a), ${response.user.username}! 🎮`)
  } catch (error) {
    console.error('Erro na entrada rápida:', error)
    alert('Erro na entrada rápida. Tente novamente.')
  }
})

document.getElementById('login-btn')?.addEventListener('click', () => {
  const username = prompt('Digite seu nome de usuário:')
  const password = prompt('Digite sua senha:')
  
  if (username && password) {
    authService.login({ username, password })
      .then((response) => {
        updateAuthUI()
        alert(response.message || 'Login realizado com sucesso!')
      })
      .catch((error) => {
        console.error('Erro no login:', error)
        alert('Erro no login. Verifique suas credenciais.')
      })
  }
})

document.getElementById('register-btn')?.addEventListener('click', () => {
  const username = prompt('Digite um nome de usuário:')
  const email = prompt('Digite seu email:')
  const password = prompt('Digite uma senha:')
  
  if (username && email && password) {
    authService.register({ username, email, password })
      .then((response) => {
        updateAuthUI()
        alert(response.message || 'Registro realizado com sucesso!')
      })
      .catch((error) => {
        console.error('Erro no registro:', error)
        alert('Erro no registro. Tente novamente.')
      })
  }
})

document.getElementById('logout-btn')?.addEventListener('click', () => {
  authService.logout()
  updateAuthUI()
  alert('Logout realizado com sucesso!')
})

// Inicializar UI
updateAuthUI()
checkAutoLogin()

// Inicializar o jogo Phaser
const gameCanvas = document.getElementById('game-canvas')
if (gameCanvas) {
  const config = {
    ...gameConfig,
    parent: 'game-canvas'
  }
  new Phaser.Game(config)
}
