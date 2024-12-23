const mongoose = require("mongoose");

function conectToDb() {

  mongoose
    .connect(process.env.MONGO_URI )
    .then(() => {
      console.log("Connected to the database");
    })
    .catch((error) => console.log(error));

    
}

module.exports = conectToDb;

// const dbConnect = async () => {
//     try{
//         await mongoose.connect(process.env.MONGO_URI);
//          console.log("Connected to the database");
//     }catch(err){
//         console.log(err);
//     }
// }

// module.exports = dbConnect;