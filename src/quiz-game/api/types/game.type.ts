export type QuestionsType = {
  id: string;
  body: string;
}[];

export type PlayerType = {
  id: string;
  login: string;
};

export type AnswersType = {
  questionId: number;
  answerStatus: string;
  addedAt: string;
}[];
