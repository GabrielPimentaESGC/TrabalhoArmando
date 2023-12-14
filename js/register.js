const registerForm = document.getElementById('registerForm');

registerForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const birthDateInput = document.getElementById('birthDate');

    // Validar o formulário antes de prosseguir
    if (!validateForm()) {
        return;
    }

    const email = emailInput.value;
    const password = passwordInput.value;

    console.log("Tentativa de registo:", email, password);

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const existingUser = users.find(user => user.email === email);

    if (existingUser) {
        alert('Email já está registado. Utilize outro email.');
    } else {
        users.push({
            email,
            password,
            birthDate: birthDateInput.value
        });
        localStorage.setItem('users', JSON.stringify(users));

        alert('Email Registado com Sucesso. Agora você pode fazer login.');

        // Redirecionar para a página de login
        window.location.href = "login.html";

        // Adicionar entrada no histórico do navegador para a página inicial
        history.pushState(null, null, 'index.html');

        // Limpar os campos do formulário
        emailInput.value = '';
        passwordInput.value = '';
        birthDateInput.value = '';  // Limpar o campo de data de nascimento
    }
});

function validateForm() {
    const nif = document.getElementById('nif').value;

    if (nif.length !== 9) {
        alert('O NIF deve ter exatamente 9 dígitos.');
        return false;
    }

    const passwordInput = document.getElementById('password');
    const password = passwordInput.value;

    if (password.length < 8 || !/[A-Z]/.test(password) || !/[a-z]/.test(password) || !/[0-9]/.test(password) || !/[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password)) {
        alert('A senha deve ser forte, contendo pelo menos 8 caracteres, letras maiúsculas, minúsculas, números e caracteres especiais.');
        return false;
    }

    return true;
}
