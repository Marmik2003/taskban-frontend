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
  id: Math.ceil(Math.random()*10000),
  name: "Jake",
  avatar: {
    id: Math.ceil(Math.random()*10000),
    name: "John Doe",
    photo:
      "https://demos.creative-tim.com/notus-js/assets/img/team-1-800x800.jpg",
  },
};

const BMO = {
  id: Math.ceil(Math.random()*10000),
  name: "BMO",
};

const finn = {
  id: Math.ceil(Math.random()*10000),
  name: "Finn",
};

const princess = {
  id: Math.ceil(Math.random()*10000),
  name: "Princess bubblegum",
};

export const authors: BoardMember[] = [jake, BMO, finn, princess];

export const quotes = [
  {
    id: Math.ceil(Math.random()*10000),
    content: "Sometimes life is scary and dark",
    authors: [BMO],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: Math.ceil(Math.random()*10000),
    content:
      "Sucking at something is the first step towards being sorta good at something.",
    authors: [jake],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: Math.ceil(Math.random()*10000),
    content: "You got to focus on what's real, man",
    authors: [jake],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: Math.ceil(Math.random()*10000),
    content: "Is that where creativity comes from? From sad biz?",
    authors: [finn],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: Math.ceil(Math.random()*10000),
    content: "Homies help homies. Always",
    authors: [princess],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: Math.ceil(Math.random()*10000),
    content: "Responsibility demands sacrifice",
    authors: [finn],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: Math.ceil(Math.random()*10000),
    content: "That's it! The answer was so simple, I was too smart to see it!",
    authors: [princess],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: Math.ceil(Math.random()*10000),
    content: "People make mistakes. It's a part of growing up",
    authors: [jake],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: Math.ceil(Math.random()*10000),
    content: "Don't you always call sweatpants 'give up on life pants,' Jake?",
    authors: [BMO],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: Math.ceil(Math.random()*10000),
    content: "I should not have drunk that much tea!",
    authors: [BMO],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: Math.ceil(Math.random()*10000),
    content: "Please! I need the real you!",
    authors: [jake],
    date: "17 Apr",
    comments: 4,
  },
  {
    id: Math.ceil(Math.random()*10000),
    content: "Haven't slept for a solid 83 hours, but, yeah, I'm good.",
    authors: [BMO],
    date: "17 Apr",
    comments: 4,
  },
];

const getByAuthor = (author: User, items: TaskType[]) => {
  return items.filter((item) => item.authors.includes(author));
}

export const authorQuoteMap: Record<string, TaskType[]> = authors.reduce(
  (previous, author) => ({
    ...previous,
    [author.name]: getByAuthor(author, quotes),
  }),
  {}
);
