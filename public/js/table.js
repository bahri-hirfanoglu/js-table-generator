document.addEventListener('DOMContentLoaded', () => {

    let mainDiv = document.querySelector('#mainDiv')
    let errDiv = document.querySelector("#errorMessage")
    let pageDiv = document.querySelector("#pageDiv")

    let _generator = new generator()
    _generator.mainDiv = mainDiv;
    _generator.showRow = 10;
    _generator.isPage = true;
    _generator.isSearch = true;
    _generator.pageDiv = pageDiv;
    _generator.errDiv = errDiv;
    
    axios.get("https://jsonplaceholder.typicode.com/todos/").then((result) => {
        _generator.data = result.data;
        _generator.createdTable();
    })

    document.querySelector('#createTable').addEventListener('click', ()=> {
        let fakedata_url = document.querySelector('#fakedata').value
        let showRow = document.querySelector('#showrow').value
        _generator.showRow = showRow;
        axios.get(fakedata_url).then(result => {
            _generator.data = result.data;
            _generator.createdTable();
        })
    })

})