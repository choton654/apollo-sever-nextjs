import { ApolloServer } from 'apollo-server-micro';
// import mongoose from 'mongoose';
import { schema } from '../../apollo/schema';
import dbConnect from '../../utils/dbConnect';
// const dbConnect = async () => {
//   try {
//     const conn = await mongoose.connect(
//       'mongodb+srv://choton654:9804750147@cluster0-prdkh.mongodb.net/graphQl-song?w=majority&retryWrites=true',
//       {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useCreateIndex: false,
//       },
//     );
//     console.log(`Mongoodb connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.log(error);
//     process.exit(1);
//   }
// };
dbConnect();

const apolloServer = new ApolloServer({ schema });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler({ path: '/api/graphql' });
