const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let flakes = [];

function createFlakes() {
    for (let i = 0; i < 150; i++) {
        flakes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 3 + 1,
            speed: Math.random() * 1 + 0.5,
            drift: Math.random() * 1 - 0.5
        });
    }
}

function drawFlakes() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "gray";
    ctx.beginPath();

    for (let flake of flakes) {
        ctx.moveTo(flake.x, flake.y);
        ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
    }

    ctx.fill();
    moveFlakes();
}

function moveFlakes() {
    for (let flake of flakes) {
        flake.y += flake.speed;
        flake.x += flake.drift;

        if (flake.y > canvas.height) {
            flake.y = -5;
            flake.x = Math.random() * canvas.width;
        }
    }
}

function update() {
    drawFlakes();
    requestAnimationFrame(update);
}

createFlakes();
update();

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


 // Exemplo: puxando dados do localStorage
    const user = JSON.parse(localStorage.getItem("usuarioLogado")) || {};

    document.getElementById("nomeUsuario").innerText = user.nome || "Cliente";
    document.getElementById("nomePerf").innerText = user.nome || "Não informado";
    document.getElementById("telPerf").innerText = user.telefone || "Não informado";
    document.getElementById("emailPerf").innerText = user.email || "Não informado";

    // Exemplo de agendamento
    const ag = JSON.parse(localStorage.getItem("proxAgendamento"));

    document.getElementById("proxAgendamento").innerText =
      ag ? `${ag.data} às ${ag.horario} — ${ag.servico}` : "Nenhum agendamento encontrado";


      