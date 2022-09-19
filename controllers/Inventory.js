class Inventory {
  // O que fazer quando a classe é inicializada
  constructor() {
    this.items = [
      {
        name: 'pokeball',
        qnt: 10,
      },
      {
        name: 'moedas',
        qnt: 0,
      },
      {
        name: 'Item de evolução tier 1',
        qnt: 0,
      },
      {
        name: 'Item de evolução tier 2',
        qnt: 0,
      },
      {
        name: 'Item de evolução tier 3',
        qnt: 0,
      },
    ];
  }

  /**
   * I look at what I carry in my inventory
   * @returns {Boolean} true or false if there are items
   */
  getItems() {
    if (this.items[0]) {
      console.log('Você está carregando:');
      this.items.forEach((inventory) => {
        console.log(inventory.name);
        // console.log(`* ${inventory.desc}`);
      });
      return true;
    } else {
      console.log('Você não tem nada.');
      return false;
    }
  }

  /**
   * I check if an item exists
   * @param {String} item name
   * @returns {Boolean} true or false if the item exists
   */
  hasItem(name) {
    for (var i in this.items) {
      if (name == this.items[i].name) {
        return true;
      }
    }
    return false;
  }

  /**
   * I add an item to the inventory
   * @param {String} item name
   * @param {String} item description
   * @returns {Number} the number of items in the inventory
   */
  addItem(name, desc) {
    this.items.push({
      name: name,
      desc: desc,
    });
    return this.items.length;
  }

  /**
   * I remove an item from inventory
   * @param {String} item name
   * @returns {Boolean} true or false if the item has been removed successfully
   */
  removeItem(name) {
    this.items.forEach((inventory) => {
      if (name == inventory.name) {
        this.items.pop(inventory.name);
        return true;
      } else {
        return false;
      }
    });
  }

  updateItem(name, quantity) {
    for (var i in this.items) {
      if (name == this.items[i].name) {
        //adiciona a quantidade passada na função para o item
        this.items[i].qnt += quantity;
      } else if (!name == this.items[i].name) {
        console.log('não existe este item');
      }
    }
  }
}

// BackPack inherits methods and properties from Inventory
class BackPack extends Inventory {
  /**
   * I add an item to the inventory but first I check if the limit has not
   * been reached.
   * @param {String} item name
   * @param {String} item description
   * @returns {Number} the number of items in the inventory
   */
  addItem(name, desc) {
    this.size = 10;
    if (this.items.length >= this.size) {
      console.log('Mochila está cheia!');
      return false;
    } else {
      super.addItem(name, desc);
      return true;
    }
  }
}

module.exports = { Inventory };
