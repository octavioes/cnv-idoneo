// =====================================================
// BANCO DE PREGUNTAS - SIMULADOR EXAMEN IDÓNEO CNV
// =====================================================
// Para agregar preguntas, simplemente agregá objetos al array del módulo correspondiente.
// Cada pregunta debe tener: question, options (array de 4), correct (índice 0-3)
//
// Para agregar un nuevo módulo, agregá un nuevo objeto al array MODULES
// y un nuevo array de preguntas en QUESTION_BANK con la misma key.

const MODULES = [
    {
        key: "marco_regulatorio",
        name: "Marco Regulatorio",
        icon: "&#9878;",
        description: "Ley de Mercado de Capitales, normativas CNV, regulación",
        bibliography: [
            "Ley 26.831 - Ley de Mercado de Capitales",
            "Normas CNV (N.T. 2013)",
            "Decreto reglamentario 1023/2013"
        ]
    },
    {
        key: "instrumentos",
        name: "Instrumentos Financieros",
        icon: "&#128200;",
        description: "Acciones, bonos, opciones, futuros, fondos comunes",
        bibliography: [
            "Instrumentos de Renta Fija y Variable",
            "Derivados financieros",
            "Fondos Comunes de Inversión - Ley 24.083"
        ]
    },
    {
        key: "mercado_capitales",
        name: "Mercado de Capitales",
        icon: "&#127970;",
        description: "Estructura del mercado, participantes, operaciones",
        bibliography: [
            "Estructura del mercado de capitales argentino",
            "Mercados, agentes y operaciones",
            "BYMA, MAE, ROFEX"
        ]
    },
    {
        key: "economia",
        name: "Conceptos Económicos",
        icon: "&#128176;",
        description: "Macroeconomía, política monetaria, indicadores",
        bibliography: [
            "Conceptos de macroeconomía aplicada",
            "Política monetaria y cambiaria",
            "Indicadores económicos y financieros"
        ]
    },
    {
        key: "etica",
        name: "Ética y Conducta",
        icon: "&#9889;",
        description: "Código de conducta, prevención lavado, conflictos de interés",
        bibliography: [
            "Código de conducta para agentes",
            "Ley 25.246 - Prevención del Lavado de Activos",
            "Resoluciones UIF aplicables"
        ]
    },
    {
        key: "matematica_financiera",
        name: "Matemática Financiera",
        icon: "&#128202;",
        description: "TIR, VAN, tasas, valuación de instrumentos",
        bibliography: [
            "Matemática financiera aplicada",
            "Valuación de bonos y acciones",
            "Cálculo de rendimientos"
        ]
    }
];

