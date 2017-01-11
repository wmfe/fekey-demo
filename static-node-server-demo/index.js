(function () {
    $.ajax({
        url: '/api/manageaccount/list',
        type: 'get',
        dataType: 'json',
        success: (res) => {
            console.log(res)
        }
    })
})();