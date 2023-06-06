import {USERS} from './users';

export const POSTS = [
  {
    imageURL: 'https://i.ibb.co/182bP1y/4k.png',
    user: USERS[0].user,
    likes: 7870,
    caption: 'Train Ride to Hogwarts. ## ',
    profile_picture: USERS[0].image,
    comments: [
      {
        user: 'theqazman',
        comment: 'Wow! This build looks fire. Super excited about this',
      },
      {
        user: 'amaanath.dev',
        comment: "Once I wake up, I'll finally be ready to code this up!",
      },
    ],
  },
  {
    imageURL:
      'https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2022/10/7/1102225/Jen1.jpg',
    user: USERS[1].user,
    likes: 4070,
    caption: 'Train Ride to Hogwarts. ##',
    profile_picture: USERS[1].image,
    comments: [
      {
        user: 'cleverqazi',
        comment: 'yo',
      },
      {
        user: 'amaanath.dev',
        comment: "I'M SLEEPING!!!",
      },
    ],
  },
];
