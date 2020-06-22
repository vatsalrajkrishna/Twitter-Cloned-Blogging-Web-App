let db = {
    users: [
      {
        userId: 'dh23ggj5h32g543j5gf43',
        email: 'user@email.com',
        handle: 'user',
        createdAt: '2019-03-15T10:59:52.798Z',
        imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
        bio: 'Hello, my name is user, nice to meet you',
        website: 'https://user.com',
        location: 'Mumbai, India'
      }
    ],
    posts: [
      {
        userHandle: 'user',
        body: 'This is a sample post',
        createdAt: '2019-03-15T10:59:52.798Z',
        likeCount: 5,
        commentCount: 3
      }
    ],
    comments: [
      {
        postId: "RCfcCmi1LvAY8N3TEWd9",
        createdAt: "2020-05-26T12:39:30.505Z",
        userHandle: "user",
        userImage: "eyJhbGciOiJSUzI1NiIsImtpZCI6ImY1YzlhZWJlMjM0ZGE2MDE2YmQ3Yjk0OTE2OGI4Y2Q1YjRlYzllZWIiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc29jaWFsYXBwLTk5NzJhIiwiYXVkIjoic29jaWFsYXBwLTk5NzJhIiwiYXV0aF90aW1lIjoxNTg5ODI5NDY2LCJ1c2VyX2lkIjoiSWRqbzduWTdGZFcyNGVYNTJBcnpVVkRkTGNEMiIsInN1YiI6Iklkam83blk3RmRXMjRlWDUyQXJ6VVZEZExjRDIiLCJpYXQiOjE1ODk4Mjk0NjYsImV4cCI6MTU4OTgzMzA2NiwiZW1haWwiOiJ1c2VyQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyJ1c2VyQGdtYWlsLmNvbSJdfSwic2lnbl9pbl9wcm92aWRlciI6InBhc3N3b3JkIn19.Nj1-BfkImFw-p6b6kZiUnzq0qvOzIXycThtMioP_kQ0E0S8o_tn3FCs7RWEdV1LB1ijmbjvA7thu-a3JD7XI6ezP7eQCUbKj5XHD9hckrRrLU5aQ5OwLj-ZsdTzWi0dqxcLD53khiL4LuFtiwxHJ2niw7VGg8b4Mz-VKpMVRnIImhw1x0AwlqQi-Wuoix-0DQdim1D8JfbTf9dsJ8Bdx_glAaQD8uoFr8C0yaK2se6VXnwK1sEl7jU7D0VVGaHVL0Pw37yXx_EBKrxJ_ZGVup8Pi5odLKk_bAOO-CyCglleSa2NltPjyzVg6Cr6DRZYmq0RN7WRkSCu0ESUvOxWH1w",
        body: "Comment number 24"
      }
    ],
    notifications: [
      {
        recipient: "user",
        sender: 'jarvis',
        read: "true | false",
        postId: "RCfcCmi1LvAY8N3TEWd9",
        type: 'like | comment',
        createdAt: "2020-05-26T12:39:30.505Z"
      }
      

    ]
};

const userDetails = {
    credentials: {
      userId: 'N43KJ5H43KJHREW4J5H3JWMERHB',
      email: 'user@email.com',
      handle: 'user',
      createdAt: '2019-03-15T10:59:52.798Z',
      imageUrl: 'image/dsfsdkfghskdfgs/dgfdhfgdh',
      bio: 'Hello, my name is user, nice to meet you',
      website: 'https://user.com',
      location: 'Lonodn, UK'
    },
    likes: [
      {
        userHandle: 'user',
        postId: 'hh7O5oWfWucVzGbHH2pa'
      },
      {
        userHandle: 'user',
        postId: '3IOnFoQexRcofs5OhBXO'
      }
    ]
  };