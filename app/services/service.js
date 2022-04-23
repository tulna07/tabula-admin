const url = "https://625bc0d1398f3bc782ae7e06.mockapi.io/api/users/";

function Service() {}

Service.prototype.fetchData = () => axios({ url, method: "GET" });

Service.prototype.addUser = user => axios({ url, method: "POST", data: user });

Service.prototype.deleteUserById = id =>
  axios({ url: url + id, method: "DELETE" });

Service.prototype.getUserById = id => axios({ url: url + id, method: "GET" });

Service.prototype.updateUserById = (id, user) =>
  axios({ url: url + id, method: "PUT", data: user });
