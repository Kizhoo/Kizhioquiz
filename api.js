const API_URL = 'https://quizapi.io/api/v1/questions';
const API_KEY = 'YuSWpVknCC7QIvZHolbDgliZTDZw034xalepYkW3'; // Ganti dengan API key Anda

// Fungsi untuk mengambil pertanyaan dari API
export async function fetchQuestions(difficulty, limit = 10, category = '') {
    try {
        // Mapping kesulitan
        const difficultyMap = {
            'easy': 'easy',
            'medium': 'medium',
            'hard': 'hard',
            'veryhard': 'hard' // QuizAPI tidak punya veryhard, jadi pakai hard
        };
        
        const params = new URLSearchParams({
            apiKey: API_KEY,
            limit: limit,
            difficulty: difficultyMap[difficulty] || 'easy'
        });
        
        if (category) {
            params.append('category', category);
        }
        
        const response = await fetch(`${API_URL}?${params}`);
        
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        // Proses pertanyaan
        return data.map(processQuestion);
    } catch (error) {
        console.error('Error fetching questions:', error);
        throw error;
    }
}

// Proses pertanyaan dari API
function processQuestion(apiQuestion) {
    const answers = [];
    
    // Tambahkan jawaban yang tersedia
    if (apiQuestion.answers.answer_a) {
        answers.push({
            id: 'a',
            text: apiQuestion.answers.answer_a,
            correct: apiQuestion.correct_answers.answer_a_correct === 'true'
        });
    }
    
    if (apiQuestion.answers.answer_b) {
        answers.push({
            id: 'b',
            text: apiQuestion.answers.answer_b,
            correct: apiQuestion.correct_answers.answer_b_correct === 'true'
        });
    }
    
    if (apiQuestion.answers.answer_c) {
        answers.push({
            id: 'c',
            text: apiQuestion.answers.answer_c,
            correct: apiQuestion.correct_answers.answer_c_correct === 'true'
        });
    }
    
    if (apiQuestion.answers.answer_d) {
        answers.push({
            id: 'd',
            text: apiQuestion.answers.answer_d,
            correct: apiQuestion.correct_answers.answer_d_correct === 'true'
        });
    }
    
    // Kembalikan objek pertanyaan yang diproses
    return {
        id: apiQuestion.id,
        question: apiQuestion.question,
        answers: answers,
        category: apiQuestion.category,
        difficulty: apiQuestion.difficulty,
        multipleCorrect: apiQuestion.multiple_correct_answers === 'true'
    };
}

// Fallback jika API tidak bekerja
export function getSampleQuestions() {
    return [
        {
            id: 1,
            question: "Apa ibukota Indonesia?",
            answers: [
                { id: 'a', text: "Jakarta", correct: true },
                { id: 'b', text: "Bandung", correct: false },
                { id: 'c', text: "Surabaya", correct: false },
                { id: 'd', text: "Medan", correct: false }
            ],
            category: "Geography",
            difficulty: "easy"
        },
        {
            id: 2,
            question: "Berapa hasil dari 7 x 8?",
            answers: [
                { id: 'a', text: "54", correct: false },
                { id: 'b', text: "56", correct: true },
                { id: 'c', text: "64", correct: false },
                { id: 'd', text: "48", correct: false }
            ],
            category: "Math",
            difficulty: "easy"
        },
        {
            id: 3,
            question: "Siapa penemu lampu pijar?",
            answers: [
                { id: 'a', text: "Thomas Edison", correct: true },
                { id: 'b', text: "Nikola Tesla", correct: false },
                { id: 'c', text: "Alexander Graham Bell", correct: false },
                { id: 'd', text: "Albert Einstein", correct: false }
            ],
            category: "Science",
            difficulty: "medium"
        }
    ];
}
