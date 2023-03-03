export const generateFilterUrl = (selectedAttributes) => {

    let currentUrl = new URL(window.location.href);

    Object.entries(selectedAttributes).forEach(([filterName, filterValue]) => {
        currentUrl.searchParams.set(filterName, (filterValue !== 'Yes' && filterValue !== 'No') ? filterValue : filterValue === 'Yes' ? true : false);
    });

    window.history.replaceState({}, '', currentUrl);
};