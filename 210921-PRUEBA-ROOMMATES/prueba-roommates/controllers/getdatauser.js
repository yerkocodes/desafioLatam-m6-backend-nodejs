const getDataUser = async (api) => {
  const dataUser = await fetch(api);
  return dataUser;
};

module.exports = getDataUser;
