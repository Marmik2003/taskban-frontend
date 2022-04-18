import { BoardMember } from "../../types/Board";

export type TaskType = {
  id: Number;
  authors: BoardMember[];
  content: string;
  date: string;
  comments: Number;
};

type User = {
  id: Number;
  name: string;
  email?: string;
  avatar?: {
    id: Number;
    photo: string;
    name: string;
  };
};

const jake = {
  id: 1,
  name: "Jake",
  avatar: {
    id: 1,
    name: "John Doe",
    photo:
      "https://demos.creative-tim.com/notus-js/assets/img/team-1-800x800.jpg",
  },
};

const BMO = {
  id: 2,
  name: "BMO",
};

const finn = {
  id: 3,
  name: "Finn",
};

const princess = {
  id: 4,
  name: "Princess bubblegum",
};

export const authors: BoardMember[] = [jake, BMO, finn, princess];

export const quotes = [
  {
    id: 1,
    content: "Sometimes life is scary and dark",
    authors: [BMO, jake],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: 2,
    content:
      "Sucking at something is the first step towards being sorta good at something.",
    authors: [jake, finn],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: 3,
    content: "You got to focus on what's real, man",
    authors: [finn, jake],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: 4,
    content: "Is that where creativity comes from? From sad biz?",
    authors: [BMO, finn, jake],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: 5,
    content: "Homies help homies. Always",
    authors: [finn, jake, princess],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: 6,
    content: "Responsibility demands sacrifice",
    authors: [princess],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: 7,
    content: "That's it! The answer was so simple, I was too smart to see it!",
    authors: [jake, finn],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: 8,
    content: "People make mistakes. It's a part of growing up",
    authors: [finn, jake],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: 9,
    content: "Don't you always call sweatpants 'give up on life pants,' Jake?",
    authors: [finn, BMO],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: 10,
    content: "I should not have drunk that much tea!",
    authors: [princess, BMO],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: 11,
    content: "Please! I need the real you!",
    authors: [princess, jake],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: 12,
    content: "Haven't slept for a solid 83 hours, but, yeah, I'm good.",
    authors: [princess, finn, jake, BMO],
    date: "17 Apr",
    comments: 4,
  },
];

const getByAuthor = (author: User, items: TaskType[]) =>
  items.filter((quote) => quote.authors.some((item) => item.id === author.id));

export const authorQuoteMap: Record<string, TaskType[]> = authors.reduce(
  (previous, author) => ({
    ...previous,
    [author.name]: getByAuthor(author, quotes),
  }),
  {}
);
