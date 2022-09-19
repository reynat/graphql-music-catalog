# Part 5: Testing

>As with all testing, it is important to be clear what is it one is trying to test. Putting aside unit tests for very limited specific situations, testing in the graph is often trying to test/answer questions like: **would this query work if the graph server received it?**

>A few important features to note in the skeleton code are:
>- The tests take in a query and the expected result is the result from the graph. Testing like is particularly helpful in that unit testing can run alongside testing queries in the schema explorer.
>- The tests are data driven. This does require some management in mocking the data sources, but once that is sorted out all the tests are consistently the same, and test against the graph schema itself.
>- The test spins up an apollo server with only the necessary parts of the schema and resolvers. As a unit test, it is not necessary to spin up the entire graph, and doing so wastes considerable time in running the tests.

1. Run `git checkout 5-testing-code`. 

2. Complete the test for getting an album using a valid id. 
    - Given the simplicity of the domain, we will be including all parts of the schema and resolvers for now. We will explore how to include only necessary parts of the schema and resolvers in a later step.

3. Include another test for getting an album using an invalid id.

4. Run `git checkout 5-testing-solution` to see a sample solution.

## TODO
- Refactor test file to `it.each` syntax (similar to the Candidate Graph)
- Split out mutation schema and resolvers to demonstrate schema stitching + including only necessary parts of schema and resolvers for unit tests