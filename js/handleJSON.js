
// Add Note
$("#addNote").click(function(event) { 
    event.preventDefault();
    var noteTitle = $("#addNoteModal").find("#noteName").val();
    var noteContent = $("#addNoteModal").find("#noteContent").val();
    var handleItem = $("#addNoteModal").find(".key").val();
    var parent_order = $("#addNoteModal").find(".p_order").val();
    var eventID = $("#addNoteModal").find(".eventID").val();
    console.log(parent_order, eventID)
    add_json(handleItem, parent_order, noteTitle, noteContent, eventID);
})
// Add File
$("#addFile").click(function(event) { 
    event.preventDefault();

    var fileName = $("#uploadFileModal").find("#fileName").val();
    var fileContent = $("#uploadFileModal").find("#fileSelect").val();
    var handleItem = $("#uploadFileModal").find(".key").val();
    var parent_order = $("#uploadFileModal").find(".p_order").val();
    var eventID = $("#uploadFileModal").find(".eventID").val();
	
    add_json(handleItem, parent_order, fileName, fileContent, eventID);
})
// handle edit event
// Edit Note 
$("#editNote").click(function(event) {
    event.preventDefault();
    
    var noteTitle = $("#editNoteModal").find("#noteName").val();
    var noteContent = $("#editNoteModal").find("#noteContent").val();
    var handleItem = $("#editNoteModal").find(".key").val();
    var child_order = $("#editNoteModal").find(".order").val();
    var parent_order = $("#editNoteModal").find(".p_order").val();
    edit_json(handleItem, parent_order, child_order, noteTitle, noteContent);
});
// Edit File
$("#editFile").click(function(event) {
    event.preventDefault();

    var FileName = $("#editFileModal").find("#fileName").val();
    var handleItem = $("#editFileModal").find(".key").val();
    var child_order = $("#editFileModal").find(".order").val();
    var parent_order = $("#editFileModal").find(".p_order").val();
    edit_json(handleItem, parent_order, child_order, FileName, "");
});
// edit Data from JSON file
function edit_json(handle, parent_order, child_order, title, content) {
    switch (handle) {
        case "EventNotes":
            editNoteData(handle, parent_order, child_order, title, content);
            break;
        case "EventFiles":
            editFileData(handle, parent_order, child_order, title);
            break;
        default:
            break;
    }
}
function editNoteData(handle, parent_order, child_order, title, content) {
    fetch('./ajax/data/sampledata.json', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'X-Requested-With',
        }
      })
      .then(response => response.json())
      .then(response => {
            var data = response;
            data[parent_order][handle][child_order].EditedByName = "Adam S";
            data[parent_order][handle][child_order].NoteTitle = title;
            data[parent_order][handle][child_order].NoteContent = content;
            data[parent_order][handle][child_order].EditedTimestamp = new Date().toLocaleString(undefined, {
                day:    'numeric',
                month:  'numeric',
                year:   'numeric',
                hour:   '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            $.ajax({
                url: 'http://localhost/datatable/server/index.php',
                type: 'POST',
                data: 'post-form='+JSON.stringify(data),
                dataType: 'text',
                success: function(response, textStatus, jqXHR) {
                    window.location.reload();
                },
                error: function(jqXHR, textStatus, errorThrown){
                  alert(textStatus, errorThrown);
               }
             });
        
      })
      .catch(error => console.log('Response failed : ' + error.message));
}
function editFileData(handle, parent_order, child_order, title) {
    fetch('./ajax/data/sampledata.json', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'X-Requested-With',
        }
      })
      .then(response => response.json())
      .then(response => {
            var data = response;
            data[parent_order][handle][child_order].EditedByName = "Adam S";
            data[parent_order][handle][child_order].FileName = title;
            data[parent_order][handle][child_order].EditedTimestamp = new Date().toLocaleString(undefined, {
                day:    'numeric',
                month:  'numeric',
                year:   'numeric',
                hour:   '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
            $.ajax({
                url: 'http://localhost/datatable/server/index.php',
                type: 'POST',
                data: 'post-form='+JSON.stringify(data),
                dataType: 'text',
                success: function(response, textStatus, jqXHR) {
                    window.location.reload();
                },
                error: function(jqXHR, textStatus, errorThrown){
                  alert(textStatus, errorThrown);
               }
             });
        
      })
      .catch(error => console.log('Response failed : ' + error.message));
}
/** end edit data */
/** begin add data */
function add_json(handle, nth, name, content, eventID) {
    switch (handle) {
        case "EventNotes":
            addNoteData(handle, nth, name, content, eventID);
            break;
        case "EventFiles":
            addFileData(handle, nth, name, content, eventID);
            break;
        default:
            break;
    }
}
function addNoteData(handle, nth, name, content, eventID) {
    var seconds = new Date().getTime();
    var item = {};
    item.EventLogId = eventID;
    item.EventNoteId = create_UUID();
    item.NoteTitle = name;
    item.NoteContent = content;
    item.NoteLoggedTime = "\/Date('"+seconds+"')\/";
    item.NoteTimestamp =  new Date().toLocaleString(undefined, {
        day:    'numeric',
        month:  'numeric',
        year:   'numeric',
        hour:   '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    item.LoggedByFirstName = "Adam";
    item.LoggedByLastName = "S";
    item.FullName = "Adam S.";
    item.EditedTimestamp = null;
    item.EditedByName = null;

    fetch('./ajax/data/sampledata.json', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'X-Requested-With',
        }
      })
      .then(response => response.json())
      .then(response => {
            var data = response;
            var target = data[nth][handle];
            target.push(item);
            $.ajax({
                url: 'http://localhost/datatable/server/index.php',
                type: 'POST',
                data: 'post-form='+JSON.stringify(data),
                dataType: 'text',
                success: function(response, textStatus, jqXHR) {
                    window.location.reload();
                },
                error: function(jqXHR, textStatus, errorThrown){
                  alert(textStatus, errorThrown);
               }
             });
            
        
      })
      .catch(error => console.log('Response failed : ' + error.message));
}
function addFileData(handle, nth, name, content, eventID) {
    var seconds = new Date().getTime();
    var item = {};
    item.EventLogId = eventID;
    item.EventFileId = create_UUID();
    item.FileName = name;
    item.FileURL = content;
    item.UploadedTime = "\/Date('"+seconds+"')\/";
    item.UploadedTimestamp =  new Date().toLocaleString(undefined, {
        day:    'numeric',
        month:  'numeric',
        year:   'numeric',
        hour:   '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });
    item.UploadedByFirstName = "Adam";
    item.UploadedByLastName = "S";
    item.FullName = "Adam S.";
    item.EditedTimestamp = null;
    item.EditedByName = null;

    fetch('./ajax/data/sampledata.json', {
        mode: 'cors',
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true',
            'Access-Control-Allow-Headers': 'X-Requested-With',
        }
      })
      .then(response => response.json())
      .then(response => {
            var data = response;
            var target = data[nth][handle];
            target.push(item);
            $.ajax({
                url: 'http://localhost/datatable/server/index.php',
                type: 'POST',
                data: 'post-form='+JSON.stringify(data),
                dataType: 'text',
                success: function(response, textStatus, jqXHR) {
                    window.location.reload();
                },
                error: function(jqXHR, textStatus, errorThrown){
                  alert(textStatus, errorThrown);
               }
             });
        
      })
      .catch(error => console.log('Response failed : ' + error.message));
}
function create_UUID(){
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}