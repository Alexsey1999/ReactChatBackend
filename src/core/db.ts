import mongoose from 'mongoose'

//eslint-disable-next-line @typescript-eslint/no-floating-promises
mongoose.connect(
  'mongodb://localhost:27017/chat',
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err: any) => {
    if (err) {
      throw Error(err)
    }
    console.log('DB is running')
  }
)
