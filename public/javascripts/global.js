// Userlist data array for filling in info box
var userListData = [];

// DOM Ready =============================================================
$(document).ready(function() {

    //Browse button click
    $('#browse').on('click', browseIn);

    // Populate the user table on initial page load
    populateSearch(false, '');

    populateTable();

    //Product Name link click
    $('#userList table tbody').on('click', 'td a.linkshowuser', showUserInfo);
    $('#userList table tbody').on('click', 'td a.linkshowproduct', showProductInfo);
});

// Functions =============================================================

//Browse button click
function browseIn(event) {
    $.ajax({
        type: 'GET',
        url: '/users/productlist',
        data: { },
        complete: function(xmlHttp) {
            if (xmlHttp.code != 200) {
            top.location.href = '/users/productlist';
            }
        }    
    });
}; 


// Fill table with data
function populateTable() {

    // Empty content string
    var tableContent = '';

    // assign the appropriate url
    // var ajaxURL = '';
    var sparts = window.location.href.split('/');
    var ty = sparts[sparts.length - 1].split('products')[0];
    var ajaxURL = '/users/'+ty+'productitems';  
    
    // jQuery AJAX call for JSON
    $.getJSON(ajaxURL, function(data) {
        
        // Stick our brand data array into a brandlist variable in the global object
        userListData = data;

        // For each item in our JSON, add a table row and cells to the content string
        $.each(data, function(){
            tableContent += '<tr>';
            tableContent += '<td><a href="#" class="linkshowuser" rel="' + this.brand + '" title="Show Details">' + this.brand + '</td>';
            tableContent += '<td>' + this.type + '</td>';
            tableContent += '</tr>';
        });

        // Inject the whole content string into our existing HTML table
        $('#userList table tbody').html(tableContent);
    });
};

    
// Show User Info
function showUserInfo(event) {

    // Prevent Link from Firing
    event.preventDefault();

    // Retrieve brands from link rel attribute
    var thisBrandName = $(this).attr('rel');

    // Get Index of object based on id value
    var arrayPosition = userListData.map(function(arrayItem) { return arrayItem.brand; }).indexOf(thisBrandName);

    // Get our Item Object
    var thisItemObject = userListData[arrayPosition];
    // console.log(thisItemObject);

    //Populate Info Box
    $('#userInfoSubtype').text(thisItemObject.subtype);
    $('#userInfoColor').text(thisItemObject.color);
    $('#userInfoSize').text(thisItemObject.size);
    $('#userInfoPrice').text(thisItemObject.price);
    $('#userInfoWeight').text(thisItemObject.weight);
    $('#userInfoDimen').text(thisItemObject.dimensions);
    $('#userInfoDesc').text(thisItemObject.desc);
};

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
            // productListData = data;

            // For each item in our JSON, add a table row and cells to the content string
            $.each(data, function(){
                tableContent += '<tr>';
                tableContent += '<td><a href="/users/productlist" title="Show Details">' + this.brand + '</td>';
                tableContent += '<td>' + this.type + '</td>';
                tableContent += '<td>' + this.subtype + '</td>';
                tableContent += '</tr>';
            });

            // Inject the whole content string into our existing HTML table
            $('#userList table tbody').html(tableContent);
        });
    }
};