export async function savePlayer(username, pokemon) {
    await PlayerDB.create({ name: username, pokemon });
}
