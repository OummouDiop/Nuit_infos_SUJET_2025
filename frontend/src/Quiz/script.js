// Données du quiz
const questions = [
    {
        question: "Quel est l'un des principaux risques de l'utilisation des plateformes Big Tech en milieu scolaire ?",
        choices: [
            {
                image: "https://images.unsplash.com/photo-1579783902671-ecb7d3dc39d7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxfHxQcml2YWN5JTIwRGlnaXRhbHxlbnwwfHx8fDE3MTc5MTYwNzJ8MA&ixlib=rb-4.0.3&q=80&w=1080",
                explanation: "L'utilisation des plateformes Big Tech peut entraîner une collecte massive de données personnelles des élèves et des enseignants, posant des problèmes de confidentialité et de vie privée.",
                isCorrect: true
            },
            {
                image: "https://images.unsplash.com/photo-1517430816045-cd336261270f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxfHxSYWl0cmFpbnxlbnwwfHx8fDE3MTc5MTYxMTd8MA&ixlib=rb-4.0.3&q=80&w=1080",
                explanation: "Le risque de pluie n'est pas directement lié à l'utilisation des Big Tech dans le cadre scolaire. Ce risque est un distracteur. L'enjeu majeur est la protection des données.",
                isCorrect: false
            }
        ]
    },
    {
        question: "Quelle alternative peut aider les écoles à réduire leur dépendance aux Big Tech ?",
        choices: [
            {
                image: "https://images.unsplash.com/photo-1510519138101-570d1dca3d6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxfHxvcGVuJTIwc291cmNlfGVufDB8MHx8fDE3MTc5MTYxODd8MA&ixlib=rb-4.0.3&q=80&w=1080",
                explanation: "Les logiciels libres (Open Source) offrent transparence, sécurité et autonomie, permettant aux établissements de s'affranchir des solutions propriétaires des Big Tech.",
                isCorrect: true
            },
            {
                image: "https://images.unsplash.com/photo-1542435503-956c469947f6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxfHxGYXN0JTIwZm9vZHxlbnwwfHx8fDE3MTc5MTYyNjd8MA&ixlib=rb-4.0.3&q=80&w=1080",
                explanation: "Manger plus de fast-food n'a aucun rapport avec la réduction de la dépendance aux Big Tech en milieu scolaire. Cette réponse est fausse.",
                isCorrect: false
            }
        ]
    },
    {
        question: "Pourquoi est-il important de former les élèves à l'esprit critique vis-à-vis du numérique ?",
        choices: [
            {
                image: "https://images.unsplash.com/photo-1498050108023-c5249f4cd085?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxfHxkaXNpbmZvcm1hdGlvbnxlbnwwfHx8fDE3MTc5MTYzODF8MA&ixlib=rb-4.0.3&q=80&w=1080",
                explanation: "Développer l'esprit critique aide les élèves à décrypter les mécanismes des plateformes, à comprendre les modèles économiques et à identifier les risques de manipulation et de désinformation.",
                isCorrect: true
            },
            {
                image: "https://images.unsplash.com/photo-1518173432793-fe80597371d3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxfHxTaWxlbmNlJTIwYW5kJTIwcmVsYXhhbGlvbnxlbnwwfHx8fDE3MTc5MTY0MzV8MA&ixlib=rb-4.0.3&q=80&w=1080",
                explanation: "Bien que le calme soit appréciable, l'objectif de la formation à l'esprit critique numérique n'est pas de créer du silence, mais de développer une analyse lucide des informations et des outils.",
                isCorrect: false
            }
        ]
    },
    {
        question: "Quel rôle jouent les politiques publiques dans la construction d'un 'Village Numérique Résistant' ?",
        choices: [
            {
                image: "https://images.unsplash.com/photo-1589309623000-0e1d1f0e2b1b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxfHxHT1ZFUk5NRU5UJTIwV2ViJTIwc2l0ZXxlbnwwfHx8fDE3MTc5MTY0ODV8MA&ixlib=rb-4.0.3&q=80&w=1080",
                explanation: "Les politiques publiques soutiennent l'innovation souveraine, renforcent les cadres juridiques comme le RGPD et encouragent la mutualisation des ressources éducatives libres.",
                isCorrect: true
            },
            {
                image: "https://images.unsplash.com/photo-1563729781845-a7b7a63d9d30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxfHxMaWdodCUyMGJ1bGJzfGVufDB8MHx8fDE3MTc5MTY1NTN8MA&ixlib=rb-4.0.3&q=80&w=1080",
                explanation: "Bien que l'éclairage public soit utile, il n'a aucun lien direct avec la stratégie numérique et la résistance aux Big Tech en milieu scolaire. Cette réponse est fausse.",
                isCorrect: false
            }
        ]
    },
    {
        question: "Qu'est-ce que le principe 'Argent public - Code public' signifie pour le numérique éducatif ?",
        choices: [
            {
                image: "https://images.unsplash.com/photo-1510915228340-914b7d727b67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxfHxjb2RpbmclMjBvcGVuJTIwc291cmNlfGVufDB8fHx8MTcxNzkxNjY3MHww&ixlib=rb-4.0.3&q=80&w=1080",
                explanation: "Ce principe encourage à développer et utiliser des logiciels libres pour tout projet numérique financé par des fonds publics, favorisant la transparence et la souveraineté.",
                isCorrect: true
            },
            {
                image: "https://images.unsplash.com/photo-1508921340798-e7d41579549f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxfHxNZWdhJTIwZm9uZHxlbnwwfHx8fDE3MTc5MTY3MzR8MA&ixlib=rb-4.0.3&q=80&w=1080",
                explanation: "Le principe 'Argent public - Code public' ne fait pas référence à un grand concours de fonds, mais à l'utilisation de logiciels libres pour les projets financés par l'État.",
                isCorrect: false
            }
        ]
    },
    {
        question: "Quel est l'objectif principal du concept de 'Village Numérique Résistant' ?",
        choices: [
            {
                image: "https://images.unsplash.com/photo-1518621736915-f5df236894c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxfHxjaXRpemVuJTIwZGlnaXRhbHxlbnwwfHx8fDE3MTc5MTY3OTR8MA&ixlib=rb-4.0.3&q=80&w=1080",
                explanation: "Il s'agit de construire une autonomie numérique pour les établissements scolaires, en les rendant acteurs critiques et souverains de leur environnement numérique, loin de la dépendance aux Big Tech.",
                isCorrect: true
            },
            {
                image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxfHxwaWxuZXN8ZW58MHx8fHwxNzE3OTE2ODQxfDA&ixlib=rb-4.0.3&q=80&w=1080",
                explanation: "Bien que les pilones soient une forme de structure, ils n'ont rien à voir avec le concept de 'Village Numérique Résistant' qui est une métaphore pour l'autonomie et la souveraineté numérique.",
                isCorrect: false
            }
        ]
    },
    {
        question: "Quel organisme est un acteur clé de la protection des données personnelles en France ?",
        choices: [
            {
                image: "https://images.unsplash.com/photo-1621217684074-b7782ee8f041?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxfHxDTklMfGVufDB8fHx8MTcxNzkxNjg4Mnww&ixlib=rb-4.0.3&q=80&w=1080",
                explanation: "La CNIL (Commission Nationale de l'Informatique et des Libertés) est l'autorité garante de la protection des données personnelles en France et du respect du RGPD.",
                isCorrect: true
            },
            {
                image: "https://images.unsplash.com/photo-1616763328472-a4f6d4d1d9b3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxfHxNT1VORUdFfGVufDB8fHx8MTcxNzkxNjk1M3ww&ixlib=rb-4.0.3&q=80&w=1080",
                explanation: "La montagne n'a aucun rapport avec la protection des données personnelles. Cette réponse est un distracteur.",
                isCorrect: false
            }
        ]
    },
    {
        question: "Qu'est-ce qu'une Ressource Éducative Libre (REL) ?",
        choices: [
            {
                image: "https://images.unsplash.com/photo-1516541121013-1e5e0a0a5b2e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxfHxsaWJyYXJ5fGVufDB8fHx8MTcxNzkxNzAwMnww&ixlib=rb-4.0.3&q=80&w=1080",
                explanation: "Une REL est un document ou un média librement accessible, sous licence ouverte, qui peut être utilisé, adapté et partagé par les éducateurs et les élèves sans restrictions majeures.",
                isCorrect: true
            },
            {
                image: "https://images.unsplash.com/photo-1549462791-0303b7a5a8f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxfHxSZWNpcGUlMjBjdWlzaW5lfGVufDB8fHx8MTcxNzkxNzA1N3ww&ixlib=rb-4.0.3&q=80&w=1080",
                explanation: "Une recette de cuisine, bien que potentiellement libre de partage, n'est pas ce que l'on entend par 'Ressource Éducative Libre' dans le contexte numérique scolaire.",
                isCorrect: false
            }
        ]
    },
    {
        question: "Quel avantage principal les outils numériques souverains offrent-ils aux établissements scolaires ?",
        choices: [
            {
                image: "https://images.unsplash.com/photo-1518770660432-4467b0789d31?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxfHxjb250cm9sJTIwZGlnaXRhbHxlbnwwfHx8fDE3MTc5MTcxMjJ8MA&ixlib=rb-4.0.3&q=80&w=1080",
                explanation: "Ils garantissent la maîtrise des données, la sécurité et la résilience face aux acteurs extérieurs, renforçant l'autonomie et la souveraineté numérique de l'éducation.",
                isCorrect: true
            },
            {
                image: "https://images.unsplash.com/photo-1588665796213-92f7a6071060?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxfHxGcmFuY2hpc2UlMjBmcmllc3xlbnwwfHx8fDE3MTc5MTcxNzV8MA&ixlib=rb-4.0.3&q=80&w=1080",
                explanation: "La franchise avec les amis, bien que positive dans un cadre social, n'est pas un avantage des outils numériques souverains pour les établissements scolaires.",
                isCorrect: false
            }
        ]
    },
    {
        question: "Comment le RGPD impacte-t-il l'utilisation du numérique en éducation ?",
        choices: [
            {
                image: "https://images.unsplash.com/photo-1524177420182-e64e1e0a2b0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxfHxSR0dQUHxlbnwwfHx8fDE3MTc5MTcyMzJ8MA&ixlib=rb-4.0.3&q=80&w=1080",
                explanation: "Le RGPD (Règlement Général sur la Protection des Données) impose des règles strictes sur la collecte, le traitement et la conservation des données personnelles, obligeant les écoles à une vigilance accrue.",
                isCorrect: true
            },
            {
                image: "https://images.unsplash.com/photo-1558244101-b5a415a9990b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NTIyMDF8MHwxfHNlYXJjaHwxfHxwbGF5Z3JvdW5kfGVufDB8fHx8MTcxNzkxNzI3MXww&ixlib=rb-4.0.3&q=80&w=1080",
                explanation: "Le RGPD n'est pas un nouveau type de terrain de jeu, mais une législation européenne fondamentale pour la protection des données personnelles.",
                isCorrect: false
            }
        ]
    }
];

const questionText = document.getElementById('question-text');
const choice1Card = document.getElementById('choice1');
const choice2Card = document.getElementById('choice2');
const choice1Image = choice1Card.querySelector('.choice-image');
const choice2Image = choice2Card.querySelector('.choice-image');
const choice1Explanation = choice1Card.querySelector('.explanation-text');
const choice2Explanation = choice2Card.querySelector('.explanation-text