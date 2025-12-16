// Toggle de tema escuro/claro
const themeToggle = document.getElementById("themeToggle")
const html = document.documentElement

themeToggle.addEventListener("click", () => {
  const currentTheme = html.getAttribute("data-theme")
  const newTheme = currentTheme === "dark" ? "light" : "dark"

  html.setAttribute("data-theme", newTheme)
  themeToggle.textContent = newTheme === "dark" ? "☀️" : "🌙"

  // Salvar preferência
  localStorage.setItem("theme", newTheme)
})

// Carregar tema salvo
const savedTheme = localStorage.getItem("theme")
if (savedTheme) {
  html.setAttribute("data-theme", savedTheme)
  themeToggle.textContent = savedTheme === "dark" ? "☀️" : "🌙"
}

// Menu mobile
const menuToggle = document.getElementById("menuToggle")
const navLinks = document.getElementById("navLinks")

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active")
})

// Fechar menu ao clicar em um link
navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active")
  })
})

// Validação e envio do formulário
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Limpar erros anteriores
  document.querySelectorAll(".error").forEach((error) => (error.textContent = ""))

  // Validações
  const name = document.getElementById("name").value.trim()
  const email = document.getElementById("email").value.trim()
  const message = document.getElementById("message").value.trim()

  let isValid = true

  if (name.length < 3) {
    document.getElementById("nameError").textContent = "Nome deve ter pelo menos 3 caracteres"
    isValid = false
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    document.getElementById("emailError").textContent = "Email inválido"
    isValid = false
  }

  if (message.length < 10) {
    document.getElementById("messageError").textContent = "Mensagem deve ter pelo menos 10 caracteres"
    isValid = false
  }

  if (isValid) {
    // Aqui você enviaria os dados para o servidor
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.")
    contactForm.reset()
  }
})

// Modais
function openModal(editalId) {
  const modal = document.getElementById("editalModal")
  const modalContent = document.getElementById("modalContent")

  // Conteúdo dos editais (em produção, isso viria de um banco de dados)
  const editais = {
    editalBolsas: `
            <h2>Programa de Bolsas 2024</h2>
            <p><strong>Prazo:</strong> 15 de fevereiro de 2024</p>
            <h3>Sobre o Programa</h3>
            <p>O Programa de Bolsas Campus Guie oferece bolsas integrais de mentoria e preparação para estudantes que desejam se candidatar a universidades internacionais.</p>
            <h3>Requisitos</h3>
            <ul>
                <li>Ser estudante brasileiro do ensino médio ou recém-formado</li>
                <li>Demonstrar excelência acadêmica</li>
                <li>Apresentar motivação e comprometimento</li>
                <li>Disponibilidade para participar de sessões semanais de mentoria</li>
            </ul>
            <h3>Como se candidatar</h3>
            <p>Envie seu currículo, histórico escolar e uma carta de motivação para bolsas@campusguie.com</p>
        `,
    editalWorkshop: `
            <h2>Workshop: Application Essays</h2>
            <p><strong>Data:</strong> 01 de março de 2024</p>
            <h3>Sobre o Workshop</h3>
            <p>Workshop intensivo de 4 horas sobre como escrever essays impactantes para admissões internacionais.</p>
            <h3>Programação</h3>
            <ul>
                <li>09h-10h: Estrutura do essay perfeito</li>
                <li>10h-11h: Storytelling e autenticidade</li>
                <li>11h-12h: Exercícios práticos</li>
                <li>12h-13h: Feedback individualizado</li>
            </ul>
            <h3>Inscrições</h3>
            <p>Vagas limitadas. Inscreva-se em eventos@campusguie.com</p>
        `,
    editalMentoria: `
            <h2>Programa de Mentoria Peer-to-Peer</h2>
            <p><strong>Início:</strong> 20 de março de 2024</p>
            <h3>Sobre o Programa</h3>
            <p>Conecte-se com estudantes já matriculados em universidades internacionais para orientação personalizada sobre o processo de application.</p>
            <h3>Benefícios</h3>
            <ul>
                <li>Mentoria individual com estudante da sua área de interesse</li>
                <li>Sessões mensais por 6 meses</li>
                <li>Acesso a rede de ex-alunos</li>
                <li>Orientação sobre essays, entrevistas e escolha de universidades</li>
            </ul>
            <h3>Candidatura</h3>
            <p>Preencha o formulário em nosso site indicando suas preferências de mentoria.</p>
        `,
  }

  modalContent.innerHTML = editais[editalId] || "<p>Edital não encontrado.</p>"
  modal.style.display = "flex"
  document.body.style.overflow = "hidden"
}

function closeModal() {
  const modal = document.getElementById("editalModal")
  modal.style.display = "none"
  document.body.style.overflow = "auto"
}

// Fechar modal clicando fora
document.getElementById("editalModal").addEventListener("click", (e) => {
  if (e.target.id === "editalModal") {
    closeModal()
  }
})

// Modal de vídeo
function openVideo(videoId) {
  const modal = document.getElementById("videoModal")
  const container = document.getElementById("videoContainer")

  // Embed do YouTube (substitua pelo ID real do vídeo)
  container.innerHTML = `
        <iframe 
            width="100%" 
            height="400" 
            src="https://www.youtube.com/embed/${videoId}" 
            frameborder="0" 
            allowfullscreen
            style="border-radius: 8px;">
        </iframe>
    `

  modal.style.display = "flex"
  document.body.style.overflow = "hidden"
}

function closeVideoModal() {
  const modal = document.getElementById("videoModal")
  const container = document.getElementById("videoContainer")

  modal.style.display = "none"
  container.innerHTML = ""
  document.body.style.overflow = "auto"
}

// Fechar modal clicando fora
document.getElementById("videoModal").addEventListener("click", (e) => {
  if (e.target.id === "videoModal") {
    closeVideoModal()
  }
})

// Animação de entrada para elementos
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in")
    }
  })
}, observerOptions)

// Observar seções para animação
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section)
})

// Smooth scroll para navegação (fallback para navegadores antigos)
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Destacar link ativo na navegação
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-links a")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    if (scrollY >= sectionTop) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})
