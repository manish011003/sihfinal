/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');

	// Scrolly links.
		$('.scrolly').scrolly({
			speed: 2000
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (browser.name == 'ie'
		||	browser.mobile) {

			$.fn._parallax = function() {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function() {

				$(this).each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function() {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function() {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					breakpoints.on('<=medium', off);
					breakpoints.on('>medium', on);

				});

				return $(this);

			};

			$window
				.on('load resize', function() {
					$window.trigger('scroll');
				});

		}

	// Spotlights.
		var $spotlights = $('.spotlight');

		$spotlights
			._parallax()
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					var top, bottom, mode;

					// Use main <img>'s src as this spotlight's background.
						$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

					// Side-specific scrollex tweaks.
						if ($this.hasClass('top')) {

							mode = 'top';
							top = '-20%';
							bottom = 0;

						}
						else if ($this.hasClass('bottom')) {

							mode = 'bottom-only';
							top = 0;
							bottom = '20%';

						}
						else {

							mode = 'middle';
							top = 0;
							bottom = 0;

						}

					// Add scrollex.
						$this.scrollex({
							mode:		mode,
							top:		top,
							bottom:		bottom,
							initialize:	function(t) { $this.addClass('inactive'); },
							terminate:	function(t) { $this.removeClass('inactive'); },
							enter:		function(t) { $this.removeClass('inactive'); },

							// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

				};

				off = function() {

					// Clear spotlight's background.
						$this.css('background-image', '');

					// Remove scrollex.
						$this.unscrollex();

				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					$this.scrollex({
						top:		250,
						bottom:		0,
						initialize:	function(t) { $this.addClass('inactive'); },
						terminate:	function(t) { $this.removeClass('inactive'); },
						enter:		function(t) { $this.removeClass('inactive'); },

						// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

						//leave:	function(t) { $this.addClass('inactive'); },

					});

				};

				off = function() {
					$this.unscrollex();
				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();

})(jQuery);

const chatIcon = document.getElementById('chat-icon');
const chatContainer = document.getElementById('chat-container');
const cancelChat = document.getElementById('cancel-chat');

function toggleChatbox() {
    chatIcon.style.display = chatIcon.style.display === 'none' ? 'block' : 'none';
    chatContainer.style.display = chatContainer.style.display === 'flex' ? 'none' : 'flex';
}

function handleUserInput(message) {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes('hi') || lowerCaseMessage.includes('hello')) {
        appendMessage('🤖', 'Hello! How can I assist you today?');
    } else if (lowerCaseMessage.includes('how are you')) {
        appendMessage('🤖', 'I\'m just a computer program, but thanks for asking!');
    } else if (lowerCaseMessage.includes('city')) {
        appendMessage('🤖', 'I am not bound to any specific city. I\'m here to help you regardless of your location!');
    } else if (/\b\d{10}\b/.test(message)) {
  // Check if the message contains a 10-digit number (assuming it's a phone number)
  appendMessage('🤖', 'Thank you for providing your phone number. We will call you soon.');
} else if (lowerCaseMessage.includes('can i sell battery')) {
        appendMessage('🤖', 'Oo YES!,you can definitely.Go to other e-waste (sell e-waste).');
    }
    else if (lowerCaseMessage.includes('what items can i sell?')) {
        appendMessage('🤖', 'Your Welcome!,you can sell all e-waste just visit to sell e-waste page.');
    }
else {
  appendMessage('🤖', 'I didn\'t understand that. Can you please clarify? or can you please provide your phone no:' );
}
}

function appendMessage(sender, message) {
    const chatBody = document.getElementById('chat-body');
    const messageElement = document.createElement('p');
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatBody.appendChild(messageElement);

    chatBody.scrollTop = chatBody.scrollHeight;
}


function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput !== '') {
        appendMessage('User', userInput);
        handleUserInput(userInput);
        document.getElementById('user-input').value = '';
    }
}

