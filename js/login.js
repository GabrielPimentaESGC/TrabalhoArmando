document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const feedback = document.querySelector('.feedback.not-found');

    // Verificar se há um usuário registrado na última tentativa de registro
    const lastRegisteredUser = JSON.parse(localStorage.getItem('lastRegisteredUser'));
    if (lastRegisteredUser) {
        document.getElementById('email').value = lastRegisteredUser.email;
        localStorage.removeItem('lastRegisteredUser'); // Limpar após preencher
    }

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const passwordInput = document.getElementById('password');
        const password = passwordInput.value;

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email);

        if (user) {
            if (password === user.password) {
                localStorage.setItem('loggedIn', 'true');
                localStorage.setItem('userEmail', email);

                alert('Login Efetuado com Sucesso');
                window.location.href = 'index.html?login=success';
            } else {
                passwordInput.value = '';
                showFeedback('Credenciais inválidas');
            }
        } else {
            showFeedback('Usuário não encontrado. Verifique o email fornecido.');
        }
    });

    function showFeedback(message) {
        feedback.innerText = message;
        feedback.style.display = 'block';

        setTimeout(function() {
            feedback.style.display = 'none';
        }, 1500);
    }
});
