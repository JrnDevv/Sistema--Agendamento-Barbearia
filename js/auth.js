const canvas = document.getElementById("meshCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Blobs (manchas de cor) que formam o mesh
let blobs = [
    {
        x: 300,
        y: 300,
        r: 350,
        color: "rgba(50, 50, 50, 0.6)",
        dx: 0.2,
        dy: 0.15
    },
    {
        x: 900,
        y: 500,
        r: 400,
        color: "rgba(0, 0, 0, 0.25)", 
        dx: -0.15,
        dy: 0.1
    },
    {
        x: 600,
        y: 800,
        r: 350,
        color: "rgba(255, 255, 255, 0.2)", 
        dx: 0.1,
        dy: -0.12
    },
    {
        x: 1200,
        y: 200,
        r: 300,
        color: "rgba(0, 0, 0, 0.18)", 
        dx: -0.18,
        dy: 0.16
    }
];

function animateMesh() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Fundo base preto ao cinza
    let gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    gradient.addColorStop(0, "#000000");
    gradient.addColorStop(1, "#111111");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Desenhar os blobs animados
    blobs.forEach(b => {
        ctx.beginPath();
        ctx.fillStyle = b.color;
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fill();

        // Movimento sutil
        b.x += b.dx;
        b.y += b.dy;

        // Volta quando chega na borda
        if (b.x - b.r > canvas.width) b.x = -b.r;
        if (b.x + b.r < 0) b.x = canvas.width + b.r;
        if (b.y - b.r > canvas.height) b.y = -b.r;
        if (b.y + b.r < 0) b.y = canvas.height + b.r;
    });

    requestAnimationFrame(animateMesh);
}

animateMesh();

// Ajuste ao redimensionar
window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});


function carregarHorarios() {
    const select = document.getElementById("horario");
    select.innerHTML = ""; 

    let hora = 9;
    let minuto = 0;

    while (hora < 19) {
        let h = hora.toString().padStart(2, "0");
        let m = minuto.toString().padStart(2, "0");

        const option = document.createElement("option");
        option.value = `${h}:${m}`;
        option.textContent = `${h}:${m}`;
        select.appendChild(option);

        // intervalo de 30 min
        minuto += 30;
        if (minuto === 60) {
            minuto = 0;
            hora++;
        }
    }
}

window.onload = () => {
    carregarHorarios();
};


/* Preview da foto */
document.getElementById("inputFoto").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (file) {
        document.getElementById("fotoPerfil").src = URL.createObjectURL(file);
    }
});

/* Modal */
function abrirModal() {
  document.getElementById("modalPerfil").style.display = "flex";
}

function fecharModal() {
  document.getElementById("modalPerfil").style.display = "none";
}

/* Salvando a edição */
function salvarEdicao() {
  const user = JSON.parse(localStorage.getItem("usuarioLogado")) || {};

  user.nome = document.getElementById("editNome").value;
  user.telefone = document.getElementById("editTelefone").value;
  user.email = document.getElementById("editEmail").value;

  localStorage.setItem("usuarioLogado", JSON.stringify(user));

  location.reload();
}