document.addEventListener('DOMContentLoaded', function () {
	const totalCounterElement = document.getElementById('totalCounter');
	let totalDevicesSold = 0;

	// Your dataset goes here
	const dataset = [
    




{
	"username": "user1",
	"device_sold": "smartphone",
	"device_details": {
	  "brand": "Samsung",
	  "model": "Galaxy S10",
	  "storage_gb": 128
	},
	"condition": "good",
	"points_earned": 50
  },
  { 


	"username": "user2",
	"device_sold": "laptop",
	"device_details": {  
	  "brand": "Dell",
	  "model": "XPS 13",
	  "storage_gb": 256,
	  "ram_gb": 8
	},
	"condition": "excellent",
	"points_earned": 100
  },
  { 


"username": "user2",
"device_sold": "laptop",
"device_details": {  
"brand": "Dell",
"model": "XPS 13",
"storage_gb": 256,
"ram_gb": 8
},
"condition": "excellent",
"points_earned": 100
},
{ 


"username": "user2",
"device_sold": "laptop",
"device_details": {  
"brand": "Dell",
"model": "XPS 13",
"storage_gb": 256,
"ram_gb": 8
},
"condition": "excellent",
"points_earned": 100
},
  {
	"username": "user3",
	"device_sold": "smart TV",
	"device_details": {
	  "brand": "LG",
	  "model": "OLED55C9PUA",
	  "screen_size_inches": 55
	},
	"condition": "fair",
	"points_earned": 80
  },
  {
	"username": "user4",
	"device_sold": "game console",
	"device_details": {
	  "brand": "Sony",
	  "model": "PlayStation 5",
	  "storage_gb": 825
	},
	"condition": "like new",
	"points_earned": 120
  },
  {
	"username": "user4",
	"device_sold": "game console",
	"device_details": {
	  "brand": "Sony",
	  "model": "PlayStation 5",
	  "storage_gb": 825
	},
	"condition": "like new",
	"points_earned": 120
  },
  {
	"username": "user4",
	"device_sold": "game console",
	"device_details": {
	  "brand": "Sony",
	  "model": "PlayStation 5",
	  "storage_gb": 825
	},
	"condition": "like new",
	"points_earned": 120
  },
  {
	"username": "user1",
	"device_sold": "digital camera",
	"device_details": {
	  "brand": "Canon",
	  "model": "EOS Rebel T7i",
	  "megapixels": 24
	},
	"condition": "very good",
	"points_earned": 70
  },
  {
	"username": "user2",
	"device_sold": "microwave oven",
	"device_details": {
	  "brand": "Panasonic",
	  "model": "NN-SN936B",
	  "capacity_liters": 2.2
	},
	"condition": "used",
	"points_earned": 40
  },
  {
	"username": "user3",
	"device_sold": "refrigerator",
	"device_details": {
	  "brand": "Samsung",
	  "model": "RF23M8070SR",
	  "capacity_liters": 22
	},
	"condition": "fair",
	"points_earned": 90
  },
  {
	"username": "user3",
	"device_sold": "refrigerator",
	"device_details": {
	  "brand": "Samsung",
	  "model": "RF23M8070SR",
	  "capacity_liters": 22
	},
	"condition": "fair",
	"points_earned": 90
  },
  {
	"username": "user3",
	"device_sold": "refrigerator",
	"device_details": {
	  "brand": "Samsung",
	  "model": "RF23M8070SR",
	  "capacity_liters": 22
	},
	"condition": "fair",
	"points_earned": 90
  },
  {
	"username": "user3",
	"device_sold": "refrigerator",
	"device_details": {
	  "brand": "Samsung",
	  "model": "RF23M8070SR",
	  "capacity_liters": 22
	},
	"condition": "fair",
	"points_earned": 90
  },
  {
	"username": "user3",
	"device_sold": "refrigerator",
	"device_details": {
	  "brand": "Samsung",
	  "model": "RF23M8070SR",
	  "capacity_liters": 22
	},
	"condition": "fair",
	"points_earned": 90
  },
  {
	"username": "user3",
	"device_sold": "refrigerator",
	"device_details": {
	  "brand": "Samsung",
	  "model": "RF23M8070SR",
	  "capacity_liters": 22
	},
	"condition": "fair",
	"points_earned": 90
  },
  {
	"username": "user3",
	"device_sold": "refrigerator",
	"device_details": {
	  "brand": "Samsung",
	  "model": "RF23M8070SR",
	  "capacity_liters": 22
	},
	"condition": "fair",
	"points_earned": 90
  },
  {
	"username": "user3",
	"device_sold": "refrigerator",
	"device_details": {
	  "brand": "Samsung",
	  "model": "RF23M8070SR",
	  "capacity_liters": 22
	},
	"condition": "fair",
	"points_earned": 90
  },
  {
	"username": "user3",
	"device_sold": "refrigerator",
	"device_details": {
	  "brand": "Samsung",
	  "model": "RF23M8070SR",
	  "capacity_liters": 22
	},
	"condition": "fair",
	"points_earned": 90
  },
  
  {
	"username": "user4",
	"device_sold": "washing machine",
	"device_details": {
	  "brand": "LG",
	  "model": "WM3900HWA",
	  "capacity_kg": 9
	},
	"condition": "good",
	"points_earned": 60
  }
	];

	// Update the total counter
	dataset.forEach(entry => {
	  totalDevicesSold += entry.points_earned;
	});
	totalCounterElement.innerText = totalDevicesSold;

	// Prepare data for the chart
	const deviceLabels = Array.from(new Set(dataset.map(entry => entry.points_earned)));
	const deviceData = deviceLabels.map(label =>
	  dataset.filter(entry => entry.points_earned === label).length
	);

	// Create the pie chart
	const ctx = document.getElementById('pieChart').getContext('2d');
	new Chart(ctx, {
	  type: 'pie',
	  data: {
		labels: deviceLabels,
		datasets: [{
		  data: deviceData,
		  backgroundColor: [
			'rgba(255, 199, 132, 0.7)',
			'rgba(54, 102, 235, 0.7)',
			'rgba(255, 206, 86, 0.7)',
			'rgba(75, 102, 192, 3)',
			'rgba(225, 192, 255, 0.7)',
			'rgba(255, 159, 64, 0.7)',
			'rgba(120, 120, 120, 0.7)',
			'rgba(200, 100, 200, 0.7)',
		  ],
		}]
	  },
	  options: {
		responsive: true,
		maintainAspectRatio: false,
		title: {
		  display: true,
		  text: 'Percentage of Devices Sold'
		},
	  }
	});

	 // Function to generate dynamic colors
	 function generateDynamicColors(numColors) {
        // Generate an array of dynamic colors based on the number of devices
        // You can replace this with your own color generation logic
        return Array.from({ length: numColors }, (_, index) =>
          `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255}, 0.7)`
        );
      }
    
  });