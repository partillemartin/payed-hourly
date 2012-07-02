// Override to save json
Storage.prototype.setObject = function(key, value) {
    this.setItem(key, JSON.stringify(value));
}
 
Storage.prototype.getObject = function(key) {
    return JSON.parse(this.getItem(key));
}

$(function(){
	workEntries = localStorage.getObject('workEntriesLS') != null ? localStorage.getObject('workEntriesLS') : [];
	renderList();

function makeWorkEntry(date, hours) {
	return {
		date: date,
		hours: hours
	}
}

function renderList() {
	if (!localStorage.getObject('workEntriesLS')) {
		var li = $('<li>');
		li.html('No entries');
		li.addClass('entry');
		$('#workEntryList').append(li);
		$('#workEntryList').listview("refresh");
		return false;
	} else {
		$('#workEntryList').find('.entry').remove();
		$.each(workEntries, function(k, v) {
			var li = $('<li>');
			var a = $('<a>');
			li.addClass('entry');
			a.html(v.date + ' ' + '<span>' + v.hours + ' hour(s)</span>');
			li.append(a);
			$('#workEntryList').append(li);
		})
		$('#workEntryList').listview("refresh");
	}
}

$('button#submit').bind('click', function(event) {
	event.preventDefault();
	var date = $('#date').val();
	var hours = $('#hours').val();
	var workEntry = makeWorkEntry(date, hours);
	workEntries.push(workEntry);
	localStorage.setObject('workEntriesLS', workEntries);
	renderList();
});



});