const QUESTION_BANK = {
    // =====================================================
    // MÓDULO 1: MARCO REGULATORIO
    // =====================================================
    marco_regulatorio: [
        {
            question: "¿Cuál es la ley que regula el mercado de capitales en Argentina?",
            options: [
                "Ley 26.831",
                "Ley 24.083",
                "Ley 17.811",
                "Ley 25.246"
            ],
            correct: 0
        },
        {
            question: "¿Quién es el organismo de regulación y supervisión del mercado de capitales argentino?",
            options: [
                "El Banco Central de la República Argentina (BCRA)",
                "La Comisión Nacional de Valores (CNV)",
                "La Superintendencia de Seguros de la Nación (SSN)",
                "El Ministerio de Economía"
            ],
            correct: 1
        },
        {
            question: "¿Qué es el idóneo en el mercado de capitales?",
            options: [
                "Un tipo de instrumento financiero",
                "Una persona que aprobó el examen de la CNV para operar en el mercado",
                "Un funcionario de la CNV",
                "Un tipo de agente de bolsa"
            ],
            correct: 1
        },
        {
            question: "¿Cuál de los siguientes NO es un tipo de agente registrado ante la CNV?",
            options: [
                "Agente de Liquidación y Compensación (ALyC)",
                "Agente de Negociación (AN)",
                "Agente de Custodia de Productos Financieros (ACPF)",
                "Agente de Créditos Personales (ACP)"
            ],
            correct: 3
        },
        {
            question: "La CNV tiene facultades para:",
            options: [
                "Fijar la tasa de interés de referencia",
                "Emitir moneda",
                "Dictar normas reglamentarias y aplicar sanciones",
                "Aprobar el presupuesto nacional"
            ],
            correct: 2
        },
        {
            question: "¿Cuál es el objetivo principal de la Ley de Mercado de Capitales?",
            options: [
                "Regular el sistema bancario",
                "Promover el desarrollo del mercado de capitales y la protección del inversor",
                "Controlar el tipo de cambio",
                "Administrar las reservas internacionales"
            ],
            correct: 1
        },
        {
            question: "¿Qué régimen de oferta pública debe cumplir una empresa para cotizar sus acciones en bolsa?",
            options: [
                "Régimen de oferta privada",
                "Régimen de oferta pública autorizado por la CNV",
                "Régimen de oferta bancaria",
                "Régimen de oferta mixta"
            ],
            correct: 1
        },
        {
            question: "Los agentes del mercado de capitales deben inscribirse ante:",
            options: [
                "El BCRA",
                "La AFIP",
                "La CNV",
                "El Ministerio de Justicia"
            ],
            correct: 2
        }
    ],

    // =====================================================
    // MÓDULO 2: INSTRUMENTOS FINANCIEROS
    // =====================================================
    instrumentos: [
        {
            question: "¿Qué representa una acción?",
            options: [
                "Una deuda de la empresa con el inversor",
                "Una parte del capital social de una empresa",
                "Un préstamo a tasa fija",
                "Un depósito a plazo fijo"
            ],
            correct: 1
        },
        {
            question: "¿Qué es un bono?",
            options: [
                "Una participación en el capital de una empresa",
                "Un instrumento de deuda que paga intereses periódicos y devuelve el capital",
                "Una opción de compra de acciones",
                "Un certificado de depósito bancario"
            ],
            correct: 1
        },
        {
            question: "¿Qué es una Obligación Negociable (ON)?",
            options: [
                "Un título de deuda emitido por una empresa privada",
                "Un título de deuda emitido únicamente por el Estado",
                "Una acción preferida",
                "Un cheque de pago diferido"
            ],
            correct: 0
        },
        {
            question: "¿Qué es un Fondo Común de Inversión (FCI)?",
            options: [
                "Una cuenta bancaria con tasa preferencial",
                "Un patrimonio conformado por aportes de inversores, administrado por una sociedad gerente",
                "Un tipo de seguro de inversión",
                "Un fondo exclusivo del Estado"
            ],
            correct: 1
        },
        {
            question: "¿Cuál es la diferencia principal entre una acción ordinaria y una preferida?",
            options: [
                "Las preferidas siempre cotizan a mayor precio",
                "Las preferidas tienen prioridad en el cobro de dividendos y liquidación",
                "Las ordinarias no dan derecho a voto",
                "Las preferidas solo pueden ser emitidas por el Estado"
            ],
            correct: 1
        },
        {
            question: "Un Certificado de Depósito Argentino (CEDEAR) representa:",
            options: [
                "Acciones de empresas argentinas que cotizan en el exterior",
                "Certificados de depósito a plazo fijo",
                "Acciones de empresas extranjeras que cotizan en el mercado local",
                "Bonos del tesoro argentino"
            ],
            correct: 2
        },
        {
            question: "¿Qué es una opción financiera (call)?",
            options: [
                "La obligación de comprar un activo a un precio determinado",
                "El derecho, pero no la obligación, de comprar un activo a un precio determinado",
                "El derecho de vender un activo a un precio determinado",
                "Una garantía bancaria"
            ],
            correct: 1
        },
        {
            question: "El valor nominal de un bono es:",
            options: [
                "El precio de mercado actual del bono",
                "El valor al que fue emitido y sobre el cual se calculan los intereses",
                "El precio mínimo al que se puede vender",
                "El valor del cupón de interés"
            ],
            correct: 1
        }
    ],

    // =====================================================
    // MÓDULO 3: MERCADO DE CAPITALES
    // =====================================================
    mercado_capitales: [
        {
            question: "BYMA es:",
            options: [
                "Bolsas y Mercados Argentinos, un mercado donde se negocian valores",
                "Un banco de inversión estatal",
                "Una calificadora de riesgo",
                "Un organismo regulador internacional"
            ],
            correct: 0
        },
        {
            question: "El mercado primario es donde:",
            options: [
                "Se negocian valores ya emitidos entre inversores",
                "Se emiten y colocan valores por primera vez",
                "Se negocian derivados financieros",
                "Se realizan operaciones de cambio"
            ],
            correct: 1
        },
        {
            question: "El mercado secundario es donde:",
            options: [
                "Se emiten acciones por primera vez",
                "Se realizan las colocaciones iniciales de bonos",
                "Se negocian valores ya emitidos entre inversores",
                "Se registran las empresas ante la CNV"
            ],
            correct: 2
        },
        {
            question: "¿Qué función cumple la Caja de Valores?",
            options: [
                "Emitir acciones",
                "Custodiar y administrar valores negociables",
                "Regular el mercado de capitales",
                "Fijar los precios de las acciones"
            ],
            correct: 1
        },
        {
            question: "¿Qué es el MAE?",
            options: [
                "Mercado Abierto Electrónico, un mercado OTC para títulos públicos",
                "Mecanismo de Ahorro Estatal",
                "Módulo de Acciones Electrónicas",
                "Mercado de Acciones Extranjeras"
            ],
            correct: 0
        },
        {
            question: "Una IPO (Oferta Pública Inicial) ocurre en:",
            options: [
                "El mercado secundario",
                "El mercado primario",
                "El mercado de derivados",
                "El mercado cambiario"
            ],
            correct: 1
        },
        {
            question: "¿Qué es la liquidación T+2?",
            options: [
                "La operación se liquida dos minutos después",
                "La operación se liquida dos días hábiles después de concertada",
                "La operación se liquida en dos cuotas",
                "La operación se liquida al doble del valor"
            ],
            correct: 1
        },
        {
            question: "Un Agente de Liquidación y Compensación (ALyC) puede:",
            options: [
                "Solo negociar acciones",
                "Solo negociar bonos",
                "Negociar, liquidar y compensar operaciones",
                "Solo liquidar operaciones de terceros"
            ],
            correct: 2
        }
    ],

    // =====================================================
    // MÓDULO 4: CONCEPTOS ECONÓMICOS
    // =====================================================
    economia: [
        {
            question: "¿Qué mide el Producto Bruto Interno (PBI)?",
            options: [
                "La deuda externa de un país",
                "El valor total de bienes y servicios producidos en un país en un período",
                "La cantidad de dinero en circulación",
                "El nivel de exportaciones"
            ],
            correct: 1
        },
        {
            question: "La inflación se define como:",
            options: [
                "El aumento del tipo de cambio",
                "El aumento generalizado y sostenido de los precios",
                "El aumento de las tasas de interés",
                "El aumento del desempleo"
            ],
            correct: 1
        },
        {
            question: "¿Qué es la tasa de interés de referencia del BCRA?",
            options: [
                "La tasa mínima para préstamos hipotecarios",
                "La tasa que el BCRA paga por sus instrumentos de deuda y que influye en las tasas del mercado",
                "La tasa de inflación esperada",
                "La tasa de rendimiento de las acciones"
            ],
            correct: 1
        },
        {
            question: "El riesgo país mide:",
            options: [
                "La probabilidad de terremotos en un país",
                "El diferencial de rendimiento de los bonos de un país respecto de los bonos del Tesoro de EE.UU.",
                "La tasa de desempleo de un país",
                "El nivel de corrupción de un país"
            ],
            correct: 1
        },
        {
            question: "¿Qué política aplica el BCRA para controlar la inflación?",
            options: [
                "Política fiscal",
                "Política comercial",
                "Política monetaria",
                "Política laboral"
            ],
            correct: 2
        },
        {
            question: "La balanza comercial es:",
            options: [
                "La diferencia entre exportaciones e importaciones de bienes",
                "La diferencia entre ingresos y gastos del gobierno",
                "La diferencia entre ahorro e inversión",
                "La diferencia entre créditos y débitos financieros"
            ],
            correct: 0
        },
        {
            question: "¿Qué son las Letras del Tesoro?",
            options: [
                "Instrumentos de deuda de corto plazo emitidos por el Estado",
                "Acciones preferenciales del Estado",
                "Certificados de depósito del BCRA",
                "Pagarés emitidos por empresas privadas"
            ],
            correct: 0
        },
        {
            question: "La devaluación de la moneda implica:",
            options: [
                "Un aumento del poder adquisitivo",
                "Una pérdida de valor de la moneda local frente a monedas extranjeras",
                "Un aumento de las reservas internacionales",
                "Una reducción de la inflación"
            ],
            correct: 1
        }
    ],

    // =====================================================
    // MÓDULO 5: ÉTICA Y CONDUCTA
    // =====================================================
    etica: [
        {
            question: "¿Qué es el lavado de activos?",
            options: [
                "Invertir en el mercado de capitales",
                "El proceso de ocultar el origen ilícito de fondos para darles apariencia de legalidad",
                "Transferir dinero entre cuentas bancarias",
                "Comprar moneda extranjera"
            ],
            correct: 1
        },
        {
            question: "¿Cuál es el organismo encargado de prevenir el lavado de activos en Argentina?",
            options: [
                "La CNV",
                "El BCRA",
                "La Unidad de Información Financiera (UIF)",
                "La AFIP"
            ],
            correct: 2
        },
        {
            question: "El principio de \"Conozca a su Cliente\" (KYC) implica:",
            options: [
                "Conocer las preferencias personales del cliente",
                "Identificar y verificar la identidad del cliente y entender el origen de sus fondos",
                "Ser amigo del cliente",
                "Conocer la familia del cliente"
            ],
            correct: 1
        },
        {
            question: "¿Qué es la información privilegiada en el mercado de capitales?",
            options: [
                "La información publicada en los estados financieros",
                "Información no pública que puede afectar el precio de un valor y que se obtuvo por posición privilegiada",
                "La información que aparece en los diarios financieros",
                "Los informes de las calificadoras de riesgo"
            ],
            correct: 1
        },
        {
            question: "El uso de información privilegiada para operar en el mercado es:",
            options: [
                "Legal si se hace con moderación",
                "Ilegal y constituye un delito",
                "Permitido para los directores de empresas",
                "Permitido si se informa a la CNV"
            ],
            correct: 1
        },
        {
            question: "¿Qué son los Reportes de Operaciones Sospechosas (ROS)?",
            options: [
                "Informes de ganancias de las empresas",
                "Reportes que los sujetos obligados deben enviar a la UIF cuando detectan operaciones inusuales",
                "Balances contables de los agentes de bolsa",
                "Informes de auditoría externa"
            ],
            correct: 1
        },
        {
            question: "Un conflicto de interés en el mercado de capitales ocurre cuando:",
            options: [
                "Dos empresas compiten en el mismo sector",
                "Un agente tiene intereses personales que pueden interferir con su deber hacia el cliente",
                "Hay desacuerdo sobre el precio de una acción",
                "Un inversor pierde dinero"
            ],
            correct: 1
        },
        {
            question: "¿Qué es la debida diligencia?",
            options: [
                "La velocidad con que se ejecutan las órdenes",
                "El proceso de investigación y verificación de la identidad y actividad de clientes",
                "La rapidez en la liquidación de operaciones",
                "La eficiencia del sistema de trading"
            ],
            correct: 1
        }
    ],

    // =====================================================
    // MÓDULO 6: MATEMÁTICA FINANCIERA
    // =====================================================
    matematica_financiera: [
        {
            question: "La TIR (Tasa Interna de Retorno) de un bono representa:",
            options: [
                "La tasa de inflación esperada",
                "La tasa de descuento que iguala el valor presente de los flujos futuros con el precio del bono",
                "La tasa de interés del BCRA",
                "El cupón del bono"
            ],
            correct: 1
        },
        {
            question: "Si un bono cotiza por debajo de su valor nominal (bajo la par), significa que:",
            options: [
                "Su TIR es menor que la tasa del cupón",
                "Su TIR es mayor que la tasa del cupón",
                "El emisor está en default",
                "El bono no paga intereses"
            ],
            correct: 1
        },
        {
            question: "El VAN (Valor Actual Neto) positivo de una inversión indica que:",
            options: [
                "La inversión genera pérdidas",
                "La inversión genera valor por encima de la tasa de descuento utilizada",
                "La inversión tiene riesgo alto",
                "La inversión es ilíquida"
            ],
            correct: 1
        },
        {
            question: "La duration de un bono mide:",
            options: [
                "El plazo hasta el vencimiento del bono",
                "La sensibilidad del precio del bono ante cambios en la tasa de interés",
                "La cantidad de cupones que paga",
                "La calificación crediticia del emisor"
            ],
            correct: 1
        },
        {
            question: "Si la tasa de interés del mercado sube, el precio de un bono a tasa fija:",
            options: [
                "Sube",
                "Se mantiene igual",
                "Baja",
                "No tiene relación"
            ],
            correct: 2
        },
        {
            question: "¿Qué es la tasa nominal anual (TNA)?",
            options: [
                "La tasa efectiva que se cobra anualmente",
                "La tasa que no contempla la capitalización de intereses",
                "La tasa de inflación anual",
                "La tasa real descontada la inflación"
            ],
            correct: 1
        },
        {
            question: "¿Cuál es la relación entre riesgo y rendimiento esperado?",
            options: [
                "A mayor riesgo, menor rendimiento esperado",
                "A mayor riesgo, mayor rendimiento esperado",
                "No existe relación entre riesgo y rendimiento",
                "El riesgo y el rendimiento siempre son iguales"
            ],
            correct: 1
        },
        {
            question: "El rendimiento de un bono cupón cero se obtiene por:",
            options: [
                "Los pagos periódicos de interés",
                "La diferencia entre el precio de compra (menor al nominal) y el valor nominal al vencimiento",
                "Los dividendos",
                "La reinversión de cupones"
            ],
            correct: 1
        }
    ]
};
