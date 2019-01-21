const { makeExecutableSchema } = require('graphql-tools');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');

function getTypeDef(qs, resolvers) {
  let ret = [];
  for (let q in qs) {
    const qdet = qs[q];
    const args = qdet.args ? `(${qdet.args})` : '';
    ret.push(`${q}${args}: ${qdet.returnType}`);
    resolvers[q] = qdet.resolver;
  }
  return ret.join('\n  ');
}

function createSchemaFromModels(models, { extra = '', query = {}, mutation = {}, saveSchema = true, schemaPath = './db/schema.graphql' } = {}) {
  const typeDefs = [], resolvers = {};
  for(let modelName in models) {
    typeDefs.push(models[modelName].gqSchema);
    Object.assign(resolvers, models[modelName].resolvers);
    Object.assign(query, models[modelName].resolvers.Query);
    Object.assign(mutation, models[modelName].resolvers.Mutation);
  }
  Object.assign(resolvers.Query, query);
  Object.assign(resolvers.Mutation, mutation);

  const qnew = {}, mnew = {};

  const typeDef = `type Query {
  ${getTypeDef(resolvers.Query, qnew)}
}

type Mutation {
  ${getTypeDef(resolvers.Mutation, mnew)}
}

scalar SequelizeJSON
scalar Date
${extra}
`;

  typeDefs.push(typeDef);
  resolvers.Query = qnew;
  resolvers.Mutation = mnew;

  if (saveSchema) {
    schemaPath = path.resolve(schemaPath);
    mkdirp(path.dirname(schemaPath));
    const comment = '# This schema was automatically generate by sifrr-api, do not edit manually \n\n';
    fs.writeFileSync(schemaPath, comment + typeDefs.join('\n\n'));
  }

  return makeExecutableSchema({
    typeDefs,
    resolvers
  });
}

module.exports = createSchemaFromModels;
