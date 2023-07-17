db = connect('mongodb+srv://dorian:123@mern.3xjknmf.mongodb.net/mern-pool3');

db.createCollection("users", {
    validator: {
      $jsonSchema: {
        bsonType: 'object',
        required: [
          'login',
          'email',
          'password',
          'type'
        ],
        properties: {
          login: {
            bsonType: 'string',
            pattern: '^[a-zA-Z0-9À-ÖØ-öø-ÿ\\s]{5,20}$'
          },
          email: {
            bsonType: 'string',
            pattern: '^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$'
          },
          password: {
            bsonType: 'string'
          },
          type: {
            bsonType: 'bool'
          },
          blog: {
            bsonType: 'object',
            properties: {
              billets: {
                bsonType: 'array',
                items: {
                  bsonType: 'object',
                  required: [
                    'id',
                    'title',
                    'content',
                    'comments'
                  ],
                  properties: {
                    id: {
                      bsonType: 'objectId'
                    },
                    author: {
                      bsonType: 'string'
                    },
                    title: {
                      bsonType: 'string'
                    },
                    content: {
                      bsonType: 'string'
                    },
                    category: {
                      bsonType: 'string'
                    },
                    comments: {
                      bsonType: 'array',
                      items: {
                        bsonType: 'object',
                        required: [
                          'comment'
                        ],
                        properties: {
                          id: {
                            bsonType: 'objectId'
                          },
                          author: {
                            bsonType: 'string'
                          },
                          comment: {
                            bsonType: 'string'
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
})