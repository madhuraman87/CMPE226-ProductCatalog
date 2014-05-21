// // Userlist data array for filling in info box
// var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    // Populate the user table on initial page load
    populateSearch(false, '');

});

// Functions =============================================================

function search() {
    populateSearch(true, $('#searchQuery').val());
}; 


function populateSearch(isSearch, query) {

    // Empty content string
    var tableContent = '';

    // assign the appropriate url
    // var ajaxURL = '';

    if(isSearch)
    {
    
        var ajaxURL = '/users/search?q='+ query;
     
        // jQuery AJAX call for JSON
        $.getJSON(ajaxURL, function(data) {
            
            // // Stick our brand data array into a brandlist variable in the global object
            // userListData = data;

            // For each item in our JSON, add a table row and cells to the content string
            $.each(data, function(){
                tableContent += '<tr>';
                tableContent += '<td>' + this.brand + '</td>';
                tableContent += '<td>' + this.type + '</td>';
                tableContent += '<td>' + this.subtype + '</td>';
                tableContent += '</tr>';
            });

            // Inject the whole content string into our existing HTML table
            $('#userList table tbody').html(tableContent);
        });
    }
};