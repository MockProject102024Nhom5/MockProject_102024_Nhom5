const config ={
    user: process.env.DB_USER,           
    password: process.env.DB_PASSWORD,      
    server: process.env.DB_SERVER,  
    post:  process.env.DB_POST,      
    database: 'mockproject',  
    options: {
      encrypt: true,            // Đảm bảo kết nối an toàn (nếu cần)
      trustServerCertificate: true // Chỉ dùng khi làm việc với server không có chứng chỉ hợp lệ
    }
  };
  module.exports = config