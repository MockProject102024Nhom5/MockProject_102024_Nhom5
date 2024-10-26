const config ={
    user: 'sa',           // Tên đăng nhập SQL Server
    password: '123',       // Mật khẩu
    server: process.env.DB_SERVER,  
    post:  process.env.DB_POST,      // Tên máy chủ hoặc địa chỉ IP
    database: 'mockproject',   // Tên cơ sở dữ liệu
    options: {
      encrypt: true,            // Đảm bảo kết nối an toàn (nếu cần)
      trustServerCertificate: true // Chỉ dùng khi làm việc với server không có chứng chỉ hợp lệ
    }
  };
  module.exports = config