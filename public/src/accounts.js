function findAccountById(accounts, id) {
  let foundAccount = accounts.find((account) => account.id === id)
  return foundAccount
}

function sortAccountsByLastName(accounts) {
  accounts.sort((nameOne, nameTwo) => nameOne.name.last.toLowerCase() > nameTwo.name.last.toLowerCase() ? 1 : -1)
  return accounts
}

function getTotalNumberOfBorrows(account, books) {
  let total = 0;
  for (let i = 0; i < books.length; i++) {
    for (let j = 0; j < books[i].borrows.length; j++) {
      if (account.id === books[i].borrows[j].id) {
        total += 1
      }
    }
  }
  return total
}

function getBooksPossessedByAccount(account, books, authors) {
  let result = []
  books.forEach((item) => {
    const borrowed = item.borrows
    const book = {
      id: item.id,
      title: item.title,
      genre: item.genre,
      authorId: item.authorId,
      author: {},
      borrows: {}
    }

    borrowed.forEach((borrow) => {
      if (borrow.id === account.id && borrow.returned === false) {
        result.push(book)
        book.author = authors.filter((author) => author.id === book.authorId)[0]
      }
    })
  })
  return result
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
