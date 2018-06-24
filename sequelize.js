const Sequelize = require('sequelize');
const sequelize = new Sequelize('wordpress', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
'timestamp': true    // 这个参数为true是MySQL会自动给每条数据添加createdAt和updateAt字段
  // SQLite only
  //storage: 'path/to/database.sqlite'
});

// Or you can simply use a connection uri
//const sequelize = new Sequelize('mysql://user:pass@example.com:5432/dbname');
/*
const sequelize = new Sequelize(
    'wordpress',                  // 要连接的数据库
    'root',              // 数据库用户名
    '',              // 密码
    {
  	operatorsAliases: false,
        'host': 'localhost', // 数据库服务器ip
        'port': 3306,        // 数据库运行端口
        'timestamp': true    // 这个参数为true是MySQL会自动给每条数据添加createdAt和updateAt字段
    }
);
*/


/*
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
*/
//定义数据模型  
var Post = sequelize.define('my_post', {  
  postTitle: {type:Sequelize.STRING,allowNull:false},
  postLink: {type:Sequelize.STRING,allowNull:false,unique: true},
  postContent: {type:Sequelize.STRING,allowNull:false},
  postDate: {type:Sequelize.DATE,allowNull:false,defaultValue:Sequelize.Now}
});  
//初始化数据  

(async()=>{
await sequelize.sync();
await Post.create({  
    postTitle: 'janedoe',  
    postLink: 'janedoe',  
    postContent: 'janedoe',  
    postDate: new Date(1980, 6, 20)  
  });  
process.exit();
})();
/*
sequelize.sync().then(function() {  
  return 
User.create({  
    userid: 'janedoe',  
    username: 'janedoe',  
    birthday: new Date(1980, 6, 20)  
  });  
}).then(function(jane) {  
  //获取数据  
  console.log(jane.get({  
    plain: true  
  }));  
	//process.exit();
}).catch(function (err) {  
  //异常捕获  
  console.log('Unable to connect to the database:', err);  
}); 
*/

