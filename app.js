"use strict";

const User = function (name) {
  this.name = name;
};

const anna = new User("Anna");
const Sadam = new User("Louis");

const currentUser = anna;



const Conversation =  function (){
  this.users = [];
  this.messages = [];
};

const Message = function (user, content) {
  this.user = user;
  this.content = content;
}

Conversation.prototype.addUsers = function (users) {
  users.forEach((user) => {
    if (!(user instanceof User) || this.users.includes(user)) {
      throw new Error(
        "Could not add user! It could be a duplicate or not be an instancer of User"
      );
    }
    console.log(`Bienvenue ${user.name} dans cette conversation`);
    this.users.push(user);
  });
  return this;
};

User.prototype.sendMeassege = function (conversation, content){
  if (!conversation.users.includes(this)){
    throw new Error(`${this.name} n'est pas dans cette conversation`);
  }
  const message = new Message(this, content);
  conversation.messages.push(message);
  message.display();
}

Message.prototype.display = function (){
  if (currentUser === this.user){
    const html = `<div>
      <span class="from-me">${this.user.name}</span>
      <p class="from-me">${this.content}</p>
    </div>`;
    document.querySelector(".conversation").insertAdjacentHTML("beforeend", html);
  } else {
    const html = `<div>
      <span class="from-them">${this.user.name}</span>
      <p class="from-them">${this.content}</p>
    </div>`;
    document.querySelector(".conversation").insertAdjacentHTML("beforeend", html);
  }
}

// Façon plus rapide en utilisant un ternaire :
// Message.prototype.display = function () {
//   const className = this.user === currentUser ? "from-me" : "from-them";
//   const html = ` <div>
//       <span class="${className}">${this.user.name}</span>
//       <p class="${className}">${this.content}</p>
//     </div>`;
//   document.querySelector(".conversation").insertAdjacentHTML("beforeend", html);
//   return this;
// };


const conversation = new Conversation();
conversation.addUsers([anna, Sadam]); 
anna.sendMeassege(conversation, "Salut Louis");
Sadam.sendMeassege(conversation, "Salut Anna, tu vas bien ?");