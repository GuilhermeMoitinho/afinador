# Afinador de Violão

Afinador online de violão com detecção de pitch em tempo real direto no navegador. Implementa o algoritmo **MPM (McLeod Pitch Method)** dentro de um `AudioWorklet` para precisão sub-cent e baixa latência.

## Recursos

- 8 afinações: Padrão, Drop D, Drop C, Open G, Open D, DADGAD, meio tom abaixo e um tom abaixo
- Modo **Auto** (detecta a corda mais próxima) e **Manual** (trava em uma corda específica)
- Calibração de A4 entre 415 Hz e 466 Hz
- Indicador in-tune ±5 cents (verde com glow), ±15 cents (amarelo) e além disso (vermelho)
- Roda em qualquer navegador moderno em HTTPS ou localhost (Web Audio API + AudioWorklet)

## Stack

- Next.js 16 + React 19 + TypeScript estrito
- Tailwind CSS 4
- Web Audio API: `AudioWorklet` + `BiquadFilterNode` (high-pass 70 Hz)
- Algoritmo MPM com NSDF acelerada por FFT (Cooley-Tukey radix-2 in-place)
- Suavização na main thread: `median(5)` + EMA (alpha = 0.25)

## Como rodar

```bash
npm install
npm run dev
```

Abra `http://localhost:3000` e libere o microfone.

## Como funciona

1. Captura do microfone via `getUserMedia` sem AGC, supressão de ruído ou cancelamento de eco — queremos sinal cru.
2. Filtro biquad high-pass a 70 Hz para cortar hum de 50/60 Hz e rumble de manuseio sem atingir o E2 (82 Hz).
3. `AudioWorklet` acumula uma janela de 4096 samples com hop de 2048 (~46 ms de atualização).
4. NSDF calculada via FFT, threshold de clarity 0.93 para evitar octave errors, e interpolação parabólica para precisão sub-amostra.
5. Mediana de 5 leituras + EMA na main thread estabilizam a agulha sem perder responsividade.

## Build

```bash
npm run build
npm run start
```
