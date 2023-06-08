module.exports = {
  apps : [{
    name      : 'User Application',
    script    : 'user-server.js',
    node_args : '-r dotenv/config',
  }],
}