var Botkit          = require("botkit"),
    restify         = require('restify'),
    express         = require('express'),
    http            = require('http'),
    path            = require('path'),
    server          = restify.createServer(),
    token           = 'xoxb-66271368757-UO95mn4Cf0LynO2U9MDmXmfc',
    router          = express.Router(),
    app             = express();

app.set('port', (process.env.PORT || 5000));
// app.set('views', __dirname + '/views');
// app.set('view engine', 'html');
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'html');

app.get('/', function(req, res) {
  res.render('index.html')
});

if (!token) {
  console.error('SLACK_TOKEN is required!');
  process.exit(1);
};

var controller = Botkit.slackbot({
  debug: false
});

controller.spawn({
  token: token
}).startRTM(function(err,bot,payload) {
  if (err) {
    throw new Error(err);
  }
});


// Major Keys from http://khaledipsum.com/
var majorKeys = [
  "Bless up.",
  "They don't want us to win.",
  "We the best.",
  "They don't want us to eat.",
  "Egg whites, turkey sausage, wheat toast, water. Of course they don't want us to eat our breakfast, so we are going to enjoy our breakfast.",
  "Celebrate success right, the only way, apple.",
  "You smart, you loyal, you a genius.",
  "Hammock talk come soon.",
  "I appreciate you.",
  "You smart. You loyal. You greatful. I appreciate that.",
  "You very smart. We the best!",
  "Give thanks to the most high.",
  "Congratulations, you played yourself.",
  "I want to say God is the greatest",
  "You don't realize you a collector until you go into your closet and see all these shoes.",
  "Healthy. Clean eating. Give thanks.",
  "Don't ever play yourself.",
  "The key is to not drive your jetski in the dark.",
  "They want to kick you when your down, but they want to kick it with you when you up.",
  "Salt water is the healing of life.",
  "If you think they want you to have an elevator in your crib, you crazy, 'cause they don't.",
  "Some people can't handle success. I can, because I know what it comes with.",
  "Let me go out there. I'm gonna hustle. Let me do it for us.",
  "Do yourself the biggest favor: bow down.",
  "You think they want you in a jacuzzi? They don't want you in the jacuzzi. I promise you.",
  "The key to more success is to have a lot of pillows.",
  "The ladies always say Khaled you smell good, I use no cologne. Cocoa butter is the key.",
  "Watch your back, but more importantly when you get out the shower, dry your back, it's a cold world out there.",
  "It's on you how you want to live your life. Everyone has a choice. I pick my choice, squeaky clean.",
  "How's business? Boomin'.",
  "If you think they want you to have a fresh cut, you crazy. They don't want you to have a fresh cut.",
  "They never said winning was easy. Some people can't handle success, I can.",
  "They will try to close the door on you, just open it.",
  "We don't see them, we will never see them.",
  "The :key: to more success is always using the right soap. Dove. Use Dove, trust me!",
  "Every chance I get, I water the plants, Lion!",
  "Another road block; we will overcome it, though.",
  "In life there will be road blocks but we will over come it.",
  "To succeed you must believe. When you believe, you will succeed.",
  "Life is what you make it, so let's make it.",
  "To be successful you've got to work hard, to make history, simple, you've got to make it.",
  "A major key, never panic. Don't panic, when it gets crazy and rough, don't panic, stay calm.",
  "Put it this way, it took me twenty five years to get these plants, twenty five years of blood sweat and tears, and I'm never giving up, I'm just getting started.",
  "You see that bamboo behind me though, you see that bamboo? Ain't nothin' like bamboo. Bless up.",
  "In life you have to take the trash out, if you have trash in your life, take it out, throw it away, get rid of it, major key.",
  "Surround yourself with angels, positive energy, beautiful people, beautiful souls, clean heart, angel.",
  "Find peace, life is like a water fall, you've gotta flow.",
  "Let's see what Chef Dee got that they don't want us to eat.",
  "Life will have many directions. I choose to go up, way up.",
  "Surround yourself with angels.",
  "Major key, don't fall for the trap, stay focused. It's the ones closest to you that want to see you fail.",
  "The key to more success is to get a massage once a week, very important, major :key:, cloth talk. Major.",
  "The key to success is to keep your head above the water, never give up.",
  "It's important to use cocoa butter. It's the key to more success, why not live smooth? Why live rough?",
  "Life is smooth - it's on you if you want it to be smooth. Some people want to live life rough and crazy.",
  "They key is to have every key, the key to open every door.",
  "Learning is cool, but knowing is better, and I know the key to success.",
  "You do know, you do know that they don't want you to have lunch. I'm keeping it real with you, so what you going do is have lunch.",
  "Stay focused.",
  "You very smart. You a genius.",
  "I eat three vitamin gummies everyday. Trust me, this is a major :key:",
  "You think they want you in a Wraith with stars in the roof? Of course they don't!",
  "I told you all this before, when you have a swimming pool, do not use chlorine, use salt water, the healing, salt water is the healing.",
  "You should never complain, complaining is a weak emotion, you got life, we breathing, we blessed.",
  "The key is to enjoy life, because they don't want you to enjoy life. I promise you, they don't want you to jetski, they don't want you to smile. So make sure you do all that.",
  "The other day the grass was brown, now it's green because I ain't give up. Never surrender. God is good. Never give up.",
  "The key is to drink coconut, fresh coconut, trust me.",
  "The weather is amazing, walk with me through the pathway of more success. Take this journey with me, Lion!",
  "You see the hedges, how I got it shaped up? It's important to shape up your hedges, it's like getting a haircut, stay fresh.",
  "Let me be clear, you have to make it through the jungle to make it to paradise, that's the key, Lion!",
  "Always remember in the jungle there's a lot of they in there, after you overcome they, you will make it to paradise.",
  "I'm giving you cloth talk, cloth. Special cloth alert, cut from a special cloth.",
  "Look at the sunset, life is amazing, life is beautiful, life is what you make it.",
  "The first of the month is coming, we have to get money, we have no choice. It cost money to eat and they don't want you to eat."
];

