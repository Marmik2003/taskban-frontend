import React from 'react'
import { useParams } from 'react-router-dom'
import Board from '../../types/Board';

const exampleBoards: Board[] = [
  {
    id: 1,
    title: "Board 1",
    description: "This is board 1",
    members: [
      {
        id: 1,
        name: "John Doe",
        email: "abc@xyz.com",
        avatar: {
          id: 1,
          name: "John Doe",
          photo:
            "https://demos.creative-tim.com/notus-js/assets/img/team-1-800x800.jpg",
        },
      },
      {
        id: 2,
        name: "William Folks",
        email: "will.folks@taskban.co",
        avatar: {
          id: 2,
          name: "William Folks",
          photo:
            "https://demos.creative-tim.com/notus-js/assets/img/team-2-800x800.jpg",
        },
      },
      {
        id: 3,
        name: "Charles Kilber",
        email: "c.k@taskban.co",
        avatar: {
          id: 3,
          name: "Charles Kilber",
          photo:
            "https://demos.creative-tim.com/notus-js/assets/img/team-3-800x800.jpg",
        },
      },
      {
        id: 4,
        name: "Donna Hughes",
        email: "d.h@taskban.co",
      },
    ],
  },
  {
    id: 2,
    title: "Board 2",
    description: "This is board 2",
  },
  {
    id: 3,
    title: "Board 3",
    description: "This is board 3",
  },
];

const IndividualBoard = () => {
  const params = useParams();

  // const board = exampleBoards.find(b => b.id === parseInt(params.boardId!));

  return (
    <div>Board</div>
  )
}

export default IndividualBoard