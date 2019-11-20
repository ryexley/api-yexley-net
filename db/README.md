SQLite 3
=========

_Written for posterity..._

This API uses SQLite3 for data persistence. These are just some notes for working with that database.

_NOTE: All of the following commands are assumed to have been run from the root of the project._

### Opening the database for querying
```
$ sqlite3 db/data/api-yexley-net.sqlite3
```

### General SQLite terminal settings
The following settings can be saved in a `~/.sqliterc` file, and make the output of the commands below much more pleasantly readable.

```
# .sqliterc
.mode column
.headers on
.separator ROW "\n"
.nullvalue NULL
```

### Listing the tables in the database
```
sqlite> .tables
```

### Viewing the schema/structure of a table
```
sqlite> .schema <table name> --indent
```

### Viewing the contents (data) of a table
```
sqlite> select * from <table name>;
```

_NOTE: don't forget the trailing semi-colon_
