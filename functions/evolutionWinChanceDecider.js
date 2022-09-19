function getWinChance(tier) {
  if (tier == 'evolução 1') {
    return 70;
  }
  if (tier == 'evolução 2') {
    return 35;
  }
}

module.exports = { getWinChance };
