Week2 Logs:
=======================================
# About MongoDB
MongoDB is a document oriented database. It is a nested dictionary of key-value pair.

# to see key bindings
> help keys

# To see BSON spec
www.bsonspec.org

# Javascript datatype
Number interpreted as double, float
String interpreted as UTF-8 strings

# About .find()
- It dispaly all available records in respective collections.
- Display in batches with default 20 records
- This is achieved by using a 'cursor' internally which holder all
  available records using .find().
- The cursor however will be closed after 10 minutes(by default)

# Query using constants
- $gt, $lt, $gte, $lte is used for querying for greater than, less than,
  greater than equal to, less than equal to.
- MongoDB locale sorting
- Comparison in sorting using $lt,$gt etc will not span the value datatype
- $exists : to check particular field exists or not
- $type : to check particular type exists in value
- $regex : allow string pattern matching for value
- $or : prefix operator which take an array of documents and each document
  is treated as separate query and $or matches any document that match any of
  those queries inside the array. In short, compute the union of all those
  queries.
  Eg db.cols.find({ $or: [{ $gt: 5 }, { $type: 2 }, { $regex: "^A"}] })
- $and : prefix operator which take an array of documents and perform conjunction
  of queries mentioned inside array
  It is somewhat similar to db.cols.find({ name: { $gt: 'D', $regex: '^A'} })
- MongoDB query are polymorphic.
  Eg. db.accounts.find({ favorites: 'pretzels' });
  Execution of query happen as:
  For every document in the accounts collection, find the field called 'favorites'.
  If the field contains 'string' value and the value is 'pretzels', then the
  document matches and should be returned for the query.
  If the document caontains field called 'favorites', and value of field 'favorites'
  is an array, then check inside array to see if any element of array is a string
  that equals to the string 'pretzels'. In which case the document matches.
  Hence, our matching is 'polymorphic' over arrays and non-array type values.
- Mongo does not query recursively to nested levels inside the arrays.
- $all : matches any document that has all of the specified element inside the array
  filter where we are looking at.
  Eg. db.accounts.find({ favorites: { $all: [ 'pretzels', 'beer' ] } })
- $in : matches any document that has either of the element specified inside the
  array filter where we are looking at.
- Querying inside nested documents:
  It is done using 'dot' notation.
  Eg: To find { name: 'ram', email: { work: 'ram@vertis.com', personal: 'ram@gmail.com' } }
  Then, query is db.people.find({ 'email.work' : 'ram@vertis.com' })

# Querying and cursors
- We get cursor when we do db.some_database.find().
- We can do following operations on cursor:
  - cur = db.some_database.find()
  - cur.hasNext() : checks whether there is a record to iterate to
  - cur.next() : return the next record
  - cur.limit(5) : return the next 5 records
  - cur.sort({ name: -1 }) : sort the records in the reverse order of name
  - cur.skip(2) : return the records by skipping 2 records
- .sort(), .limit() and .skip() operations are processed by server side ordering and
  limiting. They are not processed by ordering the documents in the memory by clients.
- db.some_database.find().sort({ name: -1 }).limit(2).skip(2) will be processed
  in lexicographically reverse order.
  i.e. first sort() -> skip() -> limit() will be processed.

# Counting records
- db.some_database.count({ query })

# Updating document operations:
--- String values
- $set : Use to update particular field in document keeping other field as it is.
  Eg. db.people.update({ name: 'ram' }, { $set: { age: 27 } })
- $inc : Use to increment particular field in document keeping other field as it is.
  Eg. db.people.update({ name: 'ram' }, { $inc: { age: 1 } })
  If that field does not exists, then both will create the new field with that value.
- $unset : to remove the field in document keeping other field as it is.
  If the field does not exist, then $unset has no effect.
--- Array values
- $set with index value as:
  Record: { name: 'ram', data: [1, 2, 3, 4, 5] }
  Eg: db.people.update({ name: 'ram' }, { $set: { "data.2": 10 } })
  above operation will change 3rd indexed value i.e 3 into 10 in data.
- $push: Extend the array in value from rightmost end.
  Eg: db.people.update({ name: 'ram' }, { $push: { data: 10 } })
- $pushAll: Extend the array with array of values from rightmost end.
  Eg: db.people.update({ name: 'ram' }, { $push: { data: 10 } })
- $pop: Remove the element from array from rightmost end.
  Eg: db.people.update({ name: 'ram' }, { $pop: { data: 1 } })
- $pop with negative argument: Remove the element from leftmost end.
  Eg: db.people.update({ name: 'ram' }, { $pop: { data: -1 } })
- $pull : Will remove the element from array irrespective of its element.
  Eg: db.people.update({ name: 'ram' }, { $pull: { data: 5 } })
- $pullAll : Will remove all array elements from data array.
  Eg: db.people.update({ name: 'ram' }, { $pullAll: { data: [5, 10] } })
- $addToSet: It will insert element into array if value does not exists
  otherwise do nothing.
  Eg: db.people.update({ name: 'ram' }, { $addToSet: { data: 10 } })
-* { upsert: true } : will check whether record exists or not.
  If not, then create new record otherwise update the existing record.
  Eg: db.people.update({ name: 'ram' }, { $set: { age: 30 } }, { upsert: true })

-* { multi: true } : will enable multiple records update operation
  Multi-update operations are not atomic, isolated.

# Removing document operations:
- .remove(): remove all the documents inside the collection one by one.
- .remove(some_query): remove all matching documents.
- .drop(): remove all the documents at once.
- Difference between remove() and drop():
  -- .remove() requires one by one update of internal state for each document
  inside the collection whereas dropping the collection requires freeing up much
  larger data structure inside the database datafiles which although still
  proportional to the size of the collection in term of the number of documents
  is going to have constant factor that will make dropping the collection vastly
  faster than removing documents from the collection one by one.
  -- Collection metadata like indexes remains there when .remove() is used but
  discarded when .drop() is used.
- .remove(), .drop() operations are not atomic, isolated.














