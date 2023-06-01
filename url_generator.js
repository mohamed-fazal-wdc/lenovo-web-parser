// Get all the URLs ending with ".exe" in a webpage
function getExeUrls() {
  var urls = [];
  var allLinks = document.getElementsByTagName('a');

  for (var i = 0; i < allLinks.length; i++) {
    var link = allLinks[i].href;
    if (link.endsWith('.exe')) {
      urls.push(link);
    }
  }

  return urls;
}

// Call the function to retrieve the URLs
var exeUrls = getExeUrls();
console.log(exeUrls);

// List of URLs to download
var urls = exeUrls;

// Function to download a file from a URL
function downloadFile(url) {
  fetch(url)
    .then(function(response) {
      return response.blob();
    })
    .then(function(blob) {
      var filename = url.substring(url.lastIndexOf('/') + 1);
      var link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
      URL.revokeObjectURL(link.href);
    })
    .catch(function(error) {
      console.log('Error downloading file:', error);
    });
}

// Download all files in the list
//urls.forEach(function(url) {
//  downloadFile(url);
// });
// Downloads failing due to CORS


var urlsString = exeUrls.join('\n');

// Create a Blob object from the URLs string
var blob = new Blob([urlsString], { type: 'text/plain' });

// Create a link element to download the file
var link = document.createElement('a');
link.href = URL.createObjectURL(blob);
link.download = 'urls.txt';
link.click();
