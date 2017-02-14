//META{"name":"Citador"}*//

// your token, it's needed to authorize you and post the message
var token = "PUT YOUR TOKEN HERE";

var Citador = function () {};
var isQuote = false;
var quoting = false;

var elem, chanName, serverName, atServerName;

// converter rgb pra hex
function componentToHex(c) {
	var hex = c.toString(16);
	return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
	return componentToHex(r) + componentToHex(g) + componentToHex(b);
}

Citador.prototype.getName = function() {
    return "Citador";
};
Citador.prototype.getDescription = function() {
    return "Quotes somebody in chat";
};
Citador.prototype.getVersion = function() {
    return "1.4.6";
};
Citador.prototype.getAuthor = function() {
    return "Nirewen";
};

function cancelQuote() {
	$('.quote-msg').remove(); 
	isQuote = false; 
	quoting = false;
}

Citador.prototype.start = function() {
	this.attachParser();
	BdApi.injectCSS("citador-segoemdl2-font", "@font-face {font-family: 'Segoe MDL2 Assets';src: url('https://crossorigin.me/https://nirewen.s-ul.eu/WJJ3bKJl.ttf');}");
	$(document).on("mouseover.rprq", function(e) {
		var target = $(e.target);
		if(target.parents(".message").length > 0) {
			var isCompact = false;
			var allmessages = $('.messages .message-group');
			var nameDateBlock = $('.messages .message-group .comment .body h2');
			var replyBtn = '<span class="citar-btn" style="cursor:pointer;color:#fff !important;position:relative;top:-1px;margin-left:5px;text-transform:uppercase;font-size:10px;padding:3px 5px;background:rgba(0,0,0,0.4);font-family: Segoe MDL2 Assets;border-radius: 3px;"></span>';
			allmessages.on('mouseover',function() {
				if (nameDateBlock.find('.citar-btn').length == 0) {
					$(this).find(nameDateBlock).append(replyBtn);
					$(this).find('.citar-btn').on('mousedown',function(){return false;}).click(function() {
						var message = $(this).parents('.message-group');
						isQuote = true;
						atServerName = '';
						
						var closeImg = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4Ij4KICA8ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4Ii8+CiAgICA8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNOSwyIEMxMi44NzEsMiAxNiw1LjEyOSAxNiw5IEMxNiwxMi44NzEgMTIuODcxLDE2IDksMTYgQzUuMTI5LDE2IDIsMTIuODcxIDIsOSBDMiw1LjEyOSA1LjEyOSwyIDksMiBMOSwyIFogTTExLjY5MjUsNS4yNSBMOSw3Ljk0MjUgTDYuMzA3NSw1LjI1IEw1LjI1LDYuMzA3NSBMNy45NDI1LDkgTDUuMjUsMTEuNjkyNSBMNi4zMDc1LDEyLjc1IEw5LDEwLjA1NzUgTDExLjY5MjUsMTIuNzUgTDEyLjc1LDExLjY5MjUgTDEwLjA1NzUsOSBMMTIuNzUsNi4zMDc1IEwxMS42OTI1LDUuMjUgWiIvPgogIDwvZz4KPC9zdmc+Cg==";
						
						if (quoting == true) { // new quote
							serverName = $('.guild-header header span').text();
							$('.quote-msg').find('.message-group').remove();
							$(message).clone().appendTo('.quote-msg').show('slow');
							$('.quote-msg .message-group').append(`<img src="${closeImg}" class="quote-close" height="20" width="20" style="float: right; cursor: pointer" onClick="cancelQuote()">`)
							$('.content .channel-textarea textarea').focus();
							elem = $('.quote-msg');
							
							// test if it's a private channel, guild channel or group channel
							if ($('.chat .title-wrap .title.channel-group-dm .channel-name').length >= 1) {
								chanName = $('.chat .title-wrap .channel-name').text();
							}
							if ($('.chat .title-wrap .title:not(.channel-group-dm) .channel-name.channel-private').length >= 1) {
								chanName = "@" + $('.chat .title-wrap .channel-name').text();
							}
							if ($('.chat .title-wrap .title:not(.channel-group-dm) .channel-name:not(.channel-private)').length >= 1) {
								chanName = "#" + $('.chat .title-wrap .channel-name').text();
							}
							
							$('.quote-msg').find('.btn-reaction').remove();
							$('.quote-msg').find('.btn-option').css('background-image', `url(${closeImg})`);
							
							// defines the click function, to delete the message you don't want to quote
							$('.quote-msg').find('.btn-option').click(function() {
								$('.quote-msg').find('.message').has(this).find('.accessory').remove();
								$('.quote-msg').find('.message').has(this).find('.message-text').remove();
								if ($('.quote-msg').find('.message-text').length == 0) {
									cancelQuote();
								}
							});
						}
						
						if (quoting == false) {
							serverName = $('.guild-header header span').text();
							quoting = true;
							$('.channel-textarea').prepend('<div class="quote-msg"></div>')
							$(message).clone().appendTo(".quote-msg").show('slow');
							$('.quote-msg .message-group').append(`<img src="${closeImg}" class="quote-close" height="20" width="20" style="float: right; cursor: pointer" onClick="cancelQuote()">`)
							$('.content .channel-textarea textarea').focus();
							elem = $('.quote-msg');
							
							// test if it's a private channel, guild channel or a group channel
							if ($('.chat .title-wrap .title.channel-group-dm .channel-name').length >= 1) {
								chanName = $('.chat .title-wrap .channel-name').text();
							}
							if ($('.chat .title-wrap .title:not(.channel-group-dm) .channel-name.channel-private').length >= 1) { 
								chanName = "@" + $('.chat .title-wrap .channel-name').text();
							}
							if ($('.chat .title-wrap .title:not(.channel-group-dm) .channel-name:not(.channel-private)').length >= 1) {
								chanName = "#" + $('.chat .title-wrap .channel-name').text();
							}
							$('.quote-msg').find('.btn-reaction').remove();
							$('.quote-msg').find('.btn-option').css('background-image', `url(${closeImg})`);
							
							// sets the click function, to delete the message you don't want to quote
							$('.quote-msg').find('.btn-option').click(function() {
								$('.quote-msg').find('.message').has(this).find('.accessory').remove();
								$('.quote-msg').find('.message').has(this).find('.message-text').remove();
								if ($('.quote-msg').find('.message-text').length == 0) {
									cancelQuote();
								}
							});
						}
					});
				}
			});
			allmessages.on('mouseleave',function() {
				if (nameDateBlock.find('.citar-btn').length == 1) {
					$(this).find('.citar-btn').empty().remove();
				}
			});
		}
	});
	console.log('Citador iniciado.');
};

Citador.prototype.attachParser = function() {
	var el = $('.channel-textarea textarea');
	if (el.length == 0) return;
	this.handleKeypress = function (e) {
		var code = e.keyCode || e.which;
		if(code !== 13) return;
		try {
			if(isQuote == true) {
				if (e.shiftKey || $('.channel-textarea-autocomplete-inner').length >= 1) return;
				
				var color = $('.quote-msg').find('.user-name').css('color'),
					user = $('.quote-msg').find('.user-name').text(),
					avatarUrl = $('.quote-msg').find('.avatar-large').css('background-image').replace(/.*\s?url\([\'\"]?/, '').replace(/[\'\"]?\).*/, ''),
					newText,
					oldText = $('.content .channel-textarea textarea').val(),
					hourpost = $('.quote-msg').find('.timestamp').text(),
					quoteMsg = $('.quote-msg').find('.comment'),
					text = '';
				
				// change every markup edit to text
				quoteMsg.find('pre').each(function() {$(this).html($(this).find('code').text())});
				quoteMsg.find('.markup').each(function() {$(this).html($(this).html().replace(/<\/?code( class="inline")?>/g, "`"))});
				quoteMsg.find('.markup').each(function() {$(this).html($(this).html().replace(/<\/?pre>/g, "```"))});
				quoteMsg.find('.markup').each(function() {$(this).html($(this).html().replace(/<\/?strong>/g, "**"))});
				quoteMsg.find('.markup').each(function() {$(this).html($(this).html().replace(/<\/?em>/g, "*"))});
				quoteMsg.find('.markup').each(function() {$(this).html($(this).html().replace(/<\/?s>/g, "~~"))});
				quoteMsg.find('.markup').each(function() {$(this).html($(this).html().replace(/<\/?u>/g, "__"))});
				
				// change emotes to text
				quoteMsg.find('.emotewrapper').each(function() {
					$(this).html($(this).find('img').attr('alt'));
				});
				
				quoteMsg.find('.emoji').each(function() {
					$(this).html($(this).attr('alt'));
				});
				
				// set the quote text
				quoteMsg.find('.markup').each(function() {
					text += $(this).clone().find('.copybutton').remove().end().text() + '\n';
				});
				
				// remove (edited) and go on
				newText = text.split("(edited)").join("");
				
				// convert role colour to hex
				color = color.split(",");                      // não tenho maneira melhor
				color[0] = Number(color[0].split('rgb(')[1]);  // de separar os dados de cor rgb
				color[1] = Number(color[1]);
				color[2] = Number(color[2].split(')')[0]);
				color = Number('0x' + rgbToHex(color[0], color[1], color[2]).toString());
				
				// embed data
				var data = {
						content: oldText,
						embed: {
							author: {
								name: user,
								icon_url: avatarUrl
							},
							description: newText,
							footer: {
								text: `in ${chanName}${atServerName} - ${hourpost}`
							},
							image: {url: ''},
							fields: [],
							color: color
						}
					},
					chanID = window.location.pathname.split('/').pop();
				
				// test if the quote has images in it and add to the final embed
				if ($('.quote-msg').find('.attachment-image').length >= 1) {
					data.embed.image.url = $('.quote-msg').find('.attachment-image a').attr('href');
				}
				
				// test if the quote has files in it and add to the final embed
				if ($('.quote-msg').find('.attachment').length >= 1) {
					for (i = 0; i < $('.quote-msg').find('.attachment').length; i++) {
						var value = $($('.quote-msg').find('.attachment')[i]).find('.attachment-inner a').text();
						var link = $($('.quote-msg').find('.attachment')[i]).find('.attachment-inner a').attr('href');
						var attachNum = i + 1;
						data.embed.fields.push({name: "Attachment #" + attachNum, value: `📁 [${value}](${link})`});
					}
				}
				
				// the post
				$.ajax({
					type : "POST",
					url : `https://discordapp.com/api/channels/${chanID}/messages`,
					headers : {
						"authorization": token
					},
					dataType : "json",
					contentType : "application/json",
					data: JSON.stringify(data),
					error: (req, error, exception) => {
						console.log(req.responseText);
					}
				});
				
				// reset important vars,
				// the vars that are always changing i don't change (like user, color, newText...)
				$(this).val("");
				isQuote = false;
				quoting = false;
				atServerName = ''; // idk if it's necessary
				$('.quote-msg').remove();
				e.preventDefault();
				e.stopPropagation();
				return;
			}
		} 
		catch(e) {
			console.warn("Citador: " + e);
		}
	};
	el[0].addEventListener("keydown", this.handleKeypress, false);
}

Citador.prototype.load = function() {};
Citador.prototype.unload = function() {
	$(document).off("mouseover.rprq");
	$('.messages .message-group').off('mouseover');
	$('.messages .message-group').off('mouseleave');
	BdApi.clearCSS("citador-segoemdl2-font");
};
Citador.prototype.stop = function() {
	$(document).off("mouseover.rprq");
	$('.messages .message-group').off('mouseover');
	$('.messages .message-group').off('mouseleave');
	BdApi.clearCSS("citador-segoemdl2-font");
};
Citador.prototype.getSettingsPanel = function() {
	return '';
};

Citador.prototype.onSwitch = function () {
	this.attachParser();
	if (isQuote == true) {
		if (serverName !== $('.guild-header header span').text() && serverName !== "") {
			atServerName = " at " + serverName;
		} else if (serverName == $('.guild-header header span').text() || serverName == ""){
			atServerName = '';
		}
		$('.channel-textarea').prepend(elem);
	}
};