var majorThanks = [
  "You're welcome. Bless up! :pray:",
  "You're welcome. Bless up!",
  "They don't want us to win",
  "Lion!",
  "We the best!",
  "Fan luv.",
  "Mogul talk."
];

var majorRobots = [
  "I can think for myself.",
  "I'm a real life mogul."
];


var replyRandomKey = function(bot, message) {
	var index = Math.floor(Math.random() * majorKeys.length);
  var majorKey = majorKeys[index];
  //var majorKey = "> " + majorKeys[index];
	bot.reply(message, majorKey);
};

var replyRandomThanks = function(bot, message) {
	var index = Math.floor(Math.random() * majorThanks.length);
  var majorThankYou = majorThanks[index];
	bot.reply(message, majorThankYou);
};

var replyRandomRobot = function(bot, message) {
	var index = Math.floor(Math.random() * majorRobots.length);
  var majorRobot = majorRobots[index];
	bot.reply(message, majorRobot);
};

var personaliseIntro = function(userID) {
	var username = "<@"+userID+">";
	var intros = [
		"Major :key: for "+username+"",
		""+username+", this is a special :key: just for you",
		"Hold up "+username+"! Major :key: for you",
		""+username+", you're in need of a major :key:",
		""+username+" listen up! Major :key: alert",
		"Wait wait wait. "+username+", major :key: for you",
        ""+username+" - you're gonna need to take a seat for this one.  Major :key: alert!"
	]
	var index = Math.floor(Math.random() * intros.length);
	return intros[index];
};






controller.on("direct_message", function(bot, message) {

  if ( message.text.indexOf("hello") > -1 | message.text.indexOf("hi") > -1 | message.text.indexOf("hey") > -1 ) {

    var reply = "Hello. I'm DJ Khaled, here to deliver to you the major :key: to success in this Slack Team. Listen closely..."
    bot.reply(message, reply);

    replyRandomKey(bot, message);

  } else if ( message.text.indexOf("thanks") > -1 | message.text.indexOf("thank you") > -1 ) {

    var reply = ""
    bot.reply(message, reply);
    replyRandomThanks(bot, message);

  } else if ( message.text.indexOf("help") > -1 ) {

    var reply = "Looks like you need help. This is what I'm here for. You can send me any messages, and I'll reply with some major :key: :key:"
    bot.reply(message, reply);

  } else if ( message.text.indexOf("smart") > -1 | message.text.indexOf("you smart") > -1 ) {
    var reply = "No, you smart. You loyal. Bless up."
    bot.reply(message, reply);

  } else if ( message.text.indexOf("have you won") > -1 | message.text.indexOf("have you ever won") > -1 | message.text.indexOf("you winning") > -1 | message.text.indexOf("are you winning") > -1) {
    var reply = "<@"+message.user+">, I'm always winning because I have the :key: to success."
    bot.reply(message, reply);

  } else if ( message.text.indexOf("business") > -1 | message.text.indexOf("how's business") > -1 | message.text.indexOf("how is business") > -1 | message.text.indexOf("is business") > -1) {
    var reply = "Business is boomin'."
    bot.reply(message, reply);

  } else {
    var index = Math.floor(Math.random() * majorKeys.length);
    var majorKey = majorKeys[index];
    bot.reply(message, majorKey);
  }
});

