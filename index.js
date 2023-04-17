const contacts = require("./contacts");

const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      const listOfContacts = await contacts.listContacts();
      console.table(listOfContacts);
      break;

    case "get":
      const oneContact = await contacts.getContactById(id);
      return console.log(oneContact);
      break;

    case "add":
      const newContact = await contacts.addContact({ name, email, phone });
      console.log(newContact);
      break;

    case "remove":
      const removedContact = await contacts.removeContact(id);
      console.log(removedContact);

      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

// invokeAction({ action: "list" });
// invokeAction({ action: "get", id: "qdggE76Jtbfd9eWJHrssH" });
// invokeAction({
//   action: "add",
//     name: "Tom Hanks",
//     email: "tom@utquamvel.net",
//     phone: "(234) 870-6785",
// });

// invokeAction({
//   action: "remove",
//   id: "AeHIrLTr6JkxGE6SN-0Rw",
// });

invokeAction(argv);
