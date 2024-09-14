# TypeAhead SearchBar

Here are some key features of the `TypeAhead` search bar component implemented in the provided code:

### 1. **Debouncing**:
   - The search query is delayed by 1000 milliseconds (1 second) before making an API request. This prevents excessive requests while the user is still typing.
   - This is achieved using `setTimeout` inside the `useEffect` hook.

### 2. **Caching**:
   - The component checks for previously searched results in two places:
     - **Local cache (in-memory)**: The results are stored in the `cache.current` object. This allows quick access to previously fetched data without re-fetching from the API.
     - **LocalStorage**: Results are also saved in `localStorage`, providing persistence even after the page is refreshed.
   - If data for a query is found in either cache, it skips the API call.

### 3. **AbortController**:
   - An `AbortController` is used to cancel any ongoing API requests when a new query is entered, avoiding fetching data for outdated queries when a user types rapidly.

### 4. **Dynamic Status Handling**:
   - Three states (`LOADING`, `SUCCESS`, `ERROR`) are managed for the search process:
     - `LOADING`: Indicates that a request is being processed.
     - `SUCCESS`: Displays the fetched results or "No Results Found" if there are none.
     - `ERROR`: Displays an error message if the API request fails (except for user-initiated aborts).

### 5. **User Feedback**:
   - While the search results are being fetched, a "Loading..." message is displayed to the user.
   - If the search query returns an error or no results, appropriate messages are shown.

### 6. **API Integration**:
   - The component fetches search results from the `dummyjson.com` API, specifically searching for products based on the user's input query.
   - The results are limited to 10 items to optimize performance.

### 7. **Search Input Handling**:
   - The search input field captures the user's query, and its value is updated on every keystroke using `setQuery`.
   - The query is trimmed to prevent unnecessary API calls for empty input or whitespace.

### 8. **Asynchronous Data Fetching**:
   - The `fetchData` function is an asynchronous function responsible for fetching product data from the API when no cached data is found.

### 9. **Conditional Rendering**:
   - The component conditionally renders the results, a loading indicator, an error message, or a "No Results Found" message based on the current state of the request and data availability.

These features help create an efficient and user-friendly search bar with typeahead functionality.
