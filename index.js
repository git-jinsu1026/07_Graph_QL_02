const express = require('express');
const bodyParser = require('body-parser');
const { graphExpress, grahpiqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools')

const PORT = 8000

const server = express()

const typeDef = `
    type Lang{
        id: Int,
        name: String!
    }

    type Query{
        getLangs(name: String): [Lang]
    }
`

const langs = [
    {
        id: 0,
        name: 'Node'
    }, {
        id: 1,
        name: 'Python'
    }
]

const resolvers = {
    Query: {
        getLangs: () => langs
    }
}

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})

server.use('/graphql', bodyParser.json(), graphExpress({
    schema
}))

server.use('/graphiql', grahpiqlExpress({
    endpoint: '/graphiql'
}))

server.listen(PORT, () => {
    console.log('Running 포트')
})



//graphExpress
//그래프큐엘을 가동
//grahpiqlExpress
// UI상에서 볼수있는 툴