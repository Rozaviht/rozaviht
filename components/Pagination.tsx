type PaginationProps = {
  totalArticles: number,
  articlesPerPage: number,
  paginate: (pageNumber: number) => void,
  currentArticlesBoard: number
}

export default function Pagination ({totalArticles, articlesPerPage, paginate, currentArticlesBoard}:PaginationProps) {
  const pageNumbers = []

  for (let i=1; i <= Math.ceil(totalArticles / articlesPerPage); i++) {
    pageNumbers.push(i)
  }


  return (
    <nav >
      <ul className="flexrow">
        {pageNumbers.map(number => (
          <li key={number} className="flexcolum flexcolum--around">
            <span className={currentArticlesBoard === number ? "dot active" : "dot"}/>
            <a onClick={() => paginate(number)} className={currentArticlesBoard === number ? "pagination__link active" : "pagination__link"} >{number}</a>
          </li>
        ))}
      </ul>
    </nav>
  )
}