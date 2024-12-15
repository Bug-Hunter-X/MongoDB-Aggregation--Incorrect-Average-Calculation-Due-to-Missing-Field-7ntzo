```javascript
// Corrected aggregation pipeline
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
      averagePostLength: { $avg: { $ifNull: [ "$posts.body", ""] .length } }
    }
  }
]);
```