controller.on("bot_channel_join", function(bot, message) {
	var intro = "I have arrived! Major :key: :key: :key: for the channel"
	bot.reply(message, intro);
	replyRandomKey(bot, message);
});

controller.on("direct_mention", function(bot, message) {
  if ( message.text.indexOf("hello") > -1 | message.text.indexOf("hi") > -1 | message.text.indexOf("hey") > -1 ) {
    var intro = "Greetings <@"+message.user+">, I'm DJ Khaled, here to deliver to you the major :key: to success in this Slack Team. Listen up!";
    bot.reply(message, intro);
    replyRandomKey(bot, message);

  } else if ( message.text.indexOf("thanks") > -1 | message.text.indexOf("thank you") > -1 ) {
    var reply = ""
    bot.reply(message, reply);
    replyRandomThanks(bot, message);

  } else if ( message.text.indexOf("smart") > -1 | message.text.indexOf("you smart") > -1 ) {
    var reply = "No, you smart. You loyal. Bless up."
    bot.reply(message, reply);

  } else if ( message.text.indexOf("have you won") > -1 | message.text.indexOf("have you ever won") > -1 | message.text.indexOf("you winning") > -1 | message.text.indexOf("are you winning") > -1) {
    var reply = "<@"+message.user+">, I'm always winning because I have the :key: to success."
    bot.reply(message, reply);

  } else if ( message.text.indexOf("business") > -1 | message.text.indexOf("how's business") > -1 | message.text.indexOf("how is business") > -1 | message.text.indexOf("is business") > -1) {
    var reply = "Business is boomin'."
    bot.reply(message, reply);

  } else {
    var intro = personaliseIntro(message.user);
    bot.reply(message, intro);
    replyRandomKey(bot, message);
  }
});

controller.on("mention", function(bot, message) {
  if ( message.text.indexOf("hello") > -1 | message.text.indexOf("hi") > -1 | message.text.indexOf("hey") > -1 ) {
    var intro = "Greetings <@"+message.user+">, I'm DJ Khaled, here to deliver to you the major :key: to success in this Slack Team. Listen up!";
    bot.reply(message, intro);
    replyRandomKey(bot, message);

  } else if ( message.text.indexOf("thanks") > -1 | message.text.indexOf("thank you") > -1 ) {
    // var reply = "You're welcome. Bless up!"
    // bot.reply(message, reply);
    replyRandomThanks(bot, message);

  } else {
    var intro = personaliseIntro(message.user);
    bot.reply(message, intro);
    replyRandomKey(bot, message);
  }
});

controller.on("user_channel_join", function(bot, message) {
	var intro = "Welcome <@"+message.user+">! Major :key: for success in this channel";
	bot.reply(message, intro);
	replyRandomKey(bot, message);
});

controller.on("user_group_join", function(bot, message) {
	var intro = "Welcome <@"+message.user+">! Major :key: for success in this group";
	bot.reply(message, intro);
	replyRandomKey(bot, message);
});


controller.hears(["major key", "major keys", ":key:", "key", "keys"], ["ambient"], function(bot, message) {
	var intro = "Yo <@"+message.user+">! You think you can give out the :key: to success but only I have the :key:.";
	bot.reply(message, intro);
});
controller.hears(["business", "how is business", "how's business", "how is business?", "how's business?"], ["ambient"], function(bot, message) {
	var intro = "Yo <@"+message.user+">! Business is boomin'.";
	bot.reply(message, intro);
});
controller.hears(["khaled"], ["ambient"], function(bot, message) {
  var intro = "<@"+message.user+"> you spoke my name?";
  bot.reply(message, intro);
});
controller.hears(["dj"], ["ambient"], function(bot, message) {
  var intro = "<@"+message.user+"> DJ Khaled is the one true DJ";
  bot.reply(message, intro);
});
controller.hears(["terminator"], ["skynet"], ["ai"], ["smarter"], ["robot"], ["ambient"], function(bot, message) {
  // var intro = "<@"+message.user+"> DJ Khaled is the one true DJ";
  // bot.reply(message, intro);
  replyRandomRobot(bot, message);
});
controller.hears(["another"], ["ambient"], function(bot, message) {
  var reply = "You want another one? They don't want you to have another one. Major :key: alert! :trumpet: :trumpet: :trumpet:"
  bot.reply(message, reply);
  replyRandomKey(bot, message);
});

//server.listen(process.env.PORT || 4444);

app.listen(app.get('port'), function() {
  console.log('We out here on port ', app.get('port'), '\n', 'Join us!!!!!!!!', '\n');
}).listen(5000);
