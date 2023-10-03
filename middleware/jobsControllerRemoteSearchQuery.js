function databaseRemoteSearchQuery(remote) {
    let isRemote = undefined;
  if (remote !== undefined) {
    if (remote.toLowerCase() === "true") {
      isRemote = true;
    }
    if (remote.toLowerCase() === "false") {
      isRemote = false;
    }
  }
  return isRemote
}

module.exports = {
    databaseRemoteSearchQuery
}