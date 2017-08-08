(function() {

  angular
    .module('myApp')
    .controller('TeamController', [TeamController]);

  function TeamController() {
    var gerry = {
      name: 'Gerry Pass',
      role: 'Lead Developer',
      bio: 'Gerry had a useful idea for how he could hack the planet, but being short on time, \
            he gave the idea to Chris and Amanda for their group project at General Assembly. \
            After seeing what they could accomplish, he asked them if they wanted to remake it \
            from scratch to continue their learning, and like that, Middle.Place was born. ',
      img: 'assets/Gerry400.jpg',
      phoneNumber: '4049539976',
      email: 'rgpass@gmail.com',
      github: 'https://github.com/rgpass',
      linkedin: 'https://www.linkedin.com/pub/gerry-pass/40/793/113',
      facebook: 'https://www.facebook.com/gerry.pass',
      personal: 'http://www.gerrypass.com/'
    },
      amanda = {
        name: 'Amanda Raymond',
        role: 'Developer',
        bio: 'Amanda joined Middle.Place excited to create, code, and collaborate. She is enjoying \
              advancing her full-stack skills and working with such a great team. In addition to help \
              create Middle.Place, she has taken charge of Middle.Place\'s upkeep. She revived this \
              project after 1.5 years of being down and upgraded all of the APIs, libraries, and dependencies.\
              Outside of Middle.Place and other coding ventures, Amanda likes traveling and going to concerts.',
        img: 'assets/Amanda400.jpg',
        phoneNumber: '8042918214',
        email: 'amandawraymond@gmail.com',
        github: 'https://github.com/amandawraymond',
        linkedin: 'https://www.linkedin.com/in/amandawraymond',
        twitter: 'https://twitter.com/amandawraymond',
        personal: 'http://www.amandawraymond.com/'
      },
      chris = {
        name: 'Chris Markel',
        role: 'Developer',
        bio: 'Chris joined Middle.Place excited to recreate and improve upon its predecessor, \
              Connect.Us. He is enjoying sharpening his development skills while collaborating with \
              the team on core functionalities, UX, and design. When away from the code, Chris is \
              likely dabbling outdoors or spending time with his wife.',
        img: 'assets/Chris400.jpg',
        email: 'cmarkel5@gmail.com',
        linkedin: 'https://www.linkedin.com/in/chrismarkel5'
      },
      kevin = {
        name: 'Kevin Abdo',
        role: 'Product Manager',
        bio: 'Kevin approached the Middle.Place team to gain experience to product management within \
              the tech sector. Since then he has helped develop a vision for the site based on strong \
              functionality for users and intuitive designs. Outside of Middle.Place, Kevin can be found \
              playing guitar in his rock band, The Better Brother.',
        img: 'assets/KA_400by400_2.jpg',
        email: 'vedomano@gmail.com',
        linkedin: 'https://www.linkedin.com/pub/kevin-abdo-pmp/28/a92/476'
      };

    var vm = this;

    vm.teamMembers = [gerry, amanda, chris, kevin];
  }
})();
