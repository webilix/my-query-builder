# my-query-builder

MySQL query builder

For more information and complete usage status help please check [wiki](https://github.com/webilix/my-query-builder/wiki/)

## Installation

```bash
npm install --save my-query-builder
```

---

## Usage

```javascript
const myQueryBuilder = require('my-query-builder');
```

## Specify default table name

```javascript
myQueryBuilder.TABLE('users');
```

## SELECT query

```javascript
const query = myQueryBuilder
    .SELECT()
    .from('users')
    .get();

// SELECT * FROM `users`
```

```javascript
const query = myQueryBuilder
    .SELECT('name', { email: 'emailAddress' }, { $CONCAT: { name: 'fullName' }, $ARGS: ['$ ', 'family'] })
    .from('users')
    .get();

// ELECT `name`, `email` AS `emailAddress`, CONCAT(`name`, ' ', `family`) AS `fullName` FROM `users`
```

```javascript
const query = myQueryBuilder
    .SELECT('ID', 'name')
    .from('users')
    .where({ status: 'A' }, { name: { $LIKE: 'a' } })
    .get();

// SELECT `ID`, `name` FROM `users` WHERE ((`status` = 'A') AND (`name` LIKE '%a%'))
```

```javascript
const query = myQueryBuilder
    .SELECT('users.ID', 'users.name', { 'projects.ID': 'projectID' }, { 'projects.name': 'projectName' })
    .from('users')
    .join({ $INNER: { projects: { userID: 'users.ID' } } })
    .get();

// SELECT `users`.`ID`, `users`.`name`, `projects`.`ID` AS `projectID`, `projects`.`name` AS `projectName` FROM `users` INNER JOIN `projects` ON (`projects`.`userID` = `users`.`ID`)
```

```javascript
const query = myQueryBuilder
    .SELECT('name', { $COUNT: { '*': 'count' } })
    .from('users')
    .group('name')
    .get();

// SELECT `name`, COUNT(*) AS `count` FROM `users` GROUP BY `name`
```

```javascript
const query = myQueryBuilder
    .SELECT('ID', 'name', { email: 'emailAddress' })
    .from('users')
    .having({ ID: { $GTE: 1000 } }, { emailAddress: { $LLIKE: '@gmail.com' } })
    .get();

// SELECT `ID`, `name`, `email` AS `emailAddress` FROM `users` HAVING ((`ID` >= 1000) AND (`emailAddress` LIKE '%@gmail.com'))
```

```javascript
const query = myQueryBuilder
    .SELECT('ID', 'name')
    .from('users')
    .order({ name: '$ASC' }, { ID: '$DESC' })
    .get();

// SELECT `ID`, `name` FROM `users` ORDER BY `name` ASC, `ID` DESC
```

```javascript
const query = myQueryBuilder
    .SELECT('ID', 'name')
    .from('users')
    .skip(100)
    .limit(10)
    .get();
// SELECT `ID`, `name` FROM `users` LIMIT 100, 10
```

## INSERT query

```javascript
const user = {
    name: 'Ali',
    family: 'Amirnezhad',
    bday: '1979-06-03',
    email: 'webilix@gmail.com',
    register: new Date(),
    'last-login': null
};

const query = myQueryBuilder
    .INSERT(user)
    .into('users')
    .get();

// INSERT INTO `users` (`name`, `family`, `bday`, `email`, `register`, `last-login`) VALUES ('Ali', 'Amirnezhad', '1979-06-03', 'webilix@gmail.com', '2019-07-21 01:23:45', NULL)
```

## UPDATE query

```javascript
const user = {
    bio: 'Senior Full Stack Web Developer',
    'last-login': new Date()
};
const query = myQueryBuilder
    .UPDATE(user)
    .table('users')
    .where({ ID: 1 })
    .unique()
    .get();

// UPDATE `users` SET `bio` = 'Senior Full Stack Web Developer', `last-login` = '2019-07-21 01:12:45' WHERE ((`ID` = 1)) LIMIT 1
```

## DELETE query

```javascript
const query = myQueryBuilder
    .DELETE()
    .from('users')
    .where({ ID: 1 })
    .unique()
    .get();

// DELETE FROM `users` WHERE ((`ID` = 1)) LIMIT 1
```

## Data types

-   String
-   Number
-   NULL
-   Date
-   Array
-   Object

## SELECT functions

-   DISTINCT
-   SUM
-   AVG
-   MAX
-   MIN
-   COUNT
-   ASCII
-   BIN
-   OCT
-   ORD
-   HEX
-   UNHEX
-   BIT_LENGTH
-   TO_BASE64
-   FROM_BASE64
-   DATE
-   TIME
-   YEAR
-   MONTH
-   MONTHNAME
-   WEEK
-   DAYOFYEAR
-   DAYOFMONTH
-   DAYOFWEEK
-   HOUR
-   MINUTE
-   SECOND
-   UNIX_TIMESTAMP
-   LENGTH
-   LCASE
-   LOWER
-   LTRIM
-   RTRIM
-   SPACE
-   TRIM
-   UCASE
-   UPPER
-   REVERSE
-   CONCAT
-   FORMAT
-   INSTR
-   LEFT
-   REPLACE
-   LPAD
-   RPAD
-   SUBSTR
-   SUBSTRING
-   DATE_FORMAT

## WHERE / HAVING conditions

-   : (equal)
-   null (ISNULL)
-   NOT
-   NE (not equal)
-   BETWEEN
-   IN
-   LIKE
-   LLIKE (like at the end of string)
-   RLIKE (like at the beginning of string)
-   LT (less than)
-   LTE (less than or equal)
-   GT (greater than)
-   GTE (greater than or equal)

## Tests

```bash
git clone https://github.com/webilix/my-query-builder.git
npm install
npm test
```
