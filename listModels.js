const groq = require('groq-sdk');
(async () => {
  try {
    const models = await groq.Models.list();
    console.log(models);
  } catch (e) {
    console.error(e);
  }
})();
