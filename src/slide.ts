import { responsiveManager } from "./responsive";

/**
 * Initialize carousel/slider functionality
 */
function initializeSlider(): void {
  const leftArrow = document.querySelector(
    ".left-arrow"
  ) as HTMLElement | null;
  const rightArrow = document.querySelector(
    ".right-arrow"
  ) as HTMLElement | null;

  const newItems = document.querySelector(".new-items") as HTMLElement | null;
  const new2 = document.querySelector(".new2") as HTMLElement | null;
  const new3 = document.querySelector(".new3") as HTMLElement | null;

  if (!leftArrow || !rightArrow || !newItems || !new2 || !new3) {
    console.warn("Slider elements not found");
    return;
  }

  /**
   * Hide all carousel items across all containers
   */
  function hideAllItems(): void {
    const allItems = document.querySelectorAll(".new-item");
    allItems.forEach((item) => {
      (item as HTMLElement).style.display = "none";
    });
  }

  /**
   * Show initial items on page load
   */
  function showInitialItems(): void {
    hideAllItems();
    if (newItems) {
      const initialItems = newItems.querySelectorAll(".new-item");
      initialItems.forEach((item) => {
        (item as HTMLElement).style.display = "block";
      });
    }
  }

  let currentItems: "new-items" | "new2" | "new3" = "new-items";

  /**
   * Handle left arrow click to go back to previous carousel
   */
  function handleLeftArrow(): void {
    hideAllItems();
    if (newItems) {
      const itemsToShow = newItems.querySelectorAll(".new-item");
      itemsToShow.forEach((item) => {
        (item as HTMLElement).style.display = "block";
      });
    }
    if (new2) new2.style.display = "none";
    if (new3) new3.style.display = "none";
    currentItems = "new-items";
    recalculateSliderLayout();
  }

  /**
   * Handle right arrow click to go to next carousel
   */
  function handleRightArrow(): void {
    hideAllItems();

    if (currentItems === "new-items") {
      if (new2) {
        const itemsToShow = new2.querySelectorAll(".new-item");
        itemsToShow.forEach((item) => {
          (item as HTMLElement).style.display = "block";
        });
        new2.style.display = "flex";
      }
      currentItems = "new2";
    } else if (currentItems === "new2") {
      if (new3) {
        const itemsToShow = new3.querySelectorAll(".new-item");
        itemsToShow.forEach((item) => {
          (item as HTMLElement).style.display = "block";
        });
        new3.style.display = "flex";
      }
      currentItems = "new3";
    } else if (currentItems === "new3") {
      if (newItems) {
        const itemsToShow = newItems.querySelectorAll(".new-item");
        itemsToShow.forEach((item) => {
          (item as HTMLElement).style.display = "block";
        });
        newItems.style.display = "flex";
      }
      currentItems = "new-items";
    }

    recalculateSliderLayout();
  }

  /**
   * Recalculate slider layout to prevent CSS issues on resize
   */
  function recalculateSliderLayout(): void {
    // Trigger a reflow
    const displayElements = [newItems, new2, new3];
    displayElements.forEach((el) => {
      if (el) {
        const display = el.style.display;
        el.style.display = "none";
        // Trigger reflow
        el.offsetHeight;
        el.style.display = display;
      }
    });
  }

  // Add event listeners
  leftArrow.addEventListener("click", handleLeftArrow);
  rightArrow.addEventListener("click", handleRightArrow);

  // Handle responsive viewport changes
  responsiveManager.onViewportChange(() => {
    recalculateSliderLayout();
  });

  // Handle layout recalculation events
  window.addEventListener("layoutRecalculated", () => {
    recalculateSliderLayout();
  });

  // Show initial items
  showInitialItems();
}

/**
 * Main entry point for slider initialization
 */
document.addEventListener("DOMContentLoaded", () => {
  initializeSlider();
});
