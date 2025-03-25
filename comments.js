const http = require('http');
const fs = require('fs').promises; // Usando promises para leitura de arquivos
const path = require('path');

// Verifica se todas as variáveis de ambiente necessárias estão definidas
if (!process.env.PORT) {
    console.error('Erro: A variável de ambiente PORT não está definida.');
    process.exit(1);
}

// Cria o servidor HTTP
const server = http.createServer(async (req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        // Define o caminho do arquivo HTML
        const filePath = path.join(__dirname, 'comments.html');
        try {
            // Lê o arquivo HTML
            const data = await fs.readFile(filePath);
            // Responde com o conteúdo do arquivo HTML
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(data);
        } catch (err) {
            // Em caso de erro, responde com erro interno do servidor
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('Internal Server Error');
        }
    } else {
        // Responde com 404 para outras requisições
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Cria o servidor web e o inicia na porta definida pela variável de ambiente PORT
const port = process.env.PORT || 3000;
server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});


