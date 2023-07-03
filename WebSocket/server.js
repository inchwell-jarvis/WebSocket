const WebSocket = require('ws');

// 创建WebSocket服务器，监听在指定端口
const wss = new WebSocket.Server({ port: 3000 });

// 用于存储已连接的客户端WebSocket实例的集合
const clients = new Set();

// 当有新的WebSocket连接建立时的回调函数
wss.on('connection', function (ws) {
  console.log('WebSocket连接已建立');

  // 将新连接的WebSocket实例添加到客户端集合中
  clients.add(ws);

  // 接收到客户端消息时的回调函数
  ws.on('message', function (message) {
    console.log('接收到客户端的消息：', message);

    // 向所有客户端广播消息
    broadcast('Client: ' + message);
  });

  // WebSocket连接关闭时的回调函数
  ws.on('close', function () {
    console.log('WebSocket连接已关闭');

    // 从客户端集合中移除关闭的WebSocket实例
    clients.delete(ws);
  });

  // WebSocket发生错误时的回调函数
  ws.on('error', function (error) {
    console.error('WebSocket发生错误:', error);
  });
});

// 广播消息给所有连接的客户端
function broadcast(message) {
  for (const client of clients) {
    client.send(message);
  }
}
