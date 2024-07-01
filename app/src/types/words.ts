export type WordType = {
  id: string;
  title: string;
  description: string;
  created_at: string;
  updated_at: string;
  from_language: string;
  to_language: string;
  type: string;
};

export type CardType = {
  language: string;
  words: WordType[];
};
