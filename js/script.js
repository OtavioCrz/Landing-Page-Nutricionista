(function () {
  // CONFIGURAÇÃO DOS CONTATOS
  const WHATSAPP_NUMBER = "5585988528359"; 
  const CONTACT_EMAIL = "oms.otaviio@gmail.com";

  // --- LÓGICA DO MENU MOBILE ---
  const btnMobile = document.getElementById('btn-mobile');
  const navMain = document.querySelector('nav.main');

  if (btnMobile && navMain) {
    btnMobile.addEventListener('click', function() {
      // Alterna a classe 'active' que mostra/esconde o menu
      navMain.classList.toggle('active');
    });

    // Fecha o menu ao clicar em um link
    const links = navMain.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', () => {
        navMain.classList.remove('active');
      });
    });
  }

  // --- LÓGICA DO BOTÃO VOLTAR AO TOPO ---
  const scrollTopBtn = document.getElementById('scroll-top-btn');

  // Monitora a rolagem da página
  window.addEventListener('scroll', function() {
    // Se rolar mais de 300px, mostra o botão. Senão, esconde.
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  // Ação de clicar para subir
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // Rolagem suave
      });
    });
  }

  // --- LÓGICA DO FORMULÁRIO (ENVIO) ---
  const form = document.getElementById("booking");

  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();

      // Coleta dados
      const nome = document.getElementById("nome").value || "";
      const telefone = document.getElementById("telefone").value || "";
      const email = document.getElementById("email").value || "";
      const data = document.getElementById("data").value || "";
      const hora = document.getElementById("hora").value || "";
      const tipo = document.getElementById("tipo").value || "";
      const mensagemLivre = document.getElementById("mensagem").value || "";

      // Monta mensagem
      const messageText = `Olá, sou ${nome}.
Telefone: ${telefone}
Email: ${email}
Tipo de consulta: ${tipo}
Data desejada: ${data} às ${hora}
Observações: ${mensagemLivre}`;

      // 1. Abre WhatsApp
      const encodedMessage = encodeURIComponent(messageText);
      const waURL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
      window.open(waURL, "_blank");

      // 2. Abre Email
      const subject = encodeURIComponent(`Agendamento de consulta - ${nome}`);
      const body = encodeURIComponent(messageText);
      const mailto = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
      
      // Pequeno delay para garantir que o navegador processe o primeiro comando
      setTimeout(() => {
        window.location.href = mailto;
      }, 500);

      // Opcional: Limpar formulário
      // form.reset();
    });
  }
})();