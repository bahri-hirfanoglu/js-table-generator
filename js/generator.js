class generator {
    constructor() {
      this._mainDiv;
      this._data;
      this._showRow;
      this._errDiv;
      this._searchInput;
      this._isPage = false;
      this._isSearch = false;
      this._pageDiv;
      this._pageNumber = 1;
      this.component = [];
    }
  
    set data(value) {
      this._data = value;
    }
    get data() {
      return this._data;
    }
  
    set mainDiv(value) {
      this._mainDiv = value;
    }
    get mainDiv() {
      return this._mainDiv;
    }
  
    set showRow(value) {
      this._showRow = value;
    }
    get showRow() {
      return this._showRow;
    }
  
    set errDiv(value) {
      this._errDiv = value;
    }
    get errDiv() {
      return this._errDiv;
    }
  
    set searchInput(value) {
      this._searchInput = value;
    }
    get searchInput() {
      return this._searchInput;
    }
  
    set isPage(value) {
      this._isPage = value;
    }
    get isPage() {
      return this._isPage;
    }
  
    set pageDiv(value) {
      this._pageDiv = value;
    }
    get pageDiv() {
      return this._pageDiv;
    }
  
    set pageNumber(value) {
      this._pageNumber = value;
      this.checkPageButton();
    }
    get pageNumber() {
      return this._pageNumber;
    }
  
    set isSearch(value) {
      this._isSearch = value;
    }
    get isSearch() {
      return this._isSearch;
    }
  
    createdTable() {
      if (this.data === undefined) {
        this.errorMessage("data is undefined");
      }
      if (this.mainDiv === undefined) {
        this.errorMessage("mainDiv is undefined");
      }
      if (this.isPage && this.pageDiv === undefined) {
        this.errorMessage("pageDiv is undefined");
      }

      this.searchInput = undefined;
      this.mainDiv.innerHTML = "";
  
      let table = this.createdDOMElement({
        tagName: "table",
        compName: "table",
        className: "table table-striped",
      });
      let thead = this.createdDOMElement({
        tagName: "thead",
        compName: "thead",
      });
      let tbody = this.createdDOMElement({
        tagName: "tbody",
        compName: "tbody",
      });
  
      if (this.isPage) {
        this.pageDiv.innerHTML = ""
        let ul = this.createdPage();
        this.pageDiv.appendChild(ul);
      }
      if (this.searchInput === undefined && this.isSearch) {
        let search_div = this.createdDOMElement({
          tagName: "div",
          compName: "search_div",
          className: "col-md-3 offset-md-9 mb-2 mt-2",
          innerHTML: "Search: ",
        });
  
        this.searchInput = this.createdDOMElement({
          tagName: "input",
          compName: "search_input",
          className: "form-control",
        });
  
        search_div.appendChild(this.searchInput);
        this.mainDiv.appendChild(search_div);
  
        this.searchInput.addEventListener("input", (evt) => {
          let searchText = evt.target.value;
          var newData = [];
          for (let i = 0; i < this.data.length; i++) {
            for (let k in this.data[i]) {
              var value = this.data[i][k].toString().toLowerCase();
              if (value.includes(searchText)) {
                newData.push(this.data[i]);
                break;
              }
            }
          }
          this.component.tbody.innerHTML = "";
          let _showrom =
            newData.length < this.showRow ? newData.length : this.showRow;
          this.createdTableTd({
            tbody: this.component.tbody,
            data: newData,
            showRow: _showrom,
            pageNumber: this.pageNumber,
          });
        });
      }
  
      let tr_th = this.createdTableTh();
      this.createdTableTd({
        tbody,
        data: this.data,
        showRow: this.showRow,
        pageNumber: this.pageNumber,
      });
  
      thead.appendChild(tr_th);
      table.appendChild(thead);
      table.appendChild(tbody);
      mainDiv.appendChild(table);
    }
  
    createdTableTh() {
      let tr = this.createdDOMElement({
        tagName: "tr",
        compName: "tr_th",
      });
      for (let i in this._data[0]) {
        let th = this.createdDOMElement({
          tagName: "th",
          compName: `th_${i}`,
          innerHTML: i,
        });
        tr.appendChild(th);
      }
      return tr;
    }
  
    createdTableTd({ tbody, data, showRow, pageNumber }) {
      tbody.innerHTML = "";
      var minValue = showRow * (pageNumber - 1);
      var maxValue =
        this.data.length < showRow * pageNumber
          ? this.data.length
          : showRow * pageNumber;
      for (let i = minValue; i < maxValue; i++) {
        let tr = this.createdDOMElement({
          tagName: "tr",
          compName: `tr_td_${i}`,
        });
        for (let k in data[i]) {
          let innerHTML = data[i][k];
          let td = this.createdDOMElement({
            tagName: "td",
            compName: `tr_${k}_${i}`,
            innerHTML:
              typeof innerHTML === "object" && innerHTML !== null
                ? JSON.stringify(innerHTML)
                : innerHTML,
          });
          tr.appendChild(td);
        }
        tbody.appendChild(tr);
      }
    }
    checkPageButton() {
      if (this.pageNumber * this.showRow >= this.data.length) {
        this.component.next_li.className += " disabled";
      } else {
        this.component.next_li.className =
          this.component.next_li.className.replace(" disabled", "");
      }
      if (this.pageNumber == 1) {
        this.component.previous_li.className += " disabled";
      } else {
        this.component.previous_li.className =
          this.component.previous_li.className.replace(" disabled", "");
      }
    }
    createdPage() {
      let ul = this.createdDOMElement({
        tagName: "ul",
        compName: "page_ul",
        className: "pagination",
      });
  
      let previous_li = this.createdDOMElement({
        tagName: "li",
        compName: "previous_li",
        className: "paginate_button page-item previous disabled",
      });
      let previous_a = this.createdDOMElement({
        tagName: "a",
        compName: "previous_a",
        className: "page-link",
        name: "previous_a",
        innerHTML: "Previous",
      });
      previous_li.appendChild(previous_a);
  
      let pagenumber_li = this.createdDOMElement({
        tagName: "li",
        compName: "pagenumber_li",
        className: "paginate_button page-item active",
      });
      let pagenumber_a = this.createdDOMElement({
        tagName: "a",
        compName: "pagenumber_a",
        className: "page-link",
        name: "pagenumber_a",
        innerHTML: this.pageNumber,
      });
  
      let next_li = this.createdDOMElement({
        tagName: "li",
        compName: "next_li",
        className: "paginate_button page-item previous",
      });
      let next_a = this.createdDOMElement({
        tagName: "a",
        compName: "next_a",
        className: "page-link",
        name: "next_a",
        innerHTML: "Next",
      });
      pagenumber_li.appendChild(pagenumber_a);
      next_li.appendChild(next_a);
      ul.appendChild(previous_li);
      ul.appendChild(pagenumber_li);
      ul.appendChild(next_li);
  
      previous_a.addEventListener("click", () => {
        if (this.pageNumber > 1) {
          this.pageNumber--;
          this.createdTableTd({
            tbody: this.component.tbody,
            data: this.data,
            showRow: this.showRow,
            pageNumber: this.pageNumber,
          });
          this.component.pagenumber_a.innerHTML = this.pageNumber;
        }
      });
      next_a.addEventListener("click", () => {
        if (this.pageNumber * this.showRow < this.data.length) {
          this.pageNumber++;
          this.createdTableTd({
            tbody: this.component.tbody,
            data: this.data,
            showRow: this.showRow,
            pageNumber: this.pageNumber,
          });
          this.component.pagenumber_a.innerHTML = this.pageNumber;
          console.log(this.pageNumber, this.showRow, this.data.length);
        }
      });
  
      return ul;
    }
  
    createdDOMElement({ tagName, compName, innerHTML, className, name }) {
      this.component[compName] = document.createElement(tagName);
      if (className !== undefined) {
        this.component[compName].className = className;
      }
      if (innerHTML !== undefined) {
        this.component[compName].innerHTML = innerHTML;
      }
      if (name !== undefined) {
        this.component[compName].name = name;
      }
      return this.component[compName];
    }
  
    errorMessage(msg) {
      if (this.errDiv !== undefined) {
        this.errDiv.innerHTML = msg;
      } else {
        console.log(`error: ${msg}`);
      }
    }
  }
  