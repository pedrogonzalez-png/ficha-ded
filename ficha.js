document.addEventListener("DOMContentLoaded", () => {
  const ataqueInput = document.getElementById("ataque");
  const danoMinSpan = document.getElementById("danoMin");
  const danoMedioSpan = document.getElementById("danoMedio");
  const danoMaxSpan = document.getElementById("danoMax");

  ataqueInput.addEventListener("input", () => {
    const input = ataqueInput.value.replace(/\s+/g, ""); // tira espaços
    if (!input) {
      danoMinSpan.textContent = "-";
      danoMedioSpan.textContent = "-";
      danoMaxSpan.textContent = "-";
      return;
    }

    // Regex para pegar todas as partes tipo "2d6", "3d10", "+4", "-1"
    const regex = /([+-]?)(\d*)d(\d+)|([+-]\d+)/gi;

    let minTotal = 0;
    let maxTotal = 0;
    let bonusTotal = 0;
    let encontrou = false;

    let match;
    while ((match = regex.exec(input)) !== null) {
      encontrou = true;

      if (match[3]) {
        // Parte dados: exemplo match: [1] sinal, [2] qtd, [3] faces
        const sinal = match[1] === "-" ? -1 : 1;
        const qtd = parseInt(match[2]) || 1;
        const faces = parseInt(match[3]);

        const min = qtd * 1 * sinal;
        const max = qtd * faces * sinal;

        minTotal += min;
        maxTotal += max;
      } else if (match[4]) {
        // Parte bônus isolado tipo +4 ou -3
        bonusTotal += parseInt(match[4]);
      }
    }

    if (encontrou) {
      minTotal += bonusTotal;
      maxTotal += bonusTotal;
      const mediaTotal = (minTotal + maxTotal) / 2;

      danoMinSpan.textContent = minTotal;
      danoMedioSpan.textContent = mediaTotal.toFixed(1);
      danoMaxSpan.textContent = maxTotal;
    } else {
      danoMinSpan.textContent = "-";
      danoMedioSpan.textContent = "-";
      danoMaxSpan.textContent = "-";
    }
  });
});
