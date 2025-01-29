var Webflow = Webflow || [];
Webflow.push(function () {

// Find the current item
const currentAnchor = document.querySelector('.prevnext_item a[aria-current="page"]');

// Get references to the navigation containers
const navPrevious = document.getElementById('prevnext-previous');
const navNext = document.getElementById('prevnext-next');

if (currentAnchor) {
  // Get the parent prevnext_item of the current <a>
  const currentItem = currentAnchor.closest('[prevnext_item]');
  if (currentItem) {
    
    // Handle previous sibling
    const previousItem = currentItem.previousElementSibling;
    if (previousItem) {
      const previousAnchor = previousItem.querySelector('a');
      if (previousAnchor && navPrevious) {
        navPrevious.appendChild(previousAnchor.cloneNode(true));
        navPrevious.style.display = 'flex'; // Ensure it's visible
      }
    } else if (navPrevious) {
      console.log("no previous");
      navPrevious.style.display = 'none'; // Hide if no previous sibling
    }

    // Handle next sibling
    const nextItem = currentItem.nextElementSibling;
    if (nextItem) {
      const nextAnchor = nextItem.querySelector('a');
      if (nextAnchor && navNext) {
        navNext.appendChild(nextAnchor.cloneNode(true));
        navNext.style.display = 'flex'; // Ensure it's visible
      }
    } else if (navNext) {
      console.log("no next");
      navNext.style.display = 'none'; // Hide if no next sibling
    }
  }
}

});