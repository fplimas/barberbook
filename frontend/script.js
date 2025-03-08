// Manipulação do login
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulação de login (exemplo simples)
    if (email && password) {
        // Preencher o perfil
        document.getElementById('profile-name').textContent = "João Silva"; // Exemplo
        document.getElementById('profile-email').textContent = email;

        // Exibir o perfil e ocultar login
        document.getElementById('login').classList.add('hidden');
        document.getElementById('profile').classList.remove('hidden');
    }
});

// Manipulação do agendamento
document.getElementById('schedule').addEventListener('click', function () {
    const services = [];
    const selectedServices = document.querySelectorAll('input[name="service"]:checked');
    selectedServices.forEach(service => {
        services.push(service.value);
    });

    alert("Você agendou: " + services.join(', '));
});
