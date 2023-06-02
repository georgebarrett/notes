const NotesClient = require('./notesClient');
// This makes `fetch` available to our test
// (it is not by default, as normally `fetch` is only
// available within the browser)
require('jest-fetch-mock').enableMocks()

describe('NotesClient class', () => {
  it('calls fetch and loads data', (done) => {
    // 1. Instantiate the class
    const client = new NotesClient();
  
    // 2. We mock the response from `fetch`
    // The mocked result will depend on what your API
    // normally returns — you want your mocked response
    // to "look like" as the real response as closely as
    // possible (it should have the same fields).
    fetch.mockResponseOnce(JSON.stringify({
      notes: ['note 1', 'note 2']
    }));
  
    // 3. We call the method, giving a callback function.
    // When the HTTP response is received, the callback will be called.
    // We then use `expect` to assert the data from the server contain
    // what it should.
    client.loadNotes((returnedDataFromApi) => {
      expect(returnedDataFromApi.notes).toEqual(['note 1', 'note 2']);
  
      // 4. Tell Jest our test can now end.
      done();
    });
  });

  it('sends a POST request', (done) => {
    const client = new NotesClient();

    // blank mock response for fetch
    fetchMock.mockResponse('');

    // Create the post request URL and parameters
    const expectedUrl = 'http://localhost:3000/notes';
    const expectedOptions = {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ content: "New note" })
    };
    // Call method and assert the correct post request has been made
    client.createNote('New note')
      .then(() => {
        expect(fetchMock).toHaveBeenCalledWith(expectedUrl, expectedOptions);
        done();
    });
  });
});