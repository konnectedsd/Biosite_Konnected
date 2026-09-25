/**
 * ==============================================================================
 * 🎛️ PAINEL DE CONTROLE DO FUNDO NFC (Konnected) — ONDA CÍCLICA MONOCROMÁTICA
 * ==============================================================================
 */
window.NFC_CONFIG = {
    // 1. LINHAS DO FEIXE
    lines: {
        count: 28,               // Quantidade equilibrada de linhas
        startSpread: 0.24,       // Cobertura suave no topo-esquerdo
    },

    // 2. ESTILO MONOCROMÁTICO (Zero verde, grafite elegante puro)
    style: {
        color: '#0F172A',        // Cor grafite nobre e profunda
        opacityMin: 0.12,        // Opacidade das linhas das pontas
        opacityMax: 0.40,        // Opacidade das linhas centrais bem definidas
        strokeWidthMin: 1.0,     // Espessura mínima (em pixels)
        strokeWidthMax: 2.0,     // Espessura máxima (em pixels)
    },

    // 3. AURÉOLA AO REDOR DA PLAQUINHA 3D
    halo: {
        innerGap: 195,           // Respiro/vazio circular em volta da placa (em px)
        outerSpread: 340,        // Expansão externa das curvas (em px)
    },

    // 4. CICLO DA ONDA (DESENHAR E APAGAR CONTINUAMENTE PELA PÁGINA INTEIRA)
    animation: {
        drawDuration: 3200,      // Tempo calibrado para percorrer a página inteira (ms)
        holdDuration: 1400,      // Tempo em que o feixe fica 100% visível (ms)
        eraseDuration: 2800,     // Tempo para as linhas se apagarem (ms)
        cycleInterval: 800,      // Pausa entre um pulso de onda e o próximo (ms)
        staggerDelay: 38,        // Intervalo cascata entre cada linha (ms)
    }
};

