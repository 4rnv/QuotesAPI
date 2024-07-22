## Quotes API

This API lets you fetch and add quotes from various anime characters and shows. Built with MongoDB, Express, Pug, and Node.js, it's designed to be convienent and straightforward to use.

### Endpoints

#### 1. Get Quotes

**URL**: `/api/quotes`

Fetches quotes based on character and show filters.

**Method**: `GET`

**Query Parameters**:
- `character=`: Filters quotes by character. Case-insensitive, partial matches allowed. You can filter for quotes from multiple characters by separating them with a comma.
- `show=`: Filters quotes by show. Case-insensitive, partial matches allowed. You can filter for quotes from multiple shows by separating them with a comma.
- `random=` (optional): Number of random quotes to fetch. Takes any non-zero integer value. Default is 1. If this is not set the API will return all quotes from whatever show or character you have selected.

**Examples**:
- Get all quotes by particular character: `/api/quotes?character=lelouch`
- Get random quote from particular character: `/api/quotes?character=lelouch&random=1`
- Get all quotes from particular show: `/api/quotes?show=code geass`
- Get random quote from particular show: `/api/quotes?show=code geass&random=1`
- Get quotes by multiple characters: `/api/quotes?character=lelouch,light`
- Get quotes by multiple shows: `/api/quotes?show=code geass,rose of versailles`
- Get all quotes: `/api/quotes`

**Responses**:
- Status: `200 OK`
  - Body: JSON Array of quotes filtered by show and/or character
- Status: `404 Not Found`
  - Body: "No quotes found for the given criteria"
- Status: `500 Internal Server Error`
  - Body: "Error Message"

### Usage Examples

You can use cURL to get quotes in the terminal. Alternately you could also use the hosted instance[] directly through you web browser by appending your query to the URL in the specified format.

**Get quotes by character**:
```sh
curl -X GET "http://[]/api/quotes?character=lelouch"
```

**Get random quotes**:
```sh
curl -X GET "http://[]/api/quotes?character=lelouch&random=2"
```

**Get quotes by multiple characters and shows**:
```sh
curl -X GET "http://[]/api/quotes?character=lelouch,oscar&show=code geass,rose of versailles"
```

### Notes

Most of the quotes used in this project were extracted from [cf-anime-quotes](https://github.com/aynh/cf-anime-quotes) by [AynH](https://github.com/aynh/cf-anime-quotes). Apart from these, several dozen quotes from newer or unquoted shows were added by yours truly.