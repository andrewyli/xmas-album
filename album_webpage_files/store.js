try {
	if (window.localStorage && !localStorage.getItem('storeSession')) {
		localStorage.setItem('storeSession', '' + (new Date()).getTime());
	}
} catch (e) {
	// Do nothing.
}

try {
	var si_helper = {
		get: function (key) {
			var name = key + '=',
				decodedCookie = decodeURIComponent(document.cookie),
				ca = decodedCookie.split(';');
			for (var i = 0; i < ca.length; i++) {
				var c = ca[i];
				while (c.charAt(0) == ' ') {
					c = c.substring(1);
				}
				if (c.indexOf(name) == 0) {
					return c.substring(name.length, c.length);
				}
			}
			return '';
		},
		set: function (key, val, ttl) {
			document.cookie = key + '=' + val + ';' + si_helper.getExpires(ttl) + si_helper.getDomainPath();
		},
		getDomainPath: function () {
			var host = window.location.hostname;

			if ('localhost' !== host) {
				host = '.' + host;
			}
			return 'domain=' + host + ';' + 'path=/;';
		},
		getExpires : function (ttl) {
			var expires = 'expires=';
			if (ttl) {
				var d = new Date();
				d.setTime(d.getTime() + (ttl * 24 * 60 * 60 * 1000));
				expires += d.toUTCString();
			} else {
				expires += 'Fri, 31 Dec 2222 23:59:59 GMT';
			}
			return expires + ';';
		}
	};

	var si = false;
	if (si_helper.get('si')) {
		si = true;
	} else {
		si_helper.set('si', (new Date()).getTime() + '.' + Math.random(), 0)
	}

	if (document.referrer || !si) {
		var store = document.getElementById('store-session'),
			script = document.createElement('script');

		si_helper.set('ref', encodeURIComponent(document.referrer), 0.01);
		script.defer = 'defer';
		script.src = store.src.replace('store', 'source') + (-1 === store.src.indexOf('?') ? '?' : '&') + 'time=' + (new Date()).getTime();
		document.getElementsByTagName('head')[0].appendChild(script);
	}
} catch (e) {
	// Do nothing.
}