(function () {
    'use strict';

    var cfg = window.NFC_CONFIG;
    var currentAnimeInstances = [];

    function getCenter(W, H, svgEl) {
        var modelEl = document.getElementById('nfc-model-viewer');
        if (modelEl && svgEl) {
            var rect = modelEl.getBoundingClientRect();
            var svgRect = svgEl.getBoundingClientRect();
            if (rect.width > 0 && rect.height > 0) {
                return {
                    x: (rect.left - svgRect.left) + rect.width / 2,
                    y: (rect.top - svgRect.top) + rect.height / 2,
                    size: rect.width
                };
            }
        }
        var isMobile = W < 768;
        return {
            x: isMobile ? W / 2 : Math.max(W * 0.72, W - 380),
            y: isMobile ? 220 : 480,
            size: isMobile ? 330 : 500
        };
    }

    function generatePaths() {
        var svgEl = document.getElementById('nfc-field-svg');
        if (!svgEl) return [];

        var W = document.documentElement.clientWidth || window.innerWidth;
        var H = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, window.innerHeight);

        svgEl.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
        svgEl.style.width = '100%';
        svgEl.style.height = H + 'px';

        var bgContainer = document.querySelector('.site-background');
        if (bgContainer) {
            bgContainer.style.height = H + 'px';
        }

        // Limpa qualquer elemento interno anterior
        while (svgEl.firstChild) {
            svgEl.removeChild(svgEl.firstChild);
        }

        var focal = getCenter(W, H, svgEl);
        var cx = focal.x;
        var cy = focal.y;

        var isMobile = W < 768;

        // Auréola proporcional
        var rMin = isMobile ? Math.min(135, focal.size * 0.44) : Math.max(cfg.halo.innerGap, focal.size * 0.38);
        var rMax = rMin + (isMobile ? Math.min(W * 0.30, 120) : Math.min(W * 0.22, cfg.halo.outerSpread));

        var paths = [];
        var N = isMobile ? Math.min(22, cfg.lines.count) : cfg.lines.count;

        var remainY = Math.max(600, H - cy);

        for (var i = 0; i < N; i++) {
            var t = i / (N - 1);
            var r = rMin + t * (rMax - rMin);

            // Início na margem superior esquerda
            var sx = -30;
            var sy = Math.min(window.innerHeight * 0.03, 25) + t * (window.innerHeight * (isMobile ? 0.16 : cfg.lines.startSpread));

            // Ponto de tangência no topo da órbita
            var tx = cx - (isMobile ? 15 : 25);
            var ty = cy - r;

            var cp1x = sx + (tx - sx) * 0.45;
            var cp1y = sy - (isMobile ? 20 : 30) + t * 20;
            var cp2x = tx - r * 0.50;
            var cp2y = ty;

            // Arco circular pelo flanco direito
            var endAngleRad = (Math.PI / 180) * (52 + t * 28);
            var ex = cx + Math.cos(endAngleRad) * r;
            var ey = cy + Math.sin(endAngleRad) * r;

            // Continuação descendo suavemente e serpenteando pelo fundo da página até o rodapé
            var exitTangentX = -Math.sin(endAngleRad);
            var exitTangentY =  Math.cos(endAngleRad);

            // Ponto intermediário 1 (Passando ao lado de Métricas e Soluções)
            var p1x = isMobile ? (W * 0.85 + (t - 0.5) * 40) : (ex + exitTangentX * (r * 0.5) + (t * 50));
            var p1y = ey + remainY * 0.22;
            var cp3x = ex + exitTangentX * (r * 0.8);
            var cp3y = ey + exitTangentY * (r * 0.8);
            var cp4x = p1x - (isMobile ? 10 : 30);
            var cp4y = p1y - remainY * 0.08;

            // Ponto intermediário 2 (Passando ao lado de Demonstrações e Como Funciona)
            var p2x = isMobile ? (W * 0.75 + (t - 0.5) * 50) : (W * 0.82 + (t - 0.5) * 120);
            var p2y = ey + remainY * 0.55;
            var cp5x = p1x + (isMobile ? 20 : 40);
            var cp5y = p1y + remainY * 0.12;
            var cp6x = p2x - (isMobile ? 15 : 30);
            var cp6y = p2y - remainY * 0.12;

            // Ponto Final no Rodapé
            var bottomX = isMobile ? (W * 0.80 + (t - 0.5) * 60) : (W * 0.85 + (t - 0.5) * 140);
            var bottomY = H + 60;
            var cp7x = p2x + (isMobile ? 15 : 30);
            var cp7y = p2y + remainY * 0.15;
            var cp8x = bottomX - 20;
            var cp8y = bottomY - 100;

            var d = [
                'M', sx.toFixed(1) + ',' + sy.toFixed(1),
                'C', cp1x.toFixed(1) + ',' + cp1y.toFixed(1),
                     cp2x.toFixed(1) + ',' + cp2y.toFixed(1),
                     tx.toFixed(1)   + ',' + ty.toFixed(1),
                'A', r.toFixed(1), r.toFixed(1), 0, 0, 1,
                     ex.toFixed(1)   + ',' + ey.toFixed(1),
                'C', cp3x.toFixed(1) + ',' + cp3y.toFixed(1),
                     cp4x.toFixed(1) + ',' + cp4y.toFixed(1),
                     p1x.toFixed(1)  + ',' + p1y.toFixed(1),
                'C', cp5x.toFixed(1) + ',' + cp5y.toFixed(1),
                     cp6x.toFixed(1) + ',' + cp6y.toFixed(1),
                     p2x.toFixed(1)  + ',' + p2y.toFixed(1),
                'C', cp7x.toFixed(1) + ',' + cp7y.toFixed(1),
                     cp8x.toFixed(1) + ',' + cp8y.toFixed(1),
                     bottomX.toFixed(1) + ',' + bottomY.toFixed(1)
            ].join(' ');

            // Variação harmônica de opacidade e espessura
            var opacitySpan = cfg.style.opacityMax - cfg.style.opacityMin;
            var baseOpacity = (cfg.style.opacityMin + Math.sin(t * Math.PI) * opacitySpan).toFixed(3);

            var widthSpan = cfg.style.strokeWidthMax - cfg.style.strokeWidthMin;
            var strokeWidth = (cfg.style.strokeWidthMin + (1 - Math.abs(t - 0.5) * 2) * widthSpan).toFixed(2);

            var pathEl = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            pathEl.setAttribute('d', d);
            pathEl.setAttribute('stroke', cfg.style.color);
            pathEl.setAttribute('stroke-opacity', baseOpacity);
            pathEl.setAttribute('stroke-width', strokeWidth);
            pathEl.setAttribute('fill', 'none');
            pathEl.setAttribute('stroke-linecap', 'round');

            svgEl.appendChild(pathEl);
            paths.push(pathEl);
        }

        return paths;
    }

    // ── ANIMAÇÃO CÍCLICA DE DESENHAR E APAGAR (PULSO DE ONDA) ───────────────
    function initAnimation() {
        if (typeof anime === 'undefined') return;

        // Limpa animações anteriores
        currentAnimeInstances.forEach(function (anim) {
            if (anim && anim.pause) anim.pause();
        });
        currentAnimeInstances = [];

        var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        var paths = generatePaths();
        if (!paths.length) return;

        if (prefersReduced) {
            paths.forEach(function (path) {
                path.style.strokeDashoffset = '0';
            });
            return;
        }

        // Cada linha tem seu ciclo independente com stagger
        paths.forEach(function (path, idx) {
            var len = path.getTotalLength ? path.getTotalLength() : 2000;
            path.style.strokeDasharray = len + ' ' + len;
            path.style.strokeDashoffset = len;

            var lineDelay = idx * cfg.animation.staggerDelay;

            var timeline = anime.timeline({
                loop: true,
                delay: lineDelay
            });

            // 1. SURGIR (Desenha da cauda à ponta)
            timeline.add({
                targets: path,
                strokeDashoffset: [len, 0],
                duration: cfg.animation.drawDuration,
                easing: 'cubicBezier(0.25, 1, 0.5, 1)'
            })
            // 2. SUSTENTAR (Fica 100% visível)
            .add({
                targets: path,
                duration: cfg.animation.holdDuration,
                strokeDashoffset: 0
            })
            // 3. APAGAR (A cauda corre e apaga a linha completamente no mesmo sentido)
            .add({
                targets: path,
                strokeDashoffset: [0, -len],
                duration: cfg.animation.eraseDuration,
                easing: 'cubicBezier(0.5, 0, 0.75, 0)'
            })
            // 4. PAUSA DE REPOUSO antes da próxima onda nascer
            .add({
                targets: path,
                duration: cfg.animation.cycleInterval,
                strokeDashoffset: -len
            });

            currentAnimeInstances.push(timeline);
        });
    }

    // ── INICIALIZAÇÃO E RESPONSIVIDADE ──────────────────────────────────────
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(initAnimation, 80);

        // Recalibra assim que o modelo 3D WebGL terminar de carregar com suas medidas definitivas
        var modelEl = document.getElementById('nfc-model-viewer');
        if (modelEl) {
            modelEl.addEventListener('load', function () {
                initAnimation();
            });
        }

        var resizeTimer;
        window.addEventListener('resize', function () {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(initAnimation, 200);
        });

        // 🔄 TRATAMENTO DE VISIBILIDADE / TROCA DE ABA (Page Visibility API)
        // Evita que o Anime.js quebre ou acumule deltas temporais descompassados ao ficar em segundo plano
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) {
                currentAnimeInstances.forEach(function (anim) {
                    if (anim && anim.pause) anim.pause();
                });
            } else {
                // Ao reativar a aba, recria as timelines em estado limpo
                setTimeout(initAnimation, 80);
            }
        });
    });

    // ── API GLOBAL PARA O CONSOLE ───────────────────────────────────────────
    window.NFCBackground = {
        refresh: function () { initAnimation(); },
        update: function (newOptions) {
            if (!newOptions) return;
            for (var group in newOptions) {
                if (cfg[group]) {
                    for (var key in newOptions[group]) {
                        cfg[group][key] = newOptions[group][key];
                    }
                }
            }
            initAnimation();
        }
    };

}());
