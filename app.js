// =====================================================
// SIMULADOR EXAMEN IDÓNEO CNV - App Principal
// =====================================================

(function () {
    "use strict";

    // ===== STATE =====
    const state = {
        currentModule: null,      // key del módulo seleccionado o "full_exam"
        questions: [],             // preguntas del examen actual
        answers: [],               // respuestas del usuario (índice de opción o null)
        currentQuestion: 0,        // índice de pregunta actual
        timeLimit: 0,              // tiempo límite en segundos (0 = sin límite)
        timeRemaining: 0,          // tiempo restante en segundos
        timerInterval: null,       // referencia del setInterval
        startTime: null,           // timestamp de inicio
        endTime: null,             // timestamp de fin
        examFinished: false,
        uploadedFiles: []          // archivos subidos en bibliografía
    };

    // ===== DOM REFS =====
    const $ = (sel) => document.querySelector(sel);
    const $$ = (sel) => document.querySelectorAll(sel);

    // Tabs
    const tabButtons = $$(".tab");
    const tabContents = $$(".tab-content");

    // Screens
    const screenModules = $("#screen-modules");
    const screenConfig = $("#screen-config");
    const screenExam = $("#screen-exam");
    const screenResults = $("#screen-results");

    // Config
    const configTitle = $("#config-title");
    const numQuestionsSelect = $("#num-questions");
    const timeLimitSelect = $("#time-limit");
    const shuffleQuestionsCheck = $("#shuffle-questions");
    const shuffleOptionsCheck = $("#shuffle-options");

    // Exam
    const examModuleName = $("#exam-module-name");
    const questionCounter = $("#question-counter");
    const timerEl = $("#timer");
    const progressFill = $("#progress-fill");
    const questionText = $("#question-text");
    const optionsContainer = $("#options-container");
    const questionDots = $("#question-dots");

    // Results
    const scoreCircle = $("#score-circle");
    const scorePercentage = $("#score-percentage");
    const scoreLabel = $("#score-label");
    const statCorrect = $("#stat-correct");
    const statIncorrect = $("#stat-incorrect");
    const statUnanswered = $("#stat-unanswered");
    const statTotal = $("#stat-total");
    const passingMessage = $("#passing-message");
    const timeTaken = $("#time-taken");
    const resultsDetail = $("#results-detail");

    // Bibliography
    const uploadBox = $("#upload-box");
    const fileInput = $("#file-input");
    const uploadedFilesContainer = $("#uploaded-files");
    const biblioModulosContainer = $("#biblio-modulos");

    // ===== TAB SWITCHING =====
    tabButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const tabId = btn.dataset.tab;
            tabButtons.forEach((b) => b.classList.remove("active"));
            tabContents.forEach((c) => c.classList.remove("active"));
            btn.classList.add("active");
            $(`#tab-${tabId}`).classList.add("active");
        });
    });

    // ===== SCREEN NAVIGATION =====
    function showScreen(screen) {
        [screenModules, screenConfig, screenExam, screenResults].forEach((s) =>
            s.classList.remove("active")
        );
        screen.classList.add("active");
    }

    // ===== RENDER MODULE GRID =====
    function renderModuleGrid() {
        const grid = $("#module-grid");
        let html = "";

        // Tarjeta de examen completo
        const totalQuestions = MODULES.reduce(
            (sum, m) => sum + (QUESTION_BANK[m.key]?.length || 0),
            0
        );
        html += `
            <div class="module-card full-exam" data-module="full_exam">
                <div class="module-icon">&#128218;</div>
                <h3>Examen Completo</h3>
                <p class="module-count">${totalQuestions} preguntas de todos los módulos</p>
            </div>
        `;

        // Tarjetas por módulo
        MODULES.forEach((mod) => {
            const count = QUESTION_BANK[mod.key]?.length || 0;
            html += `
                <div class="module-card" data-module="${mod.key}">
                    <div class="module-icon">${mod.icon}</div>
                    <h3>${mod.name}</h3>
                    <p class="module-count">${count} preguntas</p>
                </div>
            `;
        });

        grid.innerHTML = html;

        // Event listeners
        grid.querySelectorAll(".module-card").forEach((card) => {
            card.addEventListener("click", () => {
                state.currentModule = card.dataset.module;
                const mod = MODULES.find((m) => m.key === state.currentModule);
                configTitle.textContent = mod
                    ? `Configuración: ${mod.name}`
                    : "Configuración: Examen Completo";
                showScreen(screenConfig);
            });
        });
    }

    // ===== SHUFFLE ARRAY =====
    function shuffle(arr) {
        const a = [...arr];
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    // ===== PREPARE EXAM =====
    function prepareExam() {
        let questions = [];

        if (state.currentModule === "full_exam") {
            MODULES.forEach((mod) => {
                const qs = QUESTION_BANK[mod.key] || [];
                qs.forEach((q) => {
                    questions.push({ ...q, module: mod.name });
                });
            });
        } else {
            const mod = MODULES.find((m) => m.key === state.currentModule);
            const qs = QUESTION_BANK[state.currentModule] || [];
            qs.forEach((q) => {
                questions.push({ ...q, module: mod.name });
            });
        }

        // Mezclar preguntas
        if (shuffleQuestionsCheck.checked) {
            questions = shuffle(questions);
        }

        // Mezclar opciones
        if (shuffleOptionsCheck.checked) {
            questions = questions.map((q) => {
                const correctOption = q.options[q.correct];
                const shuffledOptions = shuffle(q.options);
                const newCorrect = shuffledOptions.indexOf(correctOption);
                return { ...q, options: shuffledOptions, correct: newCorrect };
            });
        }

        // Limitar cantidad
        const numQ = parseInt(numQuestionsSelect.value);
        if (numQ > 0 && numQ < questions.length) {
            questions = questions.slice(0, numQ);
        }

        state.questions = questions;
        state.answers = new Array(questions.length).fill(null);
        state.currentQuestion = 0;
        state.examFinished = false;

        // Timer
        const minutes = parseInt(timeLimitSelect.value);
        state.timeLimit = minutes * 60;
        state.timeRemaining = state.timeLimit;
        state.startTime = Date.now();
        state.endTime = null;
    }

    // ===== START EXAM =====
    function startExam() {
        prepareExam();

        if (state.questions.length === 0) {
            alert("No hay preguntas disponibles para este módulo.");
            return;
        }

        const mod = MODULES.find((m) => m.key === state.currentModule);
        examModuleName.textContent = mod ? mod.name : "Examen Completo";

        renderQuestion();
        renderDots();
        startTimer();
        showScreen(screenExam);
    }

    // ===== RENDER QUESTION =====
    function renderQuestion() {
        const q = state.questions[state.currentQuestion];
        const idx = state.currentQuestion;

        questionCounter.textContent = `Pregunta ${idx + 1} de ${state.questions.length}`;
        progressFill.style.width = `${((idx + 1) / state.questions.length) * 100}%`;
        questionText.textContent = q.question;

        const letters = ["A", "B", "C", "D"];
        let html = "";
        q.options.forEach((opt, i) => {
            const selected = state.answers[idx] === i ? "selected" : "";
            html += `
                <button class="option-btn ${selected}" data-index="${i}">
                    <span class="option-letter">${letters[i]}</span>
                    <span>${opt}</span>
                </button>
            `;
        });
        optionsContainer.innerHTML = html;

        // Option click
        optionsContainer.querySelectorAll(".option-btn").forEach((btn) => {
            btn.addEventListener("click", () => {
                state.answers[idx] = parseInt(btn.dataset.index);
                renderQuestion();
                updateDots();
            });
        });

        updateDots();
    }

    // ===== DOTS =====
    function renderDots() {
        let html = "";
        state.questions.forEach((_, i) => {
            html += `<div class="q-dot" data-index="${i}"></div>`;
        });
        questionDots.innerHTML = html;

        questionDots.querySelectorAll(".q-dot").forEach((dot) => {
            dot.addEventListener("click", () => {
                state.currentQuestion = parseInt(dot.dataset.index);
                renderQuestion();
            });
        });
    }

    function updateDots() {
        questionDots.querySelectorAll(".q-dot").forEach((dot, i) => {
            dot.classList.toggle("answered", state.answers[i] !== null);
            dot.classList.toggle("current", i === state.currentQuestion);
        });
    }

    // ===== TIMER =====
    function startTimer() {
        if (state.timerInterval) clearInterval(state.timerInterval);

        if (state.timeLimit === 0) {
            timerEl.textContent = "Sin límite";
            timerEl.className = "timer";
            return;
        }

        updateTimerDisplay();
        state.timerInterval = setInterval(() => {
            state.timeRemaining--;
            updateTimerDisplay();

            if (state.timeRemaining <= 0) {
                clearInterval(state.timerInterval);
                finishExam(true);
            }
        }, 1000);
    }

    function updateTimerDisplay() {
        const mins = Math.floor(state.timeRemaining / 60);
        const secs = state.timeRemaining % 60;
        timerEl.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;

        timerEl.className = "timer";
        if (state.timeRemaining <= 60) {
            timerEl.classList.add("danger");
        } else if (state.timeRemaining <= 300) {
            timerEl.classList.add("warning");
        }
    }

    function stopTimer() {
        if (state.timerInterval) {
            clearInterval(state.timerInterval);
            state.timerInterval = null;
        }
    }

    // ===== FINISH EXAM =====
    function finishExam(timeUp = false) {
        if (state.examFinished) return;
        state.examFinished = true;
        state.endTime = Date.now();
        stopTimer();

        if (timeUp) {
            alert("Se acabó el tiempo. El examen ha finalizado.");
        }

        showResults();
        showScreen(screenResults);
    }

    // ===== SHOW RESULTS =====
    function showResults() {
        let correct = 0;
        let incorrect = 0;
        let unanswered = 0;

        state.questions.forEach((q, i) => {
            if (state.answers[i] === null) {
                unanswered++;
            } else if (state.answers[i] === q.correct) {
                correct++;
            } else {
                incorrect++;
            }
        });

        const total = state.questions.length;
        const percentage = Math.round((correct / total) * 100);
        const passed = percentage >= 70;

        // Score circle
        scoreCircle.className = `score-circle ${passed ? "passed" : "failed"}`;
        scorePercentage.textContent = `${percentage}%`;
        scoreLabel.textContent = passed ? "APROBADO" : "DESAPROBADO";

        // Stats
        statCorrect.textContent = correct;
        statIncorrect.textContent = incorrect;
        statUnanswered.textContent = unanswered;
        statTotal.textContent = total;

        // Messages
        passingMessage.textContent = passed
            ? `Aprobaste con ${percentage}%. El mínimo es 70%.`
            : `No aprobaste. Obtuviste ${percentage}% y necesitás al menos 70%.`;

        const elapsed = Math.round((state.endTime - state.startTime) / 1000);
        const elapsedMins = Math.floor(elapsed / 60);
        const elapsedSecs = elapsed % 60;
        timeTaken.textContent = `Tiempo utilizado: ${elapsedMins}m ${elapsedSecs}s`;

        // Detail
        renderResultsDetail("all");
    }

    function renderResultsDetail(filter) {
        let html = "";
        const letters = ["A", "B", "C", "D"];

        state.questions.forEach((q, i) => {
            const userAnswer = state.answers[i];
            let status, statusText;

            if (userAnswer === null) {
                status = "unanswered";
                statusText = "Sin responder";
            } else if (userAnswer === q.correct) {
                status = "correct";
                statusText = "Correcta";
            } else {
                status = "incorrect";
                statusText = "Incorrecta";
            }

            if (filter !== "all" && filter !== status) return;

            html += `<div class="result-item ${status}">`;
            html += `<div class="result-item-header">`;
            html += `<span class="result-item-number">Pregunta ${i + 1} — ${q.module}</span>`;
            html += `<span class="result-status">${statusText}</span>`;
            html += `</div>`;
            html += `<p class="result-question">${q.question}</p>`;

            if (status === "incorrect") {
                html += `<p class="result-answer user-answer">Tu respuesta: ${letters[userAnswer]}) ${q.options[userAnswer]}</p>`;
                html += `<p class="result-answer correct-answer">Respuesta correcta: ${letters[q.correct]}) ${q.options[q.correct]}</p>`;
            } else if (status === "unanswered") {
                html += `<p class="result-answer correct-answer">Respuesta correcta: ${letters[q.correct]}) ${q.options[q.correct]}</p>`;
            } else {
                html += `<p class="result-answer user-correct">Tu respuesta: ${letters[userAnswer]}) ${q.options[userAnswer]}</p>`;
            }

            html += `</div>`;
        });

        if (!html) {
            html = `<p style="text-align:center;color:#718096;padding:2rem;">No hay preguntas en esta categoría.</p>`;
        }

        resultsDetail.innerHTML = html;
    }

    // ===== FILTER BUTTONS =====
    $$(".filter-btn").forEach((btn) => {
        btn.addEventListener("click", () => {
            $$(".filter-btn").forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            renderResultsDetail(btn.dataset.filter);
        });
    });

    // ===== NAVIGATION BUTTONS =====
    $("#btn-back-modules").addEventListener("click", () => showScreen(screenModules));

    $("#btn-start-exam").addEventListener("click", startExam);

    $("#btn-prev").addEventListener("click", () => {
        if (state.currentQuestion > 0) {
            state.currentQuestion--;
            renderQuestion();
        }
    });

    $("#btn-next").addEventListener("click", () => {
        if (state.currentQuestion < state.questions.length - 1) {
            state.currentQuestion++;
            renderQuestion();
        }
    });

    $("#btn-finish").addEventListener("click", () => {
        const unanswered = state.answers.filter((a) => a === null).length;
        let msg = "¿Estás seguro de que querés finalizar el examen?";
        if (unanswered > 0) {
            msg += ` Tenés ${unanswered} pregunta${unanswered > 1 ? "s" : ""} sin responder.`;
        }
        if (confirm(msg)) {
            finishExam();
        }
    });

    $("#btn-retry").addEventListener("click", () => {
        showScreen(screenConfig);
    });

    $("#btn-new-exam").addEventListener("click", () => {
        showScreen(screenModules);
    });

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener("keydown", (e) => {
        if (!screenExam.classList.contains("active") || state.examFinished) return;

        if (e.key === "ArrowRight" || e.key === "ArrowDown") {
            e.preventDefault();
            if (state.currentQuestion < state.questions.length - 1) {
                state.currentQuestion++;
                renderQuestion();
            }
        } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
            e.preventDefault();
            if (state.currentQuestion > 0) {
                state.currentQuestion--;
                renderQuestion();
            }
        } else if (e.key >= "1" && e.key <= "4") {
            const idx = parseInt(e.key) - 1;
            if (idx < state.questions[state.currentQuestion].options.length) {
                state.answers[state.currentQuestion] = idx;
                renderQuestion();
                updateDots();
            }
        }
    });

    // ===== BIBLIOGRAPHY: FILE UPLOAD =====
    uploadBox.addEventListener("click", () => fileInput.click());

    uploadBox.addEventListener("dragover", (e) => {
        e.preventDefault();
        uploadBox.classList.add("dragover");
    });

    uploadBox.addEventListener("dragleave", () => {
        uploadBox.classList.remove("dragover");
    });

    uploadBox.addEventListener("drop", (e) => {
        e.preventDefault();
        uploadBox.classList.remove("dragover");
        handleFiles(e.dataTransfer.files);
    });

    fileInput.addEventListener("change", (e) => {
        handleFiles(e.target.files);
        fileInput.value = "";
    });

    function handleFiles(fileList) {
        Array.from(fileList).forEach((file) => {
            if (file.size > 25 * 1024 * 1024) {
                alert(`El archivo "${file.name}" excede el límite de 25MB.`);
                return;
            }

            const reader = new FileReader();
            reader.onload = () => {
                state.uploadedFiles.push({
                    name: file.name,
                    size: file.size,
                    type: file.type,
                    dataUrl: reader.result
                });
                renderUploadedFiles();
            };
            reader.readAsDataURL(file);
        });
    }

    function formatFileSize(bytes) {
        if (bytes < 1024) return bytes + " B";
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
        return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    }

    function getFileIcon(name) {
        const ext = name.split(".").pop().toLowerCase();
        const icons = {
            pdf: "&#128196;",
            doc: "&#128196;",
            docx: "&#128196;",
            txt: "&#128196;",
            jpg: "&#128247;",
            jpeg: "&#128247;",
            png: "&#128247;"
        };
        return icons[ext] || "&#128196;";
    }

    function renderUploadedFiles() {
        if (state.uploadedFiles.length === 0) {
            uploadedFilesContainer.innerHTML = "";
            return;
        }

        let html = "";
        state.uploadedFiles.forEach((file, i) => {
            html += `
                <div class="uploaded-file">
                    <div class="uploaded-file-info">
                        <span class="file-icon">${getFileIcon(file.name)}</span>
                        <div>
                            <div class="file-name">${file.name}</div>
                            <div class="file-size">${formatFileSize(file.size)}</div>
                        </div>
                    </div>
                    <button class="file-remove" data-index="${i}" title="Eliminar">&times;</button>
                </div>
            `;
        });

        uploadedFilesContainer.innerHTML = html;

        uploadedFilesContainer.querySelectorAll(".file-remove").forEach((btn) => {
            btn.addEventListener("click", () => {
                state.uploadedFiles.splice(parseInt(btn.dataset.index), 1);
                renderUploadedFiles();
            });
        });
    }

    // ===== BIBLIOGRAPHY: RENDER MODULE BIBLIOGRAPHY =====
    function renderBibliography() {
        let html = "<h3>Bibliografía por Módulo</h3>";

        MODULES.forEach((mod) => {
            if (!mod.bibliography || mod.bibliography.length === 0) return;
            html += `
                <div class="biblio-module-card">
                    <h4>${mod.icon} ${mod.name}</h4>
                    <ul>
                        ${mod.bibliography.map((b) => `<li>${b}</li>`).join("")}
                    </ul>
                </div>
            `;
        });

        biblioModulosContainer.innerHTML = html;
    }

    // ===== INIT =====
    renderModuleGrid();
    renderBibliography();
})();
