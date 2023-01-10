function getTotalBooksCount(books) {
  return books.length
}

function getTotalAccountsCount(accounts) {
  return accounts.length
}

function getBooksBorrowedCount(books) {
  return books.reduce((borrowCount, { borrows }) => {
    const mostRecent = borrows[0];
    if (!mostRecent.returned) borrowCount++;
    return borrowCount;
  }, 0);
}

function getMostCommonGenres(books) {
  let genreList = {}
  books.forEach((book) => {
    if (genreList[book.genre]) {
      genreList[book.genre]++
    } else {
      genreList[book.genre] = 1
    }
  })

  return Object.entries(genreList)
    .map(([name, count]) => {
      return { name, count };
    })
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
}

function getMostPopularBooks(books) {
  return books.map((book) => {
    return { name: book.title, count: book.borrows.length }
  })
    .sort((a, b) => (a.count < b.count ? 1 : -1))
    .slice(0, 5)
}

function getMostPopularAuthors(books, authors) {
  let total = [];
  authors.forEach((author) => {
    let authorFull = {
      name: `${author.name.first} ${author.name.last}`,
      count: 0
    }

    books.forEach((book) => {
      if (book.authorId === author.id) {
        authorFull.count += book.borrows.length
      }
    })
    total.push(authorFull)
  })
  return total.sort((a, b) => b.count - a.count).slice(0, 5)
}
module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
