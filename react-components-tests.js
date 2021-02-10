// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by react-components.js.
import { name as packageName } from "meteor/react-components";

// Write your tests here!
// Here is an example.
Tinytest.add('react-components - example', function (test) {
  test.equal(packageName, "react-components");
});
