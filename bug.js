```javascript
// Assuming you have a MongoDB collection named 'users'

db.users.aggregate([
  {
    $match: { age: { $gt: 25 } }
  },
  {
    $lookup: {
      from: 'posts',
      localField: '_id',
      foreignField: 'authorId',
      as: 'posts'
    }
  },
  {
    $unwind: '$posts'
  },
  {
    $group: {
      _id: '$posts.authorId',
      totalPosts: { $sum: 1 },
      averagePostLength: { $avg: '$posts.body'.length }
    }
  }
]);
```