#!/usr/bin/env node
import { Command } from 'commander';
import axios from 'axios';

const program = new Command();
program.version('0.0.1');

program
  .command('hello <name>')
  .option('-l, --last-name <lastName>', 'The users last name')
  .description('Says hello to a person with a name!')
  .action((name, cmd) => {
    console.log(cmd);
    if (cmd.lastName) {
      name += ` ${cmd.lastName}`;
    }

    console.log(`Hello ${name}`);
  })

program
  .command('check <username> <password>')
  .description('Check the username and password from the user service.')
  .action((username, password) => {
    axios.post(`http://localhost:4000/users/check/${username}`, {
      password: password
    }, {
      auth: {
        username: 'admin',
        password: 'D4ED43C0-8BD6-4FE2-B358-7C0E230D11EF'
      }
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
  });

program
  .command('create <username> <password> <firstName> <lastName>')
  .description('Create a new user!')
  .action((username, password, firstName, lastName) => {
    axios.post(`http://localhost:4000/users`, {
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName
    }, {
      auth: {
        username: 'admin',
        password: 'D4ED43C0-8BD6-4FE2-B358-7C0E230D11EF'
      }
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.log(err);
    })
  })

program.parse(process.argv);