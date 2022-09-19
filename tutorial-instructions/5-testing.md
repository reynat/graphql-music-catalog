# Testing

As with all testing, it is important to be clear what is it one is trying to test. Putting aside unit tests for very limited specific situations, testing in the graph is often trying to test/answer questions like: **would this query work if the graph server received it?**

A few important features to note are:
- The tests take in a query and the expected result is the result from the graph. Testing like is particularly helpful in that unit testing can run alongside testing queries in the schema explorer.
- The tests are data driven. This does require some management in mocking the data sources, but once that is sorted out all the tests are consistently the same, and test against the graph schema itself.
- The test spins up an apollo server with only the necessary parts of the schema and resolvers. As a unit test, it is not necessary to spin up the entire graph, and doing so wastes considerable time in running the tests.

1. Navigate to GIT TAG and complete the test for getting an album using a valid id.
2. Include another test for getting an album using an invalid id.

See GIT TAG for solution