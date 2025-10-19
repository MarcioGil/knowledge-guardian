import sequelize from './database.js';
import { 
  User, 
  PlayerProgress, 
  Achievement, 
  Leaderboard, 
  EducationalContent,
  AIAdaptation 
} from '../models/index.js';

const initDatabase = async () => {
  try {
    console.log('🔄 Iniciando sincronização do banco de dados...');
    
    await sequelize.sync({ force: true });
    
    console.log('✅ Banco de dados sincronizado com sucesso!');
    
    console.log('🌱 Populando banco com dados iniciais...');
    
    const educationalData = [
      // Matemática - Fase 1
      {
        category: 'matematica',
        difficulty: 1,
        stage: 1,
        question: 'Quanto é 5 + 3?',
        correct_answer: '8',
        options: ['6', '7', '8', '9'],
        explanation: 'A soma de 5 + 3 é igual a 8.',
        points: 100
      },
      {
        category: 'matematica',
        difficulty: 1,
        stage: 1,
        question: 'Qual é o resultado de 10 - 4?',
        correct_answer: '6',
        options: ['5', '6', '7', '8'],
        explanation: 'A subtração de 10 - 4 resulta em 6.',
        points: 100
      },
      {
        category: 'matematica',
        difficulty: 2,
        stage: 1,
        question: 'Quanto é 7 × 3?',
        correct_answer: '21',
        options: ['18', '21', '24', '27'],
        explanation: 'A multiplicação de 7 por 3 é igual a 21.',
        points: 150
      },
      
      // História - Fase 1
      {
        category: 'historia',
        difficulty: 1,
        stage: 1,
        question: 'Quem descobriu o Brasil?',
        correct_answer: 'Pedro Álvares Cabral',
        options: ['Cristóvão Colombo', 'Pedro Álvares Cabral', 'Vasco da Gama', 'Fernão de Magalhães'],
        explanation: 'Pedro Álvares Cabral chegou ao Brasil em 22 de abril de 1500.',
        points: 100
      },
      {
        category: 'historia',
        difficulty: 2,
        stage: 1,
        question: 'Em que ano ocorreu a Proclamação da República no Brasil?',
        correct_answer: '1889',
        options: ['1822', '1889', '1891', '1900'],
        explanation: 'A Proclamação da República ocorreu em 15 de novembro de 1889.',
        points: 150
      },
      
      // Ciências - Fase 1
      {
        category: 'ciencias',
        difficulty: 1,
        stage: 1,
        question: 'Quantos planetas existem no Sistema Solar?',
        correct_answer: '8',
        options: ['7', '8', '9', '10'],
        explanation: 'O Sistema Solar possui 8 planetas: Mercúrio, Vênus, Terra, Marte, Júpiter, Saturno, Urano e Netuno.',
        points: 100
      },
      {
        category: 'ciencias',
        difficulty: 2,
        stage: 1,
        question: 'Qual é o maior órgão do corpo humano?',
        correct_answer: 'Pele',
        options: ['Coração', 'Fígado', 'Pele', 'Cérebro'],
        explanation: 'A pele é o maior órgão do corpo humano, cobrindo toda a superfície externa.',
        points: 150
      },
      
      // Matemática - Fase 2
      {
        category: 'matematica',
        difficulty: 2,
        stage: 2,
        question: 'Qual é o resultado de 15 ÷ 3?',
        correct_answer: '5',
        options: ['3', '4', '5', '6'],
        explanation: 'A divisão de 15 por 3 resulta em 5.',
        points: 150
      },
      {
        category: 'matematica',
        difficulty: 3,
        stage: 2,
        question: 'Quanto é 12² (12 ao quadrado)?',
        correct_answer: '144',
        options: ['124', '134', '144', '154'],
        explanation: '12 × 12 = 144',
        points: 200
      },
      
      // Geografia - Fase 2
      {
        category: 'geografia',
        difficulty: 2,
        stage: 2,
        question: 'Qual é a capital do Brasil?',
        correct_answer: 'Brasília',
        options: ['São Paulo', 'Rio de Janeiro', 'Brasília', 'Salvador'],
        explanation: 'Brasília é a capital federal do Brasil desde 1960.',
        points: 150
      },
      {
        category: 'geografia',
        difficulty: 3,
        stage: 2,
        question: 'Qual é o maior país do mundo em extensão territorial?',
        correct_answer: 'Rússia',
        options: ['Canadá', 'China', 'Estados Unidos', 'Rússia'],
        explanation: 'A Rússia é o maior país do mundo com aproximadamente 17 milhões de km².',
        points: 200
      },
      
      // Português - Fase 3
      {
        category: 'portugues',
        difficulty: 2,
        stage: 3,
        question: 'Qual é o plural de "cidadão"?',
        correct_answer: 'cidadãos',
        options: ['cidadões', 'cidadãos', 'cidadães', 'cidadans'],
        explanation: 'O plural correto de cidadão é cidadãos.',
        points: 150
      },
      {
        category: 'portugues',
        difficulty: 3,
        stage: 3,
        question: 'Qual é o sinônimo de "feliz"?',
        correct_answer: 'alegre',
        options: ['triste', 'alegre', 'nervoso', 'cansado'],
        explanation: 'Alegre é um sinônimo de feliz, ambos expressam contentamento.',
        points: 200
      },
      
      // Ciências - Fase 3
      {
        category: 'ciencias',
        difficulty: 3,
        stage: 3,
        question: 'Qual é a fórmula química da água?',
        correct_answer: 'H₂O',
        options: ['H₂O', 'CO₂', 'O₂', 'NaCl'],
        explanation: 'A água é formada por dois átomos de hidrogênio e um de oxigênio (H₂O).',
        points: 200
      },
      {
        category: 'ciencias',
        difficulty: 4,
        stage: 3,
        question: 'Qual processo as plantas usam para produzir energia?',
        correct_answer: 'Fotossíntese',
        options: ['Respiração', 'Fotossíntese', 'Digestão', 'Fermentação'],
        explanation: 'A fotossíntese é o processo pelo qual as plantas convertem luz solar em energia.',
        points: 250
      },
      
      // Matemática - Fase 4
      {
        category: 'matematica',
        difficulty: 4,
        stage: 4,
        question: 'Qual é a raiz quadrada de 64?',
        correct_answer: '8',
        options: ['6', '7', '8', '9'],
        explanation: '8 × 8 = 64, portanto √64 = 8',
        points: 250
      },
      {
        category: 'matematica',
        difficulty: 4,
        stage: 4,
        question: 'Quanto é 25% de 200?',
        correct_answer: '50',
        options: ['25', '40', '50', '75'],
        explanation: '25% de 200 = (25/100) × 200 = 50',
        points: 250
      },
      
      // História - Fase 4
      {
        category: 'historia',
        difficulty: 4,
        stage: 4,
        question: 'Quem foi o primeiro presidente do Brasil?',
        correct_answer: 'Deodoro da Fonseca',
        options: ['Dom Pedro I', 'Getúlio Vargas', 'Deodoro da Fonseca', 'Floriano Peixoto'],
        explanation: 'Marechal Deodoro da Fonseca foi o primeiro presidente do Brasil (1889-1891).',
        points: 250
      },
      
      // Ciências - Fase 5
      {
        category: 'ciencias',
        difficulty: 5,
        stage: 5,
        question: 'Qual é a velocidade da luz no vácuo?',
        correct_answer: '300.000 km/s',
        options: ['150.000 km/s', '300.000 km/s', '450.000 km/s', '600.000 km/s'],
        explanation: 'A luz viaja a aproximadamente 300.000 quilômetros por segundo no vácuo.',
        points: 300
      },
      {
        category: 'ciencias',
        difficulty: 5,
        stage: 5,
        question: 'Quantos cromossomos tem uma célula humana normal?',
        correct_answer: '46',
        options: ['23', '46', '48', '92'],
        explanation: 'As células humanas normais possuem 46 cromossomos (23 pares).',
        points: 300
      }
    ];
    
    await EducationalContent.bulkCreate(educationalData);
    
    console.log(`✅ ${educationalData.length} questões educativas criadas!`);
    console.log('✅ Banco de dados inicializado com sucesso!');
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Erro ao inicializar banco de dados:', error);
    process.exit(1);
  }
};

initDatabase();

