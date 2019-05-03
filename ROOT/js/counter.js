import { CountUp } from './countUp.min.js';

// https://stackoverflow.com/questions/5353934/check-if-element-is-visible-on-screen
function checkVisible(elm) {
  var rect = elm.getBoundingClientRect();
  var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight);
  return !(rect.bottom < 0 || rect.top - viewHeight >= 0);
}

function trunc(x) {
  return Math.floor(Number.parseFloat(x).toPrecision(1));
}


var voucherNames = $('#collectionchoice option').get().map( el => el.value.split('|')[0] );
var interval;
var waypoint;
var pollInterval;
var counts;

window.onload = function() {

	//got these numbers from the current records
	counts = [
		{'id': 'specimen-counter-number',
		 'query': "*",
		 'count': trunc(2005 + 897 + 7817),
		 'actual': 0,
		 'returned': 0,
		 'exact': false},
		{'id': 'images-counter-number',
		 'query': "img:[\%22\%22%20TO%20^]",
		 'count': trunc(1314 + 553 + 2856),
		 'actual': 0,
		 'returned': 0,
		 'exact': false},
		{'id': 'geo-tags-counter-number',
		 'query': "l1:[-180%20TO%20180]+AND+l11:[-180%20TO%20180]",
		 'count': trunc(897),
		 'actual': 0,
		 'returned': 0,
		 'exact': false}
	]

	for (let c of counts) {
		$('#' + c['id']).text(c['count'])
	}

	waypoint = new Waypoint({
		element: $('#counter-container'),
		handler: function(direction) {

			pollInterval = setInterval(()=>{

				for (let c of counts) {
					if (!c['exact']) {
						return
					}
				}

				let duration = 2
				let opts = {'duration': duration}
				for (let c of counts) {
					let cu = new CountUp(c['id'], c['actual'], opts);
					cu.start();
					c['countUp'] = cu;
				}
				this.element.removeClass('rough-number');
				window.thing = this
				clearInterval(pollInterval)
			})
			
		}
	})
	window.wp = waypoint
	waypoint.counts = counts

	interval = setInterval(function(){
		if (checkVisible(document.getElementById('specimen-counter-number'))) {
			setTimeout(function(){
				waypoint.trigger()
				clearInterval(interval)
			},200)
		}
	}, 100)

	// do the queries for the counters
	window.responses_k = []
	for (let co of counts) {
		for (let coll of voucherNames) {
			let url = "specify-solr/" + coll + "/select?wt=json&" + "q=" + co['query'];
			$.ajax({url: url, success: function(resp) {
				resp = JSON.parse(resp);
				co['actual'] += resp['response']['numFound']
				co['returned'] += 1
				if (co['returned'] === voucherNames.length) {
					co['exact'] = true
				}
			}})
		}
	}
	
}