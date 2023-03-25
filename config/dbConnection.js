const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    // veritabanına bağlanmasını bekliyoruz
    // veritabanı bağlantısı için .env'deki stringi kullanıyoruz
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);

    // bağlantı başarılı olursa host'un ve bağlanılan database'in ismini ekrana yazdırıyoruz
    console.log(
      `Database bağlantısı başarılı. DB ismi: ${connect.connection.name}, Host: ${connect.connection.host}`
    );
  } catch (err) {
    // bağlantı hatası olursa:
    console.log(`Veritabanı bağlantı hatası: ${err}`);
    process.exit(1);
  }
};

module.exports = connectDb;
