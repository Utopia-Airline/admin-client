import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  @Input() currentPage: number;
  @Input() totalPageCount: number;
  @Input() displayedPageRange: number;
  @Input() boundaryLinks: boolean;
  @Output() currentPageChange = new EventEmitter<number>(true);

  constructor() {
  }

  ngOnInit(): void {
    console.log('pages', this.totalPageCount);
  }

  goNextPage(): void {
    this.currentPageChange.emit(this.currentPage + 1);
  }

  goPrevPage(): void {
    this.currentPageChange.emit(this.currentPage - 1);
  }

  goFirstPage(): void {
    this.currentPageChange.emit(1);
  }

  goLastPage(): void {
    this.currentPageChange.emit(this.totalPageCount);
  }

  goToPage(n: number): void {
    this.currentPageChange.emit(n);
  }

  getPagesToDisplay(): number[] {
    // if number of pages to show is less than the collection size
    if (this.displayedPageRange > this.totalPageCount) {
      return Array(this.totalPageCount).fill(0).map((v, i) => i + 1);
    }
    const activePages = [];
    let size = this.displayedPageRange;
    const currentPage = this.currentPage;
    activePages.push(currentPage);
    size--;
    let prev = (currentPage > 1) ? currentPage - 1 : null;
    let next = (currentPage < this.totalPageCount) ? currentPage + 1 : null;
    while (size !== 0) {
      if (prev) {
        activePages.push(prev);
        prev = (prev > 1) ? prev - 1 : null;
        size--;
      }
      if (next) {
        activePages.push(next);
        next = (next < this.totalPageCount) ? next + 1 : null;
        size--;
      }
    }
    return activePages.sort((a, b) => a - b);
  }
}
