export const generateUniqueId = () => {
  return 'uid-' + Date.now() + '-' + Math.floor(Math.random() * 1000);
};
