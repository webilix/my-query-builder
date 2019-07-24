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

## Field Values and Functions

| Type              | INSERT                           |                                                 | WHERE                              |                                                   |
| ----------------- | -------------------------------- | ----------------------------------------------- | ---------------------------------- | ------------------------------------------------- |
|                   | Sample                           | Result                                          | Sample                             | Result                                            |
| String            | field: 'value'                   | \`field\` = 'value'                             | {field: 'value'}                   | (\`field\` = 'value')                             |
| Number            | field: 1                         | \`field\` = 1                                   | {field: 1}                         | (\`field\` = 1)                                   |
| NULL              | field: null                      | \`field\` = NULL                                | {field: null}                      | ISNULL(field)                                     |
| Date              | field: new Date()                | \`field\` = '1979-06-03 01:23:45'               | {field: new Date()}                | (\`field\` = '1979-06-03 01:23:45')               |
| Date: \$NOW       | field: '\$NOW'                   | \`field\` = '1979-06-03 01:23:45'               | {field: '\$NOW'}                   | (\`field\` = '1979-06-03 01:23:45')               |
| Date: \$DATE      | field: {\$DATE: new Date()}      | \`field\` = '1979-06-03'                        | {field: {\$DATE: new Date()}}      | (\`field\` = '1979-06-03')                        |
| Date: \$TIME      | field: {\$TIME: new Date()}      | \`field\` = '01:23:45'                          | {field: {\$TIME: new Date()}}      | (\`field\` = '01:23:45')                          |
| Date: \$YEAR      | field: {\$YEAR: new Date()}      | \`field\` = 1979                                | {field: {\$YEAR: new Date()}}      | (\`field\` = 1979)                                |
| Date: \$TIMESTAMP | field: {\$TIMESTAMP: new Date()} | \`field\` = 297221025                           | {field: {\$TIMESTAMP: new Date()}} | (\`field\` = 297221025)                           |
| Array             | field: [1, 2]                    | \`field\` = '{\\"0\\":1,\\"1\\":2}'             | {field: [1, 2]}                    | (\`field\` = '{\\"0\\":1,\\"1\\":2}')             |
| Object            | field: {a: 'b',c: 'd'}           | \`field\` = '{\\"a\\":\\"b\\",\\"c\\":\\"d\\"}' | {field: {a: 'b',c: 'd'}}           | (\`field\` = '{\\"a\\":\\"b\\",\\"c\\":\\"d\\"}') |

## SELECT functions

-   [DISTINCT](https://github.com/webilix/my-query-builder/wiki/SELECT:-DISTINCT)
-   [SUM](https://github.com/webilix/my-query-builder/wiki/SELECT:-SUM)
-   [AVG](https://github.com/webilix/my-query-builder/wiki/SELECT:-AVG)
-   [MAX](https://github.com/webilix/my-query-builder/wiki/SELECT:-MAX)
-   [MIN](https://github.com/webilix/my-query-builder/wiki/SELECT:-MIN)
-   [COUNT](https://github.com/webilix/my-query-builder/wiki/SELECT:-COUNT)
-   [ASCII](https://github.com/webilix/my-query-builder/wiki/SELECT:-ASCII)
-   [BIN](https://github.com/webilix/my-query-builder/wiki/SELECT:-BIN)
-   [OCT](https://github.com/webilix/my-query-builder/wiki/SELECT:-OCT)
-   [ORD](https://github.com/webilix/my-query-builder/wiki/SELECT:-ORD)
-   [HEX](https://github.com/webilix/my-query-builder/wiki/SELECT:-HEX)
-   [UNHEX](https://github.com/webilix/my-query-builder/wiki/SELECT:-UNHEX)
-   [BIT_LENGTH](https://github.com/webilix/my-query-builder/wiki/SELECT:-BIT_LENGTH)
-   [TO_BASE64](https://github.com/webilix/my-query-builder/wiki/SELECT:-TO_BASE64)
-   [FROM_BASE64](https://github.com/webilix/my-query-builder/wiki/SELECT:-FROM_BASE64)
-   [DATE](https://github.com/webilix/my-query-builder/wiki/SELECT:-DATE)
-   [TIME](https://github.com/webilix/my-query-builder/wiki/SELECT:-TIME)
-   [YEAR](https://github.com/webilix/my-query-builder/wiki/SELECT:-YEAR)
-   [MONTH](https://github.com/webilix/my-query-builder/wiki/SELECT:-MONTH)
-   [MONTHNAME](https://github.com/webilix/my-query-builder/wiki/SELECT:-MONTHNAME)
-   [WEEK](https://github.com/webilix/my-query-builder/wiki/SELECT:-WEEK)
-   [DAYOFYEAR](https://github.com/webilix/my-query-builder/wiki/SELECT:-DAYOFYEAR)
-   [DAYOFMONTH](https://github.com/webilix/my-query-builder/wiki/SELECT:-DAYOFMONTH)
-   [DAYOFWEEK](https://github.com/webilix/my-query-builder/wiki/SELECT:-DAYOFWEEK)
-   [HOUR](https://github.com/webilix/my-query-builder/wiki/SELECT:-HOUR)
-   [MINUTE](https://github.com/webilix/my-query-builder/wiki/SELECT:-MINUTE)
-   [SECOND](https://github.com/webilix/my-query-builder/wiki/SELECT:-SECOND)
-   [UNIX_TIMESTAMP](https://github.com/webilix/my-query-builder/wiki/SELECT:-UNIX_TIMESTAMP)
-   [LENGTH](https://github.com/webilix/my-query-builder/wiki/SELECT:-LENGTH)
-   [LCASE](https://github.com/webilix/my-query-builder/wiki/SELECT:-LCASE)
-   [LOWER](https://github.com/webilix/my-query-builder/wiki/SELECT:-LOWER)
-   [LTRIM](https://github.com/webilix/my-query-builder/wiki/SELECT:-LTRIM)
-   [RTRIM](https://github.com/webilix/my-query-builder/wiki/SELECT:-RTRIM)
-   [SPACE](https://github.com/webilix/my-query-builder/wiki/SELECT:-SPACE)
-   [TRIM](https://github.com/webilix/my-query-builder/wiki/SELECT:-TRIM)
-   [UCASE](https://github.com/webilix/my-query-builder/wiki/SELECT:-UCASE)
-   [UPPER](https://github.com/webilix/my-query-builder/wiki/SELECT:-UPPER)
-   [REVERSE](https://github.com/webilix/my-query-builder/wiki/SELECT:-REVERSE)
-   [CONCAT](https://github.com/webilix/my-query-builder/wiki/SELECT:-CONCAT)
-   [FORMAT](https://github.com/webilix/my-query-builder/wiki/SELECT:-FORMAT)
-   [INSTR](https://github.com/webilix/my-query-builder/wiki/SELECT:-INSTR)
-   [LEFT](https://github.com/webilix/my-query-builder/wiki/SELECT:-LEFT)
-   [REPLACE](https://github.com/webilix/my-query-builder/wiki/SELECT:-REPLACE)
-   [LPAD](https://github.com/webilix/my-query-builder/wiki/SELECT:-LPAD)
-   [RPAD](https://github.com/webilix/my-query-builder/wiki/SELECT:-RPAD)
-   [SUBSTR](https://github.com/webilix/my-query-builder/wiki/SELECT:-SUBSTR)
-   [SUBSTRING](https://github.com/webilix/my-query-builder/wiki/SELECT:-SUBSTRING)
-   [DATE_FORMAT](https://github.com/webilix/my-query-builder/wiki/SELECT:-DATE_FORMAT)

## WHERE / HAVING conditions

-   [:](https://github.com/webilix/my-query-builder/wiki/WHERE:-:) (equal)
-   [NOT](https://github.com/webilix/my-query-builder/wiki/WHERE:-NOT)
-   [EQ](https://github.com/webilix/my-query-builder/wiki/WHERE:-EQ) (equal with value function)
-   [NE](https://github.com/webilix/my-query-builder/wiki/WHERE:-NE) (not equal)
-   [BETWEEN](https://github.com/webilix/my-query-builder/wiki/WHERE:-BETWEEN)
-   [IN](https://github.com/webilix/my-query-builder/wiki/WHERE:-IN)
-   [LIKE](https://github.com/webilix/my-query-builder/wiki/WHERE:-LIKE)
-   [LLIKE](https://github.com/webilix/my-query-builder/wiki/WHERE:-LLIKE) (like at the end of string)
-   [RLIKE](https://github.com/webilix/my-query-builder/wiki/WHERE:-RLIKE) (like at the beginning of string)
-   [LT](https://github.com/webilix/my-query-builder/wiki/WHERE:-LT) (less than)
-   [LTE](https://github.com/webilix/my-query-builder/wiki/WHERE:-LTE) (less than or equal)
-   [GT](https://github.com/webilix/my-query-builder/wiki/WHERE:-GT) (greater than)
-   [GTE](https://github.com/webilix/my-query-builder/wiki/WHERE:-GTE) (greater than or equal)

## Tests

```bash
git clone https://github.com/webilix/my-query-builder.git
npm install
npm test
```
