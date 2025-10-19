import OpenAI from 'openai';

const client = new OpenAI();

export const generateHint = async (question, difficulty) => {
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: 'Você é um assistente educativo que ajuda estudantes com dicas sutis, sem revelar a resposta completa. Seja encorajador e didático.'
        },
        {
          role: 'user',
          content: `Dê uma dica sutil para esta questão (dificuldade ${difficulty}/5): "${question}". A dica deve guiar o raciocínio sem dar a resposta direta. Máximo 2 frases.`
        }
      ],
      max_tokens: 150,
      temperature: 0.7
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Erro ao gerar dica:', error);
    return 'Pense com calma e revise o que você já sabe sobre o assunto!';
  }
};

export const generateQuestion = async (category, difficulty, topic = null) => {
  try {
    const topicText = topic ? ` sobre ${topic}` : '';
    
    const response = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: 'Você é um criador de questões educativas para um jogo. Crie questões objetivas com 4 alternativas, sendo apenas uma correta. Retorne no formato JSON.'
        },
        {
          role: 'user',
          content: `Crie uma questão de ${category}${topicText} com dificuldade ${difficulty}/5 (1=muito fácil, 5=muito difícil). 

Formato JSON:
{
  "question": "texto da pergunta",
  "options": ["opção A", "opção B", "opção C", "opção D"],
  "correct_answer": "resposta correta exata",
  "explanation": "explicação didática da resposta"
}`
        }
      ],
      max_tokens: 500,
      temperature: 0.8,
      response_format: { type: "json_object" }
    });

    const content = JSON.parse(response.choices[0].message.content);
    
    return {
      question: content.question,
      options: content.options,
      correct_answer: content.correct_answer,
      explanation: content.explanation,
      category,
      difficulty
    };
  } catch (error) {
    console.error('Erro ao gerar questão:', error);
    return null;
  }
};

export const analyzePerformance = async (performanceData) => {
  try {
    const { correct_answers, total_answers, categories_performance, average_time } = performanceData;
    
    const accuracy = (correct_answers / total_answers * 100).toFixed(1);
    
    const weakCategories = Object.entries(categories_performance)
      .filter(([_, data]) => (data.correct / data.total) < 0.5)
      .map(([category]) => category);

    const strongCategories = Object.entries(categories_performance)
      .filter(([_, data]) => (data.correct / data.total) >= 0.7)
      .map(([category]) => category);

    const response = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: 'Você é um tutor educativo que analisa o desempenho de estudantes e oferece feedback construtivo e motivacional.'
        },
        {
          role: 'user',
          content: `Analise este desempenho e dê feedback em até 3 frases:
- Taxa de acerto: ${accuracy}%
- Total de questões: ${total_answers}
- Tempo médio por questão: ${average_time.toFixed(1)}s
- Categorias com dificuldade: ${weakCategories.join(', ') || 'nenhuma'}
- Categorias dominadas: ${strongCategories.join(', ') || 'nenhuma'}

Seja encorajador e ofereça uma dica prática de estudo.`
        }
      ],
      max_tokens: 200,
      temperature: 0.7
    });

    return {
      feedback: response.choices[0].message.content.trim(),
      accuracy: parseFloat(accuracy),
      weak_categories: weakCategories,
      strong_categories: strongCategories,
      recommended_difficulty: accuracy < 40 ? 'easier' : accuracy > 70 ? 'harder' : 'maintain'
    };
  } catch (error) {
    console.error('Erro ao analisar desempenho:', error);
    return {
      feedback: 'Continue praticando! Cada questão é uma oportunidade de aprender algo novo.',
      accuracy: 0,
      weak_categories: [],
      strong_categories: [],
      recommended_difficulty: 'maintain'
    };
  }
};

export const generateExplanation = async (question, userAnswer, correctAnswer) => {
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: 'Você é um professor paciente que explica por que uma resposta está errada e ensina o conceito correto de forma clara e didática.'
        },
        {
          role: 'user',
          content: `Questão: "${question}"
Resposta do aluno: "${userAnswer}"
Resposta correta: "${correctAnswer}"

Explique de forma didática por que a resposta correta é "${correctAnswer}" e ajude o aluno a entender o conceito. Máximo 3 frases.`
        }
      ],
      max_tokens: 200,
      temperature: 0.7
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Erro ao gerar explicação:', error);
    return `A resposta correta é "${correctAnswer}". Revise o conceito e tente novamente!`;
  }
};

export const suggestLearningPath = async (userLevel, completedStages, weakCategories) => {
  try {
    const response = await client.chat.completions.create({
      model: 'gpt-4.1-mini',
      messages: [
        {
          role: 'system',
          content: 'Você é um orientador educacional que sugere caminhos de aprendizado personalizados.'
        },
        {
          role: 'user',
          content: `Sugira um plano de estudos para:
- Nível atual: ${userLevel}
- Fases completadas: ${completedStages.length}
- Áreas com dificuldade: ${weakCategories.join(', ') || 'nenhuma'}

Dê 3 sugestões práticas de estudo em formato de lista.`
        }
      ],
      max_tokens: 250,
      temperature: 0.8
    });

    return response.choices[0].message.content.trim();
  } catch (error) {
    console.error('Erro ao sugerir caminho de aprendizado:', error);
    return 'Continue jogando e explorando diferentes categorias para expandir seu conhecimento!';
  }
};

