import { setupServer } from 'msw/node';
import { rest } from 'msw';

let questions = [
  {
    id: 1,
    prompt: "lorem testum 1",
    answers: ["answer 1", "answer 2", "answer 3", "answer 4"], // 4 answers for index 3
    correctIndex: 0,
  },
  {
    id: 2,
    prompt: "lorem testum 2",
    answers: ["answer 1", "answer 2"],
    correctIndex: 1,
  },
];

const server = setupServer(
  rest.get('/questions', (req, res, ctx) => {
    return res(ctx.json(questions));
  }),
  
  rest.post('/questions', (req, res, ctx) => {
    const newQuestion = req.body;
    newQuestion.id = Math.max(...questions.map(q => q.id)) + 1;
    questions.push(newQuestion);
    return res(ctx.status(201), ctx.json(newQuestion));
  }),
  
  rest.delete('/questions/:id', (req, res, ctx) => {
    const { id } = req.params;
    questions = questions.filter(q => q.id !== parseInt(id));
    return res(ctx.status(204));
  }),
  
  rest.patch('/questions/:id', (req, res, ctx) => {
    const { id } = req.params;
    const { correctIndex } = req.body;
    const question = questions.find(q => q.id === parseInt(id));
    
    if (question) {
      question.correctIndex = correctIndex;
      return res(ctx.status(200), ctx.json(question));
    }
    return res(ctx.status(404));
  })
);

// Reset to initial state between tests
const originalResetHandlers = server.resetHandlers.bind(server);
server.resetHandlers = () => {
  originalResetHandlers();
  questions = [
    {
      id: 1,
      prompt: "lorem testum 1",
      answers: ["answer 1", "answer 2", "answer 3", "answer 4"],
      correctIndex: 0,
    },
    {
      id: 2,
      prompt: "lorem testum 2",
      answers: ["answer 1", "answer 2"],
      correctIndex: 1,
    },
  ];
};

export { server };