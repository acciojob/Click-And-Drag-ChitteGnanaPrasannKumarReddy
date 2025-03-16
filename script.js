// Your code here.
document.addEventListener("DOMContentLoaded", () => {
    const container = document.querySelector(".items");
    const items = document.querySelectorAll(".item");
    let activeItem = null;
    let offsetX = 0, offsetY = 0;
    let isDragging = false;

    items.forEach(item => {
        item.addEventListener("mousedown", (e) => {
            activeItem = item;
            isDragging = true;
            offsetX = e.clientX - activeItem.offsetLeft;
            offsetY = e.clientY - activeItem.offsetTop;
            activeItem.style.position = "absolute";
            activeItem.style.zIndex = 1000;
            e.preventDefault(); 
        });
    });

    document.addEventListener("mousemove", (e) => {
        if (!isDragging || !activeItem) return;
        
        let newX = e.clientX - offsetX;
        let newY = e.clientY - offsetY;

    
        const containerRect = container.getBoundingClientRect();
        const itemRect = activeItem.getBoundingClientRect();

        if (newX < containerRect.left) newX = containerRect.left;
        if (newX + itemRect.width > containerRect.right) newX = containerRect.right - itemRect.width;
        if (newY < containerRect.top) newY = containerRect.top;
        if (newY + itemRect.height > containerRect.bottom) newY = containerRect.bottom - itemRect.height;

        activeItem.style.left = `${newX}px`;
        activeItem.style.top = `${newY}px`;

    
        if (newX < containerRect.left + 20) {
            container.scrollLeft -= 10;
        } else if (newX + itemRect.width > containerRect.right - 20) {
            container.scrollLeft += 10;
        }
    });

    document.addEventListener("mouseup", () => {
        if (activeItem) {
            isDragging = false;
            activeItem.style.zIndex = "auto";
            activeItem = null;
        }
    });
});
