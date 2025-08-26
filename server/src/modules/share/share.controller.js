const { addShare } = require('../../repositories/shareRepo');

async function postShare(req, res) {
  try {
    const winnerId = +req.params.winnerId;
    const theme = (req.body && req.body.theme) || 'classic';
    const count = await addShare(winnerId, theme);
    res.json({ count });
  } catch (e) {
    res.status(500).json({ message: 'Failed' });
  }
}

module.exports = { postShare